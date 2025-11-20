import React from "react";
import Header from "../layout/Header.jsx";
import Button from "../utils/Button.jsx";

export default function DashboardHeader({ campaignOptions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <Header
        title="Lead Scoring Dashboard"
        subtitle="Prioritize your potential customers effectively."
      />

      <div className="flex gap-3 mt-4 sm:mt-0">
        <Button text="Current campaign" variant="dropdown" options={campaignOptions} />
      </div>
    </div>
  );
}
