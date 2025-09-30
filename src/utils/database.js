import Dexie from 'dexie';

// IndexedDB database for offline storage
export const db = new Dexie('VisaSDETPrep');

db.version(1).stores({
  problems: '++id, title, difficulty, category, tags, visaFrequency, starred',
  submissions: '++id, problemId, code, language, timestamp, passed, score',
  progress: '++id, category, problemsSolved, totalProblems, lastUpdated',
  mockTests: '++id, timestamp, duration, score, problems, submissions',
  pythonLessons: '++id, lessonId, completed, score, timestamp',
  notes: '++id, problemId, content, timestamp',
  settings: 'key, value'
});

// Initialize default settings
export const initializeSettings = async () => {
  const settings = await db.settings.toArray();
  if (settings.length === 0) {
    await db.settings.bulkAdd([
      { key: 'theme', value: 'dark' },
      { key: 'fontSize', value: 14 },
      { key: 'showHints', value: true },
      { key: 'autoRun', value: false },
      { key: 'soundEffects', value: true },
      { key: 'dailyGoal', value: 3 },
      { key: 'testDate', value: null },
    ]);
  }
};

// Get or set setting
export const getSetting = async (key) => {
  const setting = await db.settings.get(key);
  return setting?.value;
};

export const setSetting = async (key, value) => {
  await db.settings.put({ key, value });
};

// Progress tracking functions
export const updateProgress = async (category) => {
  const solved = await db.submissions
    .where('problemId')
    .between(0, 99999)
    .and(s => s.passed)
    .uniqueKeys();

  const categoryProblems = await db.problems
    .where('category')
    .equals(category)
    .count();

  await db.progress.put({
    category,
    problemsSolved: solved.length,
    totalProblems: categoryProblems,
    lastUpdated: new Date()
  });
};

export const getStreak = async () => {
  const submissions = await db.submissions
    .orderBy('timestamp')
    .reverse()
    .toArray();

  if (submissions.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const submission of submissions) {
    const subDate = new Date(submission.timestamp);
    subDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((currentDate - subDate) / (1000 * 60 * 60 * 24));

    if (diffDays === streak) {
      streak++;
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
};

// Analytics functions
export const getAnalytics = async () => {
  const totalSolved = await db.submissions
    .filter(s => s.passed)
    .uniqueKeys();

  const totalAttempts = await db.submissions.count();

  const averageScore = await db.submissions
    .toArray()
    .then(subs => {
      if (subs.length === 0) return 0;
      const sum = subs.reduce((acc, s) => acc + (s.score || 0), 0);
      return (sum / subs.length).toFixed(1);
    });

  const byDifficulty = await db.submissions
    .toArray()
    .then(async subs => {
      const difficulties = { easy: 0, medium: 0, hard: 0 };
      for (const sub of subs) {
        if (sub.passed) {
          const problem = await db.problems.get(sub.problemId);
          if (problem) {
            difficulties[problem.difficulty]++;
          }
        }
      }
      return difficulties;
    });

  return {
    totalSolved: totalSolved.length,
    totalAttempts,
    averageScore,
    byDifficulty,
    streak: await getStreak()
  };
};

export default db;