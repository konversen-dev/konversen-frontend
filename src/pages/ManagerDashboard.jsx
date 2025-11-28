// src/pages/ManagerDashboard.jsx
import React, { useState, useMemo } from "react";

import Navbar from "../components/layout/Navbar.jsx";
import DashboardContent from "../components/layout/DashboardContent.jsx";
import SummaryCard from "../components/layout/SummaryCard.jsx";
import SearchFilterBar from "../components/utils/SearchFilterBar.jsx";
import ReusableTable from "../components/layout/ReusableTable.jsx";
import StatusBadge from "../components/utils/StatusBadge.jsx";
import Pagination from "../components/utils/Pagination.jsx";
import Button from "../components/utils/Button.jsx";
import Modal from "../components/utils/Modal.jsx";

import usersIcon from "../assets/sales/users.png";
import chartIcon from "../assets/sales/chart.png";
import handshakeIcon from "../assets/sales/handshake.png";
import phoneIcon from "../assets/sales/phone.png";

const STATUS_OPTIONS = ["Draft", "Active", "Paused", "Completed"];
const CHANNEL_OPTIONS = ["WhatsApp", "Call", "Email", "Mixed"];
const OWNER_ROLE_OPTIONS = ["Sales", "Manager"];

/* =======================
   REUSABLE CAMPAIGN FORM
   ======================= */
function CampaignForm({ mode = "create", initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    channel: initialData?.channel || "WhatsApp",
    owner: initialData?.owner || "Manager",
    totalLeads: initialData?.totalLeads || 0,
    targetedSegment: initialData?.targetedSegment || "",
    status: initialData?.status || "Draft",
    startDate:
      initialData?.startDate || new Date().toISOString().slice(0, 10),
    endDate: initialData?.endDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "totalLeads" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const title = mode === "edit" ? "Edit Campaign" : "Create New Campaign";

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary-darkest mb-4">
        {title}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
      >
        {/* Campaign Name */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Campaign Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Q1 High Priority Leads"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Channel */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Channel
          </label>
          <select
            name="channel"
            value={form.channel}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {CHANNEL_OPTIONS.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        {/* Owner */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Owner
          </label>
          <select
            name="owner"
            value={form.owner}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {OWNER_ROLE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Total Leads */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Total Leads
          </label>
          <input
            type="number"
            name="totalLeads"
            value={form.totalLeads}
            onChange={handleChange}
            min={0}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
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

        {/* Targeted Segment */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Targeted Segment
          </label>
          <input
            name="targetedSegment"
            value={form.targetedSegment}
            onChange={handleChange}
            placeholder="High Score (80–100), Warm Leads, Inactive 60+ days, etc."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Start / End Date */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 mt-3 flex justify-end gap-2">
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
            {mode === "edit" ? "Save Changes" : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =======================
   HALAMAN MANAGER DASHBOARD
   ======================= */
function ManagerDashboard() {
  // ==== CAMPAIGN DATA (dummy utk testing) ====
  const [campaigns, setCampaigns] = useState([
    {
      id: "CP-001",
      name: "Q1 High Priority Leads",
      channel: "WhatsApp",
      owner: "Manager",
      totalLeads: 320,
      targetedSegment: "High Score (80–100)",
      status: "Active",
      startDate: "2025-01-10",
      endDate: "2025-02-15",
    },
    {
      id: "CP-002",
      name: "Warm Leads Follow Up",
      channel: "Call",
      owner: "Sales",
      totalLeads: 150,
      targetedSegment: "Score 50–79",
      status: "Paused",
      startDate: "2025-01-05",
      endDate: "2025-01-31",
    },
    {
      id: "CP-003",
      name: "Email Nurturing Campaign",
      channel: "Email",
      owner: "Manager",
      totalLeads: 500,
      targetedSegment: "New Leads (All Score)",
      status: "Draft",
      startDate: "2025-02-01",
      endDate: "2025-03-01",
    },
    {
      id: "CP-004",
      name: "Winback Inactive Leads",
      channel: "Mixed",
      owner: "Manager",
      totalLeads: 220,
      targetedSegment: "Inactive 60+ days",
      status: "Completed",
      startDate: "2024-11-10",
      endDate: "2024-12-10",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    channel: "",
    owner: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // ==== SUMMARY ====
  const summary = useMemo(() => {
    const totalCampaign = campaigns.length;
    const active = campaigns.filter((c) => c.status === "Active").length;
    const draft = campaigns.filter((c) => c.status === "Draft").length;
    const completed = campaigns.filter((c) => c.status === "Completed").length;
    const totalLeads = campaigns.reduce(
      (sum, c) => sum + (Number(c.totalLeads) || 0),
      0
    );

    return { totalCampaign, active, draft, completed, totalLeads };
  }, [campaigns]);

  // ==== FILTER CONFIG UNTUK SearchFilterBar ====
  const filtersConfig = [
    {
      id: "status",
      placeholder: "Status",
      options: STATUS_OPTIONS,
    },
    {
      id: "channel",
      placeholder: "Channel",
      options: CHANNEL_OPTIONS,
    },
    {
      id: "owner",
      placeholder: "Owner",
      options: OWNER_ROLE_OPTIONS,
    },
  ];

  // ==== FILTERING LIST CAMPAIGN ====
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !filter.status || c.status === filter.status;
    const matchesChannel = !filter.channel || c.channel === filter.channel;
    const matchesOwner = !filter.owner || c.owner === filter.owner;

    return matchesSearch && matchesStatus && matchesChannel && matchesOwner;
  });

  // ==== PAGINATION ====
  const totalItems = filteredCampaigns.length;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredCampaigns.slice(indexOfFirst, indexOfLast);

  // ==== TABLE CONFIG ====
  const columns = [
    { header: "ID Campaign", accessor: "id" },
    { header: "Campaign Name", accessor: "name" },
    { header: "Channel", accessor: "channel" },
    { header: "Owner", accessor: "owner" },
    { header: "Total Leads", accessor: "totalLeads" },
    { header: "Targeted Segment", accessor: "targetedSegment" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <StatusBadge status={value} labelOverride={value} />
      ),
    },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    {
      header: "Action",
      accessor: "action",
      render: (_, row) => (
        <div className="flex gap-3 text-sm text-[#1262BE]">
          <button
            type="button"
            className="hover:underline"
            onClick={() => setEditingCampaign(row)} // sementara View = Edit
          >
            View
          </button>
          <button
            type="button"
            className="hover:underline"
            onClick={() => setEditingCampaign(row)}
          >
            Edit
          </button>
          <button
            type="button"
            className="text-red-500 hover:underline"
            onClick={() =>
              setCampaigns((prev) => prev.filter((c) => c.id !== row.id))
            }
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleFilterChange = (id, value) => {
    setFilter((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  // ==== CREATE CAMPAIGN SAVE ====
  const handleCreateCampaignSave = (formData) => {
    const maxNumber = campaigns.reduce((max, c) => {
      const num = parseInt(c.id.replace("CP-", ""), 10);
      return Number.isNaN(num) ? max : Math.max(max, num);
    }, 0);

    const nextId = `CP-${String(maxNumber + 1).padStart(3, "0")}`;

    const newCampaign = {
      id: nextId,
      ...formData,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    setShowCreateModal(false);
    setCurrentPage(1);
  };

  // ==== EDIT CAMPAIGN SAVE ====
  const handleEditCampaignSave = (updatedFields) => {
    if (!editingCampaign) return;

    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === editingCampaign.id ? { ...c, ...updatedFields } : c
      )
    );
    setEditingCampaign(null);
  };

  return (
    <>
      <Navbar />

      <div className="bg-secondary-light min-h-screen">
        <DashboardContent>
          {/* Header + Create Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary-darkest mb-1">
                Campaign Management
              </h1>
              <p className="text-sm text-primary-dark">
                Monitor and manage all lead campaigns across your sales team.
              </p>
            </div>

            <div className="mt-4 sm:mt-0 flex gap-3">
              <Button
                text="Create Campaign"
                variant="primary"
                icon="plus"
                onClick={() => setShowCreateModal(true)}
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <SummaryCard
              title="Total Campaigns"
              value={summary.totalCampaign}
              iconSrc={usersIcon}
            />
            <SummaryCard
              title="Active"
              value={summary.active}
              iconSrc={chartIcon}
            />
            <SummaryCard
              title="Draft"
              value={summary.draft}
              iconSrc={handshakeIcon}
            />
            <SummaryCard
              title="Completed"
              value={summary.completed}
              iconSrc={phoneIcon}
            />
            <SummaryCard
              title="Total Leads Covered"
              value={summary.totalLeads}
              iconSrc={usersIcon}
            />
          </div>

          {/* Search + Filters */}
          <SearchFilterBar
            filters={filtersConfig}
            onSearchChange={setSearch}
            onFilterChange={handleFilterChange}
          />

          {/* Campaign Table */}
          <div className="bg-white rounded-xl shadow-sm shadow-gray-300 p-4 mt-4">
            <h2 className="text-base font-semibold text-primary-darkest mb-3">
              Campaign List
            </h2>

            <ReusableTable columns={columns} data={currentItems} />

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
      </div>

      {/* Modal Create Campaign */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CampaignForm
          mode="create"
          onSave={handleCreateCampaignSave}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Modal Edit Campaign */}
      <Modal
        isOpen={!!editingCampaign}
        onClose={() => setEditingCampaign(null)}
      >
        <CampaignForm
          mode="edit"
          initialData={editingCampaign || undefined}
          onSave={handleEditCampaignSave}
          onCancel={() => setEditingCampaign(null)}
        />
      </Modal>
    </>
  );
}

export default ManagerDashboard;
