import { BookOpen, CheckCircle, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PythonCourse() {
  const lessons = [
    {
      id: 1,
      title: 'Python Basics',
      description: 'Variables, data types, and basic operations',
      duration: '15 min',
      problems: 4,
      completed: false,
    },
    {
      id: 2,
      title: 'Control Flow',
      description: 'If statements, loops (for/while), break/continue',
      duration: '12 min',
      problems: 4,
      completed: false,
    },
    {
      id: 3,
      title: 'Functions & Scope',
      description: 'Function syntax, parameters, return values, lambda',
      duration: '10 min',
      problems: 3,
      completed: false,
    },
    {
      id: 4,
      title: 'Collections Module Mastery',
      description: 'Learn Counter, defaultdict, and deque - essential for CodeSignal',
      duration: '20 min',
      problems: 5,
      completed: false,
    },
    {
      id: 5,
      title: 'List Comprehensions',
      description: 'Write Pythonic code that saves time',
      duration: '15 min',
      problems: 5,
      completed: false,
    },
    {
      id: 6,
      title: 'Built-in Functions',
      description: 'sorted(), enumerate(), zip(), map(), filter()',
      duration: '15 min',
      problems: 5,
      completed: false,
    },
    {
      id: 7,
      title: 'String Operations',
      description: 'split(), join(), strip() and string slicing',
      duration: '10 min',
      problems: 3,
      completed: false,
    },
    {
      id: 8,
      title: 'Set Operations',
      description: 'Fast lookups and set arithmetic',
      duration: '10 min',
      problems: 3,
      completed: false,
    },
    {
      id: 9,
      title: 'Two Pointers Pattern',
      description: 'Master the technique that solves 40% of array problems',
      duration: '15 min',
      problems: 4,
      completed: false,
    },
    {
      id: 10,
      title: 'Sliding Window Pattern',
      description: 'Optimize substring and subarray problems',
      duration: '15 min',
      problems: 4,
      completed: false,
    },
    {
      id: 11,
      title: 'Hash Map Optimization',
      description: 'THE MOST CRITICAL - 70% of Q4 requires this!',
      duration: '25 min',
      problems: 6,
      completed: false,
    },
    {
      id: 12,
      title: 'Edge Cases & Testing',
      description: 'Catch the bugs before they fail hidden tests',
      duration: '10 min',
      problems: 0,
      completed: false,
    },
    {
      id: 13,
      title: 'Problem Solving Strategy',
      description: 'Step-by-step approach to tackle any problem',
      duration: '12 min',
      problems: 0,
      completed: false,
    },
    {
      id: 14,
      title: 'Python Gotchas',
      description: 'Avoid common mistakes that cost precious time',
      duration: '8 min',
      problems: 0,
      completed: false,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Python for CodeSignal</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Master the Python features that give you an edge in the assessment
      </p>

      {/* Why Python Section */}
      <div className="card mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
        <h2 className="text-2xl font-bold mb-4">Why Python for Visa CodeSignal?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="font-semibold mb-2">⚡ 5-10 Minutes Faster</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Python's built-ins save you from writing boilerplate code
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="font-semibold mb-2">📦 Rich Standard Library</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Counter, defaultdict solve 70% of Q4 problems elegantly
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="font-semibold mb-2">🎯 Less Code to Write</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              List comprehensions replace 5-line loops with 1 line
            </p>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-4 mb-8">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="card-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${lesson.completed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  {lesson.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <BookOpen className="text-gray-400" size={24} />
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {lesson.description}
                  </p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>⏱️ {lesson.duration}</span>
                    <span>📝 {lesson.problems} problems</span>
                  </div>
                </div>
              </div>

              <Link to={`/python-course/lesson/${lesson.id}`} className="btn-primary">
                <Play size={16} />
                Start
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Python Quick Reference</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3">Collections Module</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`from collections import Counter, defaultdict, deque

# Counter: Count occurrences
counter = Counter([1, 2, 2, 3, 3, 3])
# {3: 3, 2: 2, 1: 1}
counter.most_common(2)  # [(3, 3), (2, 2)]

# defaultdict: No KeyError
d = defaultdict(int)  # Default value: 0
d['key'] += 1  # No need to check if key exists

# deque: Fast ends operations
q = deque([1, 2, 3])
q.appendleft(0)  # O(1)
q.popleft()  # O(1)`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">List Comprehensions</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`# Transform
[x * 2 for x in arr]

# Filter
[x for x in arr if x > 0]

# Combined
[x * 2 for x in arr if x > 0]

# 2D
[[i*j for j in range(5)] for i in range(5)]`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Built-in Functions</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`# Sorting
sorted(arr, key=lambda x: x[1], reverse=True)

# Enumerate (index + value)
for i, val in enumerate(arr):
    print(f"Index {i}: {val}")

# Zip (parallel iteration)
for a, b in zip(arr1, arr2):
    print(a, b)

# Any/All
any([True, False])  # True
all([True, False])  # False`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">String Operations</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`s = "hello world"

# Split/Join
words = s.split()  # ['hello', 'world']
" ".join(words)  # "hello world"

# Strip whitespace
"  hello  ".strip()  # "hello"

# Slicing
s[0:5]  # "hello"
s[::-1]  # "dlrow olleh" (reverse)`}</pre>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Pro Tip
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Practice these patterns until they become second nature. In the actual test, you want to focus on
            solving the problem, not remembering syntax. The intelligence report has more Python tips!
          </p>
        </div>
      </div>
    </div>
  )
}