import { CheckCircle, XCircle, Clock, Award, TrendingUp, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MockTestResults({ results, onRetake }) {
  const {
    problems,
    timeSpent, // Array of time spent per problem in seconds
    passed, // Array of boolean
    totalTime, // Total time in seconds
    score // Estimated score
  } = results

  const totalProblems = problems.length
  const passedCount = passed.filter(Boolean).length
  const passRate = Math.round((passedCount / totalProblems) * 100)

  // Time analysis
  const targetTimes = [10, 18, 22, 25] // Q1-Q4 target times in minutes
  const timePerformance = timeSpent.map((time, idx) => ({
    problem: idx + 1,
    actual: Math.round(time / 60),
    target: targetTimes[idx],
    delta: Math.round(time / 60) - targetTimes[idx],
    efficient: time / 60 <= targetTimes[idx]
  }))

  // Score estimation (based on problems passed)
  const estimatedScore = Math.round(200 + (passedCount / totalProblems) * 400)

  // Identify weak areas
  const needsWork = problems
    .map((p, idx) => ({ ...p, idx, passed: passed[idx], time: timeSpent[idx] }))
    .filter(p => !p.passed || p.time / 60 > targetTimes[p.idx])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Overall Score */}
      <div className="card mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-500">
        <div className="text-center mb-6">
          <Award className="mx-auto mb-4 text-blue-600 dark:text-blue-400" size={64} />
          <h1 className="text-4xl font-bold mb-2">Mock Test Complete!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Here's how you performed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Problems Solved</p>
            <p className="text-4xl font-bold">{passedCount}/{totalProblems}</p>
            <p className="text-sm text-gray-500 mt-1">{passRate}% pass rate</p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Time</p>
            <p className="text-4xl font-bold">{Math.round(totalTime / 60)} min</p>
            <p className="text-sm text-gray-500 mt-1">of 70 minutes</p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated Score</p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">{estimatedScore}</p>
            <p className="text-sm text-gray-500 mt-1">out of 600</p>
          </div>
        </div>

        {estimatedScore >= 450 && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-200 font-semibold text-center">
              ✓ Great score! This would likely pass the real test.
            </p>
          </div>
        )}
        {estimatedScore < 450 && estimatedScore >= 350 && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 font-semibold text-center">
              ⚠️ Borderline score. Practice more to ensure passing.
            </p>
          </div>
        )}
        {estimatedScore < 350 && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-800 dark:text-red-200 font-semibold text-center">
              ✗ Needs improvement. Review weak areas and practice more.
            </p>
          </div>
        )}
      </div>

      {/* Problem-by-Problem Analysis */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock size={24} />
          Time Management Analysis
        </h2>

        <div className="space-y-3">
          {timePerformance.map((perf) => (
            <div key={perf.problem} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {passed[perf.problem - 1] ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                  <div>
                    <h3 className="font-semibold">Problem {perf.problem}: {problems[perf.problem - 1].title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {problems[perf.problem - 1].difficulty} • {problems[perf.problem - 1].category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${perf.efficient ? 'text-green-600' : 'text-orange-600'}`}>
                    {perf.actual} min
                  </p>
                  <p className="text-sm text-gray-500">
                    Target: {perf.target} min {perf.delta > 0 ? `(+${perf.delta})` : perf.delta < 0 ? `(${perf.delta})` : ''}
                  </p>
                </div>
              </div>

              {!perf.efficient && (
                <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-sm text-orange-800 dark:text-orange-200">
                  ⚠️ Spent {perf.delta} minutes over target. Practice similar problems to improve speed.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Recognition Analysis */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={24} />
          Pattern Recognition
        </h2>

        <div className="space-y-3">
          {problems.map((problem, idx) => (
            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Q{idx + 1}: {problem.category}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {idx === 3 ? '70% of Q4 problems use hash maps!' :
                     problem.category === 'strings' ? 'Did you consider sliding window?' :
                     problem.category === 'arrays' ? 'Could two pointers optimize this?' :
                     'Pattern recognition is key to fast solving'}
                  </p>
                </div>
                {passed[idx] ? (
                  <CheckCircle className="text-green-500" size={20} />
                ) : (
                  <XCircle className="text-red-500" size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Areas Needing Work */}
      {needsWork.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-orange-500" />
            Focus Areas for Improvement
          </h2>

          <div className="space-y-3">
            {needsWork.map((problem) => (
              <div key={problem.idx} className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Problem {problem.idx + 1}: {problem.title}</h3>
                  <Link
                    to={`/problem/${problem.id}`}
                    className="btn-secondary text-sm"
                  >
                    Practice Again
                  </Link>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {!problem.passed && 'Failed to solve - review solution and understand the pattern.'}
                  {problem.passed && problem.time / 60 > targetTimes[problem.idx] &&
                   `Solved but took ${Math.round(problem.time / 60)} min (target: ${targetTimes[problem.idx]} min). Practice for speed.`}
                </p>
                <div className="flex gap-2">
                  <span className="badge badge-{problem.difficulty}">{problem.difficulty}</span>
                  <span className="badge">{problem.category}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              💡 Recommended Study Plan:
            </p>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
              <li>Review failed problems and study their solutions</li>
              <li>Practice 5-10 similar problems in weak categories</li>
              <li>Review relevant Python Course lessons (especially Lesson 11!)</li>
              <li>Take another mock test in 2-3 days</li>
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onRetake}
          className="btn-primary px-8"
        >
          Take Another Mock Test
        </button>
        <Link to="/problems" className="btn-secondary px-8">
          Practice More Problems
        </Link>
        <Link to="/python-course/lesson/11" className="btn-secondary px-8">
          Review Hash Maps
        </Link>
      </div>

      {/* Success Tips */}
      <div className="card mt-8 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
        <h3 className="font-bold text-lg mb-3">Key Takeaways:</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span><strong>Time Management:</strong> {timePerformance.filter(p => p.efficient).length}/4 problems completed on time</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span><strong>Pattern Recognition:</strong> {passed[3] ? 'You solved Q4! Great job recognizing the pattern.' : 'Q4 needs work - 70% require hash map optimization'}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">•</span>
            <span><strong>Remember:</strong> Partial credit &gt; perfection. Q1-Q3 working solutions &gt; Q4 perfect.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
