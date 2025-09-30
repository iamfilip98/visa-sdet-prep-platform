import { useEffect, useState } from 'react'
import { TrendingUp, Target, Clock, Award } from 'lucide-react'
import { getAnalytics } from '../utils/database'
import { problemDatabase } from '../data/problems'

export default function Analytics() {
  const [stats, setStats] = useState({
    totalSolved: 0,
    totalAttempts: 0,
    averageScore: 0,
    byDifficulty: { easy: 0, medium: 0, hard: 0 },
    streak: 0
  })

  useEffect(() => {
    async function loadAnalytics() {
      const data = await getAnalytics()
      setStats(data)
    }
    loadAnalytics()
  }, [])

  const totalProblems = problemDatabase.length
  const progressPercent = ((stats.totalSolved / totalProblems) * 100).toFixed(1)

  const categoryBreakdown = [
    { name: 'Arrays', count: problemDatabase.filter(p => p.category === 'arrays').length, solved: Math.floor(Math.random() * 10) },
    { name: 'Strings', count: problemDatabase.filter(p => p.category === 'strings').length, solved: Math.floor(Math.random() * 8) },
    { name: 'Hash Maps', count: problemDatabase.filter(p => p.category === 'hash-maps').length, solved: Math.floor(Math.random() * 15) },
    { name: 'Trees', count: problemDatabase.filter(p => p.category === 'trees').length, solved: Math.floor(Math.random() * 3) },
    { name: 'Matrix', count: problemDatabase.filter(p => p.category === 'matrix').length, solved: Math.floor(Math.random() * 5) },
  ]

  const readinessScore = Math.min(100, Math.floor(
    (stats.totalSolved / 50) * 40 + // Coverage (40%)
    (stats.byDifficulty.medium / 20) * 30 + // Medium proficiency (30%)
    (stats.byDifficulty.hard / 10) * 20 + // Hard proficiency (20%)
    (stats.streak / 7) * 10 // Consistency (10%)
  ))

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Progress Analytics</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-blue-500" size={32} />
            <span className="text-3xl font-bold">{progressPercent}%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
          <p className="text-xs text-gray-500 mt-1">{stats.totalSolved} of {totalProblems} solved</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Target className="text-green-500" size={32} />
            <span className="text-3xl font-bold">{readinessScore}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Readiness Score</p>
          <p className="text-xs text-gray-500 mt-1">
            {readinessScore >= 80 ? '✓ Test Ready!' : 'Keep practicing'}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Clock className="text-yellow-500" size={32} />
            <span className="text-3xl font-bold">{stats.totalAttempts}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Attempts</p>
          <p className="text-xs text-gray-500 mt-1">Practice sessions</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Award className="text-purple-500" size={32} />
            <span className="text-3xl font-bold">{stats.averageScore}%</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
          <p className="text-xs text-gray-500 mt-1">On attempted problems</p>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">Progress by Difficulty</h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-green-600 dark:text-green-400 font-medium">Easy</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.byDifficulty.easy} / {problemDatabase.filter(p => p.difficulty === 'easy').length}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-green-500"
                style={{ width: `${(stats.byDifficulty.easy / problemDatabase.filter(p => p.difficulty === 'easy').length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-yellow-600 dark:text-yellow-400 font-medium">Medium</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.byDifficulty.medium} / {problemDatabase.filter(p => p.difficulty === 'medium').length}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-yellow-500"
                style={{ width: `${(stats.byDifficulty.medium / problemDatabase.filter(p => p.difficulty === 'medium').length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-red-600 dark:text-red-400 font-medium">Hard</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.byDifficulty.hard} / {problemDatabase.filter(p => p.difficulty === 'hard').length}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-red-500"
                style={{ width: `${(stats.byDifficulty.hard / problemDatabase.filter(p => p.difficulty === 'hard').length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">Progress by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryBreakdown.map(cat => (
            <div key={cat.name} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{cat.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {cat.solved}/{cat.count}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill bg-blue-500"
                  style={{ width: `${(cat.solved / cat.count) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
        <div className="space-y-4">
          {readinessScore < 80 && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg">
              <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                Keep Practicing!
              </p>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                You need a readiness score of 80+ to be test-ready. Focus on medium and hard problems.
              </p>
            </div>
          )}

          {stats.byDifficulty.hard < 5 && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
              <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
                Practice More Hard Problems
              </p>
              <p className="text-sm text-red-800 dark:text-red-200">
                Q4 in the Visa test is always hard. Solve at least 10 hard problems, focusing on hash map optimization.
              </p>
            </div>
          )}

          {readinessScore >= 80 && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg">
              <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
                ✓ You're Ready!
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                Your readiness score is excellent. Take 2-3 mock tests to polish your time management, then you're good to go!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}