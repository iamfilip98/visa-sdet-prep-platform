import { Link, useLocation } from 'react-router-dom'
import { Home, Code, Clock, BarChart3, BookOpen, Library, Moon, Sun, FileCode, AlertTriangle } from 'lucide-react'

export default function Navigation({ darkMode, setDarkMode }) {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/problems', icon: Code, label: 'Problems' },
    { path: '/mock-test', icon: Clock, label: 'Mock\u00A0Test' },
    { path: '/python-course', icon: BookOpen, label: 'Python\u00A0Course' },
    { path: '/templates', icon: FileCode, label: 'Templates' },
    { path: '/pitfalls', icon: AlertTriangle, label: 'Checklist' },
    { path: '/analytics', icon: BarChart3, label: 'Stats' },
    { path: '/resources', icon: Library, label: 'Resources' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Visa SDET Prep
            </div>
            <span className="px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
              BETA
            </span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  location.pathname === path
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={18} />
                <span className="hidden lg:inline text-sm">{label}</span>
              </Link>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}