import { Button } from "antd";

function TaskFormActions({
  editingTask,
  onCancel,
}) {
  return (
    <div className="mt-4 flex justify-end gap-3">

      <Button onClick={onCancel}>
        Cancel
      </Button>

      <Button
        type="primary"
        htmlType="submit"
      >
        {editingTask
          ? "Update Task"
          : "Create Task"}
      </Button>

    </div>
  );
}

export default TaskFormActions;