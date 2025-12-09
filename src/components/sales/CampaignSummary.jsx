import React from "react";
import SummaryCard from "../layout/SummaryCard.jsx";

// Import ICON MANAGER
import totalCampaignIcon from "../../assets/manager/marketing.png";
import activeIcon from "../../assets/manager/advertisement.png";
import completedIcon from "../../assets/manager/completedC.png";

// Icon total leads (tetap usersIcon dari sales)
import usersIcon from "../../assets/sales/users.png";

export default function CampaignSummary({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

      <SummaryCard
        title="Total Campaigns"
        value={data.totalCampaigns}
        iconSrc={totalCampaignIcon}
      />

      <SummaryCard
        title="Total Leads"
        value={data.totalLeads}
        iconSrc={usersIcon}
      />

      <SummaryCard
        title="Active Campaign"
        value={data.active}
        iconSrc={activeIcon}
      />

      <SummaryCard
        title="Completed Campaign"
        value={data.completed}
        iconSrc={completedIcon}
      />
      
    </div>
  );
}
