import { AlertTriangle, CheckSquare, Square } from 'lucide-react'
import { useState } from 'react'

export default function CommonPitfalls() {
  const [checklist, setChecklist] = useState({
    emptyInput: false,
    singleElement: false,
    edgeCases: false,
    offByOne: false,
    printStatements: false,
    timeComplexity: false,
    testCases: false,
  })

  const toggleItem = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const pitfalls = [
    {
      key: 'emptyInput',
      title: 'Handle empty input',
      description: 'Check for empty array [], empty string "", or None/null',
      example: 'if not arr or len(arr) == 0: return []'
    },
    {
      key: 'singleElement',
      title: 'Test single element',
      description: 'Array with 1 element often breaks edge conditions',
      example: 'Test: [5], "a", single node'
    },
    {
      key: 'edgeCases',
      title: 'Test all edge cases',
      description: 'All same [5,5,5], all different [1,2,3], min/max values',
      example: 'Test: negatives, zeros, duplicates'
    },
    {
      key: 'offByOne',
      title: 'Check array bounds',
      description: 'Verify < vs <=, arr[i+1] checks, window sizes',
      example: 'if i < len(arr) - 1: arr[i+1]'
    },
    {
      key: 'printStatements',
      title: 'Remove print statements!',
      description: '❗ Print statements cause hidden test failures!',
      example: 'Delete ALL print/console.log before submit'
    },
    {
      key: 'timeComplexity',
      title: 'Verify time complexity',
      description: 'Is solution O(n)? Nested loops = O(n²) may timeout',
      example: 'Can hash map optimize to O(n)?'
    },
    {
      key: 'testCases',
      title: 'Run provided examples',
      description: 'Test with ALL provided examples before submitting',
      example: 'Trace through step-by-step'
    },
  ]

  const allChecked = Object.values(checklist).every(v => v)

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="text-orange-500" size={28} />
        <div>
          <h3 className="text-xl font-bold">Pre-Submit Checklist</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Check these BEFORE clicking submit to avoid common mistakes
          </p>
        </div>
      </div>

      {allChecked && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-300 dark:border-green-700">
          <p className="text-green-800 dark:text-green-200 font-semibold">
            ✓ All checks complete! Ready to submit.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {pitfalls.map((item) => (
          <div
            key={item.key}
            onClick={() => toggleItem(item.key)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              checklist[item.key]
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-orange-400'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {checklist[item.key] ? (
                  <CheckSquare className="text-green-600" size={22} />
                ) : (
                  <Square className="text-gray-400" size={22} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-semibold ${checklist[item.key] ? 'text-green-800 dark:text-green-200 line-through' : ''}`}>
                    {item.title}
                  </h4>
                  {item.title.includes('!') && !checklist[item.key] && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded font-semibold">
                      CRITICAL
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {item.description}
                </p>
                <code className="text-xs bg-gray-900 text-green-400 px-2 py-1 rounded">
                  {item.example}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Pro Tip
        </p>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Most hidden test failures are due to edge cases (empty, single element) or
          print statements. These 7 checks catch 90% of bugs before submission!
        </p>
      </div>

      <button
        onClick={() => setChecklist({
          emptyInput: false,
          singleElement: false,
          edgeCases: false,
          offByOne: false,
          printStatements: false,
          timeComplexity: false,
          testCases: false,
        })}
        className="mt-4 btn-secondary w-full"
      >
        Reset Checklist
      </button>
    </div>
  )
}
