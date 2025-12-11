import React, { useState, useEffect } from "react";

export default function AddAccountForm({ onSave, onCancel, errorMessage }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "Sales",
  });

  // local validation error (string) or fieldErrors (object)
  const [localError, setLocalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Sync parent-provided errorMessage into local states
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
      // object: map to fieldErrors and also show general if provided
      const { message, errors, ...rest } = errorMessage;
      // Accept shapes like { errors: { email: '...' } } or { email: '...' }
      if (errors && typeof errors === "object") {
        setFieldErrors(errors);
      } else {
        setFieldErrors(errorMessage);
      }

      if (message && typeof message === "string") {
        setLocalError(message);
      } else {
        // if no general message, clear localError
        setLocalError("");
      }
    } else {
      setLocalError(String(errorMessage));
      setFieldErrors({});
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // clear field-specific error when user types that field
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }

    // clear general local error when typing
    if (localError) setLocalError("");
  };

  const validate = () => {
    const errors = {};

    if (!form.fullname.trim()) errors.fullname = "Fullname is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!form.password || form.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    // map errors into fieldErrors state and localError if any
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // also set a single-line summary for the banner
      setLocalError(Object.values(errors).slice(0, 2).join(" • "));
      return false;
    }

    // valid
    setFieldErrors({});
    setLocalError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // clear previous server errors
    setLocalError("");
    setFieldErrors({});

    if (!validate()) return;

    setLoading(true);
    try {
      // parent onSave expected to throw or return non-success if failed
      await onSave(form);
      // successful submit — parent usually closes modal
    } catch (err) {
      // handle structured errors from API:
      // - err.response.data.errors (object)
      // - err.response.data.message (string)
      // - err.message (string)
      const apiErr = err?.response?.data ?? err?.response ?? err;

      if (apiErr) {
        // If API returns errors object
        if (apiErr.errors && typeof apiErr.errors === "object") {
          setFieldErrors(apiErr.errors);
          setLocalError(apiErr.message || "Validation failed.");
        } else if (typeof apiErr === "object" && (apiErr.email || apiErr.fullname || apiErr.message)) {
          // sometimes backend returns direct object with field keys
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

  return (
    <div>
      <h2 className="text-lg font-semibold text-primary-darkest mb-4">Add New Account</h2>

      {/* GENERAL INLINE ERROR BANNER */}
      {localError && (
        <div className="mb-3 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
          {localError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
          {fieldErrors.fullname && <p className="text-xs text-red-500 mt-1">{fieldErrors.fullname}</p>}
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
          {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
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
          {fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>}
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
          {fieldErrors.role && <p className="text-xs text-red-500 mt-1">{fieldErrors.role}</p>}
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
          {fieldErrors.address && <p className="text-xs text-red-500 mt-1">{fieldErrors.address}</p>}
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
          {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>}
        </div>

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
              "Save Account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
