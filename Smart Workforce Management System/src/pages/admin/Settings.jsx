import { useState } from "react";

import SettingsHeader from "../../components/dashboard/settings/SettingsHeader";
import AppearanceSettings from "../../components/dashboard/settings/AppearanceSettings";
import NotificationSettings from "../../components/dashboard/settings/NotificationSettings";
import AISettings from "../../components/dashboard/settings/AISettings";
import SecuritySettings from "../../components/dashboard/settings/SecuritySettings";
import AccountSettings from "../../components/dashboard/settings/AccountSettings";
import ChangePasswordModal from "../../components/dashboard/settings/ChangePasswordModal";

function Settings() {
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handleSave = () => {
    console.log("Save settings");
  };

  return (
    <div className="space-y-6">

      <SettingsHeader
        onSave={handleSave}
      />

      <AppearanceSettings />

      <NotificationSettings />

      <AISettings />

      <SecuritySettings
        onChangePassword={() =>
          setPasswordOpen(true)
        }
      />

      <AccountSettings />

      <ChangePasswordModal
        open={passwordOpen}
        onClose={() =>
          setPasswordOpen(false)
        }
      />

    </div>
  );
}

export default Settings;