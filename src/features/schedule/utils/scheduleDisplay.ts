/**
 * Formats how a class's schedule reads, depending on whether it is a one-off
 * or a recurring series:
 * - One-off: a specific calendar date, because it happens once.
 * - Recurring (daily or weekly): the recurrence pattern (for example
 *   "Every Mon, Wed, Fri" or "Every day"), because a specific date is
 *   misleading for a class that keeps happening.
 */
export function getScheduleDisplay(classData: {
  schedule: string;
  recurrence: string;
  recurrenceDays?: string[];
}): string {
  const time = new Date(classData.schedule).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  });

  if (classData.recurrence === "none") {
    const date = new Date(classData.schedule).toLocaleDateString("en-NG", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "Africa/Lagos",
    });
    return `${date} • ${time}`;
  }

  if (classData.recurrence === "daily") {
    return `Every day • ${time}`;
  }

  // Weekly: list the selected days. "monthly" exists on the model but is not
  // offered in the create/edit UI; it falls through to this branch as a safe
  // default.
  const days = classData.recurrenceDays ?? [];
  if (days.length === 0) {
    return `Weekly • ${time}`;
  }

  const dayLabels = days
    .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
    .join(", ");

  return `Every ${dayLabels} • ${time}`;
}
