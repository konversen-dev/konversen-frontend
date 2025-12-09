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
    { header: "Target Lead", accessor: "targetLead" },

    {
      header: "Start",
      accessor: "periodStart",
      render: (v) => new Date(v).toLocaleDateString(),
    },
    {
      header: "End",
      accessor: "periodEnd",
      render: (v) => new Date(v).toLocaleDateString(),
    },

    { header: "Made By", accessor: "madeBy" },

    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <StatusBadge
          status={value === "Active" ? "Active" : "Non Active"}
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
            <FiEye size={18} />
          </button>

          {/* Manager Only */}
          {!readOnly && (
            <>
              <button
                onClick={() => onEdit(row)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FiEdit2 size={18} />
              </button>

              <button
                onClick={() => onDelete(row)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 size={18} />
              </button>
            </>
          )}
        </div>
      ),
    },



  ];

  return <ReusableTable columns={columns} data={data} />;
}
