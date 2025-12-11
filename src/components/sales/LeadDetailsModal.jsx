import React, { useState, useEffect, useRef } from "react";
import StatusBadge from "../utils/StatusBadge";
import CustomDropdown from "../utils/CustomDropdown";
import noteService from "../../services/noteService.js";

export default function LeadDetailsModal({ lead, onStatusChange, campaignId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [newType, setNewType] = useState("Feedback");

  // REF UNTUK AUTO SCROLL
  const bottomRef = useRef(null);

  // Fetch notes when modal opens
  useEffect(() => {
    if (lead?.id && campaignId) {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead?.id, campaignId]);

  // AUTO SCROLL KETIKA LOGS BERTAMBAH
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await noteService.getNotes({
        leadId: lead.id,
        campaignId: campaignId
      });
      
      // Data langsung di response.data (array)
      const notes = response.data || [];
      
      // Transform notes to logs format
      const transformedLogs = notes.map(note => ({
        id: note.id,
        sender: note.created_by || "Unknown",
        type: note.type || "general",
        time: note.time ? new Date(note.time).toLocaleString('id-ID') : "",
        message: note.text || ""
      }));
      
      setLogs(transformedLogs);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE STATUS CHANGE (Tambah log Sistem otomatis + call API)
  const handleStatusChange = async (newStatus) => {
    await onStatusChange(newStatus);
    
    // Refresh notes setelah status berubah
    fetchNotes();
  };

  // HANDLE KIRIM PESAN
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const noteData = {
        leadId: lead.id,
        campaignId: campaignId,
        noteType: newType, // Convert to lowercase for API
        noteText: newMessage
      };

      await noteService.createNote(noteData);
      
      setNewMessage("");
      
      // Refresh notes after creating
      fetchNotes();
    } catch (error) {
      console.error('Failed to create note:', error);
    }
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
          <DetailItem label="Education" value={lead.education} />
          <DetailItem label="Domicile" value={lead.city} />
        </div>

        <hr className="my-4" />

        <h3 className="text-primary-light font-semibold text-md mb-3">
          Campaign & Scoring Information
        </h3>

        <div className="space-y-3 text-sm text-primary-darkest">
          <DetailItem label="Probability" value={`${lead.score}%`} />

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

          <DetailItem label="Cluster" value={lead.cluster} />

          {/* DESKRIPSI CLUSTER TANPA LABEL */}
          {lead.clusterDescription && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {lead.clusterDescription}
            </p>
          )}
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
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {loading ? (
            <div className="text-center text-gray-500 py-4">Loading notes...</div>
          ) : logs.length === 0 ? (
            <div className="text-center text-gray-500 py-4">No notes yet. Start a conversation!</div>
          ) : (
            logs.map((item, index) => (
              <LogCard
                key={item.id || index}
                sender={item.sender}
                type={item.type}
                time={item.time}
                message={item.message}
              />
            ))
          )}

          {/* ANCHOR AUTOSCROLL */}
          <div ref={bottomRef}></div>
        </div>

        {/* TEXT INPUT */}
        <textarea
          placeholder="Type message here..."
          className="w-full h-12 border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-primary-light focus:outline-none mt-4"
          rows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>

        {/* ACTION BUTTON */}
        <div className="flex gap-2 mt-3 self-end">
          {/* SELECT TIPE */}
          <CustomDropdown
            options={["Feedback", "Internal"]}
            onChange={(value) => setNewType(value)}
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
    feedback: "bg-blue-100 text-blue-700",
    internal: "bg-purple-100 text-purple-700",
    system: "bg-yellow-100 text-yellow-800",
    // Fallback for any other types
    general: "bg-gray-100 text-gray-700",
  };

  // Capitalize first letter for display
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-primary-darkest">{sender}</h4>

        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${typeStyles[type.toLowerCase()] || typeStyles.general}`}
        >
          {displayType}
        </span>
      </div>

      <p className="text-xs text-gray-500 mt-1">{time}</p>

      <p className="text-sm mt-2 text-gray-700 leading-relaxed">
        {message}
      </p>
    </div>
  );
}
