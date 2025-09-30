import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import ProblemList from './components/ProblemList'
import ProblemView from './components/ProblemView'
import MockTest from './components/MockTest'
import Analytics from './components/Analytics'
import PythonCourse from './components/PythonCourse'
import PythonLesson from './components/PythonLesson'
import Resources from './components/Resources'
import CodeTemplates from './components/CodeTemplates'
import CommonPitfalls from './components/CommonPitfalls'
import PatternQuiz from './components/PatternQuiz'

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
            <Route path="/python-course/lesson/:id" element={<PythonLesson />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/templates" element={<CodeTemplates />} />
            <Route path="/pitfalls" element={<CommonPitfalls />} />
            <Route path="/pattern-quiz" element={<PatternQuiz />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App