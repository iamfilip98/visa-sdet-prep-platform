import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Clock, TrendingUp } from 'lucide-react'
import { problemDatabase, categories } from '../data/problems'

export default function ProblemList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [frequencyFilter, setFrequencyFilter] = useState('all')

  const filteredProblems = useMemo(() => {
    return problemDatabase.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter
      const matchesCategory = categoryFilter === 'all' || problem.category === categoryFilter
      const matchesFrequency = frequencyFilter === 'all' || problem.visaFrequency === frequencyFilter

      return matchesSearch && matchesDifficulty && matchesCategory && matchesFrequency
    })
  }, [searchTerm, difficultyFilter, categoryFilter, frequencyFilter])

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'badge-easy'
      case 'medium': return 'badge-medium'
      case 'hard': return 'badge-hard'
      default: return ''
    }
  }

  const getFrequencyColor = (frequency) => {
    switch(frequency) {
      case 'very-high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Problem Bank</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredProblems.length} problems curated for Visa SDET CodeSignal assessment
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          {/* Frequency Filter */}
          <div>
            <select
              value={frequencyFilter}
              onChange={(e) => setFrequencyFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Frequencies</option>
              <option value="very-high">🔥 Very High (80%+)</option>
              <option value="high">⭐ High (50-80%)</option>
              <option value="medium">💡 Medium (20-50%)</option>
              <option value="low">📚 Low (&lt;20%)</option>
              <option value="learning">🐍 Learning</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(difficultyFilter !== 'all' || categoryFilter !== 'all' || frequencyFilter !== 'all' || searchTerm) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
            {difficultyFilter !== 'all' && (
              <span className="badge">{difficultyFilter}</span>
            )}
            {categoryFilter !== 'all' && (
              <span className="badge">{categories.find(c => c.id === categoryFilter)?.name}</span>
            )}
            {frequencyFilter !== 'all' && (
              <span className="badge">{frequencyFilter}</span>
            )}
            {searchTerm && (
              <span className="badge">"{searchTerm}"</span>
            )}
            <button
              onClick={() => {
                setSearchTerm('')
                setDifficultyFilter('all')
                setCategoryFilter('all')
                setFrequencyFilter('all')
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Problem List */}
      <div className="space-y-3">
        {filteredProblems.map(problem => (
          <Link
            key={problem.id}
            to={`/problem/${problem.id}`}
            className="card-hover flex items-center justify-between p-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{problem.title}</h3>
                <span className={`badge ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <span className={`badge ${getFrequencyColor(problem.visaFrequency)}`}>
                  {problem.visaFrequency === 'very-high' && '🔥 '}
                  {problem.visaFrequency === 'high' && '⭐ '}
                  Visa: {problem.visaFrequency}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {problem.timeEstimate} min
                </span>
                <span>{problem.category}</span>
                <div className="flex gap-1">
                  {problem.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // TODO: Toggle star
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Star size={20} className="text-gray-400" />
              </button>
              <div className="text-blue-600 dark:text-blue-400 font-medium">
                Solve →
              </div>
            </div>
          </Link>
        ))}

        {filteredProblems.length === 0 && (
          <div className="card text-center py-12">
            <Filter className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-xl font-semibold mb-2">No problems found</p>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-8 card">
        <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-500">
              {problemDatabase.filter(p => p.difficulty === 'easy').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Easy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500">
              {problemDatabase.filter(p => p.difficulty === 'medium').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-500">
              {problemDatabase.filter(p => p.difficulty === 'hard').length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hard</p>
          </div>
        </div>
      </div>
    </div>
  )
}