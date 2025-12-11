import React, { useState } from "react";
import { profileService } from "../../services/profileService";
import AlertModal from "../../components/utils/AlertModal";

export default function ChangePasswordModal({ onClose }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  // Alert modal state
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const showAlert = (title, message) => {
    setAlertState({ isOpen: true, title, message });
  };

  const closeAlert = () => {
    setAlertState({ isOpen: false, title: "", message: "" });
  };

  const handleSubmit = async () => {
    if (newPass !== confirmPass) {
      showAlert("Password Mismatch", "Password confirmation does not match.");
      return;
    }

    if (!oldPass || !newPass) {
      showAlert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    if (newPass.length < 6) {
      showAlert(
        "Weak Password",
        "New password must be at least 6 characters long."
      );
      return;
    }

    setLoading(true);
    try {
      await profileService.changePassword(oldPass, newPass, confirmPass);

      showAlert("Success", "Your password has been changed successfully.");

      // Close modal AFTER alert closed
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      showAlert(
        "Failed to Change Password",
        error?.response?.data?.message ||
          "Unable to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          <label className="text-sm font-semibold">Old Password</label>
          <input
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
          />

          <label className="text-sm font-semibold">New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
          />

          <label className="text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full border rounded-lg p-2 mb-5"
          />

          <div className="flex justify-between">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 disabled:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>

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
