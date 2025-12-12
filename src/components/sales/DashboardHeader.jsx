import React from "react";
import Header from "../layout/Header.jsx";
import Button from "../utils/Button.jsx";

export default function DashboardHeader({ 
  campaignOptions, 
  selectedCampaign, 
  onCampaignChange 
}) {
  return (
    <div className="flex items-start justify-between gap-6 mb-8">
      
      {/* LEFT */}
      <div className="max-w-[70%]">
        <h1 className="text-[22px] sm:text-2xl font-bold text-primary-darkest leading-snug">
          Lead Scoring Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          Prioritize your potential customers effectively.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center pt-1 shrink-0">
        <Button 
          text="Akhir Tahun Aman 2025"
          variant="dropdown"
          options={campaignOptions}
          value={selectedCampaign}
          onChange={onCampaignChange}
        />
      </div>

    </div>
  );
}
