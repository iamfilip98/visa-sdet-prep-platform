import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight } from 'lucide-react'

export default function SimilarProblems({ currentProblem, problemDatabase }) {
  // Find similar problems based on:
  // 1. Same category
  // 2. Same tags
  // 3. Progressive difficulty

  const similarByCategory = problemDatabase
    .filter(p =>
      p.id !== currentProblem.id &&
      p.category === currentProblem.category
    )
    .slice(0, 3)

  const similarByTags = problemDatabase
    .filter(p =>
      p.id !== currentProblem.id &&
      p.category !== currentProblem.category &&
      p.tags.some(tag => currentProblem.tags.includes(tag))
    )
    .slice(0, 2)

  const nextDifficulty = currentProblem.difficulty === 'easy' ? 'medium' :
                         currentProblem.difficulty === 'medium' ? 'hard' : null

  const harderProblems = nextDifficulty
    ? problemDatabase.filter(p =>
        p.difficulty === nextDifficulty &&
        (p.category === currentProblem.category ||
         p.tags.some(tag => currentProblem.tags.includes(tag)))
      ).slice(0, 2)
    : []

  const allSimilar = [
    ...similarByCategory,
    ...similarByTags,
    ...harderProblems
  ].filter((p, idx, arr) => arr.findIndex(x => x.id === p.id) === idx) // Remove duplicates
   .slice(0, 5)

  if (allSimilar.length === 0) {
    return null
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-500" size={24} />
        <h3 className="text-xl font-bold">Similar Problems</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Reinforce this pattern by solving related problems
      </p>

      <div className="space-y-3">
        {allSimilar.map((problem) => (
          <Link
            key={problem.id}
            to={`/problem/${problem.id}`}
            className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {problem.title}
                  </h4>
                  {problem.difficulty !== currentProblem.difficulty && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      problem.difficulty === 'hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      Step Up: {problem.difficulty}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {problem.description.substring(0, 100)}...
                </p>

                <div className="flex gap-2 flex-wrap">
                  <span className={`badge badge-${problem.difficulty}`}>
                    {problem.difficulty}
                  </span>
                  <span className="badge">
                    {problem.category}
                  </span>
                  <span className="badge">
                    {problem.timeEstimate} min
                  </span>
                  {problem.visaFrequency === 'very-high' && (
                    <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      High Frequency
                    </span>
                  )}
                </div>
              </div>

              <ArrowRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" size={20} />
            </div>

            {problem.category === currentProblem.category && (
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                Same pattern: {problem.category}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 Learning Tip:</strong> Solve 3-5 similar problems to master this pattern.
          Repetition builds pattern recognition speed!
        </p>
      </div>
    </div>
  )
}
