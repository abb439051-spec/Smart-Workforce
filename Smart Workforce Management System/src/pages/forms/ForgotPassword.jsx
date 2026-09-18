import { useState } from "react";
import { Alert, Button, Form, Input, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { KeyRound, ArrowLeft } from "lucide-react";
import api from "../../lib/api";

const { Title, Text } = Typography;

function ForgotPassword() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [requestPending, setRequestPending] = useState(false);
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError("");
      if (!otpSent) {
        const response = await api.post("/auth/forgot-password/send-otp", { email: values.email });
        const requestEmail = values.email.trim().toLowerCase();
        setEmail(requestEmail);

        if (response.data.requestPending) {
          setRequestPending(true);
          message.info(response.data.message);
          return;
        }

        setRequestPending(false);
        setRequiresOtp(response.data.requiresOtp !== false);
        setOtpSent(true);
        message.success(response.data.message || "You can now choose a new password.");
        return;
      }

      if (requiresOtp && !otpVerified) {
        await api.post("/auth/forgot-password/verify-otp", {
          email,
          otp: values.otp,
        });
        setOtpVerified(true);
        message.success("Email OTP verified. You can now choose a new password.");
        return;
      }

      await api.post("/auth/forgot-password/reset", {
        email,
        password: values.password,
        otp: values.otp,
      });

      message.success("Password reset successfully. You can now sign in.");
      navigate("/login");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-10">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft size={16} /> Back to sign in</Link>
        <div className="mt-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600"><KeyRound size={26} /></div>
          <Title level={2} className="!mb-2 !mt-5">Reset password</Title>
          <Text type="secondary">
            {requestPending
              ? "Your request is waiting for approval. Check again after your manager or administrator responds."
              : otpSent
                ? requiresOtp
                  ? otpVerified
                    ? "Your email is verified. Choose and confirm a new password."
                    : "Enter the OTP sent to your email before choosing a new password."
                  : "Choose a new password for your account."
                : "Enter your account email to reset your password."}
          </Text>
        </div>
        <Form layout="vertical" className="mt-8" onFinish={onFinish}>
          <Form.Item label="Account email" name="email" initialValue={email} rules={[{ required: true, message: "Enter your email" }, { type: "email", message: "Enter a valid email" }]}>
            <Input size="large" disabled={otpSent} placeholder="name@company.com" />
          </Form.Item>
          {requestPending && (
            <Alert className="mb-5" type="info" showIcon message="Approval is required from your manager or an administrator. This page will let you continue once approved." />
          )}
          {otpSent && <>
            {requiresOtp && !otpVerified && <Alert className="mb-5" type="info" showIcon message={`A 6-digit code was sent to ${email}. Verify it before entering a new password.`} />}
            {requiresOtp && !otpVerified && <Form.Item label="Email verification code" name="otp" rules={[{ required: true }, { pattern: /^[0-9]{6}$/, message: "Enter the 6-digit code" }]}><Input size="large" maxLength={6} placeholder="000000" /></Form.Item>}
            {(!requiresOtp || otpVerified) && <Form.Item label="New password" name="password" rules={[{ required: true }, { min: 6, message: "Use at least 6 characters" }]}><Input.Password size="large" placeholder="New password" /></Form.Item>}
            {(!requiresOtp || otpVerified) && <Form.Item
              label="Confirm new password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirm your new password" },
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
              <Input.Password size="large" placeholder="Confirm new password" />
            </Form.Item>}
          </>}
          {error && <Alert className="mb-5" type="error" showIcon message={error} />}
          <Button type="primary" htmlType="submit" loading={loading} size="large" className="!h-12 !w-full !rounded-xl !bg-blue-600">
            {otpSent ? (requiresOtp && !otpVerified ? "Verify email OTP" : "Reset password") : requestPending ? "Check approval status" : "Continue"}
          </Button>
        </Form>
      </div>
    </main>
  );
}

export default ForgotPassword;
