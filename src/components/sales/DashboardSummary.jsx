import React from "react";
import SummaryCard from "../layout/SummaryCard.jsx";
import usersIcon from "../../assets/sales/users.png";
import chartIcon from "../../assets/sales/chart.png";
import phoneIcon from "../../assets/sales/phone.png";
import handshakeIcon from "../../assets/sales/handshake.png";

export default function DashboardSummary({ data = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
      <SummaryCard 
        title="Total Leads" 
        value={data.totalLeads || 0} 
        iconSrc={usersIcon} 
        altText="Users Icon" 
      />
      <SummaryCard 
        title="High Probability" 
        value={data.highProbability || 0} 
        iconSrc={chartIcon} 
        altText="Chart Icon" 
      />
      <SummaryCard 
        title="Leads Contacted" 
        value={data.leadsContacted || 0} 
        iconSrc={phoneIcon} 
        altText="Phone Icon" 
      />
      <SummaryCard 
        title="Converted Leads" 
        value={data.convertedLeads || 0} 
        iconSrc={handshakeIcon} 
        altText="Handshake Icon" 
      />
    </div>
  );
}
