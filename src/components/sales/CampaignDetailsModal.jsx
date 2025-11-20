import React from "react";
import { X } from "lucide-react";
import StatusBadge from "../utils/StatusBadge";

export default function CampaignDetailsModal({ data, onClose, onJoin }) {
  // List peserta
  const participants = Array.isArray(data?.participants)
    ? data.participants
    : [];

  // Status participate user
  const participateStatus = data?.participate || "Not Joined";

  return (
    <div className="p-4 text-primary-darkest text-sm">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        <X size={20} />
      </button>

      {/* Title */}
      <h2 className="text-primary-light font-semibold text-md mb-4">
        Campaign Details
      </h2>

      <div className="border-b mb-4" />

      {/* Campaign Name */}
      <DetailItem label="Campaign Name" value={data?.name} />

      {/* Period */}
      <DetailItem label="Period" value={data?.period} />

      {/* Campaign Status */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-semibold">Status:</span>
        <StatusBadge status={data?.status} />
      </div>

      {/* Participate Status (baru ditambahkan) */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold">Participate:</span>
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium
            ${participateStatus === "Joined"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
            }`}
        >
          {participateStatus}
        </span>
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
          All Participants:
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
          {participants.map((email, idx) => (
            <div
              key={idx}
              className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl text-blue-700 text-xs"
            >
              {email}
            </div>
          ))}
        </div>
      </div>

      {/* Join Button */}
      <button
        onClick={onJoin}
        className="w-full py-2 mt-5 bg-primary-light hover:bg-[#C86F0D] text-white text-sm font-semibold rounded-lg"
      >
        {participateStatus === "Joined" ? "Leave" : "Join / Gabung"}
      </button>
    </div>
  );
}

/* Detail Item */
function DetailItem({ label, value }) {
  return (
    <p className="mb-2">
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-gray-700">{value}</span>
    </p>
  );
}
