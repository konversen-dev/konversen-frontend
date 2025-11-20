import React from "react";
import Header from "../layout/Header.jsx";
import Button from "../utils/Button.jsx";

export default function CampaignHeader({ campaignOptions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <Header
        title="Campaign"
        subtitle="View and join available campaigns to expand your lead reach."
      />

      <div className="flex gap-3 mt-4 sm:mt-0">
        <Button text="Current campaign" variant="dropdown" options={campaignOptions} />
      </div>
    </div>
  );
}
