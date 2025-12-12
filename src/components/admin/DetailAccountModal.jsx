import React, { useState, useEffect } from "react";
import AvatarDefault from "../../assets/AvatarDefault.png";
import { userService } from "../../services/userService";

/* BADGE */
function ActivityBadge({ type }) {
  const colors = {
    UPDATE: "bg-blue-100 text-blue-700",
    CREATE: "bg-green-100 text-green-700",
    DELETE: "bg-red-100 text-red-700",
    LOGIN: "bg-gray-200 text-gray-700",
    LOGOUT: "bg-gray-300 text-gray-700",
    INVITE: "bg-purple-100 text-purple-700",
  };

  return (
    <span className={`text-xs px-3 py-1 text-center w-[65px] rounded-md font-semibold ${colors[type] || "bg-gray-100 text-gray-500"}`}>
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

export default function DetailAccountModal({ account }) {
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  // Fetch user activities when modal opens
  useEffect(() => {
    const fetchActivities = async () => {
      if (!account?.id) return;
      
      setLoadingActivities(true);
      try {
        const response = await userService.getUserActivities(account.id, 5);
        setActivities(response.data || []);
      } catch {
        setActivities([]);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchActivities();
  }, [account?.id]);

  if (!account) return null;

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('id-ID', { month: 'short' });
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day} ${month} ${year}, ${hours}.${minutes}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full max-w-5xl text-primary-darkest">

      {/* BODY WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT PANEL */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h2 className="text-primary-light font-semibold text-md mb-4">
            Detail Account
          </h2>

          {/* FOTO + NAMA */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={account.avatar_url || AvatarDefault}
              alt="Profile"
              className="w-16 h-16 rounded-full border object-cover"
            />
            <p className="text-base font-semibold">{account.fullname || account.name}</p>
          </div>

          {/* INFO */}
          <div className="space-y-3 text-sm text-primary-darkest">
            <DetailRow label="Email" value={account.email || "-"} />
            <DetailRow label="Phone Number" value={account.phone || "-"} />
            <DetailRow label="Role" value={account.role || "-"} />
            <DetailRow label="Account Status" value={account.is_active !== undefined ? (account.is_active ? "Active" : "Non Active") : "-"} />
            <DetailRow label="Address" value={account.address || "-"} />
            <DetailRow label="Registered Date" value={account.created_at ? formatDate(account.created_at) : "-"} />
            <DetailRow label="Last Login" value={account.last_login_at ? formatDate(account.last_login_at) : "-"} />
            <DetailRow label="Updated Account" value={account.updated_at ? formatDate(account.updated_at) : "-"} />
          </div>
        </div>

        {/* RIGHT PANEL — LOGS */}
        <div className="bg-white rounded-xl shadow-sm border p-5 flex flex-col">
          <h2 className="text-primary-light font-semibold text-md mb-3">
            Logs / Activity
          </h2>

          {/* RESPONSIVE SCROLL CONTAINER */}
          <div
            className="
              flex flex-row sm:flex-col
              gap-4
              overflow-x-auto sm:overflow-y-auto
              overflow-y-hidden sm:overflow-x-hidden
              max-h-none sm:max-h-80
              scroll-smooth
              pr-1
            "
          >
            {loadingActivities ? (
              <div className="min-w-full sm:min-w-0 text-center bg-gray-100 p-4 rounded-lg text-sm text-gray-400">
                Loading activities...
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity, idx) => (
                <div
                  key={activity.id || idx}
                  className="
                    min-w-[260px] sm:min-w-0
                    border border-gray-200
                    rounded-xl
                    p-4
                    bg-gray-50
                    shadow-sm
                    flex-shrink-0
                  "
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs font-semibold text-gray-700 truncate">
                      {activity.campaign_name !== "N/A"
                        ? activity.campaign_name
                        : activity.lead_name !== "N/A"
                        ? activity.lead_name
                        : "N/A"}
                    </div>

                    <ActivityBadge type={activity.action} />
                  </div>

                  {/* TIME */}
                  <p className="text-[11px] text-gray-500 mt-1">
                    {activity.time ? formatDate(activity.time) : "-"}
                  </p>

                  {/* DESCRIPTION */}
                  {activity.description && (
                    <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                      {activity.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="min-w-full sm:min-w-0 text-center bg-gray-100 p-4 rounded-lg text-sm text-gray-400">
                No activity logs.
              </div>
            )}
          </div>
        </div>



      </div>
    </div>
  );
}
