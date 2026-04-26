export interface StrategyCard {
  title: string;
  why: string;
  action: string;
}

const antiSabotageStrategies: StrategyCard[] = [
  {
    title: 'State Reset in 90 Seconds',
    why: 'Self-sabotage often begins when stress controls your emotional state.',
    action: 'Take 10 deep breaths, stand up, and write one next action before touching your phone.',
  },
  {
    title: 'Name the Trigger',
    why: 'You cannot change a pattern you do not identify.',
    action: 'When procrastination appears, label the trigger in one line: fear, confusion, perfectionism, or fatigue.',
  },
  {
    title: 'Standards Before Mood',
    why: 'Progress comes from standards, not from waiting to feel ready.',
    action: 'Write your minimum daily standard and complete it even on low-energy days.',
  },
  {
    title: 'Identity Statement',
    why: 'Behavior follows the identity you rehearse.',
    action: 'Repeat: I am a disciplined founder who finishes important work first.',
  },
  {
    title: 'Meaning Reframe',
    why: 'Your decisions follow the meaning you assign to events.',
    action: 'Replace this means I am failing with this is feedback I can use today.',
  },
  {
    title: 'Interrupt the Old Pattern',
    why: 'Patterns weaken when interrupted early.',
    action: 'Use a pattern interrupt: countdown 5-4-3-2-1 and start a two-minute work sprint immediately.',
  },
  {
    title: 'Micro Promise Integrity',
    why: 'Confidence grows when you trust your own word.',
    action: 'Set one promise you can keep in under 20 minutes and finish it before noon.',
  },
  {
    title: 'Decision Window',
    why: 'Too much decision time increases avoidance.',
    action: 'Set a five-minute timer and decide the next business priority without researching more.',
  },
  {
    title: 'From Outcome to Process',
    why: 'Big goals can create pressure paralysis.',
    action: 'Convert one intimidating goal into a repeatable daily process with a clear start time.',
  },
  {
    title: 'Fear Inventory',
    why: 'Unstated fears run your behavior in the background.',
    action: 'Write the worst-case, best-case, and most-likely-case outcomes for your next move.',
  },
  {
    title: 'Compelling Future Snapshot',
    why: 'A strong vision reduces short-term temptation.',
    action: 'Write five lines describing your business and life 24 months from now in present tense.',
  },
  {
    title: 'Energy Protection Block',
    why: 'Self-sabotage increases when your body is drained.',
    action: 'Protect one 90-minute deep work block by turning off notifications and closing all nonessential tabs.',
  },
  {
    title: 'Language Upgrade',
    why: 'Words shape emotional intensity and action.',
    action: 'Replace I have to with I choose to for your top task today.',
  },
  {
    title: 'Pain and Pleasure Audit',
    why: 'Habits stick when pain and reward are aligned.',
    action: 'List three costs of delaying your task and three rewards of finishing it today.',
  },
  {
    title: 'The First Hour Rule',
    why: 'Your first hour sets your performance baseline.',
    action: 'No social media until your single most valuable task is started.',
  },
  {
    title: 'Progress Evidence',
    why: 'The brain needs proof to sustain motivation.',
    action: 'Capture one concrete win before ending your workday and store it in your notes.',
  },
  {
    title: 'Responsibility Question',
    why: 'Power returns when you focus on what you can control.',
    action: 'Ask: What is one action fully within my control right now and do it immediately.',
  },
  {
    title: 'Recovery, Not Punishment',
    why: 'Harsh self-talk fuels another cycle of avoidance.',
    action: 'If you slip, run a recovery routine: review, adjust environment, restart within 10 minutes.',
  },
];

const businessBuilderStrategies: StrategyCard[] = [
  {
    title: 'Define a Clear Offer',
    why: 'Vague offers create weak demand.',
    action: 'Write your offer as: I help [target customer] achieve [specific outcome] in [timeframe].',
  },
  {
    title: 'Daily Customer Insight',
    why: 'Revenue grows when you understand customer problems deeply.',
    action: 'Spend 15 minutes reading customer reviews, comments, or support threads in your niche.',
  },
  {
    title: 'One Metric That Matters',
    why: 'Focus improves when one metric leads your week.',
    action: 'Choose one weekly metric such as qualified leads, demos, or conversions and track it daily.',
  },
  {
    title: 'Value Creation Hour',
    why: 'Businesses grow by producing value consistently.',
    action: 'Block one hour to create an asset: content, feature, proposal, or process document.',
  },
  {
    title: 'Sales Conversation Reps',
    why: 'Skill comes from repetition, not theory.',
    action: 'Start or schedule one sales conversation today, even if it is small.',
  },
  {
    title: 'Build a Simple Funnel',
    why: 'A reliable path from attention to purchase reduces chaos.',
    action: 'Map your funnel in four stages: traffic, lead, offer, close.',
  },
  {
    title: 'Proof Over Claims',
    why: 'Trust rises when prospects see evidence.',
    action: 'Collect one testimonial, case note, or before-and-after example this week.',
  },
  {
    title: 'Narrow the Niche',
    why: 'Specific positioning makes marketing easier.',
    action: 'Refine your audience to one clear segment and rewrite your headline for that segment.',
  },
  {
    title: 'Weekly Offer Iteration',
    why: 'Strong offers are improved through testing.',
    action: 'Change one variable in your offer this week: pricing, guarantee, bonus, or delivery format.',
  },
  {
    title: 'Personal Brand Compounding',
    why: 'Visible expertise attracts opportunities over time.',
    action: 'Publish one practical lesson from your real work each day for the next seven days.',
  },
  {
    title: 'Relationship Capital',
    why: 'Growth accelerates through trusted relationships.',
    action: 'Reach out to one potential partner, mentor, or peer with a clear value-first message.',
  },
  {
    title: 'Cash Flow Awareness',
    why: 'Many businesses fail from poor cash visibility, not poor ideas.',
    action: 'Review incoming, outgoing, and runway numbers for 10 minutes today.',
  },
  {
    title: 'Morning Priority Stack',
    why: 'Top priorities drift when your day starts reactive.',
    action: 'Set your top three business outcomes before 9 AM and tackle them in order.',
  },
  {
    title: 'Decision Journal',
    why: 'Better founders improve decision quality over time.',
    action: 'Log one key decision with assumptions and revisit in 30 days to learn faster.',
  },
  {
    title: 'Delegation Trigger',
    why: 'Founders bottleneck growth when they do everything.',
    action: 'Pick one recurring task to document and delegate or automate this week.',
  },
  {
    title: 'Customer Follow-Up Loop',
    why: 'Most sales are lost through weak follow-up.',
    action: 'Send focused follow-up messages to five warm leads with one clear next step.',
  },
  {
    title: 'Offer Confidence Ritual',
    why: 'People buy certainty and clarity.',
    action: 'Practice your offer pitch aloud three times before your first call today.',
  },
  {
    title: 'Weekly CEO Review',
    why: 'Review turns activity into strategic progress.',
    action: 'Run a 30-minute weekly review: wins, bottlenecks, priorities, and one strategic bet.',
  },
];

function buildSeed(date: string, offset: number): number {
  return date
    .split('-')
    .map(Number)
    .reduce((sum, value, index) => sum + value * (index + 3), offset);
}

export function getAntiSabotageStrategy(date: string): StrategyCard {
  const seed = buildSeed(date, 17);
  return antiSabotageStrategies[seed % antiSabotageStrategies.length];
}

export function getBusinessBuilderStrategy(date: string): StrategyCard {
  const seed = buildSeed(date, 43);
  return businessBuilderStrategies[seed % businessBuilderStrategies.length];
}

export function getBusinessBuilderPlaybook(): StrategyCard[] {
  return businessBuilderStrategies;
}
