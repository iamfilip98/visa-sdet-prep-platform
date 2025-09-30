import { Bug, CheckCircle, XCircle, AlertCircle, Play } from 'lucide-react'
import { useState } from 'react'

export default function TestCaseDebugger({ testCases, userCode, onRunTest }) {
  const [selectedTest, setSelectedTest] = useState(null)
  const [debugOutput, setDebugOutput] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  const runWithDebug = async (testCase, index) => {
    setIsRunning(true)
    setSelectedTest(index)

    // Add debug instrumentation to user code
    const instrumentedCode = `
# Debug instrumentation
debug_log = []

def debug_print(msg):
    debug_log.append(str(msg))

${userCode}

# Run with test case
try:
    input_data = ${JSON.stringify(testCase.input)}
    result = solution(*input_data) if isinstance(input_data, list) else solution(input_data)
    output = {
        'result': result,
        'expected': ${JSON.stringify(testCase.output)},
        'debug_log': debug_log,
        'passed': result == ${JSON.stringify(testCase.output)}
    }
except Exception as e:
    output = {
        'error': str(e),
        'debug_log': debug_log,
        'passed': False
    }

output
`

    try {
      const result = await onRunTest(instrumentedCode)
      setDebugOutput(result)
    } catch (error) {
      setDebugOutput({ error: error.message, passed: false })
    }

    setIsRunning(false)
  }

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
            {testCases.map((testCase, idx) => (
              <button
                key={idx}
                onClick={() => runWithDebug(testCase, idx)}
                disabled={isRunning}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  selectedTest === idx
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                } ${isRunning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Test Case {idx + 1}</span>
                  {debugOutput && selectedTest === idx && (
                    debugOutput.passed ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-mono">Input: {JSON.stringify(testCase.input)}</p>
                  <p className="font-mono">Expected: {JSON.stringify(testCase.output)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Debug Output */}
        <div>
          <h4 className="font-semibold mb-3">Debug Information</h4>

          {!debugOutput && (
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <Play className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-600 dark:text-gray-400">
                Select a test case to see debug output
              </p>
            </div>
          )}

          {isRunning && (
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <div className="animate-spin mx-auto mb-2 h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <p className="text-blue-800 dark:text-blue-200">Running test...</p>
            </div>
          )}

          {debugOutput && !isRunning && (
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

              {/* Debug Log */}
              {debugOutput.debug_log && debugOutput.debug_log.length > 0 && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    Debug Output
                  </h5>
                  <div className="space-y-1 text-sm font-mono">
                    {debugOutput.debug_log.map((log, idx) => (
                      <div key={idx} className="p-2 bg-white dark:bg-gray-900 rounded">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Helpful Tips */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>💡 Debugging Tips:</strong>
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1 list-disc list-inside">
                  <li>Add debug_print() calls to trace execution</li>
                  <li>Check variable values at each step</li>
                  <li>Verify loop iterations and conditions</li>
                  <li>Test edge cases separately</li>
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
