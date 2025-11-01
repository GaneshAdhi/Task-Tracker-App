# Task Table Design Notes

## Design Decisions

- **Table Name**:

  - Named `tasks` for clear purpose—stores task records.

- **Primary Key**:

  - `id INTEGER PRIMARY KEY AUTOINCREMENT`: Uniquely identifies each task and auto-increments on insert.

- **Columns**:
  - `title TEXT NOT NULL`: Task must have a non-empty name.
  - `description TEXT`: Optional detailed notes for the task.
  - `priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL DEFAULT 'Medium'`: Only allows defined priority levels; enforces data integrity.
  - `due_date TEXT NOT NULL`: ISO date string (`YYYY-MM-DD`) for cross-DB compatibility.
  - `status TEXT CHECK(status IN ('Open', 'In Progress', 'Done')) NOT NULL DEFAULT 'Open'`: Restricts allowed status values; supports workflow management.
  - `created_at DATETIME DEFAULT CURRENT_TIMESTAMP`: Automatically records when a task is added.

## Logic

- Ensures all tasks have a title, due date, status, and priority by default.
- Uses `CHECK` constraints for strict value enforcement.
- Tracks task creation time.

## Improvements You Can Make

- Use actual `DATE` or `TIMESTAMP` data types for `due_date` and `created_at` if your database supports them.
- Add an `updated_at` column to log the last modified time of a task.
- Create a `user_id` column to assign tasks to users (multi-user support).
- Add indexes on `due_date`, `priority`, and `status` for faster queries.
- Add `CHECK (trim(title) <> '')` to prevent empty titles.
- For scalability, store priority and status in lookup tables (normalization).

## Example Table Schema (SQLite)

- SQL: Creating the Task table for SQLite/PostgreSQL
  CREATE TABLE tasks ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT, priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL DEFAULT 'Medium', due_date TEXT NOT NULL, -- Stored as ISO date string (YYYY-MM-DD) status TEXT CHECK(status IN ('Open', 'In Progress', 'Done')) NOT NULL DEFAULT 'Open', created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
