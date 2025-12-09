import React from "react";
import AvatarDefault from "../../assets/AvatarDefault.png";

/* BADGE */
function ActivityBadge({ type }) {
  const colors = {
    Update: "bg-blue-100 text-blue-700",
    Create: "bg-green-100 text-green-700",
    Delete: "bg-red-100 text-red-700",
    Login: "bg-gray-200 text-gray-700",
    Logout: "bg-gray-300 text-gray-700",
    Invite: "bg-purple-100 text-purple-700",
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-md font-semibold ${colors[type] || "bg-gray-100 text-gray-500"}`}>
      {type || "-"}
    </span>
  );
}

/* DETAIL ROW GENERAL */
function DetailRow({ label, value }) {
  return (
    <div className="flex text-sm">
      <span className="w-36 text-gray-600">{label}</span>
      <span className="flex-1 text-gray-800 break-words">: {value}</span>
    </div>
  );
}

export default function DetailAccountModal({ account, onClose }) {
  if (!account) return null;

  const logs = account.activityLogs || [];

  return (
    <div className="w-full max-w-5xl text-primary-darkest">

      {/* HEADER (ONLY CLOSE BUTTON) */}
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>

      {/* BODY WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT PANEL */}
        <div className="border border-gray-300 bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#FF9E1C] mb-4">
            Detail Account
          </h3>

          {/* FOTO + NAMA */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={account.profileImage || AvatarDefault}
              alt="Profile"
              className="w-16 h-16 rounded-full border"
            />
            <p className="text-base font-semibold">{account.name}</p>
          </div>

          {/* INFO */}
          <div className="space-y-2 text-sm">
            <DetailRow label="Email" value={account.email} />
            <DetailRow label="Phone Number" value={account.phoneNumber || "-"} />
            <DetailRow label="Role" value={account.role} />
            <DetailRow label="Account Status" value={account.status} />
            <DetailRow label="Address" value={account.address || "-"} />
            <DetailRow label="Registered Date" value={account.registeredAt || "-"} />
            <DetailRow label="Last Login" value={account.lastLogin || "-"} />
            <DetailRow label="Updated Account" value={account.updatedAt || "-"} />
          </div>
        </div>

        {/* RIGHT PANEL — LOGS */}
        <div className="border border-gray-300 bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#FF9E1C] mb-4">
            Logs / Activity
          </h3>

          <div className="space-y-4">
            {logs.length > 0 ? (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-sm">{log.title}</p>
                    <ActivityBadge type={log.type} />
                  </div>

                  <p className="text-xs text-gray-600">{log.leadName}</p>

                  <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>

                  <p className="text-xs text-gray-700 mt-2 whitespace-pre-line">
                    {log.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center bg-gray-100 p-4 rounded-lg text-sm">
                No activity logs.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
