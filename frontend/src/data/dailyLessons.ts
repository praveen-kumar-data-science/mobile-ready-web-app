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
  {
    title: 'The Cue',
    body: 'A habit begins with a cue—a trigger that tells your brain to initiate a behavior. Identify the cues that prompt your habits.',
  },
  {
    title: 'The Craving',
    body: 'The craving is the motivational force behind every habit. Your brain craves the feeling, not the behavior itself.',
  },
  {
    title: 'The Response',
    body: 'The response is the actual habit you perform. It can take the form of a thought or an action, and requires energy to execute.',
  },
  {
    title: 'The Reward',
    body: 'The reward is the benefit you receive for completing the habit. It satisfies your craving and teaches your brain to repeat the behavior.',
  },
  {
    title: 'Habit Stacking',
    body: 'Link a new habit to an existing one: "After I [current habit], I will [new habit]". Use your established routines as anchors.',
  },
  {
    title: 'The Two-Minute Rule',
    body: 'Reduce every habit to a two-minute version. Master the ability to show up, then optimize the performance.',
  },
  {
    title: 'Identity Over Outcomes',
    body: 'The goal is not to run a marathon, it is to become a runner. The goal is not to read a book, it is to become a reader.',
  },
  {
    title: 'Make It Attractive',
    body: 'Habits are more likely to occur when they are attractive. Pair an undesirable habit with something you enjoy.',
  },
  {
    title: 'Temptation Bundling',
    body: 'Link a behavior you want with a behavior you need: "After [need], I will [want]". Make the attractive action inevitable.',
  },
  {
    title: 'Design Your Environment',
    body: 'You do not rise to the level of your goals. You fall to the level of your environment. Design spaces that make good habits obvious.',
  },
  {
    title: 'The Plateau of Latent Potential',
    body: 'Results plateau when you have not yet crossed the break-even point. Progress is not linear. Trust the process through the dip.',
  },
  {
    title: 'Tiny Gains Add Up',
    body: 'A one percent improvement every day compounds into remarkable results over time. Small changes, dramatic outcomes.',
  },
  {
    title: 'Systems Over Goals',
    body: 'Goals are about the results you want. Systems are about the processes that lead there. Fall in love with the process, not the prize.',
  },
  {
    title: 'Habit Tracking',
    body: 'Track the behavior, not the result. Seeing the chain of successful days creates a visual motivation to not break the chain.',
  },
  {
    title: 'Never Miss Twice',
    body: 'Missing once is an accident. Missing twice is the start of a new habit. Get back on track immediately after a lapse.',
  },
  {
    title: 'The Paper Clip Strategy',
    body: 'Track your habit visually in a way you can see. Move a paperclip or make a checkmark. Seeing progress is motivating.',
  },
  {
    title: 'Reduce Friction for Good Habits',
    body: 'Make good habits effortless. Lay out your gym clothes, prep your workspace, or place healthy snacks at eye level.',
  },
  {
    title: 'Increase Friction for Bad Habits',
    body: 'Make bad habits inconvenient. Delete apps from your phone, unsubscribe from notifications, or hide temptations.',
  },
  {
    title: 'The Cost of Inaction',
    body: 'We underestimate the cost of inaction. Not going to the gym costs you the strength you would have gained. Count the invisible costs.',
  },
  {
    title: 'Commitment Devices',
    body: 'Lock in good behavior with commitment. Sign a contract, tell friends about your goals, or use apps that enforce your intentions.',
  },
  {
    title: 'Genes Load the Gun, Environment Pulls the Trigger',
    body: 'Your genes define your personality and potential. Your environment determines how that potential is expressed.',
  },
  {
    title: 'Choose Your Habits Wisely',
    body: 'The most effective way to change your behavior is to focus on who you wish to become, not on getting a particular result.',
  },
  {
    title: 'Culture Shapes Behavior',
    body: 'Humans are herd animals. We copy the habits of three groups: the close (family and friends), the many (the tribe), and the powerful (those with status).',
  },
  {
    title: 'The Power of Proximity',
    body: 'Surround yourself with people who have habits you want. The culture of your peer group shapes your behavior.',
  },
  {
    title: 'Imitation and Aspiration',
    body: 'We imitate the habits of people we want to be like. Find role models and study their daily routines.',
  },
  {
    title: 'Motivation is Overrated',
    body: 'Environment design is more important than motivation. Set up your life so the right choice is the easy choice.',
  },
  {
    title: 'Automaticity',
    body: 'A habit is formed when the behavior becomes automatic. This typically requires sufficient repetition and consistency over time.',
  },
  {
    title: 'Focus on the Identity',
    body: 'Repeat, "I am someone who [habit]." Your self-image drives your behavior. Change your identity and you change your habits.',
  },
  {
    title: 'The Rewards You Chase',
    body: 'Your brain crave rewards: water, food, sex, status, power, or novelty. Design habits that satisfy these deeper cravings.',
  },
  {
    title: 'Immediate vs Delayed Rewards',
    body: 'Bad habits offer immediate pleasure but delayed pain. Good habits offer immediate pain but delayed pleasure. Choose the long-term game.',
  },
  {
    title: 'Feedback Loops',
    body: 'Make the results of your good habits immediately visible. The sooner you see results, the more likely you are to repeat the behavior.',
  },
  {
    title: 'The Inverse Law of Effort',
    body: 'The more automatic a habit becomes, the less it requires willpower. Invest in making habits automatic, then enjoy the freedom.',
  },
  {
    title: 'Continuous Improvement',
    body: 'Get 1% better every day. Small incremental improvements compound into extraordinary outcomes over time. Embrace continuous improvement.',
  },
];

export function getDailyLesson(date: string): DailyLesson {
  const numericSeed = date.split('-').reduce((sum, part) => sum + Number(part), 0);
  return dailyLessons[numericSeed % dailyLessons.length];
}