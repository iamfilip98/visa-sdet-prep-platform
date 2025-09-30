import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import ProblemList from './components/ProblemList'
import ProblemView from './components/ProblemView'
import MockTest from './components/MockTest'
import Analytics from './components/Analytics'
import PythonCourse from './components/PythonCourse'
import Resources from './components/Resources'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problem/:id" element={<ProblemView />} />
            <Route path="/mock-test" element={<MockTest />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/python-course" element={<PythonCourse />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App