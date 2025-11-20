import React, { useState, useEffect, useRef } from "react";
import StatusBadge from "../utils/StatusBadge";
import CustomDropdown from "../utils/CustomDropdown";

export default function LeadDetailsModal({ lead, onStatusChange }) {
  const [logs, setLogs] = useState([
    {
      sender: "Dina (Sales)",
      type: "Feedback",
      time: "2025-11-20 13:20",
      message: "Lead menunjukkan minat tinggi, lanjut follow-up besok.",
    },
    {
      sender: "System",
      type: "System",
      time: "2025-11-20 12:05",
      message: "Status diubah menjadi Contacted.",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState("Feedback");

  // REF UNTUK AUTO SCROLL
  const bottomRef = useRef(null);

  // AUTO SCROLL KETIKA LOGS BERTAMBAH
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // HANDLE STATUS CHANGE (Tambah log Sistem otomatis)
  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);

    const systemLog = {
      sender: "System",
      type: "System",
      time: new Date().toLocaleString(),
      message: `Status diubah menjadi ${newStatus}.`,
    };

    setLogs((prev) => [...prev, systemLog]);
  };

  // HANDLE KIRIM PESAN
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newLog = {
      sender: "You",
      type: newType,
      time: new Date().toLocaleString(),
      message: newMessage,
    };

    setLogs((prev) => [...prev, newLog]);
    setNewMessage("");
  };

  if (!lead) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* ==========================
          LEFT CARD – LEAD DETAILS
      ========================== */}
      <div className="bg-white rounded-xl shadow-sm border p-5">
        <h2 className="text-primary-light font-semibold text-md mb-4">
          Lead Details
        </h2>

        <div className="space-y-3 text-sm text-primary-darkest">
          <DetailItem label="Lead Name" value={lead.name} />
          <DetailItem label="Email" value={lead.email} />
          <DetailItem label="Phone Number" value={lead.phone} />
          <DetailItem label="Age" value={lead.age} />
          <DetailItem label="Job" value={lead.job} />
          <DetailItem label="City" value={lead.city} />
        </div>

        <hr className="my-4" />

        <h3 className="text-primary-light font-semibold text-md mb-3">
          Campaign & Scoring Information
        </h3>

        <div className="space-y-3 text-sm text-primary-darkest">
          <DetailItem label="Probability" value={lead.probability} />

          {/* STATUS + DROPDOWN */}
          <div className="flex items-center gap-3">
            <span className="font-semibold">Status:</span>

            <CustomDropdown
              options={["Pending", "Contacted", "Converted", "Failed"]}
              defaultValue={lead.status}
              onChange={(newStatus) => handleStatusChange(newStatus)}
              width="w-44"
            />
            <StatusBadge status={lead.status} />
          </div>

          <DetailItem label="Last Contacted Date" value={lead.lastContact} />
        </div>
      </div>

      {/* ==========================
          RIGHT CARD – LOGS MESSAGE
      ========================== */}
      <div className="bg-white rounded-xl shadow-sm border p-5 flex flex-col">
        <h2 className="text-primary-light font-semibold text-md mb-3">
          Logs & Message
        </h2>

        {/* LOG LIST */}
        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
          {logs.map((item, index) => (
            <LogCard
              key={index}
              sender={item.sender}
              type={item.type}
              time={item.time}
              message={item.message}
            />
          ))}

          {/* ANCHOR AUTOSCROLL */}
          <div ref={bottomRef}></div>
        </div>

        {/* TEXT INPUT */}
        <textarea
          placeholder="Type message here..."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-primary-light focus:outline-none mt-4"
          rows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>

        {/* ACTION BUTTON */}
        <div className="flex gap-2 mt-3 self-end">
          {/* SELECT TIPE */}
          <CustomDropdown
            options={["Feedback", "Internal"]}
            onChange={(e) => setNewType(e.target.value)}
          />

          <button
            onClick={handleSendMessage}
            className="bg-primary-light hover:bg-[#C86F0D] text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
}

/* ==============================
   Detail Item Component
============================== */
function DetailItem({ label, value }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-gray-700">{value}</span>
    </p>
  );
}

/* ==============================
    Log Card Component
============================== */
function LogCard({ sender, type, time, message }) {
  const typeStyles = {
    Feedback: "bg-blue-100 text-blue-700",
    Internal: "bg-purple-100 text-purple-700",
    System: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-primary-darkest">{sender}</h4>

        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${typeStyles[type]}`}
        >
          {type}
        </span>
      </div>

      <p className="text-xs text-gray-500 mt-1">{time}</p>

      <p className="text-sm mt-2 text-gray-700 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
