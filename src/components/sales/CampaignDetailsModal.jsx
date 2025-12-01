import React from "react";
import StatusBadge from "../utils/StatusBadge";

export default function CampaignDetailsModal({ data}) {
  const participants = Array.isArray(data?.participants)
    ? data.participants
    : [];

  return (
    <div className="relative p-6 text-primary-darkest text-sm w-full max-w-2xl mx-auto">
      {/* Title */}
      <h2 className="text-primary-light font-semibold text-lg mb-4 text-center">
        Campaign Details
      </h2>

      <div className="border-b mb-4" />

      {/* Campaign Name */}
      <DetailItem label="Campaign Name" value={data?.name} />

      {/* Period */}
      <DetailItem label="Periods" value={data?.period} />

      {/* Campaign Status */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-semibold">Status:</span>
        <StatusBadge status={data?.status} />
      </div>

      <div className="border-b mb-4" />

      {/* Target Leads */}
      <DetailItem
        label="Target Leads"
        value={data?.targetLead ?? data?.targetLeads}
      />

      {/* Description */}
      <div className="text-primary-darkest mb-4">
        <span className="font-semibold">Description:</span>
        <p className="mt-1 text-gray-700 leading-relaxed">{data?.description}</p>
      </div>

      <div className="border-b mb-4" />

      {/* All Participants */}
      <div>
        <span className="font-semibold text-primary-darkest">
          Participants:
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {participants.map((email, idx) => (
            <div
              key={idx}
              className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-xl text-gray-700 text-xs"
            >
              {email}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <p className="mb-2">
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-gray-700">{value}</span>
    </p>
  );
}
