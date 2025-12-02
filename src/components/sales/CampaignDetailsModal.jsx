// import React from "react";
// import { X } from "lucide-react";
// import StatusBadge from "../utils/StatusBadge";

// export default function CampaignDetailsModal({ data, onClose, onJoin }) {
//   // List peserta
//   const participants = Array.isArray(data?.participants)
//     ? data.participants
//     : [];

//   // Status participate user
//   const participateStatus = data?.participate || "Not Joined";

//   return (
//     <div className="p-4 text-primary-darkest text-sm">

//       {/* Close Button */}
//       <button
//         onClick={onClose}
//         className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//       >
//         <X size={20} />
//       </button>

//       {/* Title */}
//       <h2 className="text-primary-light font-semibold text-md mb-4">
//         Campaign Details
//       </h2>

//       <div className="border-b mb-4" />

//       {/* Campaign Name */}
//       <DetailItem label="Campaign Name" value={data?.name} />

//       {/* Period */}
//       <DetailItem label="Period" value={data?.period} />

//       {/* Campaign Status */}
//       <div className="flex items-center gap-3 mb-3">
//         <span className="font-semibold">Status:</span>
//         <StatusBadge status={data?.status} />
//       </div>

//       {/* Participate Status (baru ditambahkan) */}
//       <div className="flex items-center gap-2 mb-4">
//         <span className="font-semibold">Participate:</span>
//         <span
//           className={`px-2 py-1 rounded-md text-xs font-medium
//             ${participateStatus === "Joined"
//               ? "bg-green-100 text-green-700"
//               : "bg-gray-100 text-gray-600"
//             }`}
//         >
//           {participateStatus}
//         </span>
//       </div>

//       <div className="border-b mb-4" />

//       {/* Target Leads */}
//       <DetailItem
//         label="Target Leads"
//         value={data?.targetLead ?? data?.targetLeads}
//       />

//       {/* Description */}
//       <div className="text-primary-darkest mb-4">
//         <span className="font-semibold">Description:</span>
//         <p className="mt-1 text-gray-700 leading-relaxed">{data?.description}</p>
//       </div>

//       <div className="border-b mb-4" />

//       {/* All Participants */}
//       <div>
//         <span className="font-semibold text-primary-darkest">
//           All Participants:
//         </span>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {participants.map((email, idx) => (
//             <div
//               key={idx}
//               className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl text-blue-700 text-xs"
//             >
//               {email}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Join Button */}
//       <button
//         onClick={onJoin}
//         className="w-full py-2 mt-5 bg-primary-light hover:bg-[#C86F0D] text-white text-sm font-semibold rounded-lg"
//       >
//         {participateStatus === "Joined" ? "Leave" : "Join / Gabung"}
//       </button>
//     </div>
//   );
// }

// /* Detail Item */
// function DetailItem({ label, value }) {
//   return (
//     <p className="mb-2">
//       <span className="font-semibold">{label}:</span>{" "}
//       <span className="text-gray-700">{value}</span>
//     </p>
//   );
// }


// src/components/sales/CampaignDetailsModal.jsx
import React from "react";

function DetailRow({ label, children }) {
  return (
    <div className="flex items-start gap-2 text-xs sm:text-sm py-1">
      <span className="w-28 sm:w-40 text-gray-500 font-medium">
        {label}
      </span>
      <span className="flex-1 text-gray-800">{children}</span>
    </div>
  );
}

export default function CampaignDetailsModal({
  data,
  campaign,
  onClose,
  onJoin,
}) {
  // Bisa terima props `campaign` (ManagerDashboard) atau `data` (Sales)
  const c = campaign || data;

  if (!c) return null;

  const periodLabel =
    (c.periodStart && c.periodEnd && `${c.periodStart} – ${c.periodEnd}`) ||
    c.period ||
    "-";

  const statusLabel = c.status || "-";
  const isActive = statusLabel === "Active";

  const createdBy = c.madeBy || c.pic || "-";
  const targetLeads =
    typeof c.targetLead === "number" ? c.targetLead : c.targetLead || "-";

  const participantsFromObj =
    Array.isArray(c.participants) && c.participants.length > 0
      ? c.participants.map((p) => p.email || p.name || "")
      : [];

  const participants =
    participantsFromObj.length > 0
      ? participantsFromObj
      : Array.isArray(c.invitedEmails)
      ? c.invitedEmails
      : [];

  const description =
    c.description ||
    "No description provided. This is a sample campaign detail for demo purposes.";

  const isJoined = c.participate === "Joined";

  return (
    <div className="w-full max-w-xl text-primary-darkest">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-6" />
        <h2 className="flex-1 text-center text-base sm:text-lg font-semibold">
          Campaign Details
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 text-lg leading-none"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="border-t border-b border-gray-200 py-4 space-y-4">
        {/* Row 1–3 */}
        <div className="space-y-1">
          <DetailRow label="Campaign Name">
            {c.name || "-"}
          </DetailRow>

          <DetailRow label="Periods">
            {periodLabel}
          </DetailRow>

          <DetailRow label="Status">
            <span className="inline-flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <span>{statusLabel}</span>
            </span>
          </DetailRow>
        </div>

        {/* Row 4–5 */}
        <div className="space-y-1">
          <DetailRow label="Created by">
            {createdBy}
          </DetailRow>

          <DetailRow label="Target Leads">
            {targetLeads}
          </DetailRow>
        </div>

        {/* Description */}
        <div className="pt-1">
          <DetailRow label="Description">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </DetailRow>
        </div>

        {/* Participants */}
        <div className="pt-1">
          <DetailRow label="Participants">
            {participants.length === 0 ? (
              <span className="text-gray-500">
                No participants invited yet.
              </span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {participants.map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-700"
                  >
                    {email}
                  </span>
                ))}
              </div>
            )}
          </DetailRow>
        </div>
      </div>

      {/* Join / Leave (hanya muncul di halaman Sales yg kirim onJoin) */}
      {onJoin && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onJoin}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border ${
              isJoined
                ? "bg-white text-red-500 border-red-300 hover:bg-red-50"
                : "bg-[#1262BE] text-white border-[#1262BE] hover:bg-blue-700"
            }`}
          >
            {isJoined ? "Leave Campaign" : "Join Campaign"}
          </button>
        </div>
      )}
    </div>
  );
}
