/**
 * Formats how a class's schedule should read, based on whether it's a
 * one-off event or a recurring series:
 * - One-off: a specific calendar date makes sense — it happens once.
 * - Recurring (daily/weekly): a specific date is misleading, since the
 *   class keeps happening indefinitely. Shows the recurrence pattern
 *   instead (e.g. "Every Mon, Wed, Fri" or "Every day").
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

  // Weekly — list the actual selected days. ("monthly" recurrence
  // exists on the model but isn't offered in the create/edit UI;
  // falls through to this same day-list branch as a safe default.)
  const days = classData.recurrenceDays ?? [];
  if (days.length === 0) {
    return `Weekly • ${time}`;
  }

  const dayLabels = days
    .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
    .join(", ");

  return `Every ${dayLabels} • ${time}`;
}
