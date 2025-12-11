import React, { useState, useMemo, useEffect } from "react";

// Layout & UI
import Navbar from "../../components/layout/Navbar.jsx";
import DashboardContent from "../../components/layout/DashboardContent.jsx";
import AdminCard from "../../components/admin/AdminSummary.jsx";
import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import ReusableTable from "../../components/layout/ReusableTable.jsx";
import Pagination from "../../components/utils/Pagination.jsx";
import Modal from "../../components/utils/Modal.jsx";
import ConfirmModal from "../../components/utils/ConfirmModal.jsx";
import AlertModal from "../../components/utils/AlertModal.jsx"; // NEW

// Admin Components
import AddAccountForm from "../../components/admin/AddAccountForm.jsx";
import EditAccountForm from "../../components/admin/EditAccountForm.jsx";
import DetailAccountModal from "../../components/admin/DetailAccountModal.jsx";
import { getAdminColumns } from "../../components/admin/tableColumns.jsx";

// Services
import userService from "../../services/userService.js";

export default function AdminDashboard() {
  /* ===============================
      STATE
  =============================== */
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ role: "", status: "" });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [detailAccount, setDetailAccount] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  // Stats
  const [stats, setStats] = useState({
    totalAccounts: 0,
    salesAccounts: 0,
    managerAccounts: 0,
    adminAccounts: 0,
    activeAccounts: 0,
  });

  // DELETE CONFIRMATION MODAL
  const [confirmDelete, setConfirmDelete] = useState({
    isOpen: false,
    account: null,
  });

  // ALERT MODAL STATE (replaces alert())
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

  /* ===============================
      FETCH DATA
  =============================== */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (search) params.search = search;
      if (filter.role) params.role = filter.role;
      if (filter.status) params.isActive = filter.status === "Active";

      const response = await userService.getAllUsers(params);

      if (response.status === "success") {
        setAccounts(response.data.users);
        setTotalItems(response.data.pagination.totalItems);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userService.getUserStats();
      if (response.status === "success") {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Fetch stats error:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, search, filter]);

  /* SUMMARY CARD DATA */
  const summary = useMemo(
    () => ({
      totalTeam: stats.totalAccounts,
      totalSales: stats.salesAccounts,
      totalManagers: stats.managerAccounts,
      totalAdmins: stats.adminAccounts,
      totalActive: stats.activeAccounts,
    }),
    [stats]
  );

  /* TABLE COLUMNS */
  const columns = getAdminColumns({
    onDetail: async (acc) => {
      try {
        setLoadingDetail(true);
        const response = await userService.getUserById(acc.id);
        if (response.status === "success") {
          setDetailAccount(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setDetailAccount(acc);
      } finally {
        setLoadingDetail(false);
      }
    },

    onEdit: async (acc) => {
      try {
        const response = await userService.getUserById(acc.id);
        if (response.status === "success") {
          setEditingAccount(response.data);
        } else {
          setEditingAccount(acc);
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setEditingAccount(acc);
      }
    },

    onDelete: (acc) => {
      setConfirmDelete({
        isOpen: true,
        account: acc,
      });
    },
  });

  /* HANDLERS */
  const handleFilterChange = (id, value) => {
    setFilter((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const handleAddAccount = async (newAcc) => {
    try {
      setLoading(true);
      const response = await userService.createUser(newAcc);

      if (response.status === "success") {
        setIsAddOpen(false);
        fetchUsers();
        fetchStats();
        showAlert("Success", "User created successfully!");
      } else {
        // in case backend returns error state
        showAlert("Error", response.message || "Failed to create user");
      }
    } catch (err) {
      showAlert("Failed To Create User", (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

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
              {
                id: "role",
                placeholder: "Role",
                options: ["Sales", "Manager", "Admin"],
              },
              {
                id: "status",
                placeholder: "Status",
                options: ["Active", "Non Active"],
              },
            ]}
            onSearchChange={setSearch}
            onFilterChange={handleFilterChange}
          />

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow p-4 mt-4">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>Error: {error}</p>
                <button
                  onClick={fetchUsers}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <ReusableTable columns={columns} data={accounts} />

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
              </>
            )}
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
        {loadingDetail ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light"></div>
          </div>
        ) : (
          <DetailAccountModal
            account={detailAccount}
            onClose={() => setDetailAccount(null)}
          />
        )}
      </Modal>

      {/* MODAL EDIT ACCOUNT */}
      <Modal isOpen={!!editingAccount} onClose={() => setEditingAccount(null)}>
        <EditAccountForm
          account={editingAccount}
          onCancel={() => setEditingAccount(null)}
          onSave={async (updated) => {
            try {
              await userService.updateUser(editingAccount.id, updated);
              setEditingAccount(null);
              fetchUsers();
              fetchStats();
              showAlert("Success", "User updated successfully!");
            } catch (err) {
              showAlert("Failed To Update User", (err.message || ""));
            }
          }}
        />
      </Modal>

      {/* DELETE CONFIRM MODAL */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${confirmDelete.account?.fullname}? This action cannot be undone.`}
        onCancel={() =>
          setConfirmDelete({ isOpen: false, account: null })
        }
        onConfirm={async () => {
          try {
            await userService.deleteUser(confirmDelete.account.id);
            setConfirmDelete({ isOpen: false, account: null });
            fetchUsers();
            fetchStats();
            // Show feedback after delete
            showAlert("Success", "User deleted successfully!");
          } catch (err) {
            showAlert("Failed To Delete User", (err.message || ""));
          }
        }}
      />

      {/* ALERT MODAL */}
      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onClose={closeAlert}
      />
    </>
  );
}
