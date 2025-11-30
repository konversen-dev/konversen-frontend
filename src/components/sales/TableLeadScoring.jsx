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
    { 
      id: "LD-01",
      name: "David Fahrreza",
      email: "david.fahrreza@example.com",
      phone: "081234567001",
      education: "S1 Manajemen",
      probability: "92%",
      age: 42,
      job: "Wirausaha",
      status: "Pending",
      domicile: "Semarang",
      cluster: "Premium",
      clusterDescription: "Lead dengan minat kuat dan potensi konversi sangat tinggi."
    },
    { 
      id: "LD-02",
      name: "Putri Utami Zahara",
      email: "putri.utami@example.com",
      phone: "081234567002",
      education: "S2 Hukum",
      probability: "85%",
      age: 35,
      job: "PNS",
      status: "Converted",
      domicile: "Solo",
      cluster: "High Value",
      clusterDescription: "Lead yang menunjukkan engagement konsisten dan memiliki daya beli stabil."
    },
    { 
      id: "LD-03",
      name: "Andi Pratama",
      email: "andi.pratama@example.com",
      phone: "081234567003",
      education: "D3 Informatika",
      probability: "60%",
      age: 23,
      job: "Freelancer",
      status: "Failed",
      domicile: "Tangerang",
      cluster: "Mid Tier",
      clusterDescription: "Lead dengan minat sedang, membutuhkan follow-up lebih intens."
    },
    { 
      id: "LD-04",
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      phone: "081234567004",
      education: "SMA",
      probability: "45%",
      age: 28,
      job: "Sales",
      status: "Contacted",
      domicile: "Bekasi",
      cluster: "Low Tier",
      clusterDescription: "Lead yang masih perlu pemahaman lebih tentang penawaran."
    },
    { 
      id: "LD-05",
      name: "Siti Aisyah",
      email: "siti.aisyah@example.com",
      phone: "081234567005",
      education: "S1 Akuntansi",
      probability: "77%",
      age: 31,
      job: "PNS",
      status: "Pending",
      domicile: "Surabaya",
      cluster: "High Value",
      clusterDescription: "Lead dengan potensi tinggi namun belum memberikan respon lanjutan."
    },
    { 
      id: "LD-06",
      name: "Rizky Hadi",
      email: "rizky.hadi@example.com",
      phone: "081234567006",
      education: "SMA",
      probability: "33%",
      age: 40,
      job: "Freelancer",
      status: "Failed",
      domicile: "Bandung",
      cluster: "Low Tier",
      clusterDescription: "Lead dengan minat rendah dan respons cenderung pasif."
    },
    { 
      id: "LD-07",
      name: "Nanda Prasetyo",
      email: "nanda.prasetyo@example.com",
      phone: "081234567007",
      education: "S1 Teknik Industri",
      probability: "81%",
      age: 37,
      job: "Sales",
      status: "Converted",
      domicile: "Yogyakarta",
      cluster: "Premium",
      clusterDescription: "Lead berkualitas sangat tinggi dengan respon cepat dan komitmen kuat."
    },
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
