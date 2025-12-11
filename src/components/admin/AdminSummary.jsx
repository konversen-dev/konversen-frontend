import React from "react";
import SummaryCard from "../layout/SummaryCard";

// icons
import totalTeamIcon from "../../assets/admin/totaTeam.png";
import salesIcon from "../../assets/admin/sales.png";
import managerIcon from "../../assets/admin/manager.png";
import adminIcon from "../../assets/admin/admin.png";
import activeAccountIcon from "../../assets/admin/activeAccount.png";

export default function AdminSummary({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <SummaryCard title="Total Accounts" value={data.totalTeam} iconSrc={totalTeamIcon} />
      <SummaryCard title="Sales" value={data.totalSales} iconSrc={salesIcon} />
      <SummaryCard title="Managers" value={data.totalManagers} iconSrc={managerIcon} />
      <SummaryCard title="Admins" value={data.totalAdmins} iconSrc={adminIcon} />
      <SummaryCard title="Active Accounts" value={data.totalActive} iconSrc={activeAccountIcon} />
    </div>
  );
}
