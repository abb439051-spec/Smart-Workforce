import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import api from "../../lib/api";

import ProfileHeader from "../../components/dashboard/profile/ProfileHeader";
import ProfileOverview from "../../components/dashboard/profile/ProfileOverview";
import SecurityCard from "../../components/dashboard/profile/SecurityCard";
import EditProfileModal from "../../components/dashboard/profile/EditProfileModal";
import AccountSettings from "../../components/dashboard/settings/AccountSettings";
import ContactAdminModal from "../../components/dashboard/profile/ContactAdminModal";

function Profile() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    api.get("/auth/profile")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        message.error(
          error.response?.data?.message || "Unable to load profile"
        );
      });
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-8 bg-slate-50/70 p-1">

      <ProfileHeader
        user={user}
        onEditProfile={() => setOpen(true)}
        onContactAdmin={() => setContactOpen(true)}
      />

      <ProfileOverview user={user} />

      <div className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">

        <SecurityCard user={user} />
        <AccountSettings user={user} />
      </div>

      <EditProfileModal
        open={open}
        user={user}
        onUpdated={setUser}
        onClose={() => setOpen(false)}
      />
      {user.role === "manager" && (
        <ContactAdminModal open={contactOpen} onClose={() => setContactOpen(false)} />
      )}

    </div>
  );
}

export default Profile;