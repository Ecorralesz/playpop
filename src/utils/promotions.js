// ISO calendar dates compare chronologically without converting local midnight to UTC.
export function getPromotionCalendarDate(now, timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function isPromotionActive(campaign, now = new Date()) {
  if (!campaign.enabled || !Number.isFinite(now.getTime())) return false;
  const date = getPromotionCalendarDate(now, campaign.timeZone);
  return date >= campaign.startDate && date <= campaign.endDate;
}

// Retain dismissal during this application session if storage is blocked or full.
const dismissedInMemory = new Set();

export function isPromotionDismissed(campaign) {
  if (dismissedInMemory.has(campaign.dismissalKey)) return true;
  try {
    return window.localStorage.getItem(campaign.dismissalKey) === 'true';
  } catch {
    return false;
  }
}

export function dismissPromotion(campaign) {
  dismissedInMemory.add(campaign.dismissalKey);
  try {
    window.localStorage.setItem(campaign.dismissalKey, 'true');
  } catch {
    // Persistent dismissal requires storage; the in-memory fallback still prevents reopening.
  }
}
