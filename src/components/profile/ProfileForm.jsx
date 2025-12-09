import React, { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import AvatarDefault from "../../assets/AvatarDefault.png";

export default function ProfileForm({ user, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModal, setIsPasswordModal] = useState(false);

  const [form, setForm] = useState({ ...user });
  const [preview, setPreview] = useState(form.avatarUri || null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // === HANDLE UPLOAD FOTO ===
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);         // preview langsung muncul
      setForm((prev) => ({
        ...prev,
        avatarUri: reader.result,        // simpan base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(form); // kirim ke parent (akan disave ke localStorage)
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-white shadow-lg p-8 rounded-xl w-[420px]">

      {/* AVATAR + UPLOAD */}
      <div className="w-full flex flex-col items-center mb-6">
        <img
          src={preview || AvatarDefault}
          className="w-20 h-20 rounded-full object-cover border mb-3"
        />

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
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save Changes
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
  );
}
