import { useState } from 'react'
import { Brain, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PatternQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const questions = [
    {
      id: 1,
      problem: 'Find two numbers in an array that sum to a target value.',
      difficulty: 'Easy',
      options: [
        'Two Pointers',
        'Hash Map',
        'Sliding Window',
        'Binary Search'
      ],
      correct: [0, 1], // Both are valid
      bestAnswer: 1, // Hash Map is more general
      explanation: 'Hash Map is the best choice (O(n)). Store complements as you iterate. Two Pointers also works if the array is sorted.',
      hint: 'What can give you O(1) lookup to find the complement?'
    },
    {
      id: 2,
      problem: 'Find the longest substring without repeating characters.',
      difficulty: 'Medium',
      options: [
        'Two Pointers',
        'Hash Map',
        'Sliding Window',
        'Binary Search'
      ],
      correct: [2],
      bestAnswer: 2,
      explanation: 'Sliding Window is perfect here. Use a hash map to track characters in current window. Expand right, shrink left when duplicate found.',
      hint: 'The window size changes as you find duplicates.'
    },
    {
      id: 3,
      problem: 'Count the number of subarrays with sum equal to k.',
      difficulty: 'Medium',
      options: [
        'Sliding Window',
        'Hash Map + Prefix Sum',
        'Two Pointers',
        'Binary Search'
      ],
      correct: [1],
      bestAnswer: 1,
      explanation: 'Hash Map + Prefix Sum is the key! Store prefix sums and check if (current_sum - k) exists. This is a very common Q4 pattern.',
      hint: 'prefix_sum[j] - prefix_sum[i] = k'
    },
    {
      id: 4,
      problem: 'Find if a pair exists in a sorted array that sums to target.',
      difficulty: 'Easy',
      options: [
        'Two Pointers',
        'Hash Map',
        'Sliding Window',
        'Nested Loops'
      ],
      correct: [0],
      bestAnswer: 0,
      explanation: 'Two Pointers from opposite ends is optimal for sorted arrays. O(n) time, O(1) space. Move pointers based on sum comparison.',
      hint: 'The array is SORTED - use that to your advantage!'
    },
    {
      id: 5,
      problem: 'Group anagrams together from a list of strings.',
      difficulty: 'Medium',
      options: [
        'Nested Loops',
        'Hash Map (sorted string as key)',
        'Two Pointers',
        'Sliding Window'
      ],
      correct: [1],
      bestAnswer: 1,
      explanation: 'Hash Map with sorted string as key! "eat" and "tea" both become "aet". Use defaultdict(list) to group. O(n * k log k) where k is max string length.',
      hint: 'How can you identify anagrams? What stays the same?'
    },
    {
      id: 6,
      problem: 'Find the maximum sum of a subarray of size k.',
      difficulty: 'Easy',
      options: [
        'Two Pointers',
        'Hash Map',
        'Sliding Window (Fixed)',
        'Nested Loops'
      ],
      correct: [2],
      bestAnswer: 2,
      explanation: 'Fixed-size Sliding Window! Calculate first window sum, then slide: subtract left, add right. O(n) vs O(n*k) with nested loops.',
      hint: 'Size k is FIXED - you can reuse calculations!'
    },
    {
      id: 7,
      problem: 'Detect if a linked list has a cycle.',
      difficulty: 'Easy',
      options: [
        'Hash Map',
        'Two Pointers (Fast/Slow)',
        'Sliding Window',
        'Stack'
      ],
      correct: [0, 1],
      bestAnswer: 1,
      explanation: 'Fast/Slow Pointers (Floyd\'s Algorithm) is optimal! O(n) time, O(1) space. Fast moves 2x, slow 1x. If they meet, there\'s a cycle. Hash Map also works but uses O(n) space.',
      hint: 'How can two pointers moving at different speeds help?'
    },
    {
      id: 8,
      problem: 'Find the first non-repeating character in a string.',
      difficulty: 'Easy',
      options: [
        'Two Pointers',
        'Counter (frequency counting)',
        'Sliding Window',
        'Stack'
      ],
      correct: [1],
      bestAnswer: 1,
      explanation: 'Counter from collections! Count all characters first, then iterate again to find first with count==1. O(n) time.',
      hint: 'You need to know how many times each character appears.'
    },
    {
      id: 9,
      problem: 'Check if string s2 is a permutation of s1 within a larger string.',
      difficulty: 'Medium',
      options: [
        'Sliding Window + Counter',
        'Two Pointers',
        'Hash Map',
        'Binary Search'
      ],
      correct: [0],
      bestAnswer: 0,
      explanation: 'Sliding Window + Counter! Slide a window of size len(s1) through the string, comparing character frequencies. Classic substring permutation pattern.',
      hint: 'Permutation = same characters, different order.'
    },
    {
      id: 10,
      problem: 'Find all pairs in an array where nums[i] + nums[j] is a power of 2.',
      difficulty: 'Hard',
      options: [
        'Nested Loops',
        'Hash Map (with powers of 2)',
        'Two Pointers',
        'Sliding Window'
      ],
      correct: [1],
      bestAnswer: 1,
      explanation: 'Hash Map with powers of 2! This is an ACTUAL Visa Q4 problem. Store frequencies, then for each number, check all 32 powers of 2 to find complements. O(n * 32) ≈ O(n).',
      hint: 'There are only 32 powers of 2 to check (2^0 to 2^31).'
    }
  ]

  const handleAnswer = (answerIdx) => {
    setSelectedAnswer(answerIdx)
    setShowExplanation(true)

    const isCorrect = questions[currentQuestion].correct.includes(answerIdx)
    const isBest = questions[currentQuestion].bestAnswer === answerIdx

    if (isBest) {
      setScore(score + 10)
    } else if (isCorrect) {
      setScore(score + 5)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setCompleted(false)
  }

  if (completed) {
    const percentage = Math.round((score / 100) * 100)
    const passed = percentage >= 70

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <div className="text-center mb-6">
            <Award className={`mx-auto mb-4 ${passed ? 'text-green-500' : 'text-orange-500'}`} size={64} />
            <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your Pattern Recognition Score
            </p>
          </div>

          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${passed ? 'text-green-600' : 'text-orange-600'}`}>
              {score}/100
            </div>
            <p className="text-xl mt-2 text-gray-600 dark:text-gray-400">
              {percentage}%
            </p>
          </div>

          {passed ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-6">
              <p className="text-green-800 dark:text-green-200 font-semibold text-center">
                ✓ Excellent! You can recognize patterns quickly. You're ready for the test!
              </p>
            </div>
          ) : percentage >= 50 ? (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-6">
              <p className="text-yellow-800 dark:text-yellow-200 font-semibold text-center">
                ⚠️ Good progress, but review the lessons to strengthen pattern recognition.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-6">
              <p className="text-red-800 dark:text-red-200 font-semibold text-center">
                ✗ Study the algorithm pattern lessons (9-11) carefully before retaking.
              </p>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <h3 className="font-bold text-lg">Key Patterns to Remember:</h3>
            <ul className="text-sm space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
              <li><strong>Hash Map:</strong> Finding pairs, complements, frequency counting (70% of Q4!)</li>
              <li><strong>Sliding Window:</strong> Substring/subarray problems with contiguous elements</li>
              <li><strong>Two Pointers:</strong> Sorted arrays, pairs, in-place modifications</li>
              <li><strong>Prefix Sum + Hash Map:</strong> Subarray sum problems</li>
              <li><strong>Fast/Slow Pointers:</strong> Cycle detection, finding middle</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={resetQuiz} className="btn-primary flex items-center gap-2">
              <RotateCcw size={16} />
              Retake Quiz
            </button>
            <Link to="/python-course/lesson/11" className="btn-secondary">
              Review Hash Maps
            </Link>
            <Link to="/problems" className="btn-secondary">
              Practice Problems
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="text-purple-600" size={32} />
            Pattern Recognition Quiz
          </h1>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
            <p className="text-2xl font-bold">{score}/100</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`badge badge-${question.difficulty.toLowerCase()}`}>
            {question.difficulty}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Which pattern would you use?
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {question.problem}
        </h2>

        {!showExplanation && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 Hint: {question.hint}
            </p>
          </div>
        )}

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx
            const isCorrect = question.correct.includes(idx)
            const isBest = question.bestAnswer === idx

            let className = 'p-4 rounded-lg border-2 cursor-pointer transition-all '

            if (!showExplanation) {
              className += 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            } else if (isSelected) {
              if (isBest) {
                className += 'border-green-500 bg-green-50 dark:bg-green-900/20'
              } else if (isCorrect) {
                className += 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              } else {
                className += 'border-red-500 bg-red-50 dark:bg-red-900/20'
              }
            } else if (showExplanation && isBest) {
              className += 'border-green-500 bg-green-50 dark:bg-green-900/20'
            } else {
              className += 'border-gray-300 dark:border-gray-600 opacity-50'
            }

            return (
              <button
                key={idx}
                onClick={() => !showExplanation && handleAnswer(idx)}
                disabled={showExplanation}
                className={className + ' w-full text-left'}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showExplanation && isSelected && (
                    isBest ? <CheckCircle className="text-green-500" size={24} /> :
                    isCorrect ? <CheckCircle className="text-yellow-500" size={24} /> :
                    <XCircle className="text-red-500" size={24} />
                  )}
                  {showExplanation && !isSelected && isBest && (
                    <CheckCircle className="text-green-500" size={24} />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">Explanation:</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {question.explanation}
            </p>
            {selectedAnswer === question.bestAnswer ? (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-semibold">
                ✓ Perfect! +10 points
              </p>
            ) : question.correct.includes(selectedAnswer) ? (
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2 font-semibold">
                ⚠️ Acceptable, but not optimal. +5 points
              </p>
            ) : (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2 font-semibold">
                ✗ Incorrect. Review the pattern!
              </p>
            )}
          </div>
        )}
      </div>

      {showExplanation && (
        <button onClick={handleNext} className="btn-primary w-full">
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}

      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <p className="text-sm text-purple-900 dark:text-purple-100">
          <strong>Goal:</strong> Recognize patterns in &lt;30 seconds during the real test.
          This quiz trains your pattern recognition speed!
        </p>
      </div>
    </div>
  )
}
