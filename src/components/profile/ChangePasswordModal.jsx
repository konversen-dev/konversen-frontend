// src/components/profile/ChangePasswordModal.jsx
import React, { useState } from "react";
import { profileService } from "../../services/profileService";
import AlertModal from "../../components/utils/AlertModal";

export default function ChangePasswordModal({ onClose }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  // INLINE form error (tampil di atas form)
  const [formError, setFormError] = useState("");

  // Alert modal state (keep for success)
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const showSuccess = (title, message) => {
    setAlertState({ isOpen: true, title, message });
  };

  const closeAlert = () => {
    setAlertState({ isOpen: false, title: "", message: "" });
    // close modal after success alert closed
    onClose?.();
  };

  const handleSubmit = async () => {
    // clear previous inline error
    setFormError("");

    // client-side validations
    if (!oldPass || !newPass || !confirmPass) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (newPass !== confirmPass) {
      setFormError("Password confirmation does not match.");
      return;
    }

    if (newPass.length < 6) {
      setFormError("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      // call API (assumes profileService.changePassword returns a promise)
      await profileService.changePassword(oldPass, newPass, confirmPass);

      // show success alert (user will close it -> close modal in closeAlert)
      showSuccess("Success", "Your password has been changed successfully.");
    } catch (error) {
      // prefer API message if available
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to change password. Please try again.";
      setFormError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          {/* INLINE ERROR */}
          {formError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {formError}
            </div>
          )}

          <label className="text-sm font-semibold">Old Password</label>
          <input
            type="password"
            value={oldPass}
            onChange={(e) => {
              setOldPass(e.target.value);
              if (formError) setFormError("");
            }}
            className="w-full border rounded-lg p-2 mb-3"
          />

          <label className="text-sm font-semibold">New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              if (formError) setFormError("");
            }}
            className="w-full border rounded-lg p-2 mb-3"
          />

          <label className="text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              if (formError) setFormError("");
            }}
            className="w-full border rounded-lg p-2 mb-5"
          />

          <div className="flex justify-between">
            <button
              onClick={() => {
                // reset local state before close
                setFormError("");
                setOldPass("");
                setNewPass("");
                setConfirmPass("");
                onClose?.();
              }}
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

      {/* SUCCESS ALERT MODAL */}
      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onClose={closeAlert}
      />
    </>
  );
}
