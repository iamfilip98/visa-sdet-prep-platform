#!/usr/bin/env python3
"""Test all problem solutions against their test cases"""

import json
import sys

# Problem 15: Move Zeros to End
def move_zeros(arr):
    write_pos = 0
    for read_pos in range(len(arr)):
        if arr[read_pos] != 0:
            arr[write_pos] = arr[read_pos]
            write_pos += 1
    for i in range(write_pos, len(arr)):
        arr[i] = 0
    return arr

# Problem 16: Find Missing Number
def find_missing_number(arr):
    n = len(arr)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(arr)
    return expected_sum - actual_sum

# Problem 17: Best Time to Buy and Sell Stock
def max_profit(prices):
    if len(prices) < 2:
        return 0
    min_price = prices[0]
    max_profit = 0
    for price in prices[1:]:
        profit = price - min_price
        max_profit = max(max_profit, profit)
        min_price = min(min_price, price)
    return max_profit

# Problem 18: Contains Duplicate
def contains_duplicate(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False

# Problem 19: Product of Array Except Self
def product_except_self(arr):
    n = len(arr)
    output = [1] * n
    left_product = 1
    for i in range(n):
        output[i] = left_product
        left_product *= arr[i]
    right_product = 1
    for i in range(n - 1, -1, -1):
        output[i] *= right_product
        right_product *= arr[i]
    return output

# Problem 20: Maximum Subarray Sum
def max_subarray_sum(arr):
    max_sum = arr[0]
    current_sum = arr[0]
    for i in range(1, len(arr)):
        current_sum = max(arr[i], current_sum + arr[i])
        max_sum = max(max_sum, current_sum)
    return max_sum

# Problem 21: Container With Most Water
def max_area(heights):
    left = 0
    right = len(heights) - 1
    max_area = 0
    while left < right:
        width = right - left
        height = min(heights[left], heights[right])
        area = width * height
        max_area = max(max_area, area)
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
    return max_area

# Problem 22: 3Sum
def three_sum(arr):
    arr.sort()
    result = []
    for i in range(len(arr) - 2):
        if i > 0 and arr[i] == arr[i - 1]:
            continue
        left = i + 1
        right = len(arr) - 1
        target = -arr[i]
        while left < right:
            current_sum = arr[left] + arr[right]
            if current_sum == target:
                result.append([arr[i], arr[left], arr[right]])
                while left < right and arr[left] == arr[left + 1]:
                    left += 1
                while left < right and arr[right] == arr[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1
    return result

# Problem 23: Subarray Sum Equals K
def subarray_sum_k(arr, k):
    from collections import defaultdict
    prefix_sum = 0
    count = 0
    sum_count = defaultdict(int)
    sum_count[0] = 1
    for num in arr:
        prefix_sum += num
        if (prefix_sum - k) in sum_count:
            count += sum_count[prefix_sum - k]
        sum_count[prefix_sum] += 1
    return count

# Problem 24: Longest Consecutive Sequence
def longest_consecutive(arr):
    if not arr:
        return 0
    num_set = set(arr)
    max_length = 0
    for num in num_set:
        if num - 1 not in num_set:
            current_num = num
            current_length = 1
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1
            max_length = max(max_length, current_length)
    return max_length

# Problem 25: Maximum Product Subarray
def max_product_subarray(arr):
    if not arr:
        return 0
    max_prod = arr[0]
    current_max = arr[0]
    current_min = arr[0]
    for i in range(1, len(arr)):
        num = arr[i]
        candidates = [num, current_max * num, current_min * num]
        current_max = max(candidates)
        current_min = min(candidates)
        max_prod = max(max_prod, current_max)
    return max_prod

# Problem 26: Find All Duplicates
def find_duplicates(arr):
    result = []
    for num in arr:
        index = abs(num) - 1
        if arr[index] < 0:
            result.append(abs(num))
        else:
            arr[index] = -arr[index]
    for i in range(len(arr)):
        arr[i] = abs(arr[i])
    return result

# Problem 27: Trapping Rain Water
def trap_rain_water(heights):
    if not heights:
        return 0
    left = 0
    right = len(heights) - 1
    left_max = heights[left]
    right_max = heights[right]
    water = 0
    while left < right:
        if heights[left] < heights[right]:
            left += 1
            left_max = max(left_max, heights[left])
            water += max(0, left_max - heights[left])
        else:
            right -= 1
            right_max = max(right_max, heights[right])
            water += max(0, right_max - heights[right])
    return water

# Problem 28: Sliding Window Maximum
def max_sliding_window(arr, k):
    from collections import deque
    if not arr or k == 0:
        return []
    dq = deque()
    result = []
    for i in range(len(arr)):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and arr[dq[-1]] < arr[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(arr[dq[0]])
    return result

# Problem 29: First Missing Positive
def first_missing_positive(arr):
    n = len(arr)
    i = 0
    while i < n:
        correct_pos = arr[i] - 1
        if 0 <= correct_pos < n and arr[i] != arr[correct_pos]:
            arr[i], arr[correct_pos] = arr[correct_pos], arr[i]
        else:
            i += 1
    for i in range(n):
        if arr[i] != i + 1:
            return i + 1
    return n + 1

# Test cases for each problem
test_cases = {
    15: [
        {"input": [[0, 1, 0, 3, 12]], "output": [1, 3, 12, 0, 0]},
        {"input": [[0, 0, 1]], "output": [1, 0, 0]},
        {"input": [[1, 2, 3]], "output": [1, 2, 3]},
        {"input": [[0]], "output": [0]},
        {"input": [[1, 0, 2, 0, 3, 0]], "output": [1, 2, 3, 0, 0, 0]}
    ],
    16: [
        {"input": [[3, 0, 1]], "output": 2},
        {"input": [[9, 6, 4, 2, 3, 5, 7, 0, 1]], "output": 8},
        {"input": [[0, 1]], "output": 2},
        {"input": [[1]], "output": 0},
        {"input": [[0]], "output": 1}
    ],
    17: [
        {"input": [[7, 1, 5, 3, 6, 4]], "output": 5},
        {"input": [[7, 6, 4, 3, 1]], "output": 0},
        {"input": [[1, 2]], "output": 1},
        {"input": [[2, 4, 1, 7]], "output": 6},
        {"input": [[5]], "output": 0}
    ],
    18: [
        {"input": [[1, 2, 3, 1]], "output": True},
        {"input": [[1, 2, 3, 4]], "output": False},
        {"input": [[1, 1, 1, 1]], "output": True},
        {"input": [[1]], "output": False},
        {"input": [[1, 5, -2, -4, 0, 5]], "output": True}
    ],
    19: [
        {"input": [[1, 2, 3, 4]], "output": [24, 12, 8, 6]},
        {"input": [[-1, 1, 0, -3, 3]], "output": [0, 0, 9, 0, 0]},
        {"input": [[2, 3]], "output": [3, 2]},
        {"input": [[1, 1, 1, 1]], "output": [1, 1, 1, 1]}
    ],
    20: [
        {"input": [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], "output": 6},
        {"input": [[1]], "output": 1},
        {"input": [[5, 4, -1, 7, 8]], "output": 23},
        {"input": [[-1, -2, -3]], "output": -1},
        {"input": [[1, 2, 3, -2, 5]], "output": 9}
    ],
    21: [
        {"input": [[1, 8, 6, 2, 5, 4, 8, 3, 7]], "output": 49},
        {"input": [[1, 1]], "output": 1},
        {"input": [[4, 3, 2, 1, 4]], "output": 16},
        {"input": [[1, 2, 1]], "output": 2},
        {"input": [[2, 3, 4, 5, 18, 17, 6]], "output": 17}
    ],
    22: [
        {"input": [[-1, 0, 1, 2, -1, -4]], "output": [[-1, -1, 2], [-1, 0, 1]]},
        {"input": [[0, 1, 1]], "output": []},
        {"input": [[0, 0, 0]], "output": [[0, 0, 0]]},
        {"input": [[1, 2, -2, -1]], "output": []},
        {"input": [[-2, 0, 1, 1, 2]], "output": [[-2, 0, 2], [-2, 1, 1]]}
    ],
    23: [
        {"input": [[1, 1, 1], 2], "output": 2},
        {"input": [[1, 2, 3], 3], "output": 2},
        {"input": [[1], 0], "output": 0},
        {"input": [[1, -1, 0], 0], "output": 3},
        {"input": [[3, 4, 7, 2, -3, 1, 4, 2], 7], "output": 4}
    ],
    24: [
        {"input": [[100, 4, 200, 1, 3, 2]], "output": 4},
        {"input": [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], "output": 9},
        {"input": [[]], "output": 0},
        {"input": [[1]], "output": 1},
        {"input": [[9, 1, 4, 7, 3, 2, 8, 5, 6]], "output": 9}
    ],
    25: [
        {"input": [[2, 3, -2, 4]], "output": 6},
        {"input": [[-2, 0, -1]], "output": 0},
        {"input": [[-2, 3, -4]], "output": 24},
        {"input": [[0, 2]], "output": 2},
        {"input": [[-2, -3, -4]], "output": 12}
    ],
    26: [
        {"input": [[4, 3, 2, 7, 8, 2, 3, 1]], "output": [2, 3]},
        {"input": [[1, 1, 2]], "output": [1]},
        {"input": [[1]], "output": []},
        {"input": [[2, 2]], "output": [2]},
        {"input": [[10, 2, 5, 10, 9, 1, 1, 4, 3, 7]], "output": [10, 1]}
    ],
    27: [
        {"input": [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], "output": 6},
        {"input": [[4, 2, 0, 3, 2, 5]], "output": 9},
        {"input": [[3, 0, 2, 0, 4]], "output": 7},
        {"input": [[1, 1, 1]], "output": 0},
        {"input": [[5, 4, 1, 2]], "output": 1}
    ],
    28: [
        {"input": [[1, 3, -1, -3, 5, 3, 6, 7], 3], "output": [3, 3, 5, 5, 6, 7]},
        {"input": [[1], 1], "output": [1]},
        {"input": [[1, -1], 1], "output": [1, -1]},
        {"input": [[9, 11], 2], "output": [11]},
        {"input": [[4, -2, 5, 6, 3, 1, 7], 2], "output": [4, 5, 6, 6, 3, 7]}
    ],
    29: [
        {"input": [[1, 2, 0]], "output": 3},
        {"input": [[3, 4, -1, 1]], "output": 2},
        {"input": [[7, 8, 9, 11, 12]], "output": 1},
        {"input": [[1]], "output": 2},
        {"input": [[1, 2, 3, 4, 5]], "output": 6}
    ]
}

functions = {
    15: move_zeros,
    16: find_missing_number,
    17: max_profit,
    18: contains_duplicate,
    19: product_except_self,
    20: max_subarray_sum,
    21: max_area,
    22: three_sum,
    23: subarray_sum_k,
    24: longest_consecutive,
    25: max_product_subarray,
    26: find_duplicates,
    27: trap_rain_water,
    28: max_sliding_window,
    29: first_missing_positive
}

def test_all():
    failed = []
    for problem_id, cases in test_cases.items():
        func = functions[problem_id]
        for i, case in enumerate(cases):
            try:
                # Make a copy for functions that modify input
                test_input = [arg[:] if isinstance(arg, list) else arg for arg in case['input']]
                result = func(*test_input)
                expected = case['output']

                if json.dumps(result, sort_keys=True) != json.dumps(expected, sort_keys=True):
                    failed.append({
                        'problem': problem_id,
                        'test': i + 1,
                        'input': case['input'],
                        'expected': expected,
                        'actual': result
                    })
                    print(f"❌ Problem {problem_id}, Test {i + 1}: FAILED")
                    print(f"   Input: {case['input']}")
                    print(f"   Expected: {expected}")
                    print(f"   Got: {result}")
                else:
                    print(f"✓ Problem {problem_id}, Test {i + 1}: PASSED")
            except Exception as e:
                failed.append({
                    'problem': problem_id,
                    'test': i + 1,
                    'input': case['input'],
                    'error': str(e)
                })
                print(f"❌ Problem {problem_id}, Test {i + 1}: ERROR - {e}")

    print("\n" + "="*50)
    if failed:
        print(f"\n{len(failed)} test(s) FAILED:")
        for f in failed:
            print(f"\nProblem {f['problem']}, Test {f['test']}:")
            print(f"  Input: {f['input']}")
            if 'error' in f:
                print(f"  Error: {f['error']}")
            else:
                print(f"  Expected: {f['expected']}")
                print(f"  Got: {f['actual']}")
        return 1
    else:
        print("\n✓ ALL TESTS PASSED!")
        return 0

if __name__ == '__main__':
    sys.exit(test_all())
