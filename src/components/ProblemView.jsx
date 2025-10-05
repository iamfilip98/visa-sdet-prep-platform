import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Lightbulb, CheckCircle, XCircle, Eye, EyeOff, Bug, TrendingUp } from 'lucide-react'
import { problemDatabase } from '../data/problems'
import CodeEditor from './CodeEditor'
import { saveProblemSubmission, isProblemSolved } from '../utils/database'
import TestCaseDebugger from './TestCaseDebugger'
import SimilarProblems from './SimilarProblems'

export default function ProblemView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const problem = problemDatabase.find(p => p.id === parseInt(id))

  const [activeTab, setActiveTab] = useState('description')
  const [hintsRevealed, setHintsRevealed] = useState([])
  const [showSolution, setShowSolution] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [isSolved, setIsSolved] = useState(false)
  const [currentCode, setCurrentCode] = useState('')
  const [pyodideInstance, setPyodideInstance] = useState(null)

  useEffect(() => {
    async function checkSolved() {
      const solved = await isProblemSolved(parseInt(id))
      setIsSolved(solved)
    }
    checkSolved()
  }, [id])

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <p className="text-xl font-semibold mb-2">Problem not found</p>
          <button onClick={() => navigate('/problems')} className="btn-primary mt-4">
            ← Back to Problems
          </button>
        </div>
      </div>
    )
  }

  const revealHint = (index) => {
    setHintsRevealed([...hintsRevealed, index])
  }

  const getDifficultyColor = () => {
    switch (problem.difficulty) {
      case 'easy': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'hard': return 'text-red-500'
      default: return ''
    }
  }

  const runTests = async (code, pyodide) => {
    // Run tests against actual code execution
    const results = []

    for (let idx = 0; idx < problem.testCases.length; idx++) {
      const testCase = problem.testCases[idx]
      let passed = false
      let actualOutput = null

      try {
        // Extract function name from code (assumes def function_name(...))
        const funcMatch = code.match(/def\s+(\w+)\s*\(/)
        if (!funcMatch) {
          results.push({
            index: idx,
            input: testCase.input,
            expected: testCase.output,
            actual: 'Error: No function definition found',
            passed: false
          })
          continue
        }

        const funcName = funcMatch[1]

        // Execute code with test input
        await pyodide.runPythonAsync(code)

        // Call function with test input and capture output
        const inputStr = JSON.stringify(testCase.input)
        const result = await pyodide.runPythonAsync(`
import json
result = ${funcName}(*json.loads('${inputStr}'))
json.dumps(result)
        `)

        actualOutput = JSON.parse(result)

        // Deep comparison
        passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.output)

        results.push({
          index: idx,
          input: testCase.input,
          expected: testCase.output,
          actual: actualOutput,
          passed
        })
      } catch (error) {
        results.push({
          index: idx,
          input: testCase.input,
          expected: testCase.output,
          actual: `Error: ${error.message}`,
          passed: false
        })
      }
    }

    setTestResults(results)
    return results
  }

  const handleSubmit = async (code, pyodide) => {
    const results = await runTests(code, pyodide)

    // Save submission to database
    const passed = results.every(r => r.passed)
    await saveProblemSubmission(problem.id, code, passed, results)

    if (passed) {
      setIsSolved(true)
      alert('✓ All test cases passed! Great job!')
    } else {
      alert(`${results.filter(r => r.passed).length}/${results.length} test cases passed. Keep trying!`)
    }
  }

  const handleCodeChange = (code) => {
    setCurrentCode(code)
  }


  return (
    <div className="h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Left Panel - Problem Description */}
      <div className="w-full lg:w-1/2 overflow-y-auto bg-white dark:bg-gray-900 lg:border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="p-3 sm:p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate('/problems')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ChevronLeft size={20} />
            Back to Problems
          </button>

          {/* Problem Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">{problem.title}</h1>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm">
              <span className={`badge badge-${problem.difficulty}`}>
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </span>
              <span className="badge badge-visa">
                🔥 {problem.visaFrequency}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ⏱️ {problem.timeEstimate}m
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                📁 {problem.category}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 border-b border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 overflow-x-auto scrollbar-thin">
            {['description', 'hints', 'solution', 'debug', 'similar'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-colors whitespace-nowrap min-w-[80px] sm:min-w-0 ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {tab === 'similar' ? 'Similar' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap mb-6">{problem.description}</div>

              <h3 className="text-xl font-bold mt-8 mb-4">Example Test Cases</h3>
              {problem.testCases.slice(0, 3).map((testCase, idx) => (
                <div key={idx} className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm">
                  <div className="mb-2">
                    <strong>Input:</strong> {JSON.stringify(testCase.input)}
                  </div>
                  <div>
                    <strong>Output:</strong> {JSON.stringify(testCase.output)}
                  </div>
                </div>
              ))}

              {testResults.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Your Test Results</h3>
                  {testResults.map((result, idx) => (
                    <div
                      key={idx}
                      className={`mb-3 p-4 rounded-lg ${
                        result.passed
                          ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500'
                          : 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {result.passed ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-red-500" size={20} />
                        )}
                        <strong>Test Case {idx + 1}</strong>
                      </div>
                      <div className="text-sm font-mono">
                        Input: {JSON.stringify(result.input)}
                      </div>
                      <div className="text-sm font-mono">
                        Expected: {JSON.stringify(result.expected)}
                      </div>
                      {result.actual !== undefined && (
                        <div className="text-sm font-mono">
                          Actual: {typeof result.actual === 'string' && result.actual.startsWith('Error:')
                            ? <span className="text-red-500">{result.actual}</span>
                            : JSON.stringify(result.actual)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'hints' && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Click on a hint to reveal it. Try solving without hints first!
              </p>
              {problem.hints.map((hint, idx) => (
                <div key={idx}>
                  {hintsRevealed.includes(idx) ? (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                        <div>
                          <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                            Hint {idx + 1}
                          </p>
                          <p className="text-blue-800 dark:text-blue-200">{hint}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => revealHint(idx)}
                      className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                        <EyeOff size={20} />
                        Click to reveal Hint {idx + 1}
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'solution' && (
            <div>
              {!showSolution ? (
                <div className="text-center py-12">
                  <Eye className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-lg font-semibold mb-2">Solution Hidden</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Make sure you've given this problem a genuine attempt before viewing the solution.
                  </p>
                  <button
                    onClick={() => setShowSolution(true)}
                    className="btn-primary"
                  >
                    Show Solution
                  </button>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold mb-4">Python Solution</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <code>{problem.solution.python}</code>
                  </pre>

                  <h3 className="text-xl font-bold mt-8 mb-4">Explanation</h3>
                  <p>{problem.solution.explanation}</p>

                  <h3 className="text-xl font-bold mt-8 mb-4">Complexity Analysis</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Time Complexity:</strong> <code>{problem.solution.timeComplexity}</code>
                    </p>
                    <p>
                      <strong>Space Complexity:</strong> <code>{problem.solution.spaceComplexity}</code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'debug' && (
            <TestCaseDebugger
              problem={problem}
              testResults={testResults}
              userCode={currentCode}
              pyodide={pyodideInstance}
            />
          )}

          {activeTab === 'similar' && (
            <SimilarProblems
              currentProblem={problem}
              problemDatabase={problemDatabase}
            />
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="hidden lg:block w-1/2">
        <CodeEditor
          initialCode={problem.starterCode.python}
          onRun={(code, pyodide) => {
            setPyodideInstance(pyodide)
            return runTests(code, pyodide)
          }}
          onSubmit={(code, pyodide) => {
            setPyodideInstance(pyodide)
            return handleSubmit(code, pyodide)
          }}
          onChange={handleCodeChange}
          problemId={problem.id}
        />
      </div>

      {/* Mobile: Show editor below on small screens */}
      <div className="lg:hidden w-full h-[50vh] border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <CodeEditor
          initialCode={problem.starterCode.python}
          onRun={(code, pyodide) => {
            setPyodideInstance(pyodide)
            return runTests(code, pyodide)
          }}
          onSubmit={(code, pyodide) => {
            setPyodideInstance(pyodide)
            return handleSubmit(code, pyodide)
          }}
          onChange={handleCodeChange}
          problemId={problem.id}
        />
      </div>
    </div>
  )
}