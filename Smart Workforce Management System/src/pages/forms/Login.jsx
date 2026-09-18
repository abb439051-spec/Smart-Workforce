import { useState } from "react";
import { Alert, Button, Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import api from "../../lib/api";
import logo from "../../assets/logo.png";

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError("");
      const response = await api.post("/auth/login", values);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate(`/${response.data.user?.role || "employee"}/dashboard`, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute left-6 top-6">
        <Link to="/" className="inline-flex items-center gap-2 font-medium text-white transition hover:text-blue-200">
          <ArrowLeft size={16} /> Back to website
        </Link>
      </div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden bg-gradient-to-br from-blue-600 to-indigo-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-3 text-lg font-bold">
              <img src={logo} alt="Smart Workforce" className="h-12 w-12 rounded-xl object-cover" />
              Smart Workforce
            </Link>
            <p className="mt-20 text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">Work smarter together</p>
            <h1 className="mt-5 text-5xl font-bold leading-tight">Your workforce, clearly in view.</h1>
            <p className="mt-6 max-w-md leading-7 text-blue-100">Turn everyday workforce activity into focused decisions, healthier workloads, and better results.</p>
          </div>
          <div className="space-y-4 text-sm text-blue-100">
            <div className="flex items-center gap-3"><ShieldCheck size={18} /> Secure workspace access</div>
            <div className="flex items-center gap-3"><LockKeyhole size={18} /> Protected by role-based permissions</div>
          </div>
        </section>

        <section className="p-7 sm:p-12">
          <div className="mt-8">
            <Title level={2} className="!mb-2 !text-slate-900">Welcome back</Title>
            <Text type="secondary">Sign in to continue to your workspace.</Text>
          </div>

          <Form layout="vertical" className="mt-8" onFinish={onFinish} initialValues={{ remember: true }}>
            <Form.Item label="Business email" name="email" rules={[{ required: true, message: "Enter your business email" }, { type: "email", message: "Enter a valid email" }]}>
              <Input size="large" placeholder="you@company.com" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter your password" }]}>
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <div className="mb-5 flex items-center justify-between gap-3">
              <Form.Item name="remember" valuePropName="checked" className="!mb-0"><Checkbox>Remember me</Checkbox></Form.Item>
              <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-800">Forgot password?</Link>
            </div>

            {error && <Alert className="mb-5" type="error" showIcon message={error} />}

            <Button type="primary" htmlType="submit" loading={loading} size="large" className="!h-12 !w-full !rounded-xl !bg-blue-600 hover:!bg-blue-700">
              Sign in <ArrowRight size={17} className="ml-2" />
            </Button>
          </Form>

          <p className="mt-7 text-center text-sm text-slate-500">New to Smart Workforce? <Link to="/register" className="font-semibold text-blue-600">Create a workspace</Link></p>
        </section>
      </div>
    </main>
  );
}

export default Login;
