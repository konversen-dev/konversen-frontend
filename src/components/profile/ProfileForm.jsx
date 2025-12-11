import React, { useState, useEffect } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { uploadService } from "../../services/uploadService";
import { useAuth } from "../../hooks/useAuth";
import AlertModal from "../utils/AlertModal"; // sesuaikan path jika perlu

export default function ProfileForm({ user, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { updateUserProfile } = useAuth();

  const [form, setForm] = useState({ ...user });
  const [preview, setPreview] = useState(form.avatar_url || form.avatarUri || null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Alert modal state
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

  // Generate initials from user's fullname
  const initials = (form.fullname || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setForm({ ...user });
      setPreview(user.avatar_url || user.avatarUri || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // === HANDLE UPLOAD FOTO ===
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showAlert("File Too Large", "File size must be less than 5 MB.");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showAlert("Invalid File Type", "Only JPG, PNG, GIF, and WEBP images are allowed.");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Save file for upload later
    setSelectedFile(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setUploading(false);

    try {
      // Upload avatar first if there's a new file
      if (selectedFile) {
        setUploading(true);

        try {
          const uploadResponse = await uploadService.uploadAvatar(selectedFile);
          // assume uploadResponse.data.url contains uploaded URL
          form.avatar_url = uploadResponse.data.url;
          setPreview(uploadResponse.data.url);
          setSelectedFile(null);
          setUploading(false);
        } catch (uploadError) {
          setUploading(false);
          // show friendly error
          const msg =
            uploadError?.response?.data?.message ||
            uploadError?.message ||
            "Avatar upload failed. Please try again.";
          throw new Error(msg);
        }
      }

      // Update profile via parent onSave handler
      await onSave(form);

      // Update AuthContext so navbar reflects changes immediately
      updateUserProfile({
        fullname: form.fullname,
        avatar_url: form.avatar_url,
      });

      setIsEditing(false);

      showAlert("Success", "Profile updated successfully.");
    } catch (error) {
      const friendly =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile. Please try again.";
      showAlert("Update Failed", friendly);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg p-8 rounded-xl w-[420px]">
        {/* AVATAR + UPLOAD */}
        <div className="w-full flex flex-col items-center mb-6">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border border-gray-300 mb-3"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold mb-3">
              <span className="text-2xl">{initials}</span>
            </div>
          )}

          {isEditing && (
            <label className="cursor-pointer text-sm text-blue-600">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* FORM FIELDS */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input
              name="fullname"
              value={form.fullname}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              name="email"
              value={form.email}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Phone</label>
            <input
              name="phone"
              value={form.phone}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Address</label>
            <textarea
              name="address"
              value={form.address}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                isEditing ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Role</label>
            <input
              value={form.role}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-200"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {uploading ? "Uploading..." : saving ? "Saving..." : "Save Changes"}
            </button>
          )}

          <button
            onClick={() => setIsPasswordModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Change Password
          </button>
        </div>

        {isPasswordModal && (
          <ChangePasswordModal onClose={() => setIsPasswordModal(false)} />
        )}
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
