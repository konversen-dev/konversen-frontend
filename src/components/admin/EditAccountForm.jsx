import React, { useState, useEffect } from "react";

const ROLE_OPTIONS = ["Sales", "Manager", "Admin"];

export default function EditAccountForm({ account, onSave, onCancel, errorMessage }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullname: account?.fullname || "",
    email: account?.email || "",
    phone: account?.phone || "",
    role: account?.role || "Sales",
    isActive: account?.is_active !== undefined ? account.is_active : true,
    address: account?.address || "",
  });

  // local errors: general banner + per-field
  const [localError, setLocalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // sync account into form when account prop changes
  useEffect(() => {
    if (account) {
      setForm({
        fullname: account.fullname || "",
        email: account.email || "",
        phone: account.phone || "",
        role: account.role || "Sales",
        isActive: account.is_active !== undefined ? account.is_active : true,
        address: account.address || "",
      });
    }
  }, [account]);

  // sync parent-provided errorMessage into local errors
  useEffect(() => {
    if (!errorMessage) {
      setLocalError("");
      setFieldErrors({});
      return;
    }

    if (typeof errorMessage === "string") {
      setLocalError(errorMessage);
      setFieldErrors({});
    } else if (typeof errorMessage === "object") {
      // accept shapes like { message: "...", errors: {...} } or { email: "..." }
      const { message, errors, ...rest } = errorMessage;
      if (errors && typeof errors === "object") {
        setFieldErrors(errors);
      } else if (Object.keys(rest).length) {
        setFieldErrors(rest);
      } else {
        setFieldErrors(errorMessage);
      }
      if (message) setLocalError(message);
      else setLocalError("");
    } else {
      setLocalError(String(errorMessage));
      setFieldErrors({});
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // clear field error for this field
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }

    // clear general error when user types
    if (localError) setLocalError("");
  };

  const validate = () => {
    const errors = {};
    if (!form.fullname || !form.fullname.trim()) errors.fullname = "Full name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) errors.email = "Please enter a valid email address.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLocalError(Object.values(errors).slice(0, 2).join(" • "));
      return false;
    }

    setFieldErrors({});
    setLocalError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setFieldErrors({});

    if (!validate()) return;

    setLoading(true);
    try {
      // parent onSave should handle API and return/throw accordingly
      await onSave(form);
      // success: parent usually closes modal; keep UI clean
    } catch (err) {
      // try to parse structured API error
      const apiErr = err?.response?.data ?? err?.response ?? err;
      if (apiErr) {
        if (apiErr.errors && typeof apiErr.errors === "object") {
          setFieldErrors(apiErr.errors);
          setLocalError(apiErr.message || "Validation failed.");
        } else if (typeof apiErr === "object" && (apiErr.email || apiErr.fullname || apiErr.message)) {
          const { message, ...rest } = apiErr;
          const restFields = Object.keys(rest).length ? rest : {};
          if (Object.keys(restFields).length) setFieldErrors(restFields);
          if (message) setLocalError(message);
          else if (!Object.keys(restFields).length) setLocalError(JSON.stringify(apiErr));
        } else {
          setLocalError(err?.response?.data?.message || err?.message || "Failed to save");
        }
      } else {
        setLocalError(err?.message || "Failed to save");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!account) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary-darkest mb-4">Edit Account</h2>

      {/* INLINE BANNER ERROR */}
      {localError && (
        <div className="mb-3 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
          {localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
          {fieldErrors.fullname && <p className="text-xs text-red-500 mt-1">{fieldErrors.fullname}</p>}
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
          {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
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
          {fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>}
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
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {fieldErrors.role && <p className="text-xs text-red-500 mt-1">{fieldErrors.role}</p>}
        </div>

        {/* STATUS (checkbox) */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={!!form.isActive}
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
          {fieldErrors.address && <p className="text-xs text-red-500 mt-1">{fieldErrors.address}</p>}
        </div>

        {/* BUTTONS */}
        <div className="md:col-span-2 mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              // clear errors before cancelling
              setLocalError("");
              setFieldErrors({});
              onCancel();
            }}
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
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
