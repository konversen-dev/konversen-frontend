import React, { useState } from "react";

export default function AddAccountForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "Sales",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = [];

    if (!form.fullname.trim()) errors.push("Fullname is required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.push("Please enter a valid email address.");
    }

    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(form.phone)) {
      errors.push("Phone must be 9–15 digits.");
    }

    if (form.password.length < 6) {
      errors.push("Password must be at least 6 characters.");
    }

    if (errors.length > 0) {
      setError(errors.join(" "));
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // kirim ke parent
      await onSave(form);
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary-darkest mb-4">
        Add New Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
      >
        {/* FULLNAME */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Fullname</label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            required
            placeholder="Nama lengkap user"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* EMAIL */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="user@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="08xxxxxxxxxx"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* ROLE */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* ADDRESS */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Alamat lengkap user"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* PASSWORD */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Min. 6 characters"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="md:col-span-2">
            <p className="text-xs text-red-500">{error}</p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="md:col-span-2 mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-[#1262BE] text-white font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
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
              'Save Account'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
