import React, { useState, useEffect } from "react";
import Table from "../layout/ReusableTable.jsx";
import { FiEye } from "react-icons/fi";
import StatusBadge from "../utils/StatusBadge.jsx";
import Pagination from "../utils/Pagination.jsx";
import Modal from "../utils/Modal.jsx";
import CampaignDetailsModal from "./CampaignDetailsModal.jsx";

// === DATA DUMMY LENGKAP DENGAN PARTICIPANTS ===
const campaignData = [
  {
    id: "CP-01",
    name: "Donor Pendidikan Anak",
    targetLead: 100,
    period: "10/02/2025 - 21/04/2025",
    status: "Active",
    madeBy: "Irvan Wijaya",
    participants: ["nana.sales@gmail.com", "fitri.sales@gmail.com"],
  },
  {
    id: "CP-02",
    name: "Promo Umroh Insale 2025",
    targetLead: 270,
    period: "12/02/2025 - 21/04/2025",
    status: "Completed",
    madeBy: "Vito Edelman",
    participants: ["budi.sales@gmail.com", "fitri.sales@gmail.com"],
  },
  {
    id: "CP-03",
    name: "KPR Ramadhan",
    targetLead: 150,
    period: "01/03/2025 - 25/04/2025",
    status: "Active",
    madeBy: "Bagas Sutandyo",
    participants: ["fitri.sales@gmail.com"],
  },
];

// === EXPORT FUNCTION UNTUK AMBIL SEMUA EMAIL PESERTA ===

export default function CampaignTable({ searchQuery, filters }) {
  const [campaigns] = useState(campaignData);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    { header: "ID Campaign", accessor: "id" },
    { header: "Campaign Name", accessor: "name" },
    { header: "Target Lead", accessor: "targetLead" },
    { header: "Period", accessor: "period" },
    { header: "Made By", accessor: "madeBy" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      header: "Action",
      accessor: "action",
      render: (_, row) => (
        <div className="flex gap-3 text-lg text-gray-600">
          <FiEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => {
              setSelectedCampaign(row);
              setOpenModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  // === FILTERING ===
  const filteredData = campaigns.filter((item) => {
    const matchSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      filters.status === "" || item.status === filters.status;

    const matchParticipate =
      filters.participate === "" ||
      item.participants.includes(filters.participate);

    const matchPeriod =
      filters.period === "" ||
      (filters.period === "This Month" && item.period.includes("03/2025")) ||
      (filters.period === "This Year" && item.period.includes("2025"));

    return matchSearch && matchStatus && matchParticipate && matchPeriod;
  });

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  return (
    <div>
      <Table columns={columns} data={currentItems} />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CampaignDetailsModal
          data={selectedCampaign}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}
