/**
 * Converts an ISO timestamp (e.g. from MongoDB's createdAt) into a
 * short relative string like "2 days ago", "18 seconds ago", "1 week ago".
 * Falls back to a plain date once something is old enough that "X months
 * ago" stops being useful information.
 */
export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 5) return "just now";
  if (diffSeconds < 60)
    return `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4)
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;

  // Older than ~4 weeks: show an actual date instead of "2 months ago"
  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    timeZone: "Africa/Lagos",
  });
}
