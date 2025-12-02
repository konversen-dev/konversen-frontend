// src/pages/ManagerDashboard.jsx
import React, { useState, useMemo } from "react";

import Navbar from "../components/layout/Navbar.jsx";
import DashboardContent from "../components/layout/DashboardContent.jsx";
import SummaryCard from "../components/layout/SummaryCard.jsx";
import ReusableTable from "../components/layout/ReusableTable.jsx";
import Button from "../components/utils/Button.jsx";
import Modal from "../components/utils/Modal.jsx";
import StatusBadge from "../components/utils/StatusBadge.jsx";
import Pagination from "../components/utils/Pagination.jsx";
import CampaignDetailsModal from "../components/sales/CampaignDetailsModal.jsx";

import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

import chartIcon from "../assets/sales/chart.png";
import usersIcon from "../assets/sales/users.png";
import handshakeIcon from "../assets/sales/handshake.png";
import phoneIcon from "../assets/sales/phone.png";

/* ================== CONSTANTS ================== */

const STATUS_OPTIONS = ["Active", "Completed"];

// Dummy manager info (nanti bisa diganti dari backend / login)
const CURRENT_MANAGER = {
  name: "Rio Setiawan",
  email: "rio.manager@bankxyz.com",
};

/* ================== FORM ADD / EDIT CAMPAIGN ================== */

function CampaignForm({ mode = "add", initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    targetLead: initialData?.targetLead || "",
    periodStart: initialData?.periodStart || "",
    periodEnd: initialData?.periodEnd || "",
    status: initialData?.status || "Active",
    participate: initialData?.participate || "Joined",
    inviteEmail: "",
    invitedEmails: initialData?.invitedEmails || [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Campaign name is required.";
    if (!form.description.trim())
      nextErrors.description = "Description is required.";
    if (!form.targetLead || Number(form.targetLead) <= 0)
      nextErrors.targetLead = "Target lead must be greater than 0.";
    if (!form.periodStart) nextErrors.periodStart = "Start date is required.";
    if (!form.periodEnd) nextErrors.periodEnd = "End date is required.";

    if (
      form.periodStart &&
      form.periodEnd &&
      new Date(form.periodEnd) < new Date(form.periodStart)
    ) {
      nextErrors.periodEnd = "End date must be after start date.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInvite = () => {
    const email = form.inviteEmail.trim();
    if (!email) return;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        inviteEmail: "Please input a valid email.",
      }));
      return;
    }

    if (form.invitedEmails.includes(email)) {
      setErrors((prev) => ({
        ...prev,
        inviteEmail: "Email already invited.",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      invitedEmails: [...prev.invitedEmails, email],
      inviteEmail: "",
    }));
    setErrors((prev) => ({ ...prev, inviteEmail: undefined }));
  };

  const handleRemoveInvite = (email) => {
    setForm((prev) => ({
      ...prev,
      invitedEmails: prev.invitedEmails.filter((e) => e !== email),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // bentuk data akhir sesuai kebutuhan tabel & detail modal
    const campaignPayload = {
      ...initialData,
      name: form.name.trim(),
      description: form.description.trim(),
      targetLead: Number(form.targetLead),
      periodStart: form.periodStart,
      periodEnd: form.periodEnd,
      status: form.status,
      participate: form.participate,
      madeBy: CURRENT_MANAGER.name,
      invitedEmails: form.invitedEmails,
      participants: form.invitedEmails.map((email) => ({
        name: email.split("@")[0],
        email,
        photo: null,
      })),
    };

    onSave(campaignPayload);
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold text-primary-darkest mb-4 text-center">
        {mode === "edit" ? "Edit Campaign" : "Add Campaign"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
      >
        {/* Campaign Name */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Promo Kredit Usaha 2025"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Short description about this campaign…"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Target Lead */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Total Target Leads <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="targetLead"
            value={form.targetLead}
            onChange={handleChange}
            min={1}
            placeholder="150"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          {errors.targetLead && (
            <p className="text-xs text-red-500 mt-1">{errors.targetLead}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Period Start */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Period Start <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="periodStart"
            value={form.periodStart}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          {errors.periodStart && (
            <p className="text-xs text-red-500 mt-1">{errors.periodStart}</p>
          )}
        </div>

        {/* Period End */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Period End <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="periodEnd"
            value={form.periodEnd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
          {errors.periodEnd && (
            <p className="text-xs text-red-500 mt-1">{errors.periodEnd}</p>
          )}
        </div>

        {/* Invite Sales */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Invite
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              name="inviteEmail"
              value={form.inviteEmail}
              onChange={handleChange}
              placeholder="Add another sales email address to invite"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <button
              type="button"
              onClick={handleAddInvite}
              className="px-4 py-2 rounded-lg bg-[#1262BE] text-white text-sm font-semibold hover:bg-blue-700"
            >
              Invite
            </button>
          </div>
          {errors.inviteEmail && (
            <p className="text-xs text-red-500 mt-1">{errors.inviteEmail}</p>
          )}

          {/* Email chips */}
          {form.invitedEmails.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.invitedEmails.map((email) => (
                <span
                  key={email}
                  className="inline-flex items-center gap-1 bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full"
                >
                  {email}
                  <button
                    type="button"
                    onClick={() => handleRemoveInvite(email)}
                    className="ml-1 text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#1262BE] text-white text-sm font-semibold hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================== MANAGER DASHBOARD (CAMPAIGN) ================== */

export default function ManagerDashboard() {
  // Dummy data awal campaign (manager bisa tambah / edit)
  const [campaigns, setCampaigns] = useState([
    {
      id: "CMP-01",
      name: "Dana Pendidikan Anak",
      description:
        "Program edukasi dana pendidikan untuk keluarga muda di area Jabodetabek.",
      targetLead: 150,
      periodStart: "2025-10-10",
      periodEnd: "2025-10-21",
      status: "Active",
      participate: "Joined",
      madeBy: "Sarah Wijaya",
      invitedEmails: ["nana.sales@gmail.com", "fitri.sales@gmail.com"],
      participants: [
        {
          name: "Nana",
          email: "nana.sales@gmail.com",
          photo: null,
        },
        {
          name: "Fitri",
          email: "fitri.sales@gmail.com",
          photo: null,
        },
      ],
    },
    {
      id: "CMP-02",
      name: "Promo Kredit Usaha 2025",
      description:
        "Kampanye akuisisi nasabah kredit usaha kecil dengan bunga spesial.",
      targetLead: 270,
      periodStart: "2025-09-01",
      periodEnd: "2025-09-30",
      status: "Completed",
      participate: "Joined",
      madeBy: "Rio Setiawan",
      invitedEmails: ["rio.sales@gmail.com"],
      participants: [
        {
          name: "Rio",
          email: "rio.sales@gmail.com",
          photo: null,
        },
      ],
    },
    {
      id: "CMP-03",
      name: "KPR Ramadhan",
      description:
        "Program KPR khusus Ramadhan dengan DP ringan dan hadiah umroh.",
      targetLead: 180,
      periodStart: "2025-03-01",
      periodEnd: "2025-04-15",
      status: "Active",
      participate: "Not Joined",
      madeBy: "Bagus Suhendra",
      invitedEmails: [],
      participants: [],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [detailCampaign, setDetailCampaign] = useState(null);

  /* ---------- SUMMARY ---------- */

  const summary = useMemo(() => {
    const totalCampaigns = campaigns.length;
    const totalLeads = campaigns.reduce(
      (sum, c) => sum + (Number(c.targetLead) || 0),
      0
    );
    const activeCampaigns = campaigns.filter(
      (c) => c.status === "Active"
    ).length;
    const completedCampaigns = campaigns.filter(
      (c) => c.status === "Completed"
    ).length;

    return {
      totalCampaigns,
      totalLeads,
      activeCampaigns,
      completedCampaigns,
    };
  }, [campaigns]);

  /* ---------- FILTERED & PAGINATED DATA ---------- */

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !filters.status || c.status === filters.status;

    const campaignStart = new Date(c.periodStart);
    const campaignEnd = new Date(c.periodEnd);

    const matchesStartDate =
      !filters.startDate || campaignStart >= new Date(filters.startDate);

    const matchesEndDate =
      !filters.endDate || campaignEnd <= new Date(filters.endDate);

    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
  });

  const totalItems = filteredCampaigns.length;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredCampaigns.slice(indexOfFirst, indexOfLast);

  /* ---------- STATUS OPTIONS FROM DATA ---------- */
  const statusOptions = useMemo(() => {
    const unique = new Set();
    campaigns.forEach((c) => {
      if (c.status) unique.add(c.status);
    });
    return Array.from(unique); // hanya status yang memang ada di data
  }, [campaigns]);

  /* ---------- TABLE COLUMNS ---------- */

  const campaignColumns = [
    { header: "Campaign Name", accessor: "name" },
    { header: "Target Lead", accessor: "targetLead" },
    { header: "Start Period", accessor: "periodStart" },
    { header: "End Period", accessor: "periodEnd" },
    { header: "Made By", accessor: "madeBy" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <StatusBadge
          status={value === "Active" ? "Active" : "Non Active"}
          labelOverride={value}
        />
      ),
    },
    {
      header: "Action",
      accessor: "action",
      render: (_VALUE, row) => (
        <div className="flex gap-3 text-lg text-gray-500">
          <button
            type="button"
            onClick={() => setDetailCampaign(row)}
            title="Detail"
            className="text-[#1262BE] hover:text-blue-700"
          >
            <FiEye />
          </button>
          <button
            type="button"
            onClick={() => setEditingCampaign(row)}
            title="Edit"
            className="text-[#1262BE] hover:text-blue-700"
          >
            <FiEdit2 />
          </button>
          <button
            type="button"
            title="Delete"
            onClick={() =>
              setCampaigns((prev) => prev.filter((c) => c.id !== row.id))
            }
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  /* ---------- HANDLERS ---------- */

  const handleSaveCampaign = (payload) => {
    if (editingCampaign) {
      // update
      setCampaigns((prev) =>
        prev.map((c) => (c.id === editingCampaign.id ? { ...c, ...payload } : c))
      );
    } else {
      // create new
      const nextIdNumber = campaigns.length + 1;
      const id = `CMP-${String(nextIdNumber).padStart(2, "0")}`;
      setCampaigns((prev) => [...prev, { ...payload, id }]);
    }

    setShowAddModal(false);
    setEditingCampaign(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato">
      {/* Navbar yang sama seperti sales */}
      <Navbar />

      <DashboardContent>
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary-darkest mb-1">
              Campaign
            </h1>
            <p className="text-sm text-primary-dark">
              Manage, create, and join campaigns to expand your lead reach.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            {/* Dropdown current campaign view (dummy) */}
            <select className="border text-xs sm:text-sm border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light">
              <option>Current campaign</option>
              <option>Past campaign</option>
            </select>

            <Button
              text="Add Campaign"
              variant="primary"
              icon="plus"
              onClick={() => {
                setEditingCampaign(null);
                setShowAddModal(true);
              }}
            />
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Total Campaigns"
            value={summary.totalCampaigns}
            iconSrc={chartIcon}
          />
          <SummaryCard
            title="Total Leads"
            value={summary.totalLeads}
            iconSrc={usersIcon}
          />
          <SummaryCard
            title="Active Campaign"
            value={summary.activeCampaigns}
            iconSrc={handshakeIcon}
          />
          <SummaryCard
            title="Campaign Completed"
            value={summary.completedCampaigns}
            iconSrc={phoneIcon}
          />
        </div>

        {/* SEARCH + FILTER BAR (CUSTOM) */}
        <div className="bg-white rounded-xl shadow-sm shadow-gray-300 px-4 py-3 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          {/* Filters: Start / End date + Status */}
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Start Period</span>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">End Period</span>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Status</span>
              <select
                value={filters.status}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-light min-w-[110px]"
              >
                <option value="">All Status</option>
                {statusOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* TABLE CAMPAIGN */}
        <div className="bg-white rounded-xl shadow-sm shadow-gray-300 p-4 mt-2">
          <h2 className="text-base font-semibold text-primary-darkest mb-3">
            Campaign List
          </h2>

          <ReusableTable columns={campaignColumns} data={currentItems} />

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
        </div>
      </DashboardContent>

      {/* MODAL ADD / EDIT CAMPAIGN */}
      <Modal
        isOpen={showAddModal || !!editingCampaign}
        onClose={() => {
          setShowAddModal(false);
          setEditingCampaign(null);
        }}
      >
        <CampaignForm
          mode={editingCampaign ? "edit" : "add"}
          initialData={editingCampaign || undefined}
          onSave={handleSaveCampaign}
          onCancel={() => {
            setShowAddModal(false);
            setEditingCampaign(null);
          }}
        />
      </Modal>

      {/* MODAL DETAIL CAMPAIGN */}
      <Modal isOpen={!!detailCampaign} onClose={() => setDetailCampaign(null)}>
        {detailCampaign && (
          <CampaignDetailsModal
            campaign={detailCampaign}
            onClose={() => setDetailCampaign(null)}
          />
        )}
      </Modal>
    </div>
  );
}
