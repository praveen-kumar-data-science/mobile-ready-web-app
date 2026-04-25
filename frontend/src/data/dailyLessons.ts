export interface DailyLesson {
  title: string;
  body: string;
}

export const dailyLessons: DailyLesson[] = [
  {
    title: 'Start Small',
    body: 'Make the habit easy enough to repeat even on a difficult day. Consistency beats intensity at the start.',
  },
  {
    title: 'Vote for Identity',
    body: 'Each repetition is a vote for the type of person you want to become. Focus on the identity, not just the outcome.',
  },
  {
    title: 'Make It Obvious',
    body: 'Attach the habit to a visible cue such as a time, place, or object you will definitely encounter.',
  },
  {
    title: 'Reduce Friction',
    body: 'Prepare the environment so the next right action feels easier than skipping it.',
  },
  {
    title: 'Miss Once, Recover Fast',
    body: 'A missed day is a data point, not a failure. Protect the next repetition and get back on track quickly.',
  },
  {
    title: 'Make It Satisfying',
    body: 'End each completion with a small positive signal so your brain learns that showing up is rewarding.',
  },
];

export function getDailyLesson(date: string): DailyLesson {
  const numericSeed = date.split('-').reduce((sum, part) => sum + Number(part), 0);
  return dailyLessons[numericSeed % dailyLessons.length];
}