import { Bug, CheckCircle, XCircle, AlertCircle, Play } from 'lucide-react'
import { useState } from 'react'

export default function TestCaseDebugger({ problem, testResults }) {
  const [selectedTest, setSelectedTest] = useState(null)
  const [debugOutput, setDebugOutput] = useState(null)

  const selectTestCase = (index) => {
    setSelectedTest(index)

    // Find the corresponding test result if tests have been run
    if (testResults && testResults.length > 0) {
      const result = testResults[index]
      if (result) {
        setDebugOutput({
          passed: result.passed,
          result: result.actual,
          expected: result.expected,
          error: typeof result.actual === 'string' && result.actual.startsWith('Error:') ? result.actual : null
        })
      }
    } else {
      setDebugOutput(null)
    }
  }

  const testCases = problem?.testCases || []

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Bug className="text-orange-500" size={24} />
        <h3 className="text-xl font-bold">Test Case Debugger</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Test Cases List */}
        <div>
          <h4 className="font-semibold mb-3">Available Test Cases</h4>
          <div className="space-y-2">
            {testCases.map((testCase, idx) => {
              const result = testResults && testResults[idx]
              return (
                <button
                  key={idx}
                  onClick={() => selectTestCase(idx)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                    selectedTest === idx
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Test Case {idx + 1}</span>
                    {result && (
                      result.passed ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <XCircle className="text-red-500" size={20} />
                      )
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-mono truncate">Input: {JSON.stringify(testCase.input)}</p>
                    <p className="font-mono truncate">Expected: {JSON.stringify(testCase.output)}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Debug Output */}
        <div>
          <h4 className="font-semibold mb-3">Debug Information</h4>

          {!testResults || testResults.length === 0 ? (
            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center border-2 border-yellow-200 dark:border-yellow-700">
              <AlertCircle className="mx-auto mb-2 text-yellow-600 dark:text-yellow-400" size={32} />
              <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                No test results yet
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Run your code first to see debugging information
              </p>
            </div>
          ) : !debugOutput ? (
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <Play className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-600 dark:text-gray-400">
                Select a test case to see detailed results
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Result */}
              <div className={`p-4 rounded-lg ${
                debugOutput.passed
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                  : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {debugOutput.passed ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                  <span className={`font-semibold ${
                    debugOutput.passed ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                    {debugOutput.passed ? 'Test Passed' : 'Test Failed'}
                  </span>
                </div>

                {debugOutput.error && (
                  <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 rounded text-sm">
                    <p className="text-red-800 dark:text-red-200 font-mono">
                      Error: {debugOutput.error}
                    </p>
                  </div>
                )}

                {debugOutput.result !== undefined && (
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="font-mono">
                      <span className="text-gray-600 dark:text-gray-400">Your Output:</span>{' '}
                      <span className="font-semibold">{JSON.stringify(debugOutput.result)}</span>
                    </p>
                    <p className="font-mono">
                      <span className="text-gray-600 dark:text-gray-400">Expected:</span>{' '}
                      <span className="font-semibold">{JSON.stringify(debugOutput.expected)}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Helpful Tips */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>💡 Debugging Tips:</strong>
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1 list-disc list-inside">
                  <li>Add print() statements to trace execution</li>
                  <li>Check variable values at each step</li>
                  <li>Verify loop iterations and conditions</li>
                  <li>Test edge cases separately</li>
                  <li>Check if your function handles empty inputs</li>
                  <li>Verify your return statement is correct</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Debug Checklist */}
      <div className="card bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <h4 className="font-semibold mb-3">Common Issues to Check:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Off-by-one error in loops?</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Array bounds checked?</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Empty input handled?</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Correct comparison operators?</span>
            </label>
          </div>
          <div className="space-y-1">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Return value correct?</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Variables initialized properly?</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Using correct data structure?</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Logic handles all cases?</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
