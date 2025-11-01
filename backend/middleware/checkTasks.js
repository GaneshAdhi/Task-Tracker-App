import { format, parseISO, isValid } from "date-fns";

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

export const checkRequestsBody = async (request, response, next) => {
  const { title, description, priority, due_date, status, created_at } =
    request.body;

  if (title !== undefined) {
    request.title = title;
  } else {
    response.status(400).send("Invalid Title!");
    return;
  }

  if (priority !== undefined) {
    request.priority = priority;
  } else {
    response.status(400).send("Invalid Priority!");
    return;
  }

  if (due_date !== undefined) {
    console.log("Validating due_date:", due_date);
    try {
      const parsed = parseISO(due_date);
      if (!isValid(parsed)) {
        response.status(400).send("Invalid Due Date");
        return;
      }
      request.due_date = format(parsed, "yyyy-MM-dd");
    } catch (e) {
      response.status(400).send("Invalid Due Date");
      return;
    }
  }

  if (status !== undefined) {
    request.status = status;
  } else {
    response.status(400).send("Invalid Status!");
    return;
  }

  request.description = description;
  request.created_at = created_at;

  next();
};
