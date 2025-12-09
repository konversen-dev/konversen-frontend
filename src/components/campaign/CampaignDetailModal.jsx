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

  const periodLabel = `${formatDate(campaign.periodStart)} – ${formatDate(
    campaign.periodEnd
  )}`;

  const participants = Array.isArray(campaign.invitedEmails)
    ? campaign.invitedEmails
    : [];

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl px-8 py-6">

      {/* Header */}
      <h2 className="text-xl font-semibold text-center text-[#FF9E1C] mb-4">
        Campaign Details
      </h2>

      {/* MAIN WRAPPER */}
      <div className="border border-gray-200 rounded-xl divide-y">

        {/* SECTION 1 */}
        <div className="px-6 py-5 space-y-3">
          <DetailRow label="Campaign Name" value={campaign.name} />
          <DetailRow label="Periods" value={periodLabel} />
          <DetailRow
            label="Status"
            value={<StatusBadge status={campaign.status} />}
          />
        </div>

        {/* SECTION 2 */}
        <div className="px-6 py-5 space-y-3">
          <DetailRow label="Created by" value={campaign.madeBy} />
          <DetailRow label="Target Leads" value={campaign.targetLead} />
          <DetailRow
            label="Description"
            value={
              <p className="text-gray-700 leading-relaxed">
                {campaign.description}
              </p>
            }
          />
        </div>

        {/* SECTION 3 */}
        {/* SECTION 3 */}
        <div className="px-6 py-5 space-y-3">

          {/* Row Label */}
          <div className="flex text-sm items-start">
            <span className="w-40 font-semibold text-gray-700">Participants</span>
            <span className="mr-2">:</span>

            <div className="flex-1 text-gray-800">
              {participants.length === 0 ? (
                <p className="text-gray-500">No participants yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {participants.map((email) => (
                    <span
                      key={email}
                      className="px-3 py-1 border rounded-full bg-gray-50 text-sm"
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
  );
}

/* ---------------- DETAIL ROW COMPONENT ---------------- */

function DetailRow({ label, value }) {
  return (
    <div className="flex text-sm items-start">
      <span className="w-40 font-semibold text-gray-700">{label}</span>
      <span className="mr-2">:</span>
      <div className="flex-1 text-gray-800">{value}</div>
    </div>
  );
}
