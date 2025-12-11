import React, { useState, useEffect } from "react";

const ROLE_OPTIONS = ["Sales", "Manager", "Admin"];
const STATUS_OPTIONS = ["Active", "Non Active"];

export default function EditAccountForm({ account, onSave, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: account?.fullname || "",
    email: account?.email || "",
    phone: account?.phone || "",
    role: account?.role || "Sales",
    isActive: account?.is_active !== undefined ? account.is_active : true,
    address: account?.address || "",   
  });

  useEffect(() => {
    if (account) {
      setForm({
        fullname: account.fullname,
        email: account.email,
        phone: account.phone,
        role: account.role,
        isActive: account.is_active !== undefined ? account.is_active : true,
        address: account.address || "",   
      });
    }
  }, [account]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(form);
    } finally {
      setLoading(false);
    }
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
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:bg-gray-100"
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
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:bg-gray-100"
          />
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:bg-gray-100"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block mb-1 font-medium text-primary-darkest">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light disabled:bg-gray-100"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* STATUS */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              disabled={loading}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="font-medium text-primary-darkest">Active Account</span>
          </label>
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
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#1262BE] text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
