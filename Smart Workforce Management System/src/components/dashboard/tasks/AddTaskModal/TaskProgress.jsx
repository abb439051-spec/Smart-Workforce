import {
  Form,
  Select,
  Slider,
} from "antd";

function TaskProgress({ form }) {
  return (
    <>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          onChange={(value) => {
            if (value === "Completed") {
              form.setFieldValue(
                "completionPercentage",
                100
              );
            }

            if (value === "Todo") {
              form.setFieldValue(
                "completionPercentage",
                0
              );
            }
          }}
        >
          <Select.Option value="Todo">
            Todo
          </Select.Option>

          <Select.Option value="In Progress">
            In Progress
          </Select.Option>

          <Select.Option value="Review">
            Review
          </Select.Option>

          <Select.Option value="Completed">
            Completed
          </Select.Option>
        </Select>
      </Form.Item>

      <div className="md:col-span-2">
        <Form.Item
          label="Completion"
          name="completionPercentage"
        >
          <Slider
            min={0}
            max={100}
            step={5}
            tooltip={{
              formatter: (value) =>
                `${value}%`,
            }}
            onChange={(value) => {
              if (value === 100) {
                form.setFieldValue(
                  "status",
                  "Completed"
                );
              } else if (
                form.getFieldValue(
                  "status"
                ) === "Completed"
              ) {
                form.setFieldValue(
                  "status",
                  "In Progress"
                );
              }
            }}
          />
        </Form.Item>
      </div>
    </>
  );
}

export default TaskProgress;