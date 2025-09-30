import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Play, Send, RotateCcw, Loader } from 'lucide-react'

export default function CodeEditor({ initialCode, onRun, onSubmit, problemId }) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [executionTime, setExecutionTime] = useState(null)
  const pyodideRef = useRef(null)

  useEffect(() => {
    loadPyodide()
  }, [])

  const loadPyodide = async () => {
    try {
      if (!window.loadPyodide) {
        setOutput('Loading Python environment... This may take a moment on first load.')
        // Load Pyodide script
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js'
        script.onload = async () => {
          const pyodide = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
          })
          pyodideRef.current = pyodide
          setIsLoading(false)
          setOutput('✓ Python environment ready! Click "Run Code" to execute.')
        }
        document.body.appendChild(script)
      } else {
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
        })
        pyodideRef.current = pyodide
        setIsLoading(false)
        setOutput('✓ Python environment ready! Click "Run Code" to execute.')
      }
    } catch (error) {
      setOutput(`Error loading Python: ${error.message}`)
      setIsLoading(false)
    }
  }

  const runCode = async () => {
    if (!pyodideRef.current || isRunning) return

    setIsRunning(true)
    setOutput('Running...')

    try {
      const startTime = performance.now()

      // Capture stdout
      await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `)

      // Run user code with timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Execution timeout (5 seconds)')), 5000)
      )

      const execPromise = pyodideRef.current.runPythonAsync(code)

      await Promise.race([execPromise, timeoutPromise])

      // Get output
      const stdout = await pyodideRef.current.runPythonAsync('sys.stdout.getvalue()')
      const stderr = await pyodideRef.current.runPythonAsync('sys.stderr.getvalue()')

      const endTime = performance.now()
      const execTime = ((endTime - startTime) / 1000).toFixed(3)
      setExecutionTime(execTime)

      if (stderr) {
        setOutput(`Error:\\n${stderr}`)
      } else if (stdout) {
        setOutput(stdout || '(No output)')
      } else {
        setOutput('✓ Code executed successfully (no output)')
      }

      onRun?.({ success: !stderr, output: stdout, time: execTime })
    } catch (error) {
      setOutput(`Error: ${error.message}`)
      setExecutionTime(null)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = async () => {
    await runCode()
    onSubmit?.(code)
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput('')
    setExecutionTime(null)
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-gray-400">solution.py</span>
          {executionTime && (
            <span className="text-xs text-green-400">⚡ {executionTime}s</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center gap-1"
            title="Reset code"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={runCode}
            disabled={isRunning || isLoading}
            className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Loader size={14} className="animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={14} />
                Run Code
              </>
            )}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isRunning || isLoading}
            className="px-4 py-1.5 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded flex items-center gap-2"
          >
            <Send size={14} />
            Submit
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
          }}
        />
      </div>

      {/* Output Console */}
      <div className="h-48 bg-black border-t border-gray-700 overflow-auto">
        <div className="p-4 font-mono text-sm">
          <div className="text-gray-400 mb-2">Output:</div>
          <pre className="text-green-400 whitespace-pre-wrap">{output || '(run your code to see output)'}</pre>
        </div>
      </div>
    </div>
  )
}