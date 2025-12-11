import React, { useState, useMemo, useEffect } from "react";

import Navbar from "../../components/layout/Navbar.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";
import SummaryCard from "../../components/layout/SummaryCard.jsx";
import Pagination from "../../components/utils/Pagination.jsx";
import Modal from "../../components/utils/Modal.jsx";
import CampaignSummary from "../../components/sales/CampaignSummary.jsx";

import CampaignFilterBar from "../../components/campaign/CampaignFilterBar.jsx";

// Components
import CampaignTable from "../../components/campaign/CampaignTable.jsx";
import CampaignForm from "../../components/campaign/CampaignForm.jsx";
import CampaignDetailsModal from "../../components/campaign/CampaignDetailModal.jsx";

import ConfirmModal from "../../components/utils/ConfirmModal.jsx";
import AlertModal from "../../components/utils/AlertModal.jsx";

// Services
import campaignService from "../../services/campaignService.js";

export default function ManagerCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    pausedCampaigns: 0,
    activeCampaigns: 0,
    completedCampaigns: 0,
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

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detailData, setDetailData] = useState(null);

  // Confirm delete modal state
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    campaign: null,
  });

  // Alert modal state
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const showAlert = (title = "Info", message = "") => {
    setAlertState({ isOpen: true, title, message });
  };

  const closeAlert = () => {
    setAlertState({ isOpen: false, title: "", message: "" });
  };

  // Fetch campaigns & stats
  useEffect(() => {
    fetchCampaigns();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to load campaigns. Please try again.";
      showAlert("Failed to Load Campaigns", msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await campaignService.getCampaignStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch campaign stats", error);
    }
  };

  const fetchCampaignDetail = async (id) => {
    try {
      const response = await campaignService.getCampaignById(id);
      const campaignData = response.data?.campaign || response.data || response;
      return campaignData;
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to load campaign details. Please try again.";
      showAlert("Failed to Load Details", msg);
      return null;
    }
  };

  // Summary dari stats API
  const summary = useMemo(
    () => ({
      totalCampaigns: stats.totalCampaigns || 0,
      paused: stats.pausedCampaigns || 0,
      active: stats.activeCampaigns || 0,
      completed: stats.completedCampaigns || 0,
    }),
    [stats]
  );

  const saveCampaign = async (campaignData) => {
    try {
      if (editing) {
        // Update campaign
        await campaignService.updateCampaign(editing.id, campaignData);
        showAlert("Success", "Campaign updated successfully!");
      } else {
        // Create campaign
        await campaignService.createCampaign(campaignData);
        showAlert("Success", "Campaign created successfully!");
      }

      setShowForm(false);
      setEditing(null);
      fetchCampaigns();
      fetchStats();
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to save campaign. Please try again.";
      showAlert("Save Failed", msg);
    }
  };

  // onDelete now opens confirm modal
  const handleDeleteRequest = (campaign) => {
    setConfirmDelete({ isOpen: true, campaign });
  };

  // actual delete after confirm
  const confirmDeleteAction = async () => {
    const campaign = confirmDelete.campaign;
    if (!campaign) {
      setConfirmDelete({ isOpen: false, campaign: null });
      return;
    }

    try {
      await campaignService.deleteCampaign(campaign.id);
      showAlert("Success", "Campaign deleted successfully!");
      fetchCampaigns();
      fetchStats();
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to delete campaign. Please try again.";
      showAlert("Delete Failed", msg);
    } finally {
      setConfirmDelete({ isOpen: false, campaign: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      <Navbar />
      <DashboardContent>
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary-darkest">Campaign</h1>
            <p className="text-sm text-primary-dark">
              Manage & create campaigns to expand your lead reach.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
          >
            + Add Campaign
          </button>
        </div>

        {/* SUMMARY CARD */}
        <CampaignSummary data={summary} />

        {/* FILTER BAR (INI YANG PENTING!) */}
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
            <p className="text-gray-500 mb-4">No campaigns found.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
            >
              Create Your First Campaign
            </button>
          </div>
        ) : (
          <CampaignTable
            data={campaigns}
            onDetail={async (row) => {
              const fullData = await fetchCampaignDetail(row.id);
              if (fullData) setDetailData(fullData);
            }}
            onEdit={async (row) => {
              const fullData = await fetchCampaignDetail(row.id);
              if (fullData) {
                setEditing(fullData);
                setShowForm(true);
              }
            }}
            onDelete={(row) => handleDeleteRequest(row)}
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

      {/* MODAL ADD / EDIT */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <CampaignForm
          mode={editing ? "edit" : "add"}
          initialData={editing}
          onSave={saveCampaign}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      </Modal>

      {/* MODAL DETAIL */}
      <Modal isOpen={!!detailData} onClose={() => setDetailData(null)}>
        {detailData && (
          <CampaignDetailsModal
            campaign={detailData}
            onClose={() => setDetailData(null)}
          />
        )}
      </Modal>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title="Delete Campaign"
        message={`Are you sure you want to delete campaign "${confirmDelete.campaign?.name}"? This action cannot be undone.`}
        onCancel={() => setConfirmDelete({ isOpen: false, campaign: null })}
        onConfirm={confirmDeleteAction}
      />

      {/* ALERT MODAL */}
      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onClose={closeAlert}
      />
    </div>
  );
}
