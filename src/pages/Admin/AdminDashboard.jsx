import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Layout & UI
import AdminNavbar from "../../components/layout/AdminNavbar.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";
import AdminCard from "../../components/admin/AdminSummary.jsx"
import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import ReusableTable from "../../components/layout/ReusableTable.jsx";
import Pagination from "../../components/utils/Pagination.jsx";
import Modal from "../../components/utils/Modal.jsx";

// Admin Components (pecahan)
import AddAccountForm from "../../components/admin/AddAccountForm.jsx";
import EditAccountForm from "../../components/admin/EditAccountForm.jsx";
import DetailAccountModal from "../../components/admin/DetailAccountModal.jsx";
import { getAdminColumns } from "../../components/admin/tableColumns.jsx";


export default function AdminDashboard() {
  const navigate = useNavigate();

  /* ===============================
      STATE & LOCAL STORAGE
  =============================== */
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("adminAccounts");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ role: "", status: "" });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [detailAccount, setDetailAccount] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /* Save every change to localStorage */
  useEffect(() => {
    localStorage.setItem("adminAccounts", JSON.stringify(accounts));
  }, [accounts]);

  /* ===============================
      FILTER ACCOUNT LIST
  =============================== */
  const filteredAccounts = accounts.filter((acc) => {
    const s = search.toLowerCase();
    const matchesSearch =
      !search ||
      acc.name.toLowerCase().includes(s) ||
      acc.email.toLowerCase().includes(s);

    const matchesRole = !filter.role || acc.role === filter.role;
    const matchesStatus = !filter.status || acc.status === filter.status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  /* PAGINATION */
  const totalItems = filteredAccounts.length;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredAccounts.slice(indexOfFirst, indexOfLast);

  /* SUMMARY CARD DATA */
  const summary = useMemo(() => ({
    totalTeam: accounts.length,
    totalSales: accounts.filter((a) => a.role === "Sales").length,
    totalManagers: accounts.filter((a) => a.role === "Manager").length,
    totalAdmins: accounts.filter((a) => a.role === "Admin").length,
    totalActive: accounts.filter((a) => a.status === "Active").length,
  }), [accounts]);

  /* TABLE COLUMNS (from components) */
  const columns = getAdminColumns({
    onDetail: (acc) => setDetailAccount(acc),
    onEdit: (acc) => setEditingAccount(acc),
    onDelete: (acc) => {
      setAccounts((prev) => prev.filter((p) => p.id !== acc.id));
    }
  });

  /* HANDLERS */

  const handleFilterChange = (id, value) => {
    setFilter((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const handleAddAccount = (newAcc) => {
    const nextId = `ID-${String(accounts.length + 1).padStart(2, "0")}`;

    setAccounts((prev) => [
      ...prev,
      {
        id: nextId,
        name: newAcc.fullname,
        email: newAcc.email,
        role: newAcc.role,
        phoneNumber: newAcc.phone,
        status: "Active",
        registeredAt: new Date().toISOString().slice(0, 10),
        activityLogs: [`${new Date().toISOString()} – Account created by Admin`],
      },
    ]);

    setIsAddOpen(false);
  };

  return (
    <>
      <AdminNavbar
        adminName="Admin"
        onLogout={() => navigate("/")}
      />

      <div className="bg-secondary-light min-h-screen">
        <DashboardContent>
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Team Account Management</h1>
              <p className="text-sm text-gray-600">
                Manage internal accounts (Sales, Manager, Admin).
              </p>
            </div>

            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add Account
            </button>
          </div>

          {/* SUMMARY CARDS */}
          <AdminCard data={summary} />



          {/* SEARCH & FILTER */}
          <AdminFilterBar
            filters={[
              { id: "role", placeholder: "Role", options: ["Sales", "Manager", "Admin"] },
              { id: "status", placeholder: "Status", options: ["Active", "Non Active"] },
            ]}
            onSearchChange={setSearch}
            onFilterChange={handleFilterChange}
          />

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow p-4 mt-4">
            <ReusableTable columns={columns} data={currentItems} />

            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(v) => {
                setItemsPerPage(v);
                setCurrentPage(1);
              }}
            />
          </div>
        </DashboardContent>
      </div>

      {/* MODAL ADD ACCOUNT */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
        <AddAccountForm
          onSave={handleAddAccount}
          onCancel={() => setIsAddOpen(false)}
        />
      </Modal>

      {/* MODAL DETAIL ACCOUNT */}
      <Modal isOpen={!!detailAccount} onClose={() => setDetailAccount(null)}>
        <DetailAccountModal
          account={detailAccount}
          onClose={() => setDetailAccount(null)}
        />
      </Modal>

      {/* MODAL EDIT ACCOUNT */}
      <Modal isOpen={!!editingAccount} onClose={() => setEditingAccount(null)}>
        <EditAccountForm
          account={editingAccount}
          onCancel={() => setEditingAccount(null)}
          onSave={(updated) => {
            setAccounts((prev) =>
              prev.map((acc) =>
                acc.id === editingAccount.id
                  ? { ...acc, ...updated }
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
