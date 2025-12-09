import React, { useState, useEffect } from "react";

const ROLE_OPTIONS = ["Sales", "Manager", "Admin"];
const STATUS_OPTIONS = ["Active", "Non Active"];

export default function EditAccountForm({ account, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: account?.name || "",
    email: account?.email || "",
    phoneNumber: account?.phoneNumber || "",
    role: account?.role || "Sales",
    status: account?.status || "Active",
    address: account?.address || "",   
  });

  useEffect(() => {
    if (account) {
      setForm({
        name: account.name,
        email: account.email,
        phoneNumber: account.phoneNumber,
        role: account.role,
        status: account.status,
        address: account.address || "",   
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!account) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary-darkest mb-4">
        Edit Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
      >
        {/* FULL NAME */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* EMAIL */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">Phone Number</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* STATUS */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">Account Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* ADDRESS */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-primary-darkest">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light"
            placeholder="Enter address..."
          />
        </div>

        {/* BUTTONS */}
        <div className="md:col-span-2 mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#1262BE] text-white text-sm font-semibold hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
