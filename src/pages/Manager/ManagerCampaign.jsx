import React, { useState, useMemo } from "react";

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




export default function ManagerCampaign() {

  const [campaigns, setCampaigns] = useState([
    {
      id: "CMP-01",
      name: "Dana Pendidikan Anak",
      description: "Program edukasi dana pendidikan untuk keluarga muda.",
      targetLead: 150,
      periodStart: "2025-10-10",
      periodEnd: "2025-10-21",
      status: "Active",
      madeBy: "Sarah Wijaya",
    },
    {
      id: "CMP-02",
      name: "Promo Kredit Usaha 2025",
      description: "Akuisisi nasabah kredit usaha kecil.",
      targetLead: 270,
      periodStart: "2025-09-01",
      periodEnd: "2025-09-30",
      status: "Completed",
      madeBy: "Rio Setiawan",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detailData, setDetailData] = useState(null);

  // Summary perhitungan
  const summary = useMemo(() => ({
    totalCampaigns: campaigns.length,
    totalLeads: campaigns.reduce((a, b) => a + Number(b.targetLead), 0),
    active: campaigns.filter((c) => c.status === "Active").length,
    completed: campaigns.filter((c) => c.status === "Completed").length,
  }), [campaigns]);

  // FILTERING FUNCTION
  const filtered = campaigns.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    const matchStatus = !filters.status || c.status === filters.status;

    const matchStart =
      !filters.startDate || new Date(c.periodStart) >= new Date(filters.startDate);

    const matchEnd =
      !filters.endDate || new Date(c.periodEnd) <= new Date(filters.endDate);

    return matchSearch && matchStatus && matchStart && matchEnd;
  });

  const totalItems = filtered.length;
  const startIdx = (page - 1) * perPage;
  const currentData = filtered.slice(startIdx, startIdx + perPage);

  const saveCampaign = (campaignData) => {
    if (editing) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editing.id ? { ...c, ...campaignData } : c
        )
      );
    } else {
      const nextId = `CMP-${String(campaigns.length + 1).padStart(2, "0")}`;
      setCampaigns((prev) => [...prev, { ...campaignData, id: nextId }]);
    }
    setShowForm(false);
    setEditing(null);
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
          statusOptions={["Active", "Completed"]}
        />

        {/* TABLE */}
        <CampaignTable
          data={currentData}
          onDetail={setDetailData}
          onEdit={(row) => {
            setEditing(row);
            setShowForm(true);
          }}
          onDelete={(row) =>
            setCampaigns((prev) => prev.filter((c) => c.id !== row.id))
          }
        />

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

    </div>
  );
}
