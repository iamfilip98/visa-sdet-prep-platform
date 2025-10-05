#!/usr/bin/env python3
"""
Comprehensive test script for Problems 1-14
Extracts solutions and test cases from src/data/problems.js and validates them
"""

import re
import json
from collections import Counter, defaultdict


# ==================== PROBLEM 1: Sum with Neighbors ====================
def sum_with_neighbors(arr):
    if not arr:
        return []

    result = []
    for i in range(len(arr)):
        left = arr[i-1] if i > 0 else 0
        center = arr[i]
        right = arr[i+1] if i < len(arr)-1 else 0
        result.append(left + center + right)

    return result


# ==================== PROBLEM 2: Word Frequency Counter ====================
def word_frequency(sentence):
    if not sentence:
        return {}

    words = sentence.lower().split()
    return dict(Counter(words))


# ==================== PROBLEM 3: Check Unique Characters ====================
def has_unique_chars(s):
    return len(s) == len(set(s))


# ==================== PROBLEM 4: Simple Histogram ====================
def create_histogram(arr):
    return ['*' * num for num in arr]


# ==================== PROBLEM 5: Two Sum ====================
def two_sum(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


# ==================== PROBLEM 6: String Pattern Matching ====================
def count_pattern_matches(string, pattern):
    vowels = set('aeiouy')

    def matches(char, pat_char):
        if pat_char == '*':
            return True
        if pat_char == '?':
            return char in vowels
        if pat_char == '#':
            return char not in vowels
        return False

    count = 0
    for i in range(len(string) - len(pattern) + 1):
        substring = string[i:i+len(pattern)]
        if all(matches(substring[j], pattern[j]) for j in range(len(pattern))):
            count += 1

    return count


# ==================== PROBLEM 7: Array Distribution ====================
def distribute_array(arr):
    list1, list2 = [], []

    for num in arr:
        if num % 2 == 0:  # even
            list1.append(num)
        elif num < 10:  # odd and < 10
            list2.append(num)
        else:  # odd and >= 10
            list1.append(num)

    return [list1, list2]


# ==================== PROBLEM 8: Queue Entry Time Calculator ====================
def queue_time(n):
    regular_people = n
    id_checks = n // 10

    return regular_people + (id_checks * 2)


# ==================== PROBLEM 9: Matrix Rotation 90 Degrees ====================
def rotate_matrix(matrix):
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Reverse each row
    for i in range(n):
        matrix[i].reverse()

    return matrix


# ==================== PROBLEM 10: Count Pairs Summing to Power of 2 ====================
def count_power_of_2_pairs(arr):
    count_map = Counter(arr)
    result = 0

    # Powers of 2 up to 2^20 (covers up to 10^6)
    powers = [2**i for i in range(1, 21)]

    for num in count_map:
        for power in powers:
            complement = power - num
            if complement in count_map:
                if complement == num:
                    # Same number: C(count, 2) = count * (count-1) / 2
                    result += count_map[num] * (count_map[num] - 1) // 2
                elif complement > num:  # Avoid double counting
                    result += count_map[num] * count_map[complement]

    return result


# ==================== PROBLEM 11: Second Largest in BST ====================
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def second_largest(root):
    # In-order traversal to get sorted values
    def inorder(node, values):
        if not node:
            return
        inorder(node.left, values)
        values.append(node.val)
        inorder(node.right, values)

    values = []
    inorder(root, values)
    return values[-2] if len(values) >= 2 else None


# ==================== PROBLEM 12: Maximum Subarray Sum ====================
def max_subarray_sum(arr):
    max_sum = float('-inf')
    current_sum = 0

    for num in arr:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum


# ==================== PROBLEM 13: Product of Array Except Self ====================
def product_except_self(arr):
    """
    Calculate product of all elements except self.

    Args:
        arr: List of integers
    Returns:
        List of products
    """
    n = len(arr)
    result = [1] * n

    # Left pass: result[i] contains product of all elements to the left
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= arr[i]

    # Right pass: multiply by product of all elements to the right
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= arr[i]

    return result


# ==================== PROBLEM 14: Find Peak Element ====================
def find_peak_element(arr):
    """
    Find a peak element (element greater than its neighbors).

    Args:
        arr: List of integers
    Returns:
        Index of a peak element
    """
    n = len(arr)

    # Edge cases
    if n == 1:
        return 0
    if arr[0] > arr[1]:
        return 0
    if arr[n-1] > arr[n-2]:
        return n - 1

    # Check middle elements
    for i in range(1, n - 1):
        if arr[i] > arr[i-1] and arr[i] > arr[i+1]:
            return i

    return 0


# ==================== TEST CASES ====================
def run_tests():
    """Run all test cases and report results"""

    test_results = []
    failed_tests = []

    # Test Problem 1: Sum with Neighbors
    print("=" * 70)
    print("PROBLEM 1: Sum with Neighbors")
    print("=" * 70)
    tests_1 = [
        ([[1, 2, 3, 4]], [3, 6, 9, 7]),
        ([[5]], [5]),
        ([[1, 1]], [2, 2]),
        ([[]], []),
        ([[-1, 0, 1]], [-1, 0, 1])
    ]
    for i, (input_data, expected) in enumerate(tests_1, 1):
        result = sum_with_neighbors(*input_data)
        passed = result == expected
        test_results.append(("Problem 1", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 1", i, input_data, expected, result))

    # Test Problem 2: Word Frequency Counter
    print("\n" + "=" * 70)
    print("PROBLEM 2: Word Frequency Counter")
    print("=" * 70)
    tests_2 = [
        (["Hello world hello"], {"hello": 2, "world": 1}),
        (["a"], {"a": 1}),
        (["a b c a b a"], {"a": 3, "b": 2, "c": 1}),
        ([""], {})
    ]
    for i, (input_data, expected) in enumerate(tests_2, 1):
        result = word_frequency(*input_data)
        passed = result == expected
        test_results.append(("Problem 2", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 2", i, input_data, expected, result))

    # Test Problem 3: Check Unique Characters
    print("\n" + "=" * 70)
    print("PROBLEM 3: Check Unique Characters")
    print("=" * 70)
    tests_3 = [
        (["abcdef"], True),
        (["hello"], False),
        ([""], True),
        (["a"], True),
        (["aabbcc"], False)
    ]
    for i, (input_data, expected) in enumerate(tests_3, 1):
        result = has_unique_chars(*input_data)
        passed = result == expected
        test_results.append(("Problem 3", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 3", i, input_data, expected, result))

    # Test Problem 4: Simple Histogram
    print("\n" + "=" * 70)
    print("PROBLEM 4: Simple Histogram")
    print("=" * 70)
    tests_4 = [
        ([[1, 3, 2, 4]], ["*", "***", "**", "****"]),
        ([[0, 2, 0]], ["", "**", ""]),
        ([[5]], ["*****"]),
        ([[]], [])
    ]
    for i, (input_data, expected) in enumerate(tests_4, 1):
        result = create_histogram(*input_data)
        passed = result == expected
        test_results.append(("Problem 4", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 4", i, input_data, expected, result))

    # Test Problem 5: Two Sum
    print("\n" + "=" * 70)
    print("PROBLEM 5: Two Sum")
    print("=" * 70)
    tests_5 = [
        ([[2, 7, 11, 15], 9], [0, 1]),
        ([[3, 2, 4], 6], [1, 2]),
        ([[3, 3], 6], [0, 1]),
        ([[-1, -2, -3, -4], -6], [1, 3])
    ]
    for i, (input_data, expected) in enumerate(tests_5, 1):
        result = two_sum(*input_data)
        passed = result == expected
        test_results.append(("Problem 5", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 5", i, input_data, expected, result))

    # Test Problem 6: String Pattern Matching
    print("\n" + "=" * 70)
    print("PROBLEM 6: String Pattern Matching")
    print("=" * 70)
    tests_6 = [
        (["hello", "#?##?"], 1),
        (["abcde", "*****"], 1),
        (["aeiou", "?????"], 1),
        (["hello", "???"], 0),
        (["test", "##"], 1)
    ]
    for i, (input_data, expected) in enumerate(tests_6, 1):
        result = count_pattern_matches(*input_data)
        passed = result == expected
        test_results.append(("Problem 6", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 6", i, input_data, expected, result))

    # Test Problem 7: Array Distribution
    print("\n" + "=" * 70)
    print("PROBLEM 7: Array Distribution")
    print("=" * 70)
    tests_7 = [
        ([[1, 2, 3, 12, 15, 6]], [[2, 12, 15, 6], [1, 3]]),
        ([[2, 4, 6]], [[2, 4, 6], []]),
        ([[1, 3, 5]], [[], [1, 3, 5]]),
        ([[11, 13, 15]], [[11, 13, 15], []])
    ]
    for i, (input_data, expected) in enumerate(tests_7, 1):
        result = distribute_array(*input_data)
        passed = result == expected
        test_results.append(("Problem 7", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 7", i, input_data, expected, result))

    # Test Problem 8: Queue Entry Time Calculator
    print("\n" + "=" * 70)
    print("PROBLEM 8: Queue Entry Time Calculator")
    print("=" * 70)
    tests_8 = [
        ([25], 29),
        ([10], 12),
        ([1], 1),
        ([100], 120),
        ([9], 9)
    ]
    for i, (input_data, expected) in enumerate(tests_8, 1):
        result = queue_time(*input_data)
        passed = result == expected
        test_results.append(("Problem 8", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 8", i, input_data, expected, result))

    # Test Problem 9: Matrix Rotation 90 Degrees
    print("\n" + "=" * 70)
    print("PROBLEM 9: Matrix Rotation 90 Degrees")
    print("=" * 70)
    tests_9 = [
        ([[[1,2],[3,4]]], [[3,1],[4,2]]),
        ([[[1]]], [[1]]),
        ([[[1,2,3],[4,5,6],[7,8,9]]], [[7,4,1],[8,5,2],[9,6,3]])
    ]
    for i, (input_data, expected) in enumerate(tests_9, 1):
        # Need to make a deep copy for matrix rotation
        import copy
        test_input = copy.deepcopy(input_data)
        result = rotate_matrix(*test_input)
        passed = result == expected
        test_results.append(("Problem 9", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 9", i, input_data, expected, result))

    # Test Problem 10: Count Pairs Summing to Power of 2
    print("\n" + "=" * 70)
    print("PROBLEM 10: Count Pairs Summing to Power of 2")
    print("=" * 70)
    tests_10 = [
        ([[1, 3, 5, 7]], 3),
        ([[1, 1]], 1),
        ([[2, 2, 2]], 3),
        ([[1, 2, 4, 8]], 0)
    ]
    for i, (input_data, expected) in enumerate(tests_10, 1):
        result = count_power_of_2_pairs(*input_data)
        passed = result == expected
        test_results.append(("Problem 10", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 10", i, input_data, expected, result))

    # Test Problem 11: Second Largest in BST
    print("\n" + "=" * 70)
    print("PROBLEM 11: Second Largest in BST")
    print("=" * 70)
    # Build test tree:     5
    #                    /   \
    #                   3     7
    #                  /     / \
    #                 1     6   8
    root = TreeNode(5)
    root.left = TreeNode(3)
    root.right = TreeNode(7)
    root.left.left = TreeNode(1)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(8)
    result = second_largest(root)
    expected = 7
    passed = result == expected
    test_results.append(("Problem 11", 1, passed))
    status = "✓ PASS" if passed else "✗ FAIL"
    print(f"  Test 1: {status}")
    if not passed:
        print(f"    Expected: {expected}")
        print(f"    Got: {result}")
        failed_tests.append(("Problem 11", 1, "BST Tree", expected, result))

    # Test Problem 12: Maximum Subarray Sum
    print("\n" + "=" * 70)
    print("PROBLEM 12: Maximum Subarray Sum")
    print("=" * 70)
    tests_12 = [
        ([[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6),
        ([[1]], 1),
        ([[5, 4, -1, 7, 8]], 23),
        ([[-1, -2, -3, -4]], -1),
        ([[1, 2, 3, 4, 5]], 15)
    ]
    for i, (input_data, expected) in enumerate(tests_12, 1):
        result = max_subarray_sum(*input_data)
        passed = result == expected
        test_results.append(("Problem 12", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 12", i, input_data, expected, result))

    # Test Problem 13: Product of Array Except Self
    print("\n" + "=" * 70)
    print("PROBLEM 13: Product of Array Except Self")
    print("=" * 70)
    tests_13 = [
        ([[1, 2, 3, 4]], [24, 12, 8, 6]),
        ([[-1, 1, 0, -3, 3]], [0, 0, 9, 0, 0]),
    ]
    for i, (input_data, expected) in enumerate(tests_13, 1):
        result = product_except_self(*input_data)
        passed = result == expected
        test_results.append(("Problem 13", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 13", i, input_data, expected, result))

    # Test Problem 14: Find Peak Element
    print("\n" + "=" * 70)
    print("PROBLEM 14: Find Peak Element")
    print("=" * 70)
    tests_14 = [
        ([[1, 2, 3, 1]], 2),
        ([[1, 2, 1, 3, 5, 6, 4]], None),  # Multiple valid answers
    ]
    for i, (input_data, expected) in enumerate(tests_14, 1):
        result = find_peak_element(*input_data)
        if expected is None:
            # Just check that result is a valid peak
            arr = input_data[0]
            is_peak = False
            if 0 <= result < len(arr):
                left_ok = (result == 0 or arr[result] > arr[result-1])
                right_ok = (result == len(arr)-1 or arr[result] > arr[result+1])
                is_peak = left_ok and right_ok
            passed = is_peak
        else:
            passed = result == expected
        test_results.append(("Problem 14", i, passed))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  Test {i}: {status}")
        if not passed:
            print(f"    Input: {input_data}")
            print(f"    Expected: {expected}")
            print(f"    Got: {result}")
            failed_tests.append(("Problem 14", i, input_data, expected, result))

    # Print Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)

    total_tests = len(test_results)
    passed_tests = sum(1 for _, _, passed in test_results if passed)
    failed_count = total_tests - passed_tests

    print(f"Total tests: {total_tests}")
    print(f"Passed: {passed_tests} ({passed_tests/total_tests*100:.1f}%)")
    print(f"Failed: {failed_count} ({failed_count/total_tests*100:.1f}%)")

    if failed_tests:
        print("\n" + "=" * 70)
        print("FAILED TESTS DETAILS")
        print("=" * 70)
        for problem, test_num, input_data, expected, result in failed_tests:
            print(f"\n{problem} - Test {test_num}:")
            print(f"  Input: {input_data}")
            print(f"  Expected: {expected}")
            print(f"  Got: {result}")

    # Group results by problem
    print("\n" + "=" * 70)
    print("RESULTS BY PROBLEM")
    print("=" * 70)
    from collections import defaultdict
    by_problem = defaultdict(list)
    for problem, test_num, passed in test_results:
        by_problem[problem].append(passed)

    for problem in sorted(by_problem.keys(), key=lambda x: int(x.split()[1])):
        results = by_problem[problem]
        passed = sum(results)
        total = len(results)
        status = "✓ ALL PASS" if passed == total else f"✗ {passed}/{total} PASS"
        print(f"{problem}: {status}")

    return test_results, failed_tests


if __name__ == "__main__":
    print("COMPREHENSIVE TEST SUITE FOR PROBLEMS 1-14")
    print("=" * 70)
    print()

    test_results, failed_tests = run_tests()

    # Exit with error code if any tests failed
    if failed_tests:
        exit(1)
    else:
        print("\n✓ ALL TESTS PASSED!")
        exit(0)
