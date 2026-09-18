import {
  Form,
  Input,
  Select,
} from "antd";

function TaskBasicInfo() {
  return (
    <>
      <Form.Item
        label="Task Name"
        name="taskName"
        rules={[
          {
            required: true,
            message:
              "Please enter the task name",
          },
        ]}
      >
        <Input
          placeholder="Enter task name"
        />
      </Form.Item>

      <Form.Item
        label="Task Code"
        name="taskCode"
      >
        <Input
          placeholder="Example: TASK001"
        />
      </Form.Item>

      <Form.Item
        label="Task Type"
        name="taskType"
        rules={[
          {
            required: true,
            message:
              "Please select task type",
          },
        ]}
      >
        <Select
          placeholder="Select task type"
        >
          <Select.Option value="Development">
            Development
          </Select.Option>

          <Select.Option value="Design">
            Design
          </Select.Option>

          <Select.Option value="Bug Fix">
            Bug Fix
          </Select.Option>

          <Select.Option value="Research">
            Research
          </Select.Option>

          <Select.Option value="Documentation">
            Documentation
          </Select.Option>

          <Select.Option value="Testing">
            Testing
          </Select.Option>

          <Select.Option value="Meeting">
            Meeting
          </Select.Option>

          <Select.Option value="Other">
            Other
          </Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}

export default TaskBasicInfo;