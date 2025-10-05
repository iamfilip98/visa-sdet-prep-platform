#!/usr/bin/env python3
"""Test Sum with Neighbors problem"""

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

# Test cases from the problem
test_cases = [
    {"input": [1, 2, 3, 4], "output": [3, 6, 9, 7]},
    {"input": [5], "output": [5]},
    {"input": [1, 1], "output": [1, 2]},
    {"input": [], "output": []},
    {"input": [-1, 0, 1], "output": [-1, 0, 1]}
]

print("Testing Sum with Neighbors solution:")
print("="*60)

for i, test in enumerate(test_cases, 1):
    input_arr = test["input"]
    expected = test["output"]
    actual = sum_with_neighbors(input_arr[:])  # Make a copy

    passed = actual == expected
    status = "✓ PASS" if passed else "✗ FAIL"

    print(f"\nTest Case {i}: {status}")
    print(f"  Input:    {input_arr}")
    print(f"  Expected: {expected}")
    print(f"  Actual:   {actual}")

    if not passed:
        print(f"  ERROR: Mismatch!")
        # Let's manually trace through the logic
        print(f"\n  Manual trace:")
        for idx in range(len(input_arr)):
            left = input_arr[idx-1] if idx > 0 else 0
            center = input_arr[idx]
            right = input_arr[idx+1] if idx < len(input_arr)-1 else 0
            total = left + center + right
            print(f"    Index {idx}: left={left}, center={center}, right={right} => {total}")
