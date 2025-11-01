import { getDb } from "../database/db.js";

export const addTask = async (request, response) => {
  try {
    const db = getDb();
    if (!db) {
      response.status(500).send("Database not initialized");
      return;
    }
    const { title, description, priority, due_date, status, created_at } =
      request;

    const taskAddQuery = `
  INSERT INTO tasks (title, description, priority, status, due_date, created_at)
  VALUES (?, ?, ?, ?, ?, ?)
`;

    await db.run(taskAddQuery, [
      title,
      description,
      priority,
      status,
      due_date,
      created_at,
    ]);

    response.status(200);
    response.send("Task add Succesfully!");
  } catch (e) {
    response.status(500).send(e.message);
  }
};

export const getTasks = async (request, response) => {
  try {
    const db = getDb();
    if (!db) {
      response.status(500).send("Database not initialized");
      return;
    }

    // Use validated values from middleware (or undefined if no filter)
    const { status, priority } = request;

    const filters = [];
    const params = [];

    if (status) {
      filters.push("status = ?");
      params.push(status);
    }

    if (priority) {
      filters.push("priority = ?");
      params.push(priority);
    }

    let query = "SELECT * FROM tasks";
    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    const tasks = await db.all(query, params);

    response.status(200).json(tasks);
  } catch (e) {
    response.status(500).send(e.message);
  }
};

export const updateTask = async (request, response) => {
  try {
    const db = getDb();
    if (!db) {
      response.status(500).send("Database not initialized");
      return;
    }

    const { id } = request.params;
    const { status, priority } = request.body;

    if (!status && !priority) {
      response.status(400).send("Must provide status or priority to update");
      return;
    }

    // Optionally validate status and priority again here or rely on middleware

    // Build dynamic query parts for only fields provided
    const updates = [];
    const params = [];

    if (status) {
      updates.push("status = ?");
      params.push(status);
    }
    if (priority) {
      updates.push("priority = ?");
      params.push(priority);
    }

    params.push(id);

    const updateQuery = `
      UPDATE tasks
      SET ${updates.join(", ")}
      WHERE id = ?
    `;

    const result = await db.run(updateQuery, params);

    if (result.changes === 0) {
      response.status(404).send("Task not found");
      return;
    }

    response.status(200).send("Task updated successfully");
  } catch (e) {
    response.status(500).send(e.message);
  }
};

export const getInsights = async (req, res) => {
  try {
    // Get DB connection
    const db = getDb();
    if (!db) {
      return res.status(500).send("Database not initialized");
    }

    // 1. Total number of open tasks
    const totalOpenQuery = `
      SELECT COUNT(*) AS totalOpen
      FROM tasks
      WHERE status = 'Open'
    `;
    const { totalOpen } = await db.get(totalOpenQuery);

    // 2. Count of open tasks grouped by priority
    const priorityCountsQuery = `
      SELECT priority, COUNT(*) AS count
      FROM tasks
      WHERE status = 'Open'
      GROUP BY priority
    `;
    const priorityRows = await db.all(priorityCountsQuery);

    // Normalize counts by priority keys, default 0
    const priorityCounts = { High: 0, Medium: 0, Low: 0 };
    priorityRows.forEach((row) => {
      priorityCounts[row.priority] = row.count;
    });

    // 3. Count of ALL tasks grouped by priority (regardless of status)
    const allPriorityCountsQuery = `
      SELECT priority, COUNT(*) AS count
      FROM tasks
      GROUP BY priority;
    `;
    const allPriorityRows = await db.all(allPriorityCountsQuery);
    const allPriorityCounts = { High: 0, Medium: 0, Low: 0 };
    allPriorityRows.forEach((row) => {
      allPriorityCounts[row.priority] = row.count;
    });

    // 4. Total tasks count (all statuses)
    const totalTasksQuery = `
      SELECT COUNT(*) AS totalTasks FROM tasks;
    `;
    const { totalTasks } = await db.get(totalTasksQuery);

    // 5. Count of tasks due soon (next 3 calendar days)
    const dueSoonQuery = `
      SELECT COUNT(*) AS dueSoonCount
      FROM tasks
      WHERE due_date BETWEEN DATE('now') AND DATE('now', '+3 days')
    `;
    const { dueSoonCount } = await db.get(dueSoonQuery);

    // 6. Identify busiest due date with highest number of tasks (any status)
    const busiestDayQuery = `
      SELECT due_date, COUNT(*) AS count
      FROM tasks
      GROUP BY due_date
      ORDER BY count DESC
      LIMIT 1
    `;
    const busiestDayRow = await db.get(busiestDayQuery);
    const busiestDay = busiestDayRow ? busiestDayRow.due_date : null;
    const busiestDayCount = busiestDayRow ? busiestDayRow.count : 0;

    // Calculate dominant priority and its percentage among open tasks
    let dominantPriority = "Medium"; // default priority
    let dominantCount = 0;
    Object.entries(priorityCounts).forEach(([key, value]) => {
      if (value > dominantCount) {
        dominantCount = value;
        dominantPriority = key;
      }
    });
    const dominantPercentage = totalOpen
      ? ((dominantCount / totalOpen) * 100).toFixed(0)
      : 0;

    // Build AI-like summary string with rule-based logic
    let summary = `You have **${totalOpen}** open tasks.`;
    if (dueSoonCount > 0) {
      summary += ` **${dueSoonCount}** are due in the next 3 days.`;
    }
    if (dominantCount > 0) {
      summary += ` Most of your open tasks (${dominantPercentage}%) are **${dominantPriority}** priority.`;
    }
    if (busiestDay && busiestDayCount > 3) {
      summary += ` The busiest due date is **${busiestDay}** with ${busiestDayCount} tasks due.`;
    }

    // Return full insights JSON response
    return res.json({
      totalOpen,
      priorityCounts,
      allPriorityCounts,
      totalTasks,
      dueSoonCount,
      busiestDay,
      summary,
    });
  } catch (error) {
    console.error("Insights API error:", error);
    return res.status(500).send("Server error");
  }
};
