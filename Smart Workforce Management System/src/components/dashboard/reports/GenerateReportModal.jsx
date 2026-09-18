import { Modal, Form, Input, Select, DatePicker, Button, message } from "antd";
import api from "../../../lib/api";

const { Option } = Select;
const { RangePicker } = DatePicker;

function GenerateReportModal({ open, onClose, refreshReports, departments = [] }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await api.post("/report/create", values);
      await refreshReports();
      form.resetFields();
      onClose();
      message.success("Report generated successfully");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to generate report"
      );
    }
  };

  return (
    <Modal
      title="Generate AI Report"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width="min(750px, calc(100vw - 24px))"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <Form.Item
            label="Report Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Monthly Workforce Report" />
          </Form.Item>

          <Form.Item
            label="Report Type"
            name="type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select report type">
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="performance">Performance</Option>
              <Option value="workload">Workload Analysis</Option>
              <Option value="ai">AI Executive Report</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Department"
            name="departmentId"
          >
            <Select placeholder="Select department">
              <Option value="">All Departments</Option>
              {departments.map((department) => (
                <Option key={department._id} value={department._id}>
                  {department.departmentName} ({department.departmentCode})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date Range"
            name="dateRange"
            rules={[{ required: true }]}
          >
            <RangePicker
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="AI Analysis Focus"
            name="focus"
          >
            <Select placeholder="Choose AI focus">
              <Option value="productivity">
                Productivity Analysis
              </Option>

              <Option value="performance">
                Employee Performance
              </Option>

              <Option value="risk">
                Risk Detection
              </Option>

              <Option value="workload">
                Workload Balancing
              </Option>

              <Option value="forecast">
                Workforce Forecast
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Output Format"
            name="outputFormat"
            initialValue="word"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="word">Word document (.doc)</Option>
              <Option value="excel">Excel spreadsheet (.csv)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Additional Instructions"
            name="prompt"
          >
            <Input.TextArea
              rows={4}
              placeholder="Prompt: Highlight delayed projects and recommend resource allocation."
            />
          </Form.Item>

        </div>

        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mt-4">

          <h3 className="font-semibold text-blue-700">
            AI Report Preview
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            The AI will analyze workforce productivity, employee utilization,
            workload distribution, project risks, performance trends, and
            generate actionable recommendations.
          </p>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Generate Report
          </Button>

        </div>

      </Form>
    </Modal>
  );
}

export default GenerateReportModal;