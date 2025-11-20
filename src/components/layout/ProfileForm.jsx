import React, { useState } from "react";
import { FiUser, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

export default function ProfileForm({ user, isEditing, setIsEditing }) {
  const [formData, setFormData] = useState(user);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Only allow numbers for phone
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  // Photo upload handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, photo: file });
    }
  };

  // Save confirmation
  const handleSave = () => {
    const confirmed = window.confirm("Are you sure you want to save changes?");
    if (!confirmed) return;

    console.log("Saving profile...", formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md border rounded-xl p-10 w-full max-w-xl relative">

      {/* BACK ICON WHEN EDITING */}
      {isEditing && (
        <button
          onClick={() => setIsEditing(false)}
          className="absolute left-6 top-6 flex items-center mb-5 text-blue-600 hover:text-blue-700"
        >
          <FiArrowLeft className="mr-1" /> 
        </button>
      )}

      {/* PHOTO SECTION */}
      <label className="font-semibold text-sm mt-10">Photo</label>
      <div className="flex items-center gap-4 mt-2 mb-6">
        <div className="w-16 h-16 rounded-full border flex justify-center items-center bg-gray-100 overflow-hidden">
          {preview ? (
            <img src={preview} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <FiUser className="text-3xl text-gray-500" />
          )}
        </div>

        {isEditing && (
          <div className="flex flex-col">
            <label className="cursor-pointer bg-blue-600 text-white px-2 py-1 rounded text-xs w-28 text-center">
              Select a Photo
              <input
                type="file"
                className="hidden"
                onChange={handlePhotoUpload}
                accept="image/*"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Your profile picture should have a 1:1 ratio
            </p>
          </div>
        )}
      </div>

      {/* FULL NAME */}
      <FormInput
        label="Full Name"
        name="name"
        value={formData.name}
        disabled={!isEditing}
        onChange={handleChange}
      />

      {/* EMAIL */}
      <FormInput
        label="Email"
        name="email"
        value={formData.email}
        disabled={!isEditing}
        onChange={handleChange}
      />

      {/* PHONE NUMBER – ONLY DIGITS */}
      <FormInput
        label="Phone Number"
        name="phone"
        value={formData.phone}
        disabled={!isEditing}
        onChange={handlePhoneChange}
      />

      {/* ADDRESS */}
      <FormInput
        label="Address"
        name="address"
        value={formData.address}
        disabled={!isEditing}
        onChange={handleChange}
      />

      {/* PASSWORD WITH SHOW/HIDE TOGGLE */}
      <div className="mb-4">
        <label className="text-sm font-semibold">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full mt-1 px-3 py-2 rounded border text-sm 
              ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            `}
          />

          {isEditing && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-6 flex justify-end">
        {!isEditing ? (
          <button
            className="px-5 py-2 rounded-lg border border-primary-light text-primary-light hover:bg-primary-light hover:text-white transition"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

/* ————————————————
   REUSABLE INPUT COMPONENT
——————————————— */
function FormInput({ label, name, value, onChange, disabled, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`w-full mt-1 px-3 py-2 rounded border text-sm 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
      />
    </div>
  );
}
