import { useState, useEffect } from 'react'
import { Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { problemDatabase } from '../data/problems'
import { useNavigate } from 'react-router-dom'
import { saveMockTest } from '../utils/database'

export default function MockTest() {
  const navigate = useNavigate()
  const [testStarted, setTestStarted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(70 * 60) // 70 minutes in seconds
  const [selectedProblems, setSelectedProblems] = useState([])
  const [problemTimes, setProblemTimes] = useState({}) // Track time per problem
  const [currentProblem, setCurrentProblem] = useState(null) // Track which problem user is on
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    if (testStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
        // Update time for current problem
        if (currentProblem !== null) {
          setProblemTimes(prev => ({
            ...prev,
            [currentProblem]: (prev[currentProblem] || 0) + 1
          }))
        }
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeRemaining === 0) {
      handleEndTest()
    }
  }, [testStarted, timeRemaining, currentProblem])

  const startTest = () => {
    // Select 4 problems: 1 easy, 2 medium, 1 hard
    const easy = problemDatabase.filter(p => p.difficulty === 'easy')
    const medium = problemDatabase.filter(p => p.difficulty === 'medium')
    const hard = problemDatabase.filter(p => p.difficulty === 'hard')

    const selected = [
      easy[Math.floor(Math.random() * easy.length)],
      medium[Math.floor(Math.random() * medium.length)],
      medium[Math.floor(Math.random() * medium.length)],
      hard[Math.floor(Math.random() * hard.length)],
    ]

    setSelectedProblems(selected)
    setTestStarted(true)
    setStartTime(new Date())

    // Initialize time tracking for each problem
    const initialTimes = {}
    selected.forEach((p, idx) => {
      initialTimes[idx] = 0
    })
    setProblemTimes(initialTimes)
  }

  const handleEndTest = async () => {
    const duration = 70 * 60 - timeRemaining // Time spent in seconds

    // Calculate score based on problems solved (simplified)
    // In production, this would check actual submissions
    const score = Math.floor(Math.random() * 400) + 200 // Placeholder 200-600

    const testData = {
      duration,
      score,
      problems: selectedProblems.map(p => p.id),
      submissions: [], // Would contain actual submission data
      timeSpent: problemTimes,
      passed: score >= 300
    }

    await saveMockTest(testData)
    navigate('/analytics') // Or navigate to results page
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTimeWarningClass = () => {
    if (timeRemaining < 5 * 60) return 'text-red-500 animate-pulse'
    if (timeRemaining < 15 * 60) return 'text-yellow-500'
    return 'text-green-500'
  }

  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          <div className="text-center mb-8">
            <Clock className="mx-auto mb-4 text-blue-500" size={64} />
            <h1 className="text-3xl font-bold mb-2">70-Minute Mock Test</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Simulate the real Visa CodeSignal assessment
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                  Important Test Rules
                </p>
                <ul className="list-disc list-inside space-y-1 text-yellow-800 dark:text-yellow-200">
                  <li>You will have exactly 70 minutes to complete 4 problems</li>
                  <li>Problems are selected to match real Visa assessment difficulty</li>
                  <li>Timer cannot be paused once started</li>
                  <li>You can navigate between problems freely</li>
                  <li>Submit partial solutions if you run out of time</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold">What to Expect</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-semibold text-green-900 dark:text-green-100">Problem 1</p>
                <p className="text-sm text-green-700 dark:text-green-300">Easy</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">8-10 min</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="font-semibold text-yellow-900 dark:text-yellow-100">Problem 2</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Medium</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">15-18 min</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="font-semibold text-yellow-900 dark:text-yellow-100">Problem 3</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Medium</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">18-22 min</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="font-semibold text-red-900 dark:text-red-100">Problem 4</p>
                <p className="text-sm text-red-700 dark:text-red-300">Hard</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">20-25 min</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold">Tips for Success</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Read all 4 problems quickly first (2 min)</li>
              <li>Start with the easiest problem you see</li>
              <li>If stuck for 15+ minutes, move to next problem</li>
              <li>Use Python Collections (Counter, defaultdict, deque)</li>
              <li>Write list comprehensions when possible</li>
              <li>Test edge cases: empty input, single element, duplicates</li>
              <li>Submit partial solutions if running out of time</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/problems')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={startTest}
              className="btn-primary px-8"
            >
              Start 70-Minute Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Timer Header */}
      <div className="card mb-6 bg-white dark:bg-gray-800 sticky top-20 z-40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Mock Test in Progress</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete all 4 problems before time runs out
            </p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-mono font-bold ${getTimeWarningClass()}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {timeRemaining < 15 * 60 && timeRemaining > 5 * 60 && '⚠️ 15 minutes left'}
              {timeRemaining < 5 * 60 && '🚨 Final 5 minutes!'}
            </div>
          </div>
        </div>
      </div>

      {/* Problem List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedProblems.map((problem, idx) => (
          <div
            key={problem.id}
            onClick={() => {
              setCurrentProblem(idx)
              navigate(`/problem/${problem.id}`)
            }}
            className="card-hover cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Problem {idx + 1}</p>
                <p className={`badge badge-${problem.difficulty} mt-1`}>
                  {problem.difficulty}
                </p>
              </div>
              <CheckCircle className="text-gray-300" size={24} />
            </div>

            <h3 className="font-semibold mb-2">{problem.title}</h3>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Target: {problem.timeEstimate} min</p>
              <p className="mt-1">{problem.category}</p>
            </div>

            <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
              Solve →
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="card mt-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
          <div className="text-sm text-blue-900 dark:text-blue-100">
            <p className="font-semibold mb-2">During the Test:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Click any problem above to start solving</li>
              <li>Navigate freely between problems</li>
              <li>Make sure to click "Submit" on each problem</li>
              <li>The timer will continue running in the background</li>
            </ul>
          </div>
        </div>
      </div>

      {/* End Test Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleEndTest}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
        >
          End Test & View Results
        </button>
      </div>
    </div>
  )
}