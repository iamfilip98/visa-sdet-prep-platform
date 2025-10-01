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
  const submissions = await db.submissions.toArray();

  // Get unique solved problems
  const solvedProblemIds = new Set(
    submissions.filter(s => s.passed).map(s => s.problemId)
  );

  const totalAttempts = submissions.length;

  const averageScore = submissions.length === 0 ? 0 :
    (submissions.reduce((acc, s) => acc + (s.score || 0), 0) / submissions.length).toFixed(1);

  // Get difficulty counts from problem database
  const { problemDatabase } = await import('../data/problems');
  const difficulties = { easy: 0, medium: 0, hard: 0 };

  for (const problemId of solvedProblemIds) {
    const problem = problemDatabase.find(p => p.id === problemId);
    if (problem) {
      difficulties[problem.difficulty]++;
    }
  }

  return {
    totalSolved: solvedProblemIds.size,
    totalAttempts,
    averageScore,
    byDifficulty: difficulties,
    streak: await getStreak()
  };
};

// Problem submission tracking
export const saveProblemSubmission = async (problemId, code, passed, testResults) => {
  await db.submissions.add({
    problemId,
    code,
    language: 'python',
    timestamp: new Date(),
    passed,
    score: passed ? 100 : (testResults.filter(t => t.passed).length / testResults.length * 100),
    testResults
  });
};

export const isProblemSolved = async (problemId) => {
  const submissions = await db.submissions
    .where('problemId')
    .equals(problemId)
    .and(s => s.passed)
    .toArray();

  return submissions.length > 0;
};

export const getSolvedProblems = async () => {
  const submissions = await db.submissions
    .filter(s => s.passed)
    .toArray();

  return new Set(submissions.map(s => s.problemId));
};

// Mock test tracking
export const saveMockTest = async (testData) => {
  await db.mockTests.add({
    timestamp: new Date(),
    duration: testData.duration,
    score: testData.score,
    problems: testData.problems,
    submissions: testData.submissions,
    timeSpent: testData.timeSpent,
    passed: testData.passed
  });
};

export const getMockTestCount = async () => {
  return await db.mockTests.count();
};

export const getLatestMockTest = async () => {
  const tests = await db.mockTests
    .orderBy('timestamp')
    .reverse()
    .limit(1)
    .toArray();

  return tests[0] || null;
};

// Python lesson tracking
export const markLessonComplete = async (lessonId) => {
  await db.pythonLessons.put({
    lessonId,
    completed: true,
    timestamp: new Date()
  });
};

export const isLessonComplete = async (lessonId) => {
  const lesson = await db.pythonLessons
    .where('lessonId')
    .equals(lessonId)
    .first();

  return lesson?.completed || false;
};

export const getCompletedLessonsCount = async () => {
  return await db.pythonLessons
    .where('completed')
    .equals(true)
    .count();
};

export const getCompletedLessons = async () => {
  const lessons = await db.pythonLessons
    .where('completed')
    .equals(true)
    .toArray();

  return new Set(lessons.map(l => l.lessonId));
};

// Readiness calculation
export const getReadinessScore = async () => {
  const analytics = await getAnalytics();
  const mockTestCount = await getMockTestCount();
  const completedLessons = await getCompletedLessonsCount();

  const targets = {
    easy: 20,
    medium: 25,
    hard: 8,
    mockTests: 2,
    lessons: 14
  };

  const readiness = {
    easy: analytics.byDifficulty.easy >= targets.easy,
    medium: analytics.byDifficulty.medium >= targets.medium,
    hard: analytics.byDifficulty.hard >= targets.hard,
    mockTests: mockTestCount >= targets.mockTests,
    pythonCourse: completedLessons >= targets.lessons
  };

  const completed = Object.values(readiness).filter(Boolean).length;
  const total = Object.values(readiness).length;
  const percentage = Math.round((completed / total) * 100);

  return {
    percentage,
    readiness,
    current: {
      easy: analytics.byDifficulty.easy,
      medium: analytics.byDifficulty.medium,
      hard: analytics.byDifficulty.hard,
      mockTests: mockTestCount,
      lessons: completedLessons
    },
    targets
  };
};

export default db;