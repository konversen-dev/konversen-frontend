// src/components/manager/CampaignTable.jsx
import React from "react";
import ReusableTable from "../layout/ReusableTable";
import StatusBadge from "../utils/StatusBadge";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function CampaignTable({
  data,
  onDetail,
  onEdit,
  onDelete,
  readOnly = false,
}) {
  const columns = [
    { header: "Campaign Name", accessor: "name" },
    { 
      header: "Target Lead", 
      accessor: "target_leads",
      render: (v) => v || 0
    },

    {
      header: "Start",
      accessor: "start_date",
      render: (v) => v ? new Date(v).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) : '-',
    },
    {
      header: "End",
      accessor: "end_date",
      render: (v) => v ? new Date(v).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) : '-',
    },

    { 
      header: "Made By", 
      accessor: "created_by",
      render: (v) => v || '-'
    },

    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <StatusBadge
          status={value === "Active" ? "active" : value === "Completed" ? "completed" : value === "Paused" ? "paused" : "default"}
          labelOverride={value}
        />
      ),
    },

    {
      header: "Action",
      accessor: "action",
      className: "text-center w-24", 
      render: (_, row) => (
        <div
          className={`flex items-center ${
            readOnly ? "justify-center" : "justify-start"
          } gap-3 text-lg`}
        >
          {/* View */}
          <button
            onClick={() => onDetail(row)}
            className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
          >
            <FiEye />
          </button>

          {/* Manager Only */}
          {!readOnly && (
            <>
              <button
                onClick={() => onEdit(row)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FiEdit2 />
              </button>

              <button
                onClick={() => onDelete(row)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </>
          )}
        </div>
      ),
    },



  ];

  return <ReusableTable columns={columns} data={data} />;
}
