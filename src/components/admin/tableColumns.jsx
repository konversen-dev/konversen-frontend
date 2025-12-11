import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import StatusBadge from "../utils/StatusBadge";

export const getAdminColumns = ({ onDetail, onEdit, onDelete }) => [
  {
    header: "Profile",
    accessor: "avatar_url",
    render: (value, row) => {
      const name = row.fullname || row.name || '';
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return value ? (
        <img
          src={value}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
          {initials}
        </div>
      );
    },
  },

  { header: "Name", accessor: "fullname" },
  { header: "Email", accessor: "email" },
  { header: "Role", accessor: "role" },

  {
    header: "Status",
    accessor: "is_active",
    render: (value) => <StatusBadge status={value ? "Active" : "Non Active"} labelOverride={value ? "Active" : "Non Active"} />,
  },

  {
    header: "Last Login",
    accessor: "last_login_at",
    render: (value) => {
      if (!value) return <span className="text-gray-400">Never</span>;
      try {
        const date = new Date(value);
        const day = date.getDate();
        const month = date.toLocaleString('id-ID', { month: 'short' });
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year}, ${hours}.${minutes}`;
      } catch {
        return <span className="text-gray-400">-</span>;
      }
    },
  },

  {
    header: "Action",
    accessor: "action",
    render: (_val, row) => (
      <div className="flex items-center gap-3 text-lg">
        {/* View / Detail */}
        <button
          type="button"
          title="View Details"
          className="text-[#1262BE] hover:text-blue-700 transition"
          onClick={() => onDetail(row)}
        >
          <FiEye />
        </button>

        {/* Edit */}
        <button
          type="button"
          title="Edit Account"
          className="text-[#1262BE] hover:text-blue-700 transition"
          onClick={() => onEdit(row)}
        >
          <FiEdit2 />
        </button>

        {/* Delete */}
        <button
          type="button"
          title="Delete Account"
          className="text-red-500 hover:text-red-700 transition"
          onClick={() => onDelete(row)}
        >
          <FiTrash2 />
        </button>
      </div>
    ),
  },
];
