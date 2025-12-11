import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import DashboardHeader from "../../components/sales/DashboardHeader.jsx";
import DashboardSummary from "../../components/sales/DashboardSummary.jsx";
import SearchFilterBar from "../../components/utils/SearchFilterBar.jsx";
import TableLeadScoring from "../../components/sales/TableLeadScoring.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";

// Services
import campaignService from "../../services/campaignService.js";
import leadService from "../../services/leadService.js";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [filters, setFilters] = useState({
    score: "",
    age: "",
    status: "",
    job: "",
  });

  const [stats, setStats] = useState({
    totalLeads: 0,
    highProbability: 0,
    contacted: 0,
    converted: 0,
  });

  const [campaignOptions, setCampaignOptions] = useState([]);

  // Fetch campaigns dropdown
  useEffect(() => {
    fetchCampaignsDropdown();
  }, []);

  // Fetch stats when campaign changes
  useEffect(() => {
    if (selectedCampaign) {
      fetchLeadStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCampaign]);

  const fetchCampaignsDropdown = async () => {
    try {
      const response = await campaignService.getCampaignsDropdown();
      // Data ada langsung di response.data (array)
      const campaigns = response.data || [];
      setCampaignOptions(
        campaigns.map((c) => ({ label: c.name, value: c.id }))
      );
      if (campaigns.length > 0) {
        setSelectedCampaign(campaigns[0].id);
      }
    } catch (error) {
      console.error("Failed to load campaigns:", error);
    }
  };

  const fetchLeadStats = async () => {
    if (!selectedCampaign) return;
    
    try {
      const params = { campaignId: selectedCampaign };
      const response = await leadService.getLeadStats(params);
      setStats(response.data || {});
    } catch (error) {
      console.error("Failed to load lead stats:", error);
    }
  };

  // Event handler
  const handleAddLead = () => console.log("Add Lead clicked!");
  const handleSearchChange = (query) => setSearchQuery(query);
  const handleFilterChange = (id, value) =>
    setFilters((prev) => ({ ...prev, [id]: value }));

  // Filter dropdown options
  const filterOptions = [
    { id: "age", minAge: 0, maxAge: 100 },
    { 
      id: "job", 
      placeholder: "All Jobs", 
      options: [
        "Management",
        "Technician",
        "Entrepreneur",
        "Blue Collar",
        "Unknown",
        "Retired",
        "Administrative Staff",
        "Services",
        "Self Employed",
        "Unemployed",
        "Housemaid",
        "Student"
      ]
    },
    { id: "score", min: 0, max: 100 }, 
    { 
      id: "status", 
      placeholder: "All Status", 
      options: ["Pending", "Contacted", "Converted", "Failed"] 
    },
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
          selectedCampaign={selectedCampaign}
          onCampaignChange={setSelectedCampaign}
          onAddLead={handleAddLead}
        />

        {/* Summary Cards */}
        <DashboardSummary data={stats} />

        {/* Search + Filter Bar */}
        <SearchFilterBar
          filters={filterOptions}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />

        <TableLeadScoring 
          searchQuery={searchQuery} 
          filters={filters}
          campaignId={selectedCampaign}
        />
      
      </DashboardContent>
    </div>
  );
}
