import {
  Form,
  Select,
  Tag,
  Spin,
  Space,
  Typography,
} from "antd";

import { RobotOutlined } from "@ant-design/icons";

import api from "../../../../lib/api";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const { Text } = Typography;

function TaskAssignment({
  form,
  projects = [],
  employees = [],
  onProjectChange,
  editingTask,
}) {
  const [suggesting, setSuggesting] =
    useState(false);

  const [recommendation, setRecommendation] =
    useState(null);

  /*
   * Tracks whether the manager has
   * manually selected an employee.
   *
   * If true, AI will NOT overwrite
   * the manager's selection.
   */
  const manuallySelectedEmployee =
    useRef(false);

  /*
   * ---------------------------------------
   * WATCH FORM VALUES
   * ---------------------------------------
   */

  const projectId = Form.useWatch(
    "projectId",
    form
  );

  const departmentId = Form.useWatch(
    "departmentId",
    form
  );

  const taskName = Form.useWatch(
    "taskName",
    form
  );

  const taskType = Form.useWatch(
    "taskType",
    form
  );

  const description = Form.useWatch(
    "description",
    form
  );

  const estimatedHours = Form.useWatch(
    "estimatedHours",
    form
  );

  const assignedTo = Form.useWatch(
    "assignedTo",
    form
  );

  /*
   * ---------------------------------------
   * RESET MANUAL SELECTION
   * ---------------------------------------
   *
   * New task = AI is allowed to recommend.
   */
  useEffect(() => {
    if (!editingTask) {
      manuallySelectedEmployee.current =
        false;
    }
  }, [editingTask]);

  /*
   * ---------------------------------------
   * PROJECT CHANGE
   * ---------------------------------------
   *
   * When project changes, the previous
   * employee recommendation is no longer
   * relevant.
   */
  useEffect(() => {
    if (!projectId) {
      setRecommendation(null);
      setSuggesting(false);
      return;
    }

    manuallySelectedEmployee.current =
      false;

    setRecommendation(null);
  }, [projectId]);

  /*
   * ---------------------------------------
   * AUTOMATIC AI RECOMMENDATION
   * ---------------------------------------
   *
   * Required:
   * - Project
   * - Department
   * - Task Name
   * - Task Type
   *
   * Description is optional.
   */
  useEffect(() => {
    /*
     * While editing an existing task,
     * don't automatically replace its
     * assigned employee.
     */
    if (editingTask) {
      setRecommendation(null);
      setSuggesting(false);
      return;
    }

    /*
     * Don't call the API until the
     * minimum information exists.
     */
    if (
      !projectId ||
      !departmentId ||
      !taskName?.trim() ||
      !taskType
    ) {
      setRecommendation(null);
      setSuggesting(false);
      return;
    }

    let cancelled = false;

    /*
     * Small delay prevents an API request
     * on every single keystroke.
     */
    const timer = setTimeout(
      async () => {
        try {
          setSuggesting(true);

          const payload = {
            projectId,

            departmentId,

            taskName:
              taskName.trim(),

            taskType,

            /*
             * Description is optional.
             */
            description:
              description?.trim() || "",

            estimatedHours:
              Number(
                estimatedHours || 0
              ),
          };

          const response = await api.post(
            "/ai/suggest-employee",
            payload
          );

          if (cancelled) {
            return;
          }

          if (
            response.data?.success
          ) {
            /*
             * Backend may return either:
             *
             * employee
             *
             * or
             *
             * recommendedEmployee
             */
            const employee =
              response.data
                ?.recommendedEmployee ||
              response.data?.employee;

            if (!employee?._id) {
              setRecommendation(null);
              return;
            }

            const result = {
              ...response.data,

              employee,

              recommendedEmployee:
                employee,

              breakdown:
                response.data
                  ?.breakdown || {},

              score:
                response.data
                  ?.score || 0,
            };

            setRecommendation(
              result
            );

            /*
             * Automatically select the
             * AI recommendation only if
             * the manager hasn't manually
             * selected somebody.
             */
            if (
              !manuallySelectedEmployee.current
            ) {
              form.setFieldValue(
                "assignedTo",
                employee._id
              );
            }
          } else {
            setRecommendation(null);
          }
        } catch (error) {
          if (!cancelled) {
            console.error(
              "AI employee recommendation error:",
              error
            );

            setRecommendation(null);
          }
        } finally {
          if (!cancelled) {
            setSuggesting(false);
          }
        }
      },
      700
    );

    return () => {
      cancelled = true;

      clearTimeout(timer);
    };
  }, [
    projectId,
    departmentId,
    taskName,
    taskType,
    description,
    estimatedHours,
    editingTask,
    form,
  ]);

  /*
   * ---------------------------------------
   * MANUAL EMPLOYEE SELECTION
   * ---------------------------------------
   *
   * Once manager selects somebody manually,
   * AI cannot overwrite the selection.
   */
  const handleEmployeeChange = (
    employeeId
  ) => {
    manuallySelectedEmployee.current =
      true;

    form.setFieldValue(
      "assignedTo",
      employeeId
    );
  };

  /*
   * ---------------------------------------
   * RECOMMENDED EMPLOYEE
   * ---------------------------------------
   */

  const recommendedEmployee =
    recommendation?.recommendedEmployee ||
    recommendation?.employee;

  /*
   * Support both:
   *
   * breakdown.skillMatch
   *
   * and
   *
   * breakdown.skill
   *
   * so frontend remains compatible.
   */
  const skillMatch =
    recommendation?.breakdown
      ?.skillMatch ??
    recommendation?.breakdown
      ?.skill ??
    0;

  const availability =
    recommendation?.breakdown
      ?.availability ?? 0;

  const experience =
    recommendation?.breakdown
      ?.experience ?? 0;

  const performance =
    recommendation?.breakdown
      ?.performance ?? 0;

  /*
   * ---------------------------------------
   * UI
   * ---------------------------------------
   */

  return (
    <>
      {/* -------------------------------- */}
      {/* PROJECT */}
      {/* -------------------------------- */}

      <Form.Item
        label="Project"
        name="projectId"
        rules={[
          {
            required: true,
            message:
              "Please select a project",
          },
        ]}
      >
        <Select
          placeholder="Select project"
          showSearch
          optionFilterProp="children"
          onChange={(value) => {
            /*
             * Clear old recommendation.
             */
            setRecommendation(null);

            /*
             * Allow AI to recommend
             * again for the new project.
             */
            manuallySelectedEmployee.current =
              false;

            onProjectChange(value);
          }}
        >
          {projects.map(
            (project) => (
              <Select.Option
                key={project._id}
                value={project._id}
              >
                {project.projectName}
              </Select.Option>
            )
          )}
        </Select>
      </Form.Item>

      {/* -------------------------------- */}
      {/* EMPLOYEE */}
      {/* -------------------------------- */}

      <Form.Item
        label="Assign To"
        name="assignedTo"
        rules={[
          {
            required: true,
            message:
              "Please select an employee",
          },
        ]}
      >
        <Select
          placeholder="Select employee"
          showSearch
          optionFilterProp="children"
          value={assignedTo}
          onChange={
            handleEmployeeChange
          }
        >
          {employees.map(
            (employee) => {
              const isRecommended =
                recommendedEmployee?._id ===
                employee._id;

              return (
                <Select.Option
                  key={employee._id}
                  value={employee._id}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>
                      {employee.name}

                      {employee.employeeId
                        ? ` (${employee.employeeId})`
                        : ""}
                    </span>

                    {isRecommended && (
                      <Tag
                        color="blue"
                        icon={
                          <RobotOutlined />
                        }
                      >
                        AI Match
                      </Tag>
                    )}
                  </div>
                </Select.Option>
              );
            }
          )}
        </Select>
      </Form.Item>

      {/* -------------------------------- */}
      {/* AI ANALYZING */}
      {/* -------------------------------- */}

      {suggesting && (
        <div className="md:col-span-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
          <Space>
            <Spin size="small" />

            <Text className="text-sm">
              AI is finding the best
              employee for this task...
            </Text>
          </Space>
        </div>
      )}

      {/* -------------------------------- */}
      {/* AI RECOMMENDATION */}
      {/* -------------------------------- */}

      {!suggesting &&
        recommendedEmployee && (
          <div className="md:col-span-2 rounded-xl border border-blue-200 bg-blue-50 p-4">

            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <RobotOutlined className="text-blue-600" />

                <Text strong>
                  AI Recommended Employee
                </Text>

              </div>

              <Tag color="blue">
                {recommendation?.score ||
                  0}
                % Match
              </Tag>

            </div>

            {/* Employee name */}

            <div className="mb-3">

              <Text strong>
                {
                  recommendedEmployee.name
                }
              </Text>

              {recommendedEmployee.designation && (
                <div className="text-sm text-gray-500">
                  {
                    recommendedEmployee.designation
                  }
                </div>
              )}

            </div>

            {/* Score breakdown */}

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

              {/* Skill */}

              <div className="rounded-lg bg-white p-2">

                <div className="text-xs text-gray-500">
                  Skill Match
                </div>

                <div className="font-semibold">
                  {skillMatch}%
                </div>

              </div>

              {/* Availability */}

              <div className="rounded-lg bg-white p-2">

                <div className="text-xs text-gray-500">
                  Availability
                </div>

                <div className="font-semibold">
                  {availability}%
                </div>

              </div>

              {/* Experience */}

              <div className="rounded-lg bg-white p-2">

                <div className="text-xs text-gray-500">
                  Experience
                </div>

                <div className="font-semibold">
                  {experience}%
                </div>

              </div>

              {/* Performance */}

              <div className="rounded-lg bg-white p-2">

                <div className="text-xs text-gray-500">
                  Performance
                </div>

                <div className="font-semibold">
                  {performance}%
                </div>

              </div>

            </div>

            {/* Explanation */}

            <div className="mt-3 text-xs text-gray-500">
              AI selected this employee
              based on skill match,
              availability, experience,
              and performance. The
              recommendation is only a
              suggestion — you can change
              the assigned employee above.
            </div>

          </div>
        )}
    </>
  );
}

export default TaskAssignment;