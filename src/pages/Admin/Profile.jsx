import Navbar from "../../components/layout/Navbar";
import ProfileForm from "../../components/profile/ProfileForm";
import Footer from "../../components/layout/Footer";
import { useState, useEffect } from "react";
import { profileService } from "../../services/profileService";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileService.getProfile();
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // SAVE PROFILE
  const handleSave = async (updated) => {
    try {
      await profileService.updateProfile(updated);
      setUserData(updated);
      return true;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light"></div>
        </div>
        <Footer />
      </div>
    );
  }

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
