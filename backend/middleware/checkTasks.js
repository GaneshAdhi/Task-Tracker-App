import format from "date-fns/format";
import isValid from "date-fns/isValid";
import toDate from "date-fns/toDate";

export const checkRequestsQueries = async (request, response, next) => {
  const { search_q, priority, status, date } = request.query;
  const { taskid } = request.params;

  if (priority !== undefined) {
    const priorityArray = ["High", "Medium", "Low"];
    const priorityIsInArray = priorityArray.includes(priority);
    if (priorityIsInArray === true) {
      request.priority = priority;
    } else {
      response.status(400);
      response.send("Invalid Todo Priority");
      return;
    }
  }

  if (status !== undefined) {
    const statusArray = ["Open", "In Progress", "DONE"];
    const statusIsInArray = statusArray.includes(status);
    if (statusIsInArray === true) {
      request.status = status;
    } else {
      response.status(400);
      response.send("Invalid Todo Status");
      return;
    }
  }

  if (date !== undefined) {
    try {
      const myDate = new Date(date);

      const formatedDate = format(new Date(date), "yyyy-MM-dd");
      console.log(formatedDate, "f");
      const result = toDate(
        new Date(
          `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`
        )
      );
      console.log(result, "r");
      console.log(new Date(), "new");

      const isValidDate = await isValid(result);
      console.log(isValidDate, "V");
      if (isValidDate === true) {
        request.date = formatedDate;
      } else {
        response.status(400);
        response.send("Invalid Due Date");
        return;
      }
    } catch (e) {
      response.status(400);
      response.send("Invalid Due Date");
      return;
    }
  }

  request.taskid = taskid;
  request.search_q = search_q;

  next();
};

export const checkRequestsBody = (request, response, next) => {
  const {
    title = request.title,
    description = request.description,
    priority = request.priority,
    due_date = request.due_date,
    status = request.status,
    created_at = request.created_at,
  } = request.body || {};

  const { taskid } = request.params;

  if (priority !== undefined) {
    const priorityArray = ["High", "Medium", "Low"];
    const priorityIsInArray = priorityArray.includes(priority);
    if (priorityIsInArray === true) {
      request.priority = priority;
    } else {
      response.status(400);
      response.send("Invalid Todo Priority");
      return;
    }
  }

  if (status !== undefined) {
    const statusArray = ["Open", "In Progress", "Done"];
    const statusIsInArray = statusArray.includes(status);
    if (statusIsInArray === true) {
      request.status = status;
    } else {
      response.status(400);
      response.send("Invalid Todo Status");
      return;
    }
  }

  if (due_date !== undefined) {
    try {
      const myDate = new Date(due_date);
      const formatedDate = format(new Date(due_date), "yyyy-MM-dd");
      console.log(formatedDate);
      const result = toDate(new Date(formatedDate));
      const isValidDate = isValid(result);
      console.log(isValidDate);
      console.log(isValidDate);
      if (isValidDate === true) {
        request.due_date = formatedDate;
      } else {
        response.status(400);
        response.send("Invalid Due Date");
        return;
      }
    } catch (e) {
      response.status(400);
      response.send("Invalid Due Date");
      return;
    }
  }
  request.title = title;
  request.description = description;
  request.created_at = created_at;

  request.taskid = taskid;

  next();
};

export const checkUpdateBody = (request, response, next) => {
  const { status, priority } = request.body;

  const validStatuses = ["Open", "In Progress", "Done"];
  const validPriorities = ["High", "Medium", "Low"];

  // If neither status nor priority is provided, reject request
  if (status === undefined && priority === undefined) {
    response.status(400).send("Provide status or priority to update");
    return;
  }

  // Validate status if provided
  if (status !== undefined) {
    if (!validStatuses.includes(status)) {
      response.status(400).send("Invalid Status value");
      return;
    }
    request.status = status; // pass validated value
  }

  // Validate priority if provided
  if (priority !== undefined) {
    if (!validPriorities.includes(priority)) {
      response.status(400).send("Invalid Priority value");
      return;
    }
    request.priority = priority; // pass validated value
  }

  next();
};
