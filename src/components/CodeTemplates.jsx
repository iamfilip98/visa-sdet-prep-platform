import { Code, Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function CodeTemplates() {
  const [copied, setCopied] = useState(null)

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const templates = [
    {
      id: 'two-sum',
      title: 'Two Sum (Hash Map)',
      category: 'Hash Map',
      description: 'Find two numbers that sum to target - O(n)',
      code: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None`
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window (Fixed Size)',
      category: 'Sliding Window',
      description: 'Maximum sum of subarray of size k',
      code: `def max_sum_subarray(arr, k):
    if len(arr) < k:
        return None

    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum`
    },
    {
      id: 'sliding-window-variable',
      title: 'Sliding Window (Variable Size)',
      category: 'Sliding Window',
      description: 'Longest substring with k distinct characters',
      code: `def longest_substring_k_distinct(s, k):
    char_freq = {}
    left = 0
    max_length = 0

    for right in range(len(s)):
        char_freq[s[right]] = char_freq.get(s[right], 0) + 1

        while len(char_freq) > k:
            char_freq[s[left]] -= 1
            if char_freq[s[left]] == 0:
                del char_freq[s[left]]
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length`
    },
    {
      id: 'two-pointers',
      title: 'Two Pointers (Opposite Ends)',
      category: 'Two Pointers',
      description: 'Two sum in sorted array',
      code: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return None`
    },
    {
      id: 'bfs',
      title: 'BFS (Breadth-First Search)',
      category: 'Graph/Tree',
      description: 'Level-order traversal or shortest path',
      code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()
        # Process node

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited`
    },
    {
      id: 'dfs',
      title: 'DFS (Depth-First Search)',
      category: 'Graph/Tree',
      description: 'Recursive exploration',
      code: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    # Process node

    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited`
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      category: 'Search',
      description: 'Find element in sorted array - O(log n)',
      code: `def binary_search(arr, target):
    if not arr:
        return -1

    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`
    },
    {
      id: 'counter-usage',
      title: 'Counter for Frequency',
      category: 'Collections',
      description: 'Count occurrences efficiently',
      code: `from collections import Counter

# Count elements
counter = Counter([1, 2, 2, 3, 3, 3])
# Counter({3: 3, 2: 2, 1: 1})

# Most common
counter.most_common(2)  # [(3, 3), (2, 2)]

# Check if anagrams
def are_anagrams(s1, s2):
    return Counter(s1) == Counter(s2)`
    },
    {
      id: 'defaultdict',
      title: 'defaultdict for Grouping',
      category: 'Collections',
      description: 'Group items without KeyError',
      code: `from collections import defaultdict

# Group by property
groups = defaultdict(list)
for item in items:
    key = get_key(item)
    groups[key].append(item)

# Count occurrences
counts = defaultdict(int)
for item in items:
    counts[item] += 1

# Build adjacency list
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)`
    },
    {
      id: 'prefix-sum',
      title: 'Prefix Sum with Hash Map',
      category: 'Hash Map',
      description: 'Subarray sum equals k - O(n)',
      code: `def subarray_sum_k(nums, k):
    count = 0
    prefix_sum = 0
    prefix_counts = {0: 1}

    for num in nums:
        prefix_sum += num

        if prefix_sum - k in prefix_counts:
            count += prefix_counts[prefix_sum - k]

        prefix_counts[prefix_sum] = prefix_counts.get(prefix_sum, 0) + 1

    return count`
    },
    {
      id: 'fast-slow-pointers',
      title: 'Fast & Slow Pointers',
      category: 'Two Pointers',
      description: 'Detect cycle or find middle',
      code: `# Detect cycle
def has_cycle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False

# Find middle
def find_middle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow`
    },
    {
      id: 'quick-test',
      title: 'Quick Test Framework',
      category: 'Testing',
      description: 'Test multiple cases quickly',
      code: `def quick_test(func, test_cases):
    for i, (input_val, expected) in enumerate(test_cases):
        result = func(input_val)
        if result != expected:
            print(f"❌ Test {i+1} failed")
            print(f"   Input: {input_val}")
            print(f"   Expected: {expected}")
            print(f"   Got: {result}")
            return False
    print("✓ All tests passed!")
    return True

# Usage
test_cases = [
    ([1, 2, 3], 6),
    ([], 0),
    ([5], 5),
]
quick_test(sum, test_cases)`
    }
  ]

  const categories = [...new Set(templates.map(t => t.category))]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Code Templates</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Copy-paste these battle-tested templates during the test. Save time and avoid bugs!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {categories.map(cat => {
          const count = templates.filter(t => t.category === cat).length
          return (
            <div key={cat} className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <p className="font-semibold">{cat}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{count} templates</p>
            </div>
          )
        })}
      </div>

      <div className="space-y-6">
        {templates.map(template => (
          <div key={template.id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Code className="text-blue-500" size={20} />
                  <h3 className="font-bold text-lg">{template.title}</h3>
                  <span className="badge text-xs">{template.category}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {template.description}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(template.code, template.id)}
                className={`btn-secondary flex items-center gap-2 ${
                  copied === template.id ? 'bg-green-500 text-white' : ''
                }`}
              >
                {copied === template.id ? (
                  <>
                    <CheckCircle size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{template.code}</pre>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
        <h3 className="font-bold text-lg mb-3">⚡ Speed Tip</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Familiarize yourself with these templates NOW. During the test:
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Recognize the pattern (2-3 seconds)</li>
          <li>Copy appropriate template</li>
          <li>Modify for specific problem (2-3 minutes)</li>
          <li>This saves 5-10 minutes vs. coding from scratch!</li>
        </ul>
      </div>
    </div>
  )
}
