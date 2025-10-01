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
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              <span className="hidden sm:inline">Visa SDET Prep</span>
              <span className="sm:hidden">Visa SDET<br/>Prep</span>
            </div>
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
              BETA
            </span>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg transition-colors whitespace-nowrap min-w-[44px] ${
                  location.pathname === path
                    ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={label}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="hidden lg:inline text-sm">{label}</span>
              </Link>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-1 sm:ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[44px] flex items-center justify-center"
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