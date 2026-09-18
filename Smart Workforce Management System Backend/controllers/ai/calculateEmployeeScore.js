const normalizeText = (value) => {
  return String(value || "")
    .toLowerCase()
    .replace(
      /[^a-z0-9+#.\s-]/g,
      " "
    )
    .replace(/\s+/g, " ")
    .trim();
};

const getTaskKeywords = (task) => {
  const taskType = normalizeText(
    task.taskType
  );

  const taskName = normalizeText(
    task.taskName
  );

  const description = normalizeText(
    task.description
  );

  const keywords = new Set();

  const typeKeywords = {
    development: [
      "development",
      "developer",
      "programming",
      "coding",
      "software",
      "frontend",
      "backend",
      "full stack",
      "javascript",
      "react",
      "node",
    ],

    design: [
      "design",
      "ui",
      "ux",
      "figma",
      "frontend",
      "visual",
    ],

    "bug fix": [
      "bug",
      "debugging",
      "troubleshooting",
      "development",
      "testing",
    ],

    research: [
      "research",
      "analysis",
      "analytical",
      "data",
    ],

    documentation: [
      "documentation",
      "technical writing",
      "writing",
    ],

    testing: [
      "testing",
      "qa",
      "quality assurance",
      "automation",
      "debugging",
    ],

    meeting: [
      "communication",
      "management",
      "planning",
      "coordination",
    ],

    other: [],
  };

  const mappedKeywords =
    typeKeywords[taskType] || [];

  mappedKeywords.forEach(
    (keyword) => {
      keywords.add(
        normalizeText(keyword)
      );
    }
  );

  /*
   * Task name is always considered.
   */

  taskName
    .split(/\s+/)
    .filter(
      (word) => word.length >= 3
    )
    .forEach((word) => {
      keywords.add(word);
    });

  /*
   * Description is optional.
   *
   * If provided, it gives the
   * recommendation additional context.
   */

  if (description) {
    description
      .split(/\s+/)
      .filter(
        (word) => word.length >= 3
      )
      .forEach((word) => {
        keywords.add(word);
      });
  }

  return Array.from(keywords);
};

const calculateSkillScore = (
  employee,
  task
) => {
  const employeeSkills =
    Array.isArray(employee.skills)
      ? employee.skills.map(
          normalizeText
        )
      : [];

  const designation =
    normalizeText(
      employee.designation
    );

  if (
    !employeeSkills.length &&
    !designation
  ) {
    return 0;
  }

  const taskKeywords =
    getTaskKeywords(task);

  if (!taskKeywords.length) {
    return 0;
  }

  let matchedKeywords = 0;

  taskKeywords.forEach(
    (keyword) => {
      const skillMatch =
        employeeSkills.some(
          (skill) =>
            skill === keyword ||
            skill.includes(keyword) ||
            keyword.includes(skill)
        );

      const designationMatch =
        designation.includes(keyword) ||
        keyword.includes(designation);

      if (
        skillMatch ||
        designationMatch
      ) {
        matchedKeywords++;
      }
    }
  );

  let score =
    (matchedKeywords /
      taskKeywords.length) *
    100;

  /*
   * Description bonus.
   *
   * Description gives additional context
   * but does not become a separate
   * scoring category.
   */

  const hasDescription =
    Boolean(
      normalizeText(
        task.description
      )
    );

  if (
    hasDescription &&
    score > 0
  ) {
    score += 10;
  }

  return Math.min(
    Math.round(score),
    100
  );
};

const calculateEmployeeScore = (
  employee,
  task,
  workload = null
) => {
  /*
   * ---------------------------------------
   * SKILL MATCH — 40%
   * ---------------------------------------
   */

  const skillScore =
    calculateSkillScore(
      employee,
      task
    );

  /*
   * ---------------------------------------
   * AVAILABILITY — 30%
   * ---------------------------------------
   */

  let capacityPercentage =
    Number(
      employee.capacityPercentage || 0
    );

  /*
   * Use fresh workload information
   * when available.
   */

  if (
    workload &&
    workload.weeklyCapacity > 0
  ) {
    capacityPercentage =
      (
        workload.afterAssignmentHours /
        workload.weeklyCapacity
      ) * 100;
  }

  let availabilityScore = 0;

  if (
    capacityPercentage <= 40
  ) {
    availabilityScore = 100;
  } else if (
    capacityPercentage <= 70
  ) {
    availabilityScore = 80;
  } else if (
    capacityPercentage <= 90
  ) {
    availabilityScore = 60;
  } else if (
    capacityPercentage <= 100
  ) {
    availabilityScore = 30;
  } else {
    availabilityScore = 0;
  }

  /*
   * ---------------------------------------
   * EXPERIENCE — 15%
   * ---------------------------------------
   */

  const experienceScore =
    Math.min(
      Number(
        employee.experience || 0
      ) * 10,
      100
    );

  /*
   * ---------------------------------------
   * PERFORMANCE — 15%
   * ---------------------------------------
   */

  const performanceScore =
    Math.min(
      Number(
        employee.performanceScore || 0
      ),
      100
    );

  /*
   * ---------------------------------------
   * FINAL SCORE
   * ---------------------------------------
   */

  const finalScore =
    skillScore * 0.40 +
    availabilityScore * 0.30 +
    experienceScore * 0.15 +
    performanceScore * 0.15;

  return {
    score: Number(
      finalScore.toFixed(2)
    ),

    breakdown: {
      skillMatch: skillScore,

      availability:
        availabilityScore,

      experience:
        experienceScore,

      performance:
        performanceScore,
    },

    capacityPercentage:
      Number(
        capacityPercentage.toFixed(2)
      ),
  };
};

module.exports =
  calculateEmployeeScore;