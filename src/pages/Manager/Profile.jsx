import Navbar from "../../components/layout/Navbar";
import ProfileForm from "../../components/profile/ProfileForm";
import Footer from "../../components/layout/Footer";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const userData = {
    fullname: "Manager Santi",
    email: "manager@mail.com",
    phone: "0822334455",
    address: "Jl Manager Utama",
    role: "Manager",
    avatarUri: null,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center py-10">
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
