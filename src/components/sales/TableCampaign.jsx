import React, { useState, useEffect } from "react";
import Table from "../layout/ReusableTable.jsx";
import { FiEye, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import StatusBadge from "../utils/StatusBadge.jsx";
import Pagination from "../utils/Pagination.jsx";
import Modal from "../utils/Modal.jsx";
import CampaignDetailsModal from "./CampaignDetailsModal.jsx";

export default function TableCampaign({ searchQuery, filters }) {
  const [campaigns, setCampaigns] = useState([
    {
      id: "CP-01",
      name: "Donor Pendidikan Anak",
      targetLead: 100,
      period: "10/02/2025 - 21/04/2025",
      status: "Active",
      participate: " Not Joined",
      pic: "Irvan Wijaya",
    },
    {
      id: "CP-02",
      name: "Promo Umroh Insale 2025",
      targetLead: 270,
      period: "12/02/2025 - 21/04/2025",
      status: "Completed",
      participate: "Joined",
      pic: "Vito Edelman",
    },
    {
      id: "CP-03",
      name: "KPR Ramadhan",
      targetLead: 150,
      period: "01/03/2025 - 25/04/2025",
      status: "Active",
      participate: "Not Joined",
      pic: "Bagas Sutandyo",
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Join logic
const handleToggleJoin = (id) => {
  setCampaigns((prev) => {
    const updated = prev.map((item) =>
      item.id === id
        ? { ...item, participate: item.participate === "Joined" ? "Not Joined" : "Joined" }
        : item
    );

    // update selectedCampaign juga
    const updatedSelected = updated.find((c) => c.id === id);
    setSelectedCampaign(updatedSelected);

    return updated;
  });
};

  // Table columns
  const columns = [
    { header: "ID Campaign", accessor: "id" },
    { header: "Campaign Name", accessor: "name" },
    { header: "Target Lead", accessor: "targetLead" },
    { header: "Period", accessor: "period" },

    { header: "PIC", accessor: "pic" },
    { header: "participate", accessor: "participate" },
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

          {/* View details */}
          <FiEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => {
              setSelectedCampaign(row);
              setOpenModal(true);
            }}
          />

          {/* Join campaign */}
            {row.status === "Active" && (
                row.participate === "Joined" ? (
                // TOMBOL MINUS = LEAVE
                <FiMinusCircle
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleToggleJoin(row.id)}
                />
                ) : (
                // TOMBOL PLUS = JOIN
                <FiPlusCircle
                    className="cursor-pointer text-primary hover:text-primary-dark"
                    onClick={() => handleToggleJoin(row.id)}
                />
                )
            )}
        </div>
      ),
    },
  ];

  // Filtering
  const filteredData = campaigns.filter((item) => {
    const matchSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus =
      filters.status === "" || item.status === filters.status;

    const matchparticipate =
      filters.participate === "" || item.participate === filters.participate;

    const matchPeriod =
      filters.period === "" ||
      (filters.period === "This Month" && item.period.includes("03/2025")) ||
      (filters.period === "This Year" && item.period.includes("2025"));

    return matchSearch && matchStatus && matchparticipate && matchPeriod;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  return (
    <div>
      {/* Table */}
      <Table columns={columns} data={currentItems} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(amount) => {
          setItemsPerPage(amount);
          setCurrentPage(1);
        }}
      />

      {/* Modal Details */}
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CampaignDetailsModal
            data={selectedCampaign}
            onClose={() => setOpenModal(false)}
            onJoin={() => handleToggleJoin(selectedCampaign.id)}
        />
        </Modal>
    </div>
  );
}
