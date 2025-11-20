import React from "react";
import SummaryCard from "../layout/SummaryCard.jsx";
import campaignIcon from "../../assets/sales/campaign.png";
import userIcon from "../../assets/sales/users.png";
import noteIcon from "../../assets/sales/note.png";
import doneIcon from "../../assets/sales/done.png";

export default function CampaignSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
      <SummaryCard title="Total Campaigns" value="25" iconSrc={campaignIcon} altText="Campaign Icon" />
      <SummaryCard title="Total Leads" value="328" iconSrc={userIcon} altText="User Icon" />
      <SummaryCard title="Active Campaign" value="18" iconSrc={noteIcon} altText="Active Campaign Icon" />
      <SummaryCard title="Campaign Completed" value="7" iconSrc={doneIcon} altText="Campaign Complete Icon" />
    </div>
  );
}
