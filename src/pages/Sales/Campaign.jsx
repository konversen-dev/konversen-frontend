import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";
import CampaignHeader from "../../components/sales/CampaignHeader.jsx";
import CampaignSummary from "../../components/sales/CampaignSummary.jsx";
import SearchFilterBar from "../../components/utils/SearchFilterBar.jsx";
import CampaignTable from "../../components/sales/TableCampaign.jsx";

export default function Campaign() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    period: "",
    status: "",
    participate: "",
  });

  // Filter dropdown options untuk Campaign
  const filterOptions = [
    { id: "period", placeholder: "All Periods", options: ["This Month", "Last Month", "This Year"] },
    { id: "status", placeholder: "All Status", options: ["Active", "Completed"] },
    { id: "participate", placeholder: "All participate", options: ["Joined", "Not Joined"] },
  ];

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (id, value) =>
    setFilters((prev) => ({ ...prev, [id]: value }));

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      {/* Navbar */}
      <Navbar />

      <DashboardContent>
        {/* Header — TANPA Add Campaign */}
        <CampaignHeader />

        {/* Summary Cards */}
        <CampaignSummary />

        {/* Search + Filters */}
        <SearchFilterBar
          filters={filterOptions}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />

        {/* Table Campaign */}
        <div className="p-4">
          <CampaignTable searchQuery={searchQuery} filters={filters} />
        </div>
      </DashboardContent>
    </div>
  );
}
