import React, { useState, useEffect } from "react";
import Table from "../layout/ReusableTable.jsx";
import { FiEye } from "react-icons/fi";
import StatusBadge from "../utils/StatusBadge.jsx";
import ProbabilityBadge from "../utils/ProbabilityBadge.jsx";
import Modal from "../utils/Modal.jsx";
import LeadDetailsModal from "./LeadDetailsModal.jsx";
import Pagination from "../utils/Pagination.jsx";

// Services
import leadService from "../../services/leadService.js";

export default function TableLeadScoring({ searchQuery, filters, campaignId }) {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch leads from API
  useEffect(() => {
    if (campaignId) {
      fetchLeads();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, searchQuery, filters, campaignId]);

  const fetchLeads = async () => {
    if (!campaignId) {
      setLeads([]);
      setTotalItems(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        campaignId,
        ...(searchQuery && { name: searchQuery }),
        ...(filters.status && { status: filters.status }),
        ...(filters.job && { job: filters.job }),
        ...(filters.age_min !== undefined && { ageMin: filters.age_min }),
        ...(filters.age_max !== undefined && { ageMax: filters.age_max }),
        ...(filters.score_min !== undefined && { scoreMin: filters.score_min }),
        ...(filters.score_max !== undefined && { scoreMax: filters.score_max }),
      };
      
      const response = await leadService.getLeads(params);
      setLeads(response.data?.leads || []);
      setTotalItems(response.data?.pagination?.totalItems || 0);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadDetail = async (id) => {
    try {
      const response = await leadService.getLeadById(id, campaignId);
      const leadData = response.data?.lead || response.data || response;
      return leadData;
    } catch (error) {
      console.error('Error fetching lead detail:', error);
      return null;
    }
  };

  // UPDATE STATUS DARI MODAL
  const handleStatusChange = async (newStatus) => {
    if (!selectedLead) return;
    
    try {
      await leadService.updateLeadStatus(selectedLead.id, newStatus, campaignId);
      
      // Update local state
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id ? { ...lead, status: newStatus } : lead
        )
      );
      setSelectedLead((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // ====================== TABLE COLUMN =======================
  const columns = [
    { header: "Leads", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Age", accessor: "age" },
    { header: "Job", accessor: "job" },
    { header: "Domicile", accessor: "city" },
    { 
      header: "Probability", 
      accessor: "score",
      render: (v) => <ProbabilityBadge score={v} />
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      header: "Action",
      accessor: "action",
      render: (_, row) => (
        <div className="flex items-center justify-start pl-1">
          <FiEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={async () => {
              const fullData = await fetchLeadDetail(row.id);
              if (fullData) {
                setSelectedLead(fullData);
                setIsModalOpen(true);
              }
            }}
          />
        </div>
      ),
    },
  ];

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filters]);

  return (
    <div>
      {loading ? (
        <div className="text-center py-8">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No leads found.</p>
        </div>
      ) : (
        <Table columns={columns} data={leads} />
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lead Details"
      >
        <LeadDetailsModal
          lead={selectedLead}
          campaignId={campaignId}
          onStatusChange={handleStatusChange}
        />
      </Modal>
    </div>
  );
}
