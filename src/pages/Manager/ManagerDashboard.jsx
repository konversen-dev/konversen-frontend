import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";
import DashboardHeader from "../../components/sales/DashboardHeader.jsx";
import DashboardSummary from "../../components/sales/DashboardSummary.jsx";
import SearchFilterBar from "../../components/utils/SearchFilterBar.jsx";
import TableLeadScoring from "../../components/sales/TableLeadScoring.jsx";

export default function ManagerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    score: "",
    age: "",
    status: "",
    job: "",
  });

  const campaignOptions = [
    { label: "Campaign 1", value: "campaign1" },
    { label: "Campaign 2", value: "campaign2" },
  ];

  const filterOptions = [
    { id: "age", minAge: 18, maxAge: 200 },
    { id: "job", placeholder: "All Jobs", options: ["Sales", "PNS", "Freelancer"] },
    { id: "score", min: 0, max: 100 },
    { id: "status", placeholder: "All Status", options: ["Pending", "Contacted", "Converted"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navbar />

      <DashboardContent>
        <DashboardHeader campaignOptions={campaignOptions} />

        <DashboardSummary />

        <SearchFilterBar
          filters={filterOptions}
          onSearchChange={setSearchQuery}
          onFilterChange={(id, value) =>
            setFilters((prev) => ({ ...prev, [id]: value }))
          }
        />

        <div className="p-4">
          <TableLeadScoring searchQuery={searchQuery} filters={filters} />
        </div>
      </DashboardContent>
    </div>
  );
}
