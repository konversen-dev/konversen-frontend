// src/components/campaign/CampaignForm.jsx
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

export default function CampaignForm({ mode, initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    targetLead: initialData?.targetLead || "",
    periodStart: initialData?.periodStart || "",
    periodEnd: initialData?.periodEnd || "",
    inviteEmail: "",
    invitedEmails: initialData?.invitedEmails || [],
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addInvite = () => {
    const email = form.inviteEmail.trim();
    if (!email || form.invitedEmails.includes(email)) return;

    setForm((prev) => ({
      ...prev,
      invitedEmails: [...prev.invitedEmails, email],
      inviteEmail: "",
    }));
  };

  const removeInvite = (email) => {
    setForm((prev) => ({
      ...prev,
      invitedEmails: prev.invitedEmails.filter((e) => e !== email),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="space-y-6 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="w-6" />
        <h2 className="text-xl font-semibold text-[#FF9E1C] text-center flex-1">
          {mode === "edit" ? "Edit Campaign" : "Add Campaign"}
        </h2>
        <div className="w-6" />
      </div>

      {/* Campaign Name */}
      <div>
        <label className="text-sm font-semibold">Campaign Name :</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-semibold">Description :</label>
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 resize-none"
        />
      </div>

      {/* Target Lead */}
      <div>
        <label className="text-sm font-semibold">Total Target Leads :</label>
        <input
          name="targetLead"
          type="number"
          value={form.targetLead}
          placeholder="0"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
        />
      </div>

      {/* Period Date */}
      <div>
        <label className="text-sm font-semibold">Periode :</label>
        <div className="flex items-center gap-3 mt-1">

          {/* Start Date */}
          <div className="relative flex-1">
            <FiCalendar className="absolute left-2 top-3 text-gray-400" />
            <input
              type="date"
              name="periodStart"
              value={form.periodStart}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-9 py-2"
            />
          </div>

          <span className="text-gray-500">-</span>

          {/* End Date */}
          <div className="relative flex-1">
            <FiCalendar className="absolute left-2 top-3 text-gray-400" />
            <input
              type="date"
              name="periodEnd"
              value={form.periodEnd}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-9 py-2"
            />
          </div>
        </div>
      </div>

      {/* Invite Section */}
      <div>
        <label className="text-sm font-semibold">Invite :</label>

        <div className="flex gap-2 mt-1">
          <input
            name="inviteEmail"
            value={form.inviteEmail}
            onChange={handleChange}
            placeholder="Add another sales email address to invite"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
          <button
            type="button"
            onClick={addInvite}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Invite
          </button>
        </div>

        {/* Bubbles */}
        <div className="flex flex-wrap gap-2 mt-3">
          {form.invitedEmails.map((email) => (
            <span
              key={email}
              className="px-3 py-1 bg-gray-100 border rounded-full text-sm flex items-center gap-2"
            >
              {email}
              <button
                type="button"
                onClick={() => removeInvite(email)}
                className="text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 bg-green-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
}
