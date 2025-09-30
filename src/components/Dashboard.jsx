import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Trophy, Target, Flame, Clock, AlertCircle, TrendingUp } from 'lucide-react'
import { problemDatabase } from '../data/problems'
import { getAnalytics, getStreak } from '../utils/database'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSolved: 0,
    streak: 0,
    byDifficulty: { easy: 0, medium: 0, hard: 0 }
  })

  useEffect(() => {
    async function loadStats() {
      const analytics = await getAnalytics()
      const streak = await getStreak()
      setStats({ ...analytics, streak })
    }
    loadStats()
  }, [])

  const totalProblems = problemDatabase.length
  const progressPercent = ((stats.totalSolved / totalProblems) * 100).toFixed(0)

  const visaInsights = [
    { icon: AlertCircle, text: "Hash maps appear in 70% of Q4 problems", color: "text-red-500" },
    { icon: Clock, text: "Time allocation: Q1 (10min) → Q2 (18min) → Q3 (22min) → Q4 (25min)", color: "text-yellow-500" },
    { icon: TrendingUp, text: "Python's Collections module saves 5-10 minutes per test", color: "text-blue-500" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome to Your Prep Platform</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Everything you need to ace the Visa SDET CodeSignal assessment
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</p>
              <p className="text-3xl font-bold">{stats.totalSolved}</p>
              <p className="text-xs text-gray-500">of {totalProblems} total</p>
            </div>
            <Trophy className="text-yellow-500" size={40} />
          </div>
          <div className="mt-4">
            <div className="progress-bar">
              <div className="progress-fill bg-yellow-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
              <p className="text-3xl font-bold">{stats.streak}</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
            <Flame className="text-orange-500" size={40} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Easy Solved</p>
              <p className="text-3xl font-bold text-green-500">{stats.byDifficulty.easy}</p>
            </div>
            <Target className="text-green-500" size={40} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Medium Solved</p>
              <p className="text-3xl font-bold text-yellow-500">{stats.byDifficulty.medium}</p>
            </div>
            <Target className="text-yellow-500" size={40} />
          </div>
        </div>
      </div>

      {/* Visa Intelligence Insights */}
      <div className="card mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="text-blue-600 dark:text-blue-400" />
          Visa Intelligence Insights
        </h2>
        <div className="space-y-3">
          {visaInsights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <insight.icon className={insight.color} size={20} />
              <p className="text-sm">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/problems" className="card-hover bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <h3 className="text-xl font-bold mb-2">Browse Problems</h3>
          <p className="text-blue-100 mb-4">120+ problems matched to Visa patterns</p>
          <div className="text-sm opacity-90">Start practicing →</div>
        </Link>

        <Link to="/mock-test" className="card-hover bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <h3 className="text-xl font-bold mb-2">Take Mock Test</h3>
          <p className="text-orange-100 mb-4">Simulate the real 70-minute assessment</p>
          <div className="text-sm opacity-90">Start test →</div>
        </Link>

        <Link to="/python-course" className="card-hover bg-gradient-to-br from-green-500 to-green-600 text-white">
          <h3 className="text-xl font-bold mb-2">Python Course</h3>
          <p className="text-green-100 mb-4">Master Collections, comprehensions & more</p>
          <div className="text-sm opacity-90">Learn Python →</div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
        <div className="space-y-3">
          {stats.totalSolved === 0 ? (
            <>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="font-medium">1. Start with Easy Problems</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Build confidence with array and string basics
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium">2. Master Python Collections</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Counter, defaultdict, and deque are essential
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium">3. Focus on Hash Maps</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  70% of Q4 problems require hash map optimization
                </p>
              </div>
            </>
          ) : (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="font-medium">Great progress! Keep practicing daily.</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Aim for 3 problems per day to maintain your streak
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}