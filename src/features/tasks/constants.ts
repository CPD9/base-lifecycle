import { TaskStatus } from "./types";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "IN_STOCK",
  [TaskStatus.TODO]: "RESERVED",
  [TaskStatus.IN_PROGRESS]: "IN_REPAIR",
  [TaskStatus.IN_REVIEW]: "RETIRED",
  [TaskStatus.DONE]: "INSTALLED",
};
