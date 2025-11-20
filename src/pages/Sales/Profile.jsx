import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ProfileForm from "../../components/layout/ProfileForm";
import Footer from "../../components/layout/Footer";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Dummy data user (bisa kamu ganti dari API)
  const userData = {
    name: "Sarah Wijaya",
    email: "sarahwijaya@gmail.com",
    phone: "08579274392823",
    address: "Jl. Bunga Pinang",
    password: "sarahsaleswijaya45",
    photo: null,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato flex flex-col">
      <Navbar />

      <div className="flex justify-center items-center py-12">
        <ProfileForm 
          user={userData} 
          isEditing={isEditing} 
          setIsEditing={setIsEditing}
        />
      </div>

      <Footer />
    </div>
  );
}
