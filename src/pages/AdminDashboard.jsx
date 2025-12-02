import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "../components/layout/AdminNavbar.jsx";
import DashboardContent from "../components/layout/DashboardContent.jsx";
import SummaryCard from "../components/layout/SummaryCard.jsx";
import SearchFilterBar from "../components/utils/SearchFilterBar.jsx";
import ReusableTable from "../components/layout/ReusableTable.jsx";
import Button from "../components/utils/Button.jsx";
import Modal from "../components/utils/Modal.jsx";
import StatusBadge from "../components/utils/StatusBadge.jsx";
import Pagination from "../components/utils/Pagination.jsx";

import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

import usersIcon from "../assets/sales/users.png";
import chartIcon from "../assets/sales/chart.png";
import handshakeIcon from "../assets/sales/handshake.png";
import phoneIcon from "../assets/sales/phone.png";

const ROLE_OPTIONS = ["Sales", "Manager", "Admin"];
const STATUS_OPTIONS = ["Active", "Non Active"];

/* ---------- FORM ADD ACCOUNT ---------- */
function AddAccountForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "Sales",
    status: "Active",
    registeredAt: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    password: "",
    confirmPassword: "",
    avatar: null, // data URL foto profil
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Baca file jadi base64 untuk disimpan di localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errors = [];

    // Name
    if (!form.name.trim()) errors.push("Full name is required.");

    // Email simple check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) errors.push("Please enter a valid email address.");

    // Phone number: hanya angka 9–15 digit
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(form.phoneNumber)) {
      errors.push("Phone number must be 9–15 digits and numeric only.");
    }

    // Password
    if (form.password.length < 6) {
      errors.push("Password must be at least 6 characters.");
    }
    if (form.password !== form.confirmPassword) {
      errors.push("Password and confirmation do not match.");
    }

    // Foto wajib
    if (!form.avatar) {
      errors.push("Profile photo is required.");
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // hilangkan confirmPassword tanpa melanggar ESLint
    const { confirmPassword: _removed, ...payload } = form;

    onSave(payload);
  };


  return (
    <div>
      <h2 className="text-lg font-semibold text-primary-darkest mb-4">
        Add New Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
      >
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="David Fahrreza"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="email@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            placeholder="08xxxxxxxxxx"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Account Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Registered Date */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Registered Date
          </label>
          <input
            type="date"
            name="registeredAt"
            value={form.registeredAt}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Min 6 characters"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Repeat password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* Avatar / Photo Profile */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">No image</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-xs text-gray-600"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="md:col-span-2">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

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
            Save Account
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- MODAL DETAIL ACTIVITY ---------- */
function AccountActivity({ account }) {
  if (!account) return null;

  const initials = account.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        {account.avatar ? (
          <img
            src={account.avatar}
            alt={account.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
            {initials}
          </div>
        )}
        <div>
          <h2 className="text-base font-semibold text-primary-darkest">
            {account.name}
          </h2>
          <p className="text-xs text-gray-500">
            {account.email} · {account.role} · {account.status}
          </p>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-primary-darkest mb-2 mt-3">
        Activity Logs
      </h3>
      <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto text-sm">
        {account.activityLogs && account.activityLogs.length > 0 ? (
          account.activityLogs.map((log, idx) => (
            <div
              key={idx}
              className="px-4 py-2 border-b last:border-b-0 border-gray-100"
            >
              {log}
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-gray-500">
            No activity recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}



/* ---------- FORM EDIT ACCOUNT ---------- */
function EditAccountForm({ account, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: account?.name || "",
    email: account?.email || "",
    phoneNumber: account?.phoneNumber || "",
    role: account?.role || "Sales",
    status: account?.status || "Active",
    registeredAt:
      account?.registeredAt || new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (account) {
      setForm({
        name: account.name,
        email: account.email,
        phoneNumber: account.phoneNumber,
        role: account.role,
        status: account.status,
        registeredAt: account.registeredAt,
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!account) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary-darkest mb-4">
        Edit Account – {account.id}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
      >
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Account Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-primary-darkest">
            Registered Date
          </label>
          <input
            type="date"
            name="registeredAt"
            value={form.registeredAt}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- HALAMAN ADMIN DASHBOARD ---------- */
export default function AdminDashboard() {
  const navigate = useNavigate();

  // ==== STATE ACCOUNTS + LOCALSTORAGE ====
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("adminAccounts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse adminAccounts from localStorage", e);
      }
    }

    return [
      {
        id: "ID-01",
        name: "David Fahrreza",
        email: "ilhamramadhan20@gmail.com",
        phoneNumber: "088225861173",
        role: "Sales",
        status: "Active",
        registeredAt: "2025-11-01",
        activityLogs: [
          "2025-11-01 09:20 – Account created by Admin",
          "2025-11-05 10:11 – Login success",
          "2025-11-06 14:22 – Updated profile",
        ],
      },
      {
        id: "ID-02",
        name: "David Fahrreza",
        email: "ilhamramadhan20@gmail.com",
        phoneNumber: "088225861173",
        role: "Manager",
        status: "Active",
        registeredAt: "2025-11-02",
        activityLogs: [
          "2025-11-02 08:10 – Account created by Super Admin",
          "2025-11-03 13:45 – Assigned new campaign",
        ],
      },
      {
        id: "ID-03",
        name: "David Fahrreza",
        email: "ilhamramadhan20@gmail.com",
        phoneNumber: "088225861173",
        role: "Sales",
        status: "Non Active",
        registeredAt: "2025-11-03",
        activityLogs: ["2025-11-03 09:00 – Account suspended"],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("adminAccounts", JSON.stringify(accounts));
  }, [accounts]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ role: "", status: "" });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showLogout, setShowLogout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [detailAccount, setDetailAccount] = useState(null);
  const [editingAccount, setEditingAccount] = useState(null);

  // ambil admin dari localStorage (hasil login)
  const storedUser = localStorage.getItem("currentUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const currentAdmin = {
    name: parsedUser?.name || "Ilham Ramadhan",
    email: parsedUser?.email || "admin@conversify.com",
    role: parsedUser?.role || "Admin",
  };

  /* ---- SUMMARY ---- */
  const summary = useMemo(() => {
    const totalTeam = accounts.length;
    const totalSales = accounts.filter((a) => a.role === "Sales").length;
    const totalManagers = accounts.filter((a) => a.role === "Manager").length;
    const totalAdmins = accounts.filter((a) => a.role === "Admin").length;
    const totalActive = accounts.filter((a) => a.status === "Active").length;

    return { totalTeam, totalSales, totalManagers, totalAdmins, totalActive };
  }, [accounts]);

  const filtersConfig = [
    { id: "role", placeholder: "Role", options: ROLE_OPTIONS },
    { id: "status", placeholder: "Status", options: STATUS_OPTIONS },
  ];

  /* ---- FILTERING ---- */
  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      search === "" ||
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = !filter.role || acc.role === filter.role;
    const matchesStatus = !filter.status || acc.status === filter.status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  /* ---- PAGINATION ---- */
  const totalItems = filteredAccounts.length;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredAccounts.slice(indexOfFirst, indexOfLast);

  /* ---- TABEL ---- */
/* ---- TABEL ---- */
const columns = [
  {
    header: "Profile",
    accessor: "avatar",
    render: (value, row) => {
      const initials = row.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return (
        <div className="flex items-center">
          {value ? (
            <img
              src={value}
              alt={row.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
              {initials}
            </div>
          )}
        </div>
      );
    },
  },
  { header: "ID Account", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone Number", accessor: "phoneNumber" },
  { header: "Role", accessor: "role" },
  {
    header: "Account Status",
    accessor: "status",
    render: (value) => (
      <StatusBadge status={value} labelOverride={value} />
    ),
  },
  {
    header: "Registered Date",
    accessor: "registeredAt",
  },
  {
    header: "Action",
    accessor: "action",
    render: (_VALUE, row) => (
      <div className="flex items-center gap-3 text-lg">
        {/* Logs / Activity */}
        <button
          type="button"
          title="View activity logs"
          onClick={() => setDetailAccount(row)}
          className="text-[#1262BE] hover:text-blue-700 transition-colors"
        >
          <FiEye />
        </button>

        {/* Edit */}
        <button
          type="button"
          title="Edit account"
          onClick={() => setEditingAccount(row)}
          className="text-[#1262BE] hover:text-blue-700 transition-colors"
        >
          <FiEdit2 />
        </button>

        {/* Delete */}
        <button
          type="button"
          title="Delete account"
          onClick={() =>
            setAccounts((prev) => prev.filter((acc) => acc.id !== row.id))
          }
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <FiTrash2 />
        </button>
      </div>
    ),
  },
];



  const handleFilterChange = (id, value) => {
    setFilter((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const handleAddAccount = (newAcc) => {
    setAccounts((prev) => {
      const nextId = `ID-${String(prev.length + 1).padStart(2, "0")}`;
      return [
        ...prev,
        {
          ...newAcc,
          id: nextId,
          activityLogs: [
            `${newAcc.registeredAt} – Account created by Admin`,
          ],
        },
      ];
    });
    setIsAddOpen(false);
  };

  const handleLogout = () => {
    // contoh: clear data user login
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // helper untuk avatar profile
  const adminInitials = currentAdmin.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <AdminNavbar
        adminName={currentAdmin.name}
        onProfile={() => setShowProfile(true)}
        onLogout={() => setShowLogout(true)}
      />

      <div className="bg-secondary-light min-h-screen">
        <DashboardContent>
          {/* Header + tombol Add Account */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-primary-darkest mb-1">
                Team Account Management
              </h1>
              <p className="text-sm text-primary-dark">
                Manage internal accounts (Sales, Manager, Admin).
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <Button
                text="Add Account"
                variant="primary"
                icon="plus"
                onClick={() => setIsAddOpen(true)}
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <SummaryCard
              title="Total Team Account"
              value={summary.totalTeam}
              iconSrc={usersIcon}
            />
            <SummaryCard
              title="Sales"
              value={summary.totalSales}
              iconSrc={chartIcon}
            />
            <SummaryCard
              title="Managers"
              value={summary.totalManagers}
              iconSrc={handshakeIcon}
            />
            <SummaryCard
              title="Admin"
              value={summary.totalAdmins}
              iconSrc={phoneIcon}
            />
            <SummaryCard
              title="Total Account Active"
              value={summary.totalActive}
              iconSrc={usersIcon}
            />
          </div>

          {/* Search + Filter */}
          <SearchFilterBar
            filters={filtersConfig}
            onSearchChange={setSearch}
            onFilterChange={handleFilterChange}
          />

          {/* User Account Table */}
          <div className="bg-white rounded-xl shadow-sm shadow-gray-300 p-4 mt-4">
            <h2 className="text-base font-semibold text-primary-darkest mb-3">
              User Account
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

      {/* Modal Add Account */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <AddAccountForm
          onSave={handleAddAccount}
          onCancel={() => setIsAddOpen(false)}
        />
      </Modal>

      {/* Modal Logout */}
      <Modal isOpen={showLogout} onClose={() => setShowLogout(false)}>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-primary-darkest mb-2">
            Log Out
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to log out?
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setShowLogout(false)}
              className="px-5 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg bg-[#FF9E1C] text-sm text-white font-semibold hover:bg-orange-500"
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Profile Admin (lebih lengkap + avatar) */}
      <Modal isOpen={showProfile} onClose={() => setShowProfile(false)}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-[#1262BE] mb-3">
            {adminInitials}
          </div>
          <h2 className="text-lg font-semibold text-primary-darkest mb-1">
            {currentAdmin.name}
          </h2>
          <p className="text-sm text-gray-700 mb-1">{currentAdmin.email}</p>
          <p className="text-xs text-gray-500 mb-4">Role: {currentAdmin.role}</p>

          {/* mini stats */}
          <div className="grid grid-cols-3 gap-4 w-full mb-4 text-xs">
            <div className="bg-gray-50 rounded-lg py-2">
              <p className="text-gray-500">Total Accounts</p>
              <p className="font-semibold text-primary-darkest">
                {summary.totalTeam}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg py-2">
              <p className="text-gray-500">Active</p>
              <p className="font-semibold text-green-600">
                {summary.totalActive}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg py-2">
              <p className="text-gray-500">Managers</p>
              <p className="font-semibold text-primary-darkest">
                {summary.totalManagers}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowProfile(false)}
            className="mt-2 px-4 py-2 rounded-lg bg-[#1262BE] text-white text-sm hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </Modal>

      {/* Modal Detail Activity */}
      <Modal
        isOpen={!!detailAccount}
        onClose={() => setDetailAccount(null)}
      >
        <AccountActivity account={detailAccount} />
      </Modal>

      {/* Modal Edit Account */}
      <Modal
        isOpen={!!editingAccount}
        onClose={() => setEditingAccount(null)}
      >
        <EditAccountForm
          account={editingAccount}
          onCancel={() => setEditingAccount(null)}
          onSave={(updatedFields) => {
            const timestamp = new Date()
              .toISOString()
              .slice(0, 16)
              .replace("T", " ");

            setAccounts(prev =>
              prev.map(acc =>
                acc.id === editingAccount.id
                  ? {
                      ...acc,
                      ...updatedFields,
                      activityLogs: [
                        ...(acc.activityLogs || []),
                        `${timestamp} – Account updated by Admin`,
                      ],
                    }
                  : acc
              )
            );
            setEditingAccount(null);
          }}
        />
      </Modal>

    </>
  );
}
