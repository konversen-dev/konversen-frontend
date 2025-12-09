import React, { useState, useEffect } from "react";
import Table from "../layout/ReusableTable.jsx";
import { FiEye, FiTrash2 } from "react-icons/fi";
import StatusBadge from "../utils/StatusBadge.jsx";
import Modal from "../utils/Modal.jsx";
import LeadDetailsModal from "./LeadDetailsModal.jsx";
import Pagination from "../utils/Pagination.jsx";

export default function TableLeadScoring({ searchQuery, filters }) {

  // ====================== DUMMY DATA =======================
  const [leads, setLeads] = useState([
    {
      id: "LD-01",
      name: "David Fahrreza",
      age: 42,
      job: "Wirausaha",
      domicile: "Semarang",
      probability: "92%",
      status: "Pending",
    },
    {
      id: "LD-02",
      name: "Putri Utami Zahara",
      age: 35,
      job: "PNS",
      domicile: "Solo",
      probability: "85%",
      status: "Converted",
    },
    {
      id: "LD-03",
      name: "Andi Pratama",
      age: 23,
      job: "Freelancer",
      domicile: "Tangerang",
      probability: "60%",
      status: "Failed",
    },
    {
      id: "LD-04",
      name: "Budi Santoso",
      age: 28,
      job: "Sales",
      domicile: "Bekasi",
      probability: "45%",
      status: "Contacted",
    },
    {
      id: "LD-05",
      name: "Siti Aisyah",
      age: 31,
      job: "Akuntan",
      domicile: "Surabaya",
      probability: "77%",
      status: "Pending",
    },
    {
      id: "LD-06",
      name: "Rizky Hadi",
      age: 40,
      job: "Freelancer",
      domicile: "Bandung",
      probability: "33%",
      status: "Failed",
    },
    {
      id: "LD-07",
      name: "Nanda Prasetyo",
      age: 37,
      job: "Sales",
      domicile: "Yogyakarta",
      probability: "81%",
      status: "Converted",
    }
  ]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // UPDATE STATUS DARI MODAL
  const handleStatusChange = (newStatus) => {
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, status: newStatus } : lead
      )
    );
    setSelectedLead((prev) => ({ ...prev, status: newStatus }));
  };

  // ====================== TABLE COLUMN =======================
  const columns = [
    { header: "Leads", accessor: "name" },
    { header: "Age", accessor: "age" },
    { header: "Job", accessor: "job" },
    { header: "Domicile", accessor: "domicile" },
    { header: "Probability", accessor: "probability" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      header: "Action",
      accessor: "action",
      render: (_, row) => (
        <div className="flex items-center justify-start pl-1 gap-2">
          <FiEye
            size={18}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => {
              setSelectedLead(row);
              setIsModalOpen(true);
            }}
          />
          <FiTrash2
            size={18}
            className="cursor-pointer text-red-500 hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  // ====================== FILTERING =======================
  const filteredData = leads.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesScoreRange =
      (filters.score_min === undefined || parseInt(item.probability) >= filters.score_min) &&
      (filters.score_max === undefined || parseInt(item.probability) <= filters.score_max);


    const matchesAge =
      (filters.age_min === undefined || item.age >= filters.age_min) &&
      (filters.age_max === undefined || item.age <= filters.age_max);

    const matchesStatus = !filters.status || item.status === filters.status;

    const matchesJob = !filters.job || item.job === filters.job;

    return (
      matchesSearch &&
      matchesScoreRange &&
      matchesAge &&
      matchesStatus &&
      matchesJob
    );
  });

  // ====================== PAGINATION =======================
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
          onStatusChange={handleStatusChange}
        />
      </Modal>
    </div>
  );
}
