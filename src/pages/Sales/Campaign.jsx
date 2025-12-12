import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";
import Pagination from "../../components/utils/Pagination.jsx";
import Modal from "../../components/utils/Modal.jsx";

// Reusable components (same as manager)
import CampaignTable from "../../components/campaign/CampaignTable.jsx";
import CampaignFilterBar from "../../components/campaign/CampaignFilterBar.jsx";
import CampaignDetailsModal from "../../components/campaign/CampaignDetailModal.jsx";

import CampaignSummary from "../../components/sales/CampaignSummary.jsx";

// Services
import campaignService from "../../services/campaignService.js";

export default function SalesCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    pausedCampaigns: 0,
    activeCampaigns: 0,
    completedCampaigns: 0
  });

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const [detailData, setDetailData] = useState(null);

  // Fetch campaigns from API
  useEffect(() => {
    fetchCampaigns();
    fetchStats();
  }, [page, perPage, search, filters]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: perPage,
        ...(search && { name: search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
      };
      
      const response = await campaignService.getCampaigns(params);
      setCampaigns(response.data.campaigns || []);
      setTotalItems(response.data.pagination?.totalItems || 0);
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await campaignService.getCampaignStats();
      setStats(response.data);
    } catch {
      // Silently fail stats fetch
    }
  };

  const fetchCampaignDetail = async (id) => {
    try {
      const response = await campaignService.getCampaignById(id);
      // Data ada di response.data.campaign
      const campaignData = response.data?.campaign || response.data || response;
      return campaignData;
    } catch (error) {
      console.error('Error fetching campaign detail:', error);
      return null;
    }
  };

  /* ---------------------- SUMMARY ---------------------- */
  const summary = useMemo(() => ({
    totalCampaigns: stats.totalCampaigns || 0,
    paused: stats.pausedCampaigns || 0,
    active: stats.activeCampaigns || 0,
    completed: stats.completedCampaigns || 0,
  }), [stats]);

  /* ---------------------- RENDER ---------------------- */

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navbar />

      <DashboardContent>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="text-left">
            <h1 className="text-2xl font-bold text-primary-darkest">
              Campaign
            </h1>
            <p className="text-sm text-primary-dark">
              View campaigns assigned to you.
            </p>
          </div>
        </div>


        {/* SUMMARY CARDS */}
        <CampaignSummary data={summary} />

        {/* FILTER BAR */}
        <CampaignFilterBar
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          statusOptions={["Active", "Completed", "Paused"]}
        />

        {/* TABLE */}
        {loading ? (
          <div className="text-center py-8">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">No campaigns assigned to you yet.</p>
          </div>
        ) : (
          <CampaignTable
            data={campaigns}
            readOnly={true}    // <-- 🔥 penting! hanya show icon view
            onDetail={async (row) => {
              const fullData = await fetchCampaignDetail(row.id);
              if (fullData) setDetailData(fullData);
            }}
          />
        )}

        <Pagination
          currentPage={page}
          totalItems={totalItems}
          itemsPerPage={perPage}
          onPageChange={setPage}
          onItemsPerPageChange={setPerPage}
        />

      </DashboardContent>

      {/* MODAL DETAIL */}
      <Modal isOpen={!!detailData} onClose={() => setDetailData(null)}>
        {detailData && (
          <CampaignDetailsModal
            campaign={detailData}
            onClose={() => setDetailData(null)}
            readOnly
          />
        )}
      </Modal>

    </div>
  );
}
