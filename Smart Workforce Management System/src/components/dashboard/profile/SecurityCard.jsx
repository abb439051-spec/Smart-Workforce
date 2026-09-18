import {
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";

function SecurityCard({ user }) {
  return (
    <div className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white text-xl">
          <FaShieldAlt />
        </div>

        <div>

          <h2 className="text-xl font-semibold text-gray-800">
            Security & Account
          </h2>

          <p className="text-sm text-gray-500">
            Your account security overview
          </p>

        </div>

      </div>

      <div className="space-y-3">

        {/* Password */}

        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 p-4 transition-all hover:border-blue-300">

          <div className="flex items-center gap-3">

            <FaLock className="text-blue-600 text-lg" />

            <div>

              <h4 className="font-semibold">
                Password
              </h4>

              <p className="text-sm text-gray-500">
                Password is configured
              </p>

            </div>

          </div>

          <span className="text-green-600 font-semibold">
            Configured
          </span>

        </div>

        {/* Device */}

        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 p-4 transition-all hover:border-blue-300">

          <div className="flex items-center gap-3">

            <FaShieldAlt className="text-indigo-600 text-lg" />

            <div>

              <h4 className="font-semibold">
                Current Device
              </h4>

              <p className="text-sm text-gray-500">
                Current session
              </p>

            </div>

          </div>

          <span className="text-blue-600 font-medium">
            Active
          </span>

        </div>

        {/* Login */}

        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 p-4 transition-all hover:border-blue-300">

          <div className="flex items-center gap-3">

            <FaShieldAlt className="text-orange-500 text-lg" />

            <div>

              <h4 className="font-semibold">
                Last Login
              </h4>

              <p className="text-sm text-gray-500">
                {user?.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "No successful login recorded"}
              </p>

            </div>

          </div>

          <span className="text-gray-500">
            {user?.lastLogin ? "Recorded" : "Not available"}
          </span>

        </div>

      </div>

      {/* Security Score */}

      <div className="mt-8 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-white">

        <p className="text-sm opacity-80">
          Security Score
        </p>

        <h2 className="text-4xl font-bold mt-2">
          Basic
        </h2>

        <p className="text-sm mt-2 opacity-90">
          Security features are limited to the account settings currently available.
        </p>

      </div>

    </div>
  );
}

export default SecurityCard;