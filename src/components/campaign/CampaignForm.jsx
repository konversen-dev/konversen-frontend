import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";

export default function CampaignForm({
  mode,
  initialData,
  onSave,
  onCancel,
  errorMessage,
}) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    targetLeads: initialData?.target_leads || "",
    status: initialData?.status || "Active",
    startDate: initialData?.start_date?.split?.("T")?.[0] || "",
    endDate: initialData?.end_date?.split?.("T")?.[0] || "",
    inviteEmail: "",
    collaboratorEmails: initialData?.collaborators || [],
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addInvite = () => {
    const email = form.inviteEmail.trim();
    if (!email || form.collaboratorEmails.includes(email)) return;

    setForm((prev) => ({
      ...prev,
      collaboratorEmails: [...prev.collaboratorEmails, email],
      inviteEmail: "",
    }));
  };

  const removeInvite = (email) => {
    setForm((prev) => ({
      ...prev,
      collaboratorEmails: prev.collaboratorEmails.filter((e) => e !== email),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name: form.name,
      description: form.description,
      targetLeads: Number(form.targetLeads),
      status: form.status,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      collaboratorEmails: form.collaboratorEmails,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full
        space-y-2 sm:space-y-3
        max-h-[calc(100vh-120px)]
        overflow-y-auto
        pr-2
      "
    >
      {/* TITLE */}
      <h2 className="text-center font-semibold text-[#FF9E1C] text-xs sm:text-sm">
        {mode === "edit" ? "Edit Campaign" : "Add Campaign"}
      </h2>

      {/* ERROR */}
      {errorMessage && (
        <div className="p-1.5 rounded bg-red-50 border border-red-200 text-red-700 text-[10px] sm:text-xs">
          {errorMessage}
        </div>
      )}

      {/* CAMPAIGN NAME */}
      <div>
        <label className="font-semibold text-[10px] sm:text-xs">
          Campaign Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full mt-0.5 border rounded px-2 py-1 text-[10px] sm:text-xs"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="font-semibold text-[10px] sm:text-xs">
          Description
        </label>
        <textarea
          name="description"
          rows={2}
          value={form.description}
          onChange={handleChange}
          className="w-full mt-0.5 border rounded px-2 py-1 text-[10px] sm:text-xs resize-none"
        />
      </div>

      {/* TARGET + STATUS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="font-semibold text-[10px] sm:text-xs">
            Total Target Leads
          </label>
          <input
            name="targetLeads"
            type="number"
            value={form.targetLeads}
            onChange={handleChange}
            className="w-full mt-0.5 border rounded px-2 py-1 text-[10px] sm:text-xs"
          />
        </div>

        <div>
          <label className="font-semibold text-[10px] sm:text-xs">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-0.5 border rounded px-2 py-1 text-[10px] sm:text-xs"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
      </div>

      {/* PERIODE */}
      <div>
        <label className="font-semibold text-[10px] sm:text-xs">
          Periode
        </label>

        <div className="flex flex-col sm:flex-row gap-1.5 mt-0.5">
          <div className="relative flex-1">
            <FiCalendar className="absolute left-2 top-2 text-gray-400 text-xs" />
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border rounded pl-7 py-1 text-[10px] sm:text-xs"
            />
          </div>

          <div className="relative flex-1">
            <FiCalendar className="absolute left-2 top-2 text-gray-400 text-xs" />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border rounded pl-7 py-1 text-[10px] sm:text-xs"
            />
          </div>
        </div>
      </div>

      {/* INVITE */}
      <div>
        <label className="font-semibold text-[10px] sm:text-xs">
          Invite
        </label>

        <div className="flex flex-col sm:flex-row gap-1.5 mt-0.5">
          <input
            name="inviteEmail"
            value={form.inviteEmail}
            onChange={handleChange}
            placeholder="Add sales email"
            className="flex-1 border rounded px-2 py-1 text-[10px] sm:text-xs"
          />

          <button
            type="button"
            onClick={addInvite}
            className="bg-blue-600 text-white px-3 py-1 rounded text-[10px] sm:text-xs"
          >
            Invite
          </button>
        </div>

        {/* EMAIL CHIPS */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {form.collaboratorEmails.map((email) => (
            <span
              key={email}
              className="px-2 py-0.5 bg-gray-100 border rounded-full text-[9px] flex items-center gap-1"
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

      {/* ACTION BUTTONS */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-1.5 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-[10px] sm:text-xs"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded text-[10px] sm:text-xs"
        >
          Save
        </button>
      </div>
    </form>
  );
}
