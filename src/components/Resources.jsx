import { FileText, ExternalLink, Book, Video, AlertCircle, Target, Clock } from 'lucide-react'

export default function Resources() {
  const keyInsights = [
    {
      icon: Target,
      title: 'Test Format',
      content: '4 problems in 70 minutes | 200-600 scoring | Q1 (Easy), Q2-Q3 (Medium), Q4 (Hard)'
    },
    {
      icon: Clock,
      title: 'Time Management',
      content: 'Q1: 8-10 min | Q2: 15-18 min | Q3: 18-22 min | Q4: 20-25 min | Review: 5 min'
    },
    {
      icon: AlertCircle,
      title: 'Most Important Pattern',
      content: '70% of Q4 problems require hash map optimization - FOCUS HERE!'
    },
  ]

  const externalResources = [
    {
      title: 'CodeSignal Arcade',
      url: 'https://app.codesignal.com/arcade',
      description: 'Official platform to practice and familiarize with the IDE',
      type: 'Practice'
    },
    {
      title: 'Python Collections Documentation',
      url: 'https://docs.python.org/3/library/collections.html',
      description: 'Official docs for Counter, defaultdict, deque',
      type: 'Documentation'
    },
    {
      title: 'LeetCode Top Interview Questions',
      url: 'https://leetcode.com/problemset/top-interview-questions/',
      description: 'Additional practice problems (use for supplementary practice)',
      type: 'Practice'
    },
  ]

  const testDayChecklist = [
    { item: 'Browser compatibility checked', done: false },
    { item: 'Internet speed ≥500 kb/s confirmed', done: false },
    { item: 'Quiet space reserved', done: false },
    { item: 'Government ID ready', done: false },
    { item: 'Webcam and microphone tested', done: false },
    { item: 'Intelligence report reviewed', done: false },
    { item: 'Python cheat sheet prepared', done: false },
    { item: 'Mock tests completed (2-3)', done: false },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Study Resources</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Everything you need to know about the Visa SDET CodeSignal assessment
      </p>

      {/* Key Intelligence Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {keyInsights.map((insight, idx) => (
          <div key={idx} className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <insight.icon className="text-blue-600 dark:text-blue-400 mb-3" size={32} />
            <h3 className="font-bold text-lg mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{insight.content}</p>
          </div>
        ))}
      </div>

      {/* Intelligence Report */}
      <div className="card mb-8">
        <div className="flex items-start gap-4 mb-6">
          <FileText className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={32} />
          <div>
            <h2 className="text-2xl font-bold mb-2">Complete Intelligence Report</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              26,000-word comprehensive research report based on 15+ candidate experiences, 10+ expert guides,
              and official Visa/CodeSignal documentation.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            🔥 READ THIS FIRST!
          </p>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            The intelligence report contains everything from the research: problem patterns, time management,
            Python tips, common mistakes, and test day strategy. Reading this will put you ahead of 80% of candidates.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">📊 What's Inside</h4>
            <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Exact test format and scoring system (200-600 scale)</li>
              <li>Problem type frequency analysis (Arrays 80%, Hash Maps 70%)</li>
              <li>Minute-by-minute time management strategy</li>
              <li>Python-specific optimization techniques</li>
              <li>Common pitfalls that fail hidden tests</li>
              <li>SDET edge case thinking patterns</li>
              <li>Score benchmarks and pass thresholds</li>
              <li>Complete test day preparation checklist</li>
            </ul>
          </div>

          <a
            href="/VISA_SDET_INTELLIGENCE_REPORT.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FileText size={20} />
            Open Intelligence Report
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* External Resources */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold mb-6">External Resources</h2>
        <div className="space-y-3">
          {externalResources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <ExternalLink className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                </div>
              </div>
              <span className="badge">{resource.type}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Note:</strong> While these external resources are helpful, everything you need is already
            in this platform. Use external resources only for supplementary practice if needed.
          </p>
        </div>
      </div>

      {/* Test Day Checklist */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Test Day Preparation Checklist</h2>

        <div className="space-y-3 mb-6">
          {testDayChecklist.map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                defaultChecked={item.done}
              />
              <span className={item.done ? 'line-through text-gray-500' : ''}>
                {item.item}
              </span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              ✓ Do This
            </h4>
            <ul className="text-sm space-y-1 text-green-800 dark:text-green-200 list-disc list-inside">
              <li>Read intelligence report 24 hours before</li>
              <li>Solve 2 warm-up problems (not timed)</li>
              <li>Review Python cheat sheet</li>
              <li>Get 8 hours of sleep</li>
              <li>Have water and scratch paper ready</li>
            </ul>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
              ✗ Don't Do This
            </h4>
            <ul className="text-sm space-y-1 text-red-800 dark:text-red-200 list-disc list-inside">
              <li>Cram new concepts the night before</li>
              <li>Take test in noisy environment</li>
              <li>Skip breakfast/lunch before test</li>
              <li>Leave print statements in code</li>
              <li>Give up on Q4 without trying</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Mantras */}
      <div className="card mt-8 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
        <h2 className="text-2xl font-bold mb-4">Success Mantras for Test Day</h2>
        <div className="space-y-3">
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
            "Partial credit beats perfection"
          </blockquote>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
            "Q1-Q3 done &gt; Q1-Q2 perfect"
          </blockquote>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
            "15 minutes stuck = time to move on"
          </blockquote>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
            "Edge cases: empty, single, all same, max size"
          </blockquote>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic">
            "Hash maps are 70% of Q4"
          </blockquote>
        </div>
      </div>
    </div>
  )
}