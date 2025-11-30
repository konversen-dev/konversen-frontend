import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import DashboardHeader from "../../components/sales/DashboardHeader.jsx";
import DashboardSummary from "../../components/sales/DashboardSummary.jsx";
import SearchFilterBar from "../../components/utils/SearchFilterBar.jsx";
import TableLeadScoring from "../../components/sales/TableLeadScoring.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    score: "",
    age: "",
    status: "",
    job: "",
  });

  // Dropdown campaign
  const campaignOptions = [
    { label: "Campaign 1", value: "campaign1" },
    { label: "Campaign 2", value: "campaign2" },
  ];

  // Event handler
  const handleAddLead = () => console.log("Add Lead clicked!");
  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (id, value) =>
    setFilters((prev) => ({ ...prev, [id]: value }));

  // Filter dropdown options
  const filterOptions = [
    { id: "age", placeholder: "All Ages", options: ["<25", "25-40", "40+"] },
    { id: "job", placeholder: "All Jobs", options: ["Sales", "PNS", "Freelancer"] },
    { id: "score", placeholder: "All Scores", options: ["Low", "Medium", "High"] },
    { id: "status", placeholder: "All Status", options: ["Pending", "Contacted", "Converted"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Main Content Wrapper */}
      <DashboardContent>
        {/* Header */}
        <DashboardHeader
          campaignOptions={campaignOptions}
          onAddLead={handleAddLead}
        />

        {/* Summary Cards */}
        <DashboardSummary />

        {/* Search + Filter Bar */}
        <SearchFilterBar
          filters={filterOptions}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />

        {/* Table Lead Scoring */}
        <div className="p-4">
          {/* ⬇️ kirim props ke TableLeadScoring */}
          <TableLeadScoring searchQuery={searchQuery} filters={filters} />
        </div>
      </DashboardContent>
    </div>
  );
}
