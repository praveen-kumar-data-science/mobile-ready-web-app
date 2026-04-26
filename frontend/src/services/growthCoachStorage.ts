import { BusinessMilestone, SelfSabotageEntry, WeeklyCEOReview } from '../types/habit';

const TRIGGER_KEY = 'leader-self-sabotage-entries';
const MILESTONE_KEY = 'leader-business-milestones';
const REVIEW_KEY = 'leader-weekly-ceo-reviews';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadTriggerEntries(): SelfSabotageEntry[] {
  return safeParse(localStorage.getItem(TRIGGER_KEY), [] as SelfSabotageEntry[]);
}

export function saveTriggerEntries(entries: SelfSabotageEntry[]): void {
  localStorage.setItem(TRIGGER_KEY, JSON.stringify(entries));
}

export function loadMilestones(): BusinessMilestone[] {
  return safeParse(localStorage.getItem(MILESTONE_KEY), [] as BusinessMilestone[]);
}

export function saveMilestones(milestones: BusinessMilestone[]): void {
  localStorage.setItem(MILESTONE_KEY, JSON.stringify(milestones));
}

export function loadCEOReviews(): WeeklyCEOReview[] {
  return safeParse(localStorage.getItem(REVIEW_KEY), [] as WeeklyCEOReview[]);
}

export function saveCEOReviews(reviews: WeeklyCEOReview[]): void {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
}

export function getWeekStartISO(date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  return d.toISOString().split('T')[0];
}
