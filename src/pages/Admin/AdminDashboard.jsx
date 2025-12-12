// src/pages/Admin/AdminDashboard.jsx
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

  // Inline form error state passed into Add/Edit forms
  // can be a string (general) or object (field-level)
  const [formError, setFormError] = useState("");

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

      // Support different response shapes: prefer response.data when wrapped
      const payload = response?.data ?? response;
      // If your service returns { status: 'success', data: { users, pagination } }
      if (payload?.users) {
        setAccounts(payload.users);
        setTotalItems(payload.pagination?.totalItems ?? totalItems);
      } else if (response?.status === "success" && response.data) {
        setAccounts(response.data.users || []);
        setTotalItems(response.data.pagination?.totalItems || 0);
      } else {
        // fallback if API returns plain array
        if (Array.isArray(response)) {
          setAccounts(response);
          setTotalItems(response.length);
        } else {
          // unknown shape
          setAccounts([]);
          setTotalItems(0);
        }
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
      const payload = response?.data ?? response;
      if (payload) setStats(payload);
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
        const payload = response?.data ?? response;
        setDetailAccount(payload);
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
        const payload = response?.data ?? response;
        setEditingAccount(payload);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setEditingAccount(acc);
      } finally {
        // clear any previous form errors when opening edit
        setFormError("");
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

  // Create user — show inline errors on form when validation fails
  const handleAddAccount = async (newAcc) => {
    try {
      setLoading(true);
      setFormError("");

      const response = await userService.createUser(newAcc);
      const payload = response?.data ?? response;

      if (response?.status === "success" || payload?.success || payload?.created) {
        setIsAddOpen(false);
        fetchUsers();
        fetchStats();
        showAlert("Success", "User created successfully!");
      } else {
        // Backend returned a non-success shape — try to read message/errors
        const msg =
          payload?.message ||
          payload?.errors ||
          response?.message ||
          "Failed to create user";
        // If errors is object, set directly so form can render field-level messages
        setFormError(typeof msg === "object" ? msg : String(msg));
      }
    } catch (err) {
      // Prefer structured API errors
      const apiMsg =
        err?.response?.data?.message ?? err?.response?.data?.errors ?? err.message;
      setFormError(apiMsg || "Failed to create user");
      console.error("Create user error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit user — similar pattern, returns boolean success to caller if needed
  const handleEditAccountSave = async (updated) => {
    if (!editingAccount) return;
    try {
      setLoading(true);
      setFormError("");
      const response = await userService.updateUser(editingAccount.id, updated);
      const payload = response?.data ?? response;

      if (response?.status === "success" || payload?.success) {
        setEditingAccount(null);
        fetchUsers();
        fetchStats();
        showAlert("Success", "User updated successfully!");
        return true;
      } else {
        const msg =
          payload?.message || payload?.errors || response?.message || "Failed to update user";
        setFormError(typeof msg === "object" ? msg : String(msg));
        return false;
      }
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ?? err?.response?.data?.errors ?? err.message;
      setFormError(apiMsg || "Failed to update user");
      console.error("Update user error:", err);
      return false;
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
              onClick={() => {
                setIsAddOpen(true);
                setFormError("");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg sm:w-auto min-w-[130px]"
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
      <Modal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setFormError("");
        }}
      >
        <AddAccountForm
          onSave={handleAddAccount}
          onCancel={() => {
            setIsAddOpen(false);
            setFormError("");
          }}
          errorMessage={formError} // inline error passed to form
        />
      </Modal>

      {/* MODAL DETAIL ACCOUNT */}
      <Modal isOpen={!!detailAccount} onClose={() => setDetailAccount(null)} title="Detail Account">
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
      <Modal
        isOpen={!!editingAccount}
        onClose={() => {
          setEditingAccount(null);
          setFormError("");
        }}
      >
        <EditAccountForm
          account={editingAccount}
          onCancel={() => {
            setEditingAccount(null);
            setFormError("");
          }}
          onSave={async (updated) => {
            // delegate to handler which sets formError when necessary
            await handleEditAccountSave(updated);
          }}
          errorMessage={formError}
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
