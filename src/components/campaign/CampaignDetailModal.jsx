import React from "react";
import StatusBadge from "../utils/StatusBadge";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d)) return "-";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export default function CampaignDetailsModal({ campaign }) {
  if (!campaign) return null;

  const periodLabel = `${formatDate(campaign.start_date)} – ${formatDate(
    campaign.end_date
  )}`;

  const participants = Array.isArray(campaign.collaborators)
    ? campaign.collaborators
    : [];

  return (
    <div
      className="
        w-full
        max-w-[95vw]
        sm:max-w-xl
        md:max-w-2xl
        lg:max-w-3xl
        bg-white
        rounded-2xl
        mx-auto
      "
    >
      {/* HEADER */}
      <h2 className="text-lg sm:text-xl font-semibold text-center text-[#FF9E1C] mb-4">
        Campaign Details
      </h2>

      {/* CONTENT WRAPPER */}
      <div
        className="
          border border-gray-200 rounded-xl
          divide-y
          max-h-[70vh]
          overflow-y-auto
        "
      >
        {/* SECTION 1 */}
        <div className="px-4 sm:px-6 py-4 space-y-3">
          <DetailRow label="Campaign Name" value={campaign.name} />
          <DetailRow label="Periods" value={periodLabel} />
          <DetailRow
            label="Status"
            value={<StatusBadge status={campaign.status} />}
          />
        </div>

        {/* SECTION 2 */}
        <div className="px-4 sm:px-6 py-4 space-y-3">
          <DetailRow label="Created by" value={campaign.created_by || "-"} />
          <DetailRow
            label="Target Leads"
            value={campaign.target_leads || 0}
          />
          <DetailRow
            label="Description"
            value={
              <p className="text-gray-700 leading-relaxed">
                {campaign.description || "-"}
              </p>
            }
          />
        </div>

        {/* SECTION 3 */}
        <div className="px-4 sm:px-6 py-4 space-y-3">
          <div className="flex flex-col sm:flex-row text-sm">
            <span className="sm:w-48 font-semibold text-gray-800">
              Participants
            </span>

            <div className="flex gap-2 mt-1 sm:mt-0 flex-1">
              <span className="text-gray-700">:</span>

              <div className="flex-1">
                {participants.length === 0 ? (
                  <p className="text-gray-500">No participants yet.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {participants.map((email) => (
                      <span
                        key={email}
                        className="
                          px-3 py-1
                          border rounded-full
                          bg-gray-50
                          text-xs sm:text-sm
                        "
                      >
                        {email}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= DETAIL ROW ================= */

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row text-sm">
      {/* LABEL */}
      <div className="sm:w-48 font-semibold text-gray-800 mb-1 sm:mb-0">
        {label}
      </div>

      {/* VALUE */}
      <div className="flex gap-2 flex-1">
        <span className="text-gray-700">:</span>
        <div className="flex-1 text-gray-800 break-words leading-relaxed">
          {value}
        </div>
      </div>
    </div>
  );
}
