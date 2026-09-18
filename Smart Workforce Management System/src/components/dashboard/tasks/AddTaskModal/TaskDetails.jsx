import {
  Form,
  Select,
  InputNumber,
  DatePicker,
} from "antd";

function TaskDetails() {
  return (
    <>
      <Form.Item
        label="Priority"
        name="priority"
        rules={[
          {
            required: true,
            message:
              "Please select priority",
          },
        ]}
      >
        <Select
          placeholder="Select priority"
        >
          <Select.Option value="Low">
            Low
          </Select.Option>

          <Select.Option value="Medium">
            Medium
          </Select.Option>

          <Select.Option value="High">
            High
          </Select.Option>

          <Select.Option value="Critical">
            Critical
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Estimated Hours"
        name="estimatedHours"
      >
        <InputNumber
          min={0}
          className="w-full"
          placeholder="Enter estimated hours"
        />
      </Form.Item>

      <Form.Item
        label="Actual Hours"
        name="actualHours"
        rules={[{ type: "number", min: 0, message: "Actual hours cannot be negative" }]}
      >
        <InputNumber
          min={0}
          className="w-full"
          placeholder="Enter hours spent"
        />
      </Form.Item>

      <Form.Item
        label="Start Date"
        name="startDate"
        rules={[
          {
            required: true,
            message:
              "Please select the start date",
          },
        ]}
      >
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        label="Due Date"
        name="dueDate"
        dependencies={["startDate"]}
        rules={[
          {
            required: true,
            message:
              "Please select the due date",
          },

          ({ getFieldValue }) => ({
            validator(_, dueDate) {
              const startDate =
                getFieldValue(
                  "startDate"
                );

              if (
                !startDate ||
                !dueDate ||
                dueDate.isSame(
                  startDate,
                  "day"
                ) ||
                dueDate.isAfter(
                  startDate,
                  "day"
                )
              ) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error(
                  "Due date cannot be before start date"
                )
              );
            },
          }),
        ]}
      >
        <DatePicker className="w-full" />
      </Form.Item>
    </>
  );
}

export default TaskDetails;