import { useState } from "react";
import { Alert, Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MailCheck, ShieldCheck } from "lucide-react";
import api from "../../lib/api";
import logo from "../../assets/logo.png";

const { Title, Text } = Typography;

function CreateWorkspace() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [workspaceDetails, setWorkspaceDetails] = useState({});
  const [step, setStep] = useState(1);

  const handleSendOtp = async (values) => {
    const response = await api.post("/auth/createWorkspace/send-otp", {
      companyName: values.companyName,
      adminName: values.adminName,
      email: values.email,
    });

    setEmail(values.email.trim().toLowerCase());
    setWorkspaceDetails({
      companyName: values.companyName.trim(),
      adminName: values.adminName.trim(),
      email: values.email.trim().toLowerCase(),
    });
    setOtpSent(true);
    setStep(2);
    message.success(response.data?.message || "Verification code sent to your email.");
  };

  const handleCreateWorkspace = async (values) => {
    await api.post("/auth/createWorkspace", {
      ...values,
      ...workspaceDetails,
      email,
      otp: values.otp,
    });

    message.success("Workspace created successfully.");
    navigate("/login");
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      if (!otpSent) {
        await handleSendOtp(values);
        return;
      }

      await handleCreateWorkspace(values);
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to continue.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmail = () => {
    setOtpSent(false);
    setStep(1);
    setEmail("");
    setWorkspaceDetails({});
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute left-6 top-6">
        <Link to="/" className="inline-flex items-center gap-2 font-medium text-white transition hover:text-blue-200">
          <ArrowLeft size={16} /> Back to website
        </Link>
      </div>

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="hidden bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-lg font-bold">
              <img src={logo} alt="Smart Workforce" className="h-12 w-12 rounded-xl object-cover" />
              Smart Workforce
            </div>
            <p className="mt-20 text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">One clear workspace</p>
            <h1 className="mt-5 max-w-md text-5xl font-bold leading-tight">Build a stronger team from day one.</h1>
            <p className="mt-6 max-w-md leading-7 text-blue-100">Create your workspace, verify your email, and start managing people, projects, and performance in one secure hub.</p>
          </div>
          <div className="space-y-4 text-sm text-blue-100">
            <div className="flex items-center gap-3"><ShieldCheck size={18} /> Secure email verification</div>
            <div className="flex items-center gap-3"><MailCheck size={18} /> Fast setup in under 2 minutes</div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-3">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step >= item ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {item}
                  </div>
                  {item < 2 && <div className="h-px w-8 bg-slate-200" />}
                </div>
              ))}
            </div>

            <Title level={2} className="!mb-2 !text-slate-900">
              {otpSent ? "Finish account setup" : "Create your workspace"}
            </Title>
            <Text type="secondary">
              {otpSent
                ? "Verify the code sent to your email, then create a secure password."
                : "Enter your workspace details and verify your administrator email."}
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            {!otpSent && (
              <>
                <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: "Please enter your company name" }]}>
                  <Input size="large" placeholder="Enter company name" />
                </Form.Item>

                <Form.Item label="Administrator Name" name="adminName" rules={[{ required: true, message: "Please enter administrator name" }]}>
                  <Input size="large" placeholder="Enter administrator name" />
                </Form.Item>

                <Form.Item label="Business Email" name="email" rules={[{ required: true, message: "Please enter your business email" }, { type: "email", message: "Please enter a valid email" }]}>
                  <Input size="large" placeholder="Enter business email" onChange={(event) => setEmail(event.target.value)} />
                </Form.Item>
              </>
            )}

            {otpSent && (
              <>
                <Alert className="mb-5" type="info" showIcon message={`We sent a 6-digit code to ${email}. Enter it below to verify your email.`} />

                <Form.Item label="Email Verification Code" name="otp" rules={[{ required: true, message: "Enter the 6-digit code" }, { pattern: /^[0-9]{6}$/, message: "Code must be 6 digits" }]}>
                  <Input size="large" maxLength={6} placeholder="Enter 6-digit OTP" />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter a password" }, { min: 6, message: "Password must be at least 6 characters" }]}>
                  <Input.Password size="large" placeholder="Create a secure password" />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match"));
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" placeholder="Confirm your password" />
                </Form.Item>

                <div className="mb-5 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <span>Use the code sent to your email before creating your password.</span>
                  <button type="button" onClick={handleEditEmail} className="font-semibold text-blue-600 hover:text-blue-800">
                    Change email
                  </button>
                </div>
              </>
            )}

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="!h-12 !w-full !rounded-xl !bg-blue-600 hover:!bg-blue-700"
            >
              {otpSent ? "Create Workspace" : "Verify Email"}
              {!otpSent && <ArrowRight size={17} className="ml-2" />}
            </Button>
          </Form>

          <div className="mt-6 text-center">
            <Text type="secondary">
              Already have a workspace? <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-800">Sign in</Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
