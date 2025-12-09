import Navbar from "../../components/layout/AdminNavbar";
import ProfileForm from "../../components/profile/ProfileForm";
import Footer from "../../components/layout/Footer";
import { useState } from "react";

export default function Profile() {

  // Ambil profile dari localStorage
  const stored = localStorage.getItem("admin_profile");

  const [userData, setUserData] = useState(
    stored
      ? JSON.parse(stored)
      : {
          fullname: "Admin Budi",
          email: "admin@mail.com",
          phone: "0812345678",
          address: "Jl Admin Raya",
          role: "Admin",
          avatarUri: null,
        }
  );

  // SAVE PROFILE
  const handleSave = (updated) => {
    localStorage.setItem("admin_profile", JSON.stringify(updated));
    setUserData(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center py-10">
        <ProfileForm
          user={userData}
          onSave={handleSave}
        />
      </div>

      <Footer />
    </div>
  );
}
