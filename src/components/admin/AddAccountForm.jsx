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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // kirim ke parent
    onSave(form);
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
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#1262BE] text-white font-semibold hover:bg-blue-700"
          >
            Save Account
          </button>
        </div>
      </form>
    </div>
  );
}
