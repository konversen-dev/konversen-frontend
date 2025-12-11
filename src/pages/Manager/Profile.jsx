// src/pages/Profile/Profile.jsx
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
        // prefer response.data if backend wraps user in data
        setUserData(response.data || null);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // SAVE PROFILE
  const handleSave = async (updated) => {
    try {
      // expect backend returns the updated user in response.data
      const response = await profileService.updateProfile(updated);
      const saved = response?.data ?? updated;
      setUserData(saved);
      return saved; // return saved user for caller if needed
    } catch (error) {
      console.error("Failed to update profile:", error);
      // rethrow so ProfileForm can handle/display inline error
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

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center py-20 gap-4">
          <p className="text-gray-600">No profile data available.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Retry
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center py-10">
        <ProfileForm user={userData} onSave={handleSave} />
      </div>
      <Footer />
    </div>
  );
}
