import { Bug, CheckCircle, XCircle, AlertCircle, Play } from 'lucide-react'
import { useState } from 'react'

export default function TestCaseDebugger({ problem, testResults, userCode, pyodide }) {
  const [selectedTest, setSelectedTest] = useState(null)
  const [debugOutput, setDebugOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

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

  const runTestCase = async (index) => {
    if (!userCode || !pyodide) {
      setDebugOutput({
        error: 'No code to run. Please write your solution first.',
        passed: false
      })
      return
    }

    setIsRunning(true)
    const testCase = testCases[index]

    try {
      // Extract function name from code
      const funcMatch = userCode.match(/def\s+(\w+)\s*\(/)
      if (!funcMatch) {
        setDebugOutput({
          error: 'No function definition found in your code',
          passed: false,
          expected: testCase.output
        })
        setIsRunning(false)
        return
      }

      const funcName = funcMatch[1]

      // Execute code with test input
      await pyodide.runPythonAsync(userCode)

      // Call function with test input and capture output
      const inputStr = JSON.stringify(testCase.input)
      const result = await pyodide.runPythonAsync(`
import json
result = ${funcName}(*json.loads('${inputStr}'))
json.dumps(result)
      `)

      const actualOutput = JSON.parse(result)
      const passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.output)

      setDebugOutput({
        passed,
        result: actualOutput,
        expected: testCase.output,
        error: null
      })
    } catch (error) {
      setDebugOutput({
        error: error.message,
        passed: false,
        expected: testCase.output
      })
    } finally {
      setIsRunning(false)
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
                <div key={idx} className="space-y-2">
                  <button
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
                  {selectedTest === idx && userCode && pyodide && (
                    <button
                      onClick={() => runTestCase(idx)}
                      disabled={isRunning}
                      className="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Play size={16} />
                      {isRunning ? 'Running...' : 'Run This Test Case'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Debug Output */}
        <div>
          <h4 className="font-semibold mb-3">Debug Information</h4>

          {!debugOutput ? (
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <Play className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Select a test case and click "Run This Test Case"
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {userCode && pyodide ? 'Your code is ready to test' : 'Write your solution in the editor first'}
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
