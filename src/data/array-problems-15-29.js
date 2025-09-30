// Array Manipulation Problems for Visa CodeSignal Assessment
// IDs: 15-29 (15 problems total)
// Distribution: 5 Easy, 7 Medium, 3 Hard

export const arrayProblems = [
  // ==================== EASY ARRAY PROBLEMS ====================

  {
    id: 15,
    title: "Move Zeros to End",
    difficulty: "easy",
    category: "arrays",
    tags: ["array", "two-pointer", "in-place"],
    visaFrequency: "very-high",
    timeEstimate: 10,
    description: `Move all zeros in an array to the end while maintaining the relative order of non-zero elements. Modify the array in-place.

**Example:**
- Input: [0, 1, 0, 3, 12]
- Output: [1, 3, 12, 0, 0]

**Example 2:**
- Input: [0, 0, 1]
- Output: [1, 0, 0]

**Constraints:**
- 1 ≤ arr.length ≤ 10^4
- -2^31 ≤ arr[i] ≤ 2^31 - 1
- Must modify array in-place with O(1) extra space`,
    starterCode: {
      python: `def move_zeros(arr):
    """
    Move all zeros to end, maintain order of non-zeros.

    Args:
        arr: List of integers
    Returns:
        Modified list with zeros at end
    """
    # Your code here
    pass

# Test
print(move_zeros([0, 1, 0, 3, 12]))  # [1, 3, 12, 0, 0]`
    },
    testCases: [
      { input: [[0, 1, 0, 3, 12]], output: [1, 3, 12, 0, 0] },
      { input: [[0, 0, 1]], output: [1, 0, 0] },
      { input: [[1, 2, 3]], output: [1, 2, 3] },
      { input: [[0]], output: [0] },
      { input: [[1, 0, 2, 0, 3, 0]], output: [1, 2, 3, 0, 0, 0] }
    ],
    hints: [
      "Use two pointers: one for reading, one for writing non-zeros",
      "First pass: copy all non-zeros to front, track position",
      "Second pass: fill remaining positions with zeros"
    ],
    solution: {
      python: `def move_zeros(arr):
    # Write pointer for non-zero elements
    write_pos = 0

    # Move all non-zeros to front
    for read_pos in range(len(arr)):
        if arr[read_pos] != 0:
            arr[write_pos] = arr[read_pos]
            write_pos += 1

    # Fill remaining with zeros
    for i in range(write_pos, len(arr)):
        arr[i] = 0

    return arr`,
      explanation: "Two-pointer technique: write_pos tracks where to place next non-zero. After copying non-zeros, fill rest with zeros.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    }
  },

  {
    id: 16,
    title: "Find Missing Number",
    difficulty: "easy",
    category: "arrays",
    tags: ["array", "math", "bit-manipulation"],
    visaFrequency: "very-high",
    timeEstimate: 8,
    description: `Given an array containing n distinct numbers from 0 to n, find the missing number.

**Example:**
- Input: [3, 0, 1]
- Output: 2  # numbers 0-3, missing 2

**Example 2:**
- Input: [9,6,4,2,3,5,7,0,1]
- Output: 8

**Constraints:**
- n == arr.length
- 1 ≤ n ≤ 10^4
- 0 ≤ arr[i] ≤ n
- All numbers in arr are unique`,
    starterCode: {
      python: `def find_missing_number(arr):
    """
    Find the missing number in range [0, n].

    Args:
        arr: List of n distinct numbers from 0 to n
    Returns:
        The missing number
    """
    # Your code here
    pass

# Test
print(find_missing_number([3, 0, 1]))  # 2`
    },
    testCases: [
      { input: [[3, 0, 1]], output: 2 },
      { input: [[9,6,4,2,3,5,7,0,1]], output: 8 },
      { input: [[0, 1]], output: 2 },
      { input: [[1]], output: 0 },
      { input: [[0]], output: 1 }
    ],
    hints: [
      "Sum of 0 to n is: n * (n + 1) / 2",
      "Expected sum - actual sum = missing number",
      "Alternative: XOR all indices and values (XOR properties)"
    ],
    solution: {
      python: `def find_missing_number(arr):
    n = len(arr)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(arr)
    return expected_sum - actual_sum

# Alternative XOR solution:
# def find_missing_number(arr):
#     result = len(arr)
#     for i, num in enumerate(arr):
#         result ^= i ^ num
#     return result`,
      explanation: "Use math formula for sum of 0 to n. Difference between expected and actual sum is the missing number.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    }
  },

  {
    id: 17,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    category: "arrays",
    tags: ["array", "greedy", "kadane"],
    visaFrequency: "high",
    timeEstimate: 12,
    description: `Given an array of stock prices where prices[i] is the price on day i, find the maximum profit from one buy and one sell. You must buy before you sell.

**Example:**
- Input: [7, 1, 5, 3, 6, 4]
- Output: 5  # Buy at 1, sell at 6

**Example 2:**
- Input: [7, 6, 4, 3, 1]
- Output: 0  # No profit possible, don't buy

**Constraints:**
- 1 ≤ prices.length ≤ 10^5
- 0 ≤ prices[i] ≤ 10^4`,
    starterCode: {
      python: `def max_profit(prices):
    """
    Calculate maximum profit from one transaction.

    Args:
        prices: List of daily stock prices
    Returns:
        Maximum profit (0 if no profit possible)
    """
    # Your code here
    pass

# Test
print(max_profit([7, 1, 5, 3, 6, 4]))  # 5`
    },
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], output: 5 },
      { input: [[7, 6, 4, 3, 1]], output: 0 },
      { input: [[1, 2]], output: 1 },
      { input: [[2, 4, 1, 7]], output: 6 },
      { input: [[5]], output: 0 }
    ],
    hints: [
      "Track the minimum price seen so far",
      "For each price, calculate profit if selling today",
      "Keep track of maximum profit seen",
      "One pass through array is sufficient"
    ],
    solution: {
      python: `def max_profit(prices):
    if len(prices) < 2:
        return 0

    min_price = prices[0]
    max_profit = 0

    for price in prices[1:]:
        # Calculate profit if selling today
        profit = price - min_price
        max_profit = max(max_profit, profit)

        # Update minimum price seen so far
        min_price = min(min_price, price)

    return max_profit`,
      explanation: "Track minimum price and maximum profit in single pass. For each price, check profit if selling today.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    }
  },

  {
    id: 18,
    title: "Contains Duplicate",
    difficulty: "easy",
    category: "arrays",
    tags: ["array", "hash-set", "sorting"],
    visaFrequency: "high",
    timeEstimate: 7,
    description: `Given an integer array, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Example:**
- Input: [1, 2, 3, 1]
- Output: true

**Example 2:**
- Input: [1, 2, 3, 4]
- Output: false

**Constraints:**
- 1 ≤ arr.length ≤ 10^5
- -10^9 ≤ arr[i] ≤ 10^9`,
    starterCode: {
      python: `def contains_duplicate(arr):
    """
    Check if array contains any duplicates.

    Args:
        arr: List of integers
    Returns:
        True if duplicates exist, False otherwise
    """
    # Your code here
    pass

# Test
print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False`
    },
    testCases: [
      { input: [[1, 2, 3, 1]], output: true },
      { input: [[1, 2, 3, 4]], output: false },
      { input: [[1, 1, 1, 1]], output: true },
      { input: [[1]], output: false },
      { input: [[1, 5, -2, -4, 0, 5]], output: true }
    ],
    hints: [
      "Use a set to track seen numbers",
      "If number already in set, duplicate found",
      "Alternative: compare len(arr) vs len(set(arr))"
    ],
    solution: {
      python: `def contains_duplicate(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False

# One-liner alternative:
# def contains_duplicate(arr):
#     return len(arr) != len(set(arr))`,
      explanation: "Use set to track seen numbers. If we encounter a number already in set, we found a duplicate.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    }
  },

  {
    id: 19,
    title: "Product of Array Except Self",
    difficulty: "easy",
    category: "arrays",
    tags: ["array", "prefix-product"],
    visaFrequency: "very-high",
    timeEstimate: 12,
    description: `Given an integer array arr, return an array output where output[i] is the product of all elements except arr[i]. Solve without using division.

**Example:**
- Input: [1, 2, 3, 4]
- Output: [24, 12, 8, 6]
  - output[0] = 2 * 3 * 4 = 24
  - output[1] = 1 * 3 * 4 = 12
  - output[2] = 1 * 2 * 4 = 8
  - output[3] = 1 * 2 * 3 = 6

**Constraints:**
- 2 ≤ arr.length ≤ 10^5
- -30 ≤ arr[i] ≤ 30
- Cannot use division operator`,
    starterCode: {
      python: `def product_except_self(arr):
    """
    Calculate product of all elements except self.

    Args:
        arr: List of integers
    Returns:
        List where result[i] = product of all except arr[i]
    """
    # Your code here
    pass

# Test
print(product_except_self([1, 2, 3, 4]))  # [24, 12, 8, 6]`
    },
    testCases: [
      { input: [[1, 2, 3, 4]], output: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], output: [0, 0, 9, 0, 0] },
      { input: [[2, 3]], output: [3, 2] },
      { input: [[1, 1, 1, 1]], output: [1, 1, 1, 1] }
    ],
    hints: [
      "Think about products to the left and right of each position",
      "Pass 1: Calculate prefix products (left to right)",
      "Pass 2: Calculate suffix products (right to left) and combine",
      "Can optimize to O(1) space by using output array for prefix"
    ],
    solution: {
      python: `def product_except_self(arr):
    n = len(arr)
    output = [1] * n

    # Calculate prefix products (left to right)
    left_product = 1
    for i in range(n):
        output[i] = left_product
        left_product *= arr[i]

    # Calculate suffix products (right to left) and multiply
    right_product = 1
    for i in range(n - 1, -1, -1):
        output[i] *= right_product
        right_product *= arr[i]

    return output`,
      explanation: "Two passes: first accumulate products from left, then from right. Each position gets product of everything to its left and right.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) excluding output array"
    }
  },

  // ==================== MEDIUM ARRAY PROBLEMS ====================

  {
    id: 20,
    title: "Maximum Subarray Sum (Kadane's Algorithm)",
    difficulty: "medium",
    category: "arrays",
    tags: ["array", "dynamic-programming", "kadane"],
    visaFrequency: "very-high",
    timeEstimate: 15,
    description: `Find the contiguous subarray with the largest sum and return the sum.

**Example:**
- Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
- Output: 6  # subarray [4, -1, 2, 1]

**Example 2:**
- Input: [1]
- Output: 1

**Example 3:**
- Input: [-1, -2, -3]
- Output: -1  # best is single element -1

**Constraints:**
- 1 ≤ arr.length ≤ 10^5
- -10^4 ≤ arr[i] ≤ 10^4`,
    starterCode: {
      python: `def max_subarray_sum(arr):
    """
    Find maximum sum of contiguous subarray.

    Args:
        arr: List of integers
    Returns:
        Maximum subarray sum
    """
    # Your code here
    pass

# Test
print(max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6`
    },
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], output: 6 },
      { input: [[1]], output: 1 },
      { input: [[5, 4, -1, 7, 8]], output: 23 },
      { input: [[-1, -2, -3]], output: -1 },
      { input: [[1, 2, 3, -2, 5]], output: 9 }
    ],
    hints: [
      "Kadane's algorithm: track current sum and max sum",
      "At each position, decide: extend current subarray or start new?",
      "If current_sum becomes negative, reset to 0 (or current element)",
      "Keep tracking global maximum throughout"
    ],
    solution: {
      python: `def max_subarray_sum(arr):
    max_sum = arr[0]
    current_sum = arr[0]

    for i in range(1, len(arr)):
        # Either extend current subarray or start new
        current_sum = max(arr[i], current_sum + arr[i])
        max_sum = max(max_sum, current_sum)

    return max_sum`,
      explanation: "Kadane's algorithm: at each position, choose to either extend current subarray or start fresh. Track global maximum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    }
  },

  {
    id: 21,
    title: "Container With Most Water",
    difficulty: "medium",
    category: "arrays",
    tags: ["array", "two-pointer", "greedy"],
    visaFrequency: "high",
    timeEstimate: 18,
    description: `Given n non-negative integers representing heights of vertical lines, find two lines that together with x-axis form a container that holds the most water.

**Example:**
- Input: [1, 8, 6, 2, 5, 4, 8, 3, 7]
- Output: 49
  - Lines at index 1 (height 8) and index 8 (height 7)
  - Width = 8 - 1 = 7
  - Height = min(8, 7) = 7
  - Area = 7 * 7 = 49

**Constraints:**
- 2 ≤ heights.length ≤ 10^5
- 0 ≤ heights[i] ≤ 10^4
- Area = width * min(height1, height2)`,
    starterCode: {
      python: `def max_area(heights):
    """
    Find maximum water container area.

    Args:
        heights: List of line heights
    Returns:
        Maximum area
    """
    # Your code here
    pass

# Test
print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # 49`
    },
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], output: 49 },
      { input: [[1, 1]], output: 1 },
      { input: [[4, 3, 2, 1, 4]], output: 16 },
      { input: [[1, 2, 1]], output: 2 },
      { input: [[2, 3, 4, 5, 18, 17, 6]], output: 17 }
    ],
    hints: [
      "Brute force O(n²): try all pairs - too slow",
      "Use two pointers: start at both ends",
      "Always move the pointer with shorter height",
      "Why? Moving taller pointer can't increase area"
    ],
    solution: {
      python: `def max_area(heights):
    left = 0
    right = len(heights) - 1
    max_area = 0

    while left < right:
        # Calculate current area
        width = right - left
        height = min(heights[left], heights[right])
        area = width * height
        max_area = max(max_area, area)

        # Move pointer with shorter height
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1

    return max_area`,
      explanation: "Two pointers from ends. Move pointer with shorter height inward (only way to potentially increase area). Track maximum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    }
  },

  {
    id: 22,
    title: "3Sum - Find All Triplets That Sum to Zero",
    difficulty: "medium",
    category: "arrays",
    tags: ["array", "two-pointer", "sorting"],
    visaFrequency: "very-high",
    timeEstimate: 20,
    description: `Given an integer array, return all unique triplets [a, b, c] where a + b + c = 0.

**Example:**
- Input: [-1, 0, 1, 2, -1, -4]
- Output: [[-1, -1, 2], [-1, 0, 1]]

**Example 2:**
- Input: [0, 1, 1]
- Output: []

**Example 3:**
- Input: [0, 0, 0]
- Output: [[0, 0, 0]]

**Constraints:**
- 3 ≤ arr.length ≤ 3000
- -10^5 ≤ arr[i] ≤ 10^5
- Solution must not contain duplicate triplets`,
    starterCode: {
      python: `def three_sum(arr):
    """
    Find all unique triplets that sum to zero.

    Args:
        arr: List of integers
    Returns:
        List of triplets [a, b, c] where a + b + c = 0
    """
    # Your code here
    pass

# Test
print(three_sum([-1, 0, 1, 2, -1, -4]))  # [[-1, -1, 2], [-1, 0, 1]]`
    },
    testCases: [
      { input: [[-1, 0, 1, 2, -1, -4]], output: [[-1, -1, 2], [-1, 0, 1]] },
      { input: [[0, 1, 1]], output: [] },
      { input: [[0, 0, 0]], output: [[0, 0, 0]] },
      { input: [[1, 2, -2, -1]], output: [] },
      { input: [[-2, 0, 1, 1, 2]], output: [[-2, 0, 2], [-2, 1, 1]] }
    ],
    hints: [
      "Sort array first to enable two-pointer technique",
      "Fix one number, use two pointers for remaining two",
      "Skip duplicates to avoid duplicate triplets",
      "For each arr[i], find pairs that sum to -arr[i]"
    ],
    solution: {
      python: `def three_sum(arr):
    arr.sort()
    result = []

    for i in range(len(arr) - 2):
        # Skip duplicates for first number
        if i > 0 and arr[i] == arr[i - 1]:
            continue

        # Two pointers for remaining two numbers
        left = i + 1
        right = len(arr) - 1
        target = -arr[i]

        while left < right:
            current_sum = arr[left] + arr[right]

            if current_sum == target:
                result.append([arr[i], arr[left], arr[right]])

                # Skip duplicates for second number
                while left < right and arr[left] == arr[left + 1]:
                    left += 1
                # Skip duplicates for third number
                while left < right and arr[right] == arr[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1

    return result`,
      explanation: "Sort first. Fix first number, use two pointers for other two. Skip duplicates carefully to avoid duplicate triplets.",
      timeComplexity: "O(n²) - O(n log n) sort + O(n²) two-pointer",
      spaceComplexity: "O(1) excluding output"
    }
  },

  {
    id: 23,
    title: "Subarray Sum Equals K",
    difficulty: "medium",
    category: "arrays",
    tags: ["array", "prefix-sum", "hash-map"],
    visaFrequency: "very-high",
    timeEstimate: 20,
    description: `Given an array of integers and an integer k, find the total number of continuous subarrays whose sum equals k.

**Example:**
- Input: arr = [1, 1, 1], k = 2
- Output: 2  # subarrays: [1,1] at index 0-1 and [1,1] at index 1-2

**Example 2:**
- Input: arr = [1, 2, 3], k = 3
- Output: 2  # subarrays: [3] and [1,2]

**Constraints:**
- 1 ≤ arr.length ≤ 2 * 10^4
- -1000 ≤ arr[i] ≤ 1000
- -10^7 ≤ k ≤ 10^7`,
    starterCode: {
      python: `def subarray_sum_k(arr, k):
    """
    Count subarrays with sum equal to k.

    Args:
        arr: List of integers
        k: Target sum
    Returns:
        Number of subarrays summing to k
    """
    # Your code here
    pass

# Test
print(subarray_sum_k([1, 1, 1], 2))  # 2
print(subarray_sum_k([1, 2, 3], 3))  # 2`
    },
    testCases: [
      { input: [[1, 1, 1], 2], output: 2 },
      { input: [[1, 2, 3], 3], output: 2 },
      { input: [[1], 0], output: 0 },
      { input: [[1, -1, 0], 0], output: 3 },
      { input: [[3, 4, 7, 2, -3, 1, 4, 2], 7], output: 4 }
    ],
    hints: [
      "Brute force O(n²): check all subarrays - too slow",
      "Use prefix sum: sum[i:j] = prefix[j] - prefix[i-1]",
      "If prefix_sum - k exists in hashmap, we found a subarray",
      "Store count of each prefix sum in hashmap"
    ],
    solution: {
      python: `def subarray_sum_k(arr, k):
    from collections import defaultdict

    prefix_sum = 0
    count = 0
    sum_count = defaultdict(int)
    sum_count[0] = 1  # Empty prefix has sum 0

    for num in arr:
        prefix_sum += num

        # If (prefix_sum - k) exists, found subarrays ending here
        if (prefix_sum - k) in sum_count:
            count += sum_count[prefix_sum - k]

        # Record current prefix sum
        sum_count[prefix_sum] += 1

    return count`,
      explanation: "Use prefix sums with hashmap. If (current_sum - k) was seen before, found subarrays. Track count of each prefix sum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    }
  },

  {
    id: 24,
    title: "Longest Consecutive Sequence",
    difficulty: "medium",
    category: "arrays",
    tags: ["array", "hash-set", "union-find"],
    visaFrequency: "high",
    timeEstimate: 20,
    description: `Given an unsorted array of integers, find the length of the longest consecutive elements sequence. Algorithm must run in O(n) time.

**Example:**
- Input: [100, 4, 200, 1, 3, 2]
- Output: 4  # sequence is [1, 2, 3, 4]

**Example 2:**
- Input: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
- Output: 9  # sequence is [0,1,2,3,4,5,6,7,8]

**Constraints:**
- 0 ≤ arr.length ≤ 10^5
- -10^9 ≤ arr[i] ≤ 10^9
- Must be O(n) time complexity`,
    starterCode: {
      python: `def longest_consecutive(arr):
    """
    Find length of longest consecutive sequence.

    Args:
        arr: List of integers
    Returns:
        Length of longest consecutive sequence
    """
    # Your code here
    pass

# Test
print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # 4`
    },
    testCases: [
      { input: [[100, 4, 200, 1, 3, 2]], output: 4 },
      { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], output: 9 },
      { input: [[]], output: 0 },
      { input: [[1]], output: 1 },
      { input: [[9, 1, 4, 7, 3, 2, 8, 5, 6]], output: 9 }
    ],
    hints: [
      "Sorting would give O(n log n) - not optimal",
      "Use a set for O(1) lookups",
      "Only start counting from numbers that are sequence starts",
      "A number is sequence start if (num - 1) is not in set"
    ],
    solution: {
      python: `def longest_consecutive(arr):
    if not arr:
        return 0

    num_set = set(arr)
    max_length = 0

    for num in num_set:
        # Only start counting from sequence starts
        if num - 1 not in num_set:
            current_num = num
            current_length = 1

            # Count consecutive numbers
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1

            max_length = max(max_length, current_length)

    return max_length`,
      explanation: "Use set for O(1) lookup. Only start counting from sequence beginnings (where num-1 doesn't exist). Count consecutive numbers.",
      timeComplexity: "O(n) - each number visited at most twice",
      spaceComplexity: "O(n) for set"
    }
  },

  {
    id: 25,
    title: "Maximum Product Subarray",
    difficulty: "medium",
    category: "arrays",
    tags: ["array", "dynamic-programming"],
    visaFrequency: "high",
    timeEstimate: 20,
    description: `Find the contiguous subarray with the largest product and return the product.

**Example:**
- Input: [2, 3, -2, 4]
- Output: 6  # subarray [2, 3]

**Example 2:**
- Input: [-2, 0, -1]
- Output: 0

**Example 3:**
- Input: [-2, 3, -4]
- Output: 24  # subarray [-2, 3, -4]

**Constraints:**
- 1 ≤ arr.length ≤ 2 * 10^4
- -10 ≤ arr[i] ≤ 10
- Product is guaranteed to fit in 32-bit integer`,
    starterCode: {
      python: `def max_product_subarray(arr):
    """
    Find maximum product of contiguous subarray.

    Args:
        arr: List of integers
    Returns:
        Maximum product
    """
    # Your code here
    pass

# Test
print(max_product_subarray([2, 3, -2, 4]))  # 6`
    },
    testCases: [
      { input: [[2, 3, -2, 4]], output: 6 },
      { input: [[-2, 0, -1]], output: 0 },
      { input: [[-2, 3, -4]], output: 24 },
      { input: [[0, 2]], output: 2 },
      { input: [[-2, -3, -4]], output: 12 }
    ],
    hints: [
      "Similar to Kadane's, but multiplication is tricky with negatives",
      "Track both max and min products (negative * negative = positive)",
      "At each step, update both max_prod and min_prod",
      "Consider: current num, max_prod * num, min_prod * num"
    ],
    solution: {
      python: `def max_product_subarray(arr):
    if not arr:
        return 0

    max_prod = arr[0]
    current_max = arr[0]
    current_min = arr[0]

    for i in range(1, len(arr)):
        num = arr[i]

        # Calculate candidates (num could change sign)
        candidates = [num, current_max * num, current_min * num]

        # Update current max and min
        current_max = max(candidates)
        current_min = min(candidates)

        # Update global max
        max_prod = max(max_prod, current_max)

    return max_prod`,
      explanation: "Track both max and min products (negatives can flip). At each position, consider: just current number, max*num, min*num.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    }
  },

  {
    id: 26,
    title: "Find All Duplicates in Array",
    difficulty: "medium",
    category: "arrays",
    tags: ["array", "in-place", "marking"],
    visaFrequency: "high",
    timeEstimate: 18,
    description: `Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once. Find all elements that appear twice without using extra space and in O(n) time.

**Example:**
- Input: [4, 3, 2, 7, 8, 2, 3, 1]
- Output: [2, 3]

**Example 2:**
- Input: [1, 1, 2]
- Output: [1]

**Constraints:**
- 1 ≤ arr.length ≤ 10^5
- 1 ≤ arr[i] ≤ n
- Each element appears once or twice
- O(n) time, O(1) extra space required`,
    starterCode: {
      python: `def find_duplicates(arr):
    """
    Find all elements that appear twice.

    Args:
        arr: List of integers (1 to n)
    Returns:
        List of duplicate elements
    """
    # Your code here
    pass

# Test
print(find_duplicates([4, 3, 2, 7, 8, 2, 3, 1]))  # [2, 3]`
    },
    testCases: [
      { input: [[4, 3, 2, 7, 8, 2, 3, 1]], output: [2, 3] },
      { input: [[1, 1, 2]], output: [1] },
      { input: [[1]], output: [] },
      { input: [[2, 2]], output: [2] },
      { input: [[10, 2, 5, 10, 9, 1, 1, 4, 3, 7]], output: [10, 1] }
    ],
    hints: [
      "Use array indices as hash keys (nums are 1 to n)",
      "Mark visited indices by making value negative",
      "If value at index already negative, found duplicate",
      "num maps to index: abs(num) - 1"
    ],
    solution: {
      python: `def find_duplicates(arr):
    result = []

    for num in arr:
        index = abs(num) - 1  # Map value to index

        # If already negative, this is second occurrence
        if arr[index] < 0:
            result.append(abs(num))
        else:
            # Mark as visited by making negative
            arr[index] = -arr[index]

    # Optional: restore array
    for i in range(len(arr)):
        arr[i] = abs(arr[i])

    return result`,
      explanation: "Use indices as hash. For each number, mark its corresponding index negative. If already negative, found duplicate.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1) excluding output"
    }
  },

  // ==================== HARD ARRAY PROBLEMS ====================

  {
    id: 27,
    title: "Trapping Rain Water",
    difficulty: "hard",
    category: "arrays",
    tags: ["array", "two-pointer", "stack", "dynamic-programming"],
    visaFrequency: "very-high",
    timeEstimate: 25,
    description: `Given n non-negative integers representing an elevation map where width of each bar is 1, compute how much water can be trapped after raining.

**Example:**
- Input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
- Output: 6

Visualization:
\`\`\`
   █
 █ █ █ █ █
█████████████
012101132121
Water trapped: 6 units
\`\`\`

**Constraints:**
- n == heights.length
- 1 ≤ n ≤ 2 * 10^4
- 0 ≤ heights[i] ≤ 10^5`,
    starterCode: {
      python: `def trap_rain_water(heights):
    """
    Calculate trapped rainwater.

    Args:
        heights: List of bar heights
    Returns:
        Total water trapped
    """
    # Your code here
    pass

# Test
print(trap_rain_water([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6`
    },
    testCases: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], output: 6 },
      { input: [[4, 2, 0, 3, 2, 5]], output: 9 },
      { input: [[3, 0, 2, 0, 4]], output: 7 },
      { input: [[1, 1, 1]], output: 0 },
      { input: [[5, 4, 1, 2]], output: 1 }
    ],
    hints: [
      "Water at position i = min(max_left, max_right) - height[i]",
      "Approach 1: Precompute max_left and max_right arrays - O(n) space",
      "Approach 2: Two pointers - O(1) space, more optimal",
      "Two pointers: move pointer with smaller max inward"
    ],
    solution: {
      python: `def trap_rain_water(heights):
    if not heights:
        return 0

    left = 0
    right = len(heights) - 1
    left_max = heights[left]
    right_max = heights[right]
    water = 0

    while left < right:
        if heights[left] < heights[right]:
            # Process left side
            left += 1
            left_max = max(left_max, heights[left])
            water += max(0, left_max - heights[left])
        else:
            # Process right side
            right -= 1
            right_max = max(right_max, heights[right])
            water += max(0, right_max - heights[right])

    return water`,
      explanation: "Two pointers: track max heights from both sides. Move pointer with smaller max, add water trapped at that position.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    }
  },

  {
    id: 28,
    title: "Sliding Window Maximum",
    difficulty: "hard",
    category: "arrays",
    tags: ["array", "sliding-window", "deque", "monotonic-queue"],
    visaFrequency: "very-high",
    timeEstimate: 25,
    description: `Given an array of integers and a window size k, return an array of the maximum element in each sliding window.

**Example:**
- Input: arr = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
- Output: [3, 3, 5, 5, 6, 7]

Explanation:
\`\`\`
Window position          Max
[1  3  -1] -3  5  3  6  7   3
 1 [3  -1  -3] 5  3  6  7   3
 1  3 [-1  -3  5] 3  6  7   5
 1  3  -1 [-3  5  3] 6  7   5
 1  3  -1  -3 [5  3  6] 7   6
 1  3  -1  -3  5 [3  6  7]  7
\`\`\`

**Constraints:**
- 1 ≤ arr.length ≤ 10^5
- -10^4 ≤ arr[i] ≤ 10^4
- 1 ≤ k ≤ arr.length`,
    starterCode: {
      python: `def max_sliding_window(arr, k):
    """
    Find maximum in each sliding window of size k.

    Args:
        arr: List of integers
        k: Window size
    Returns:
        List of maximums for each window
    """
    # Your code here
    pass

# Test
print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))  # [3,3,5,5,6,7]`
    },
    testCases: [
      { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], output: [3, 3, 5, 5, 6, 7] },
      { input: [[1], 1], output: [1] },
      { input: [[1, -1], 1], output: [1, -1] },
      { input: [[9, 11], 2], output: [11] },
      { input: [[4, -2, 5, 6, 3, 1, 7], 2], output: [4, 5, 6, 6, 3, 7] }
    ],
    hints: [
      "Brute force O(n*k): find max in each window - too slow",
      "Use deque to maintain decreasing order of useful elements",
      "Remove elements outside window from front",
      "Remove smaller elements from back (they'll never be max)",
      "Front of deque always has maximum of current window"
    ],
    solution: {
      python: `from collections import deque

def max_sliding_window(arr, k):
    if not arr or k == 0:
        return []

    dq = deque()  # Store indices
    result = []

    for i in range(len(arr)):
        # Remove elements outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove smaller elements from back (they won't be max)
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()

        # Add current element
        dq.append(i)

        # Add to result when window complete
        if i >= k - 1:
            result.append(arr[dq[0]])

    return result`,
      explanation: "Monotonic decreasing deque stores indices. Front is always window max. Remove out-of-window and smaller elements efficiently.",
      timeComplexity: "O(n) - each element added/removed once",
      spaceComplexity: "O(k) for deque"
    }
  },

  {
    id: 29,
    title: "First Missing Positive",
    difficulty: "hard",
    category: "arrays",
    tags: ["array", "in-place", "cyclic-sort"],
    visaFrequency: "high",
    timeEstimate: 25,
    description: `Given an unsorted integer array, find the smallest missing positive integer. Must run in O(n) time and O(1) space.

**Example:**
- Input: [1, 2, 0]
- Output: 3

**Example 2:**
- Input: [3, 4, -1, 1]
- Output: 2

**Example 3:**
- Input: [7, 8, 9, 11, 12]
- Output: 1

**Constraints:**
- 1 ≤ arr.length ≤ 10^5
- -2^31 ≤ arr[i] ≤ 2^31 - 1
- Must be O(n) time, O(1) space`,
    starterCode: {
      python: `def first_missing_positive(arr):
    """
    Find smallest missing positive integer.

    Args:
        arr: List of integers
    Returns:
        First missing positive
    """
    # Your code here
    pass

# Test
print(first_missing_positive([1, 2, 0]))  # 3
print(first_missing_positive([3, 4, -1, 1]))  # 2`
    },
    testCases: [
      { input: [[1, 2, 0]], output: 3 },
      { input: [[3, 4, -1, 1]], output: 2 },
      { input: [[7, 8, 9, 11, 12]], output: 1 },
      { input: [[1]], output: 2 },
      { input: [[1, 2, 3, 4, 5]], output: 6 }
    ],
    hints: [
      "Answer must be in range [1, n+1]",
      "Use array itself as hash: place num at index num-1",
      "Step 1: Place each number in correct position (cyclic sort)",
      "Step 2: First index where arr[i] != i+1 gives answer",
      "Ignore numbers <= 0 or > n"
    ],
    solution: {
      python: `def first_missing_positive(arr):
    n = len(arr)

    # Step 1: Place each number in its correct position
    # Number k should be at index k-1
    i = 0
    while i < n:
        # Correct position for arr[i] is arr[i] - 1
        correct_pos = arr[i] - 1

        # If in valid range and not in correct position, swap
        if 0 <= correct_pos < n and arr[i] != arr[correct_pos]:
            arr[i], arr[correct_pos] = arr[correct_pos], arr[i]
        else:
            i += 1

    # Step 2: Find first position where arr[i] != i+1
    for i in range(n):
        if arr[i] != i + 1:
            return i + 1

    # All positions correct, answer is n+1
    return n + 1`,
      explanation: "Cyclic sort: place each valid number (1 to n) at its correct index. First mismatch is the answer.",
      timeComplexity: "O(n) - each number swapped at most once",
      spaceComplexity: "O(1)"
    }
  }
];