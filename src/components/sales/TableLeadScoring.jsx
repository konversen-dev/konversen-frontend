import React, { useState, useEffect } from "react";
import Table from "../layout/ReusableTable.jsx";
import { FiEye, FiTrash2 } from "react-icons/fi";
import StatusBadge from "../utils/StatusBadge.jsx";
import Modal from "../utils/Modal.jsx";
import LeadDetailsModal from "./LeadDetailsModal.jsx";
import Pagination from "../utils/Pagination.jsx";

export default function TableLeadScoring({ searchQuery, filters }) {
  // ⬇️ Ubah dari const → useState
  const [leads, setLeads] = useState([
    { id: "LD-01", name: "David Fahrreza", probability: "92%", age: 42, job: "Wirausaha", status: "Pending", lastContact: "10/10/2025" },
    { id: "LD-02", name: "Putri Utami Zahara", probability: "85%", age: 35, job: "PNS", status: "Converted", lastContact: "10/10/2025" },
    { id: "LD-03", name: "Andi Pratama", probability: "60%", age: 23, job: "Freelancer", status: "Failed", lastContact: "09/10/2025" },
    { id: "LD-04", name: "Budi Santoso", probability: "45%", age: 28, job: "Sales", status: "Contacted", lastContact: "09/10/2025" },
    { id: "LD-05", name: "Siti Aisyah", probability: "77%", age: 31, job: "PNS", status: "Pending", lastContact: "08/10/2025" },
    { id: "LD-06", name: "Rizky Hadi", probability: "33%", age: 40, job: "Freelancer", status: "Failed", lastContact: "08/10/2025" },
    { id: "LD-07", name: "Nanda Prasetyo", probability: "81%", age: 37, job: "Sales", status: "Converted", lastContact: "07/10/2025" },
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ⬇️ Fungsi update status
  const handleStatusChange = (newStatus) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, status: newStatus } : lead
      )
    );
    setSelectedLead((prev) => ({ ...prev, status: newStatus }));
  };

  const columns = [
    { header: "ID Lead", accessor: "id" },
    { header: "Leads", accessor: "name" },
    { header: "Probability", accessor: "probability" },
    { header: "Age", accessor: "age" },
    { header: "Job", accessor: "job" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <StatusBadge status={value} />,
    },
    { header: "Last Contacted", accessor: "lastContact" },
    {
      header: "Action",
      accessor: "action",
      render: (_, row) => (
        <div className="flex gap-3 text-lg text-gray-600">
          <FiEye
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => {
              setSelectedLead(row);
              setIsModalOpen(true);
            }}
          />
          <FiTrash2 className="cursor-pointer text-red-500 hover:text-red-700" />
        </div>
      ),
    },
  ];

  // 🔎 Filtering logic
  const filteredData = leads.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScore =
      filters.score === "" ||
      (filters.score === "High" && parseInt(item.probability) >= 80) ||
      (filters.score === "Medium" && parseInt(item.probability) >= 50 && parseInt(item.probability) < 80) ||
      (filters.score === "Low" && parseInt(item.probability) < 50);

    const matchesAge =
      filters.age === "" ||
      (filters.age === "<25" && item.age < 25) ||
      (filters.age === "25-40" && item.age >= 25 && item.age <= 40) ||
      (filters.age === "40+" && item.age > 40);

    const matchesStatus =
      filters.status === "" || item.status === filters.status;

    const matchesJob =
      filters.job === "" || item.job === filters.job;

    return (
      matchesSearch &&
      matchesScore &&
      matchesAge &&
      matchesStatus &&
      matchesJob
    );
  });

  // 📄 Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Lead Details"
      >
        <LeadDetailsModal
          lead={selectedLead}
          onStatusChange={handleStatusChange} // ⬅️ kirim ke modal
        />
      </Modal>
    </div>
  );
}
