import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TeamOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const detailConfig = [
  {
    title: "Employee ID",
    icon: <IdcardOutlined />,
  },
  {
    title: "Email",
    icon: <MailOutlined />,
  },
  {
    title: "Phone",
    icon: <PhoneOutlined />,
  },
  {
    title: "Department",
    icon: <TeamOutlined />,
  },
  {
    title: "Joining Date",
    icon: <CalendarOutlined />,
  },
  {
    title: "Location",
    icon: <EnvironmentOutlined />,
  },
  {
    title: "Company",
    icon: <IdcardOutlined />,
  },
  {
    title: "Employment Type",
    icon: <IdcardOutlined />,
  },
];

function ProfileOverview({ user }) {
  const details = detailConfig.map((item) => {
    const values = {
      "Employee ID": user.employeeId || "N/A",
      Email: user.userEmail,
      Phone: user.phone || "Not provided",
      Department:
        user.role === "manager" && user.departments?.length
          ? user.departments.map((department) => department.departmentName).join(", ")
          : user.departmentId?.departmentName || "Not assigned",
      "Joining Date": user.joiningDate
        ? new Date(user.joiningDate).toLocaleDateString()
        : "Not available",
      Location: user.address || "Not provided",
      Company: user.workspaceId?.companyName || "Not provided",
      "Employment Type": user.employmentType || "Not provided",
    };

    return { ...item, value: values[item.title] };
  });
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-7">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Profile Overview</h2>
        <p className="mt-1 text-sm text-gray-500">Your personal and employment details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {details.map((item) => (

          <div
            key={item.title}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
          >

            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-md">
              {item.icon}
            </div>

            <div>

              <p className="text-sm text-gray-500">
                {item.title}
              </p>

              <p className="font-semibold text-gray-800">
                {item.value}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProfileOverview;