import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { getUserProfile, updateUserName, changeUserPassword } from '../services/userService';
import type { UserProfile } from '../types/Types';
import { useUIStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { showMessage, setLoading, isLoading } = useUIStore(); // Import isLoading
  const { setUser } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setProfile(data);
        setName(data.name);
      } catch (error: any) {
        showMessage('error', error.message || 'Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [showMessage, setLoading]);

  const handleUpdateName = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      showMessage('error', 'Name cannot be empty.');
      return;
    }
    try {
      setLoading(true);
      const updatedProfile = await updateUserName(name);
      setProfile(updatedProfile);
      setUser(updatedProfile); // Update user in auth store as well
      showMessage('success', 'Name updated successfully!');
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to update name.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      showMessage('error', 'All password fields are required.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showMessage('error', 'New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 6) { // Example simple validation
      showMessage('error', 'New password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await changeUserPassword(currentPassword, newPassword);
      showMessage('success', 'Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>

      {/* Update Name Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Personal Information</h2>
        <form onSubmit={handleUpdateName}>
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={profile.email}
            disabled
            className="cursor-not-allowed bg-gray-50"
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" variant="primary" loading={isLoading}> {/* Pass loading prop */}
              Update Name
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" variant="danger" loading={isLoading}> {/* Pass loading prop */}
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
