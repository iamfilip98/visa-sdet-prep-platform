import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Code } from 'lucide-react'

export default function PythonLesson() {
  const { id } = useParams()

  const lessons = {
    1: {
      title: 'Python Basics',
      description: 'Variables, data types, and basic operations',
      content: [
        {
          type: 'text',
          content: 'Master the fundamental building blocks of Python. Understanding these basics is essential before moving to advanced CodeSignal topics.'
        },
        {
          type: 'section',
          title: 'Variables and Assignment',
          content: 'Variables store data without explicit type declarations.'
        },
        {
          type: 'code',
          code: `# Variable assignment (no type declaration needed)
x = 10
name = "Alice"
is_valid = True

# Multiple assignment
a, b, c = 1, 2, 3
x = y = z = 0

# Swap values
a, b = 5, 10
a, b = b, a  # a=10, b=5

# Variable naming
valid_name = "ok"
_private = "ok"
name2 = "ok"
# 2name = "error"  # Can't start with number`
        },
        {
          type: 'section',
          title: 'Data Types',
          content: 'Python has several built-in data types.'
        },
        {
          type: 'code',
          code: `# Numbers
integer = 42
floating = 3.14
scientific = 1.5e3  # 1500.0

# Strings
single = 'hello'
double = "world"
multi = """multiple
lines"""

# Boolean
is_true = True
is_false = False

# None (null value)
empty = None

# Check type
print(type(42))        # <class 'int'>
print(type(3.14))      # <class 'float'>
print(type("hello"))   # <class 'str'>

# Type conversion
x = int("123")      # "123" -> 123
y = str(123)        # 123 -> "123"
z = float("3.14")   # "3.14" -> 3.14`
        },
        {
          type: 'section',
          title: 'Basic Data Structures',
          content: 'Lists, tuples, and dictionaries are fundamental.'
        },
        {
          type: 'code',
          code: `# List (mutable, ordered)
nums = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
nums.append(6)        # Add to end
nums[0] = 10          # Modify element

# Tuple (immutable, ordered)
point = (10, 20)
rgb = (255, 0, 128)
# point[0] = 5  # Error! Can't modify

# Dictionary (key-value pairs)
person = {
    "name": "Alice",
    "age": 25,
    "city": "NYC"
}
print(person["name"])  # "Alice"
person["age"] = 26     # Modify value
person["job"] = "Dev"  # Add new key

# Common operations
len(nums)              # Length
1 in nums              # Membership check
nums + [7, 8]          # Concatenation`
        },
        {
          type: 'section',
          title: 'Basic Operators',
          content: 'Arithmetic, comparison, and logical operators.'
        },
        {
          type: 'code',
          code: `# Arithmetic
x = 10 + 5        # Addition: 15
x = 10 - 5        # Subtraction: 5
x = 10 * 5        # Multiplication: 50
x = 10 / 3        # Division: 3.333...
x = 10 // 3       # Floor division: 3
x = 10 % 3        # Modulo: 1
x = 2 ** 3        # Power: 8

# Comparison
10 == 10          # Equal: True
10 != 5           # Not equal: True
10 > 5            # Greater: True
10 < 5            # Less: False
10 >= 10          # Greater or equal: True
10 <= 5           # Less or equal: False

# Logical
True and False    # False
True or False     # True
not True          # False

# Shorthand operators
x = 10
x += 5            # x = x + 5 (15)
x -= 3            # x = x - 3 (12)
x *= 2            # x = x * 2 (24)
x //= 4           # x = x // 4 (6)`
        },
        {
          type: 'tip',
          content: 'Python is dynamically typed - variables can change types. Use meaningful variable names and remember that indentation matters!'
        }
      ]
    },
    2: {
      title: 'Control Flow',
      description: 'If statements, loops (for/while), break/continue',
      content: [
        {
          type: 'text',
          content: 'Control flow structures let you make decisions and repeat actions. These are essential for solving algorithm problems.'
        },
        {
          type: 'section',
          title: 'If Statements',
          content: 'Make decisions based on conditions.'
        },
        {
          type: 'code',
          code: `# Basic if
x = 10
if x > 0:
    print("positive")

# If-else
x = -5
if x > 0:
    print("positive")
else:
    print("non-positive")

# If-elif-else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# Multiple conditions
age = 25
has_license = True
if age >= 18 and has_license:
    print("Can drive")

# Ternary operator (one-line if)
x = 10
result = "even" if x % 2 == 0 else "odd"

# Truthy and falsy values
# Falsy: False, None, 0, "", [], {}, ()
# Everything else is truthy
if [1, 2, 3]:      # True (non-empty list)
    print("has items")

if not []:          # True (empty list is falsy)
    print("empty")`
        },
        {
          type: 'section',
          title: 'For Loops',
          content: 'Iterate over sequences and ranges.'
        },
        {
          type: 'code',
          code: `# Loop over list
nums = [1, 2, 3, 4, 5]
for num in nums:
    print(num)

# Loop over range
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 8):     # 2, 3, 4, 5, 6, 7
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8 (step=2)
    print(i)

# Loop over string
for char in "hello":
    print(char)  # h, e, l, l, o

# Loop over dictionary
person = {"name": "Alice", "age": 25}
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(key, value)

# Enumerate (get index + value)
fruits = ['apple', 'banana', 'cherry']
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Nested loops
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})")`
        },
        {
          type: 'section',
          title: 'While Loops',
          content: 'Repeat while a condition is true.'
        },
        {
          type: 'code',
          code: `# Basic while
count = 0
while count < 5:
    print(count)
    count += 1

# While with condition
x = 10
while x > 0:
    print(x)
    x -= 1

# Infinite loop with break
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == 'quit':
        break
    print(f"You entered: {user_input}")

# While with else (executes if loop completes normally)
n = 5
while n > 0:
    print(n)
    n -= 1
else:
    print("Done!")  # Executes after loop`
        },
        {
          type: 'section',
          title: 'Break and Continue',
          content: 'Control loop execution flow.'
        },
        {
          type: 'code',
          code: `# break - exit loop immediately
for i in range(10):
    if i == 5:
        break  # Stop loop when i=5
    print(i)  # Prints 0, 1, 2, 3, 4

# continue - skip to next iteration
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)  # Prints 1, 3, 5, 7, 9

# Find first element
nums = [1, 3, 5, 8, 9, 11]
for num in nums:
    if num % 2 == 0:
        print(f"First even: {num}")
        break

# Skip invalid values
nums = [1, -2, 3, -4, 5]
for num in nums:
    if num < 0:
        continue  # Skip negative numbers
    print(num)  # Prints 1, 3, 5

# Nested loops with break
found = False
for i in range(5):
    for j in range(5):
        if i * j == 12:
            print(f"Found: {i} * {j} = 12")
            found = True
            break
    if found:
        break  # Exit outer loop`
        },
        {
          type: 'tip',
          content: 'Use for loops when you know the number of iterations, while loops for unknown iterations. Break and continue help avoid nested if statements.'
        }
      ]
    },
    3: {
      title: 'Functions & Scope',
      description: 'Function syntax, parameters, return values, lambda',
      content: [
        {
          type: 'text',
          content: 'Functions help organize code into reusable blocks. Understanding functions, parameters, and scope is crucial for writing clean solutions.'
        },
        {
          type: 'section',
          title: 'Defining Functions',
          content: 'Basic function syntax and return values.'
        },
        {
          type: 'code',
          code: `# Basic function
def greet():
    print("Hello!")

greet()  # Call function

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)  # 8

# Multiple return values (tuple)
def get_stats(nums):
    return min(nums), max(nums), sum(nums)

min_val, max_val, total = get_stats([1, 2, 3, 4, 5])

# Early return
def is_positive(x):
    if x > 0:
        return True
    return False

# No explicit return -> returns None
def no_return():
    x = 10

result = no_return()  # None`
        },
        {
          type: 'section',
          title: 'Function Parameters',
          content: 'Default values, keyword arguments, and variable arguments.'
        },
        {
          type: 'code',
          code: `# Default parameters
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()         # "Hello, Guest!"
greet("Alice")  # "Hello, Alice!"

# Keyword arguments
def create_user(name, age, city="NYC"):
    return {"name": name, "age": age, "city": city}

user = create_user(name="Alice", age=25)
user = create_user(age=25, name="Alice")  # Order doesn't matter

# Variable arguments (*args)
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3))        # 6
print(sum_all(1, 2, 3, 4, 5))  # 15

# Keyword variable arguments (**kwargs)
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")

# Combining all types
def complex_func(a, b, *args, default=10, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"default={default}")
    print(f"kwargs={kwargs}")`
        },
        {
          type: 'section',
          title: 'Lambda Functions',
          content: 'Anonymous one-line functions for simple operations.'
        },
        {
          type: 'code',
          code: `# Regular function
def square(x):
    return x ** 2

# Lambda equivalent
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda with multiple parameters
add = lambda a, b: a + b
print(add(3, 7))  # 10

# Common use: sorting with custom key
students = [
    ("Alice", 85),
    ("Bob", 92),
    ("Charlie", 78)
]
# Sort by grade (second element)
sorted_students = sorted(students, key=lambda x: x[1])

# Use in map()
nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, nums))
# [1, 4, 9, 16, 25]

# Use in filter()
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4]

# Ternary in lambda
abs_value = lambda x: x if x >= 0 else -x
print(abs_value(-5))  # 5`
        },
        {
          type: 'section',
          title: 'Variable Scope',
          content: 'Local, global, and nonlocal variables.'
        },
        {
          type: 'code',
          code: `# Global scope
x = 10  # Global variable

def func():
    y = 5  # Local variable
    print(x)  # Can read global: 10
    print(y)  # Can read local: 5

func()
# print(y)  # Error! y is not defined outside func

# Modify global variable
count = 0

def increment():
    global count  # Declare we're using global
    count += 1

increment()
print(count)  # 1

# Nested functions and nonlocal
def outer():
    x = 10

    def inner():
        nonlocal x  # Refer to outer's x
        x += 5
        print(x)  # 15

    inner()
    print(x)  # 15 (modified by inner)

outer()

# Best practice: avoid global, pass parameters instead
def increment(count):
    return count + 1

count = 0
count = increment(count)  # Better approach`
        },
        {
          type: 'tip',
          content: 'Use functions to break problems into smaller pieces. Lambda is great for simple operations in map/filter/sorted. Avoid global variables - pass parameters instead!'
        }
      ]
    },
    4: {
      title: 'Collections Module Mastery',
      description: 'Learn Counter, defaultdict, and deque - essential for CodeSignal',
      content: [
        {
          type: 'text',
          content: 'The collections module provides specialized container datatypes that are incredibly useful for CodeSignal problems. Mastering these can save you significant time during the assessment.'
        },
        {
          type: 'section',
          title: 'Counter',
          content: 'Counter is a dictionary subclass for counting hashable objects. It\'s perfect for frequency counting problems.'
        },
        {
          type: 'code',
          code: `from collections import Counter

# Count occurrences in a list
nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
counter = Counter(nums)
print(counter)  # Counter({4: 4, 3: 3, 2: 2, 1: 1})

# Most common elements
print(counter.most_common(2))  # [(4, 4), (3, 3)]

# Count characters in a string
text = "hello world"
char_count = Counter(text)
print(char_count)  # Counter({'l': 3, 'o': 2, ...})

# Arithmetic operations
c1 = Counter(['a', 'b', 'c', 'a'])
c2 = Counter(['a', 'b', 'd'])
print(c1 + c2)  # Counter({'a': 3, 'b': 2, 'c': 1, 'd': 1})
print(c1 - c2)  # Counter({'a': 1, 'c': 1})`
        },
        {
          type: 'section',
          title: 'defaultdict',
          content: 'defaultdict provides default values for missing keys, eliminating KeyError exceptions.'
        },
        {
          type: 'code',
          code: `from collections import defaultdict

# Group items by category
items = [('fruit', 'apple'), ('veg', 'carrot'), ('fruit', 'banana')]
grouped = defaultdict(list)
for category, item in items:
    grouped[category].append(item)  # No need to check if key exists!
print(dict(grouped))  # {'fruit': ['apple', 'banana'], 'veg': ['carrot']}

# Count occurrences (alternative to Counter)
nums = [1, 2, 2, 3, 3, 3]
counts = defaultdict(int)  # Default value is 0
for num in nums:
    counts[num] += 1  # No KeyError!
print(dict(counts))  # {1: 1, 2: 2, 3: 3}

# Build adjacency list for graphs
graph = defaultdict(list)
edges = [(1, 2), (1, 3), (2, 4)]
for u, v in edges:
    graph[u].append(v)
print(dict(graph))  # {1: [2, 3], 2: [4]}`
        },
        {
          type: 'section',
          title: 'deque',
          content: 'deque (double-ended queue) allows O(1) operations at both ends, perfect for BFS and sliding windows.'
        },
        {
          type: 'code',
          code: `from collections import deque

# Basic operations
q = deque([1, 2, 3])
q.append(4)        # Add to right: [1, 2, 3, 4]
q.appendleft(0)    # Add to left: [0, 1, 2, 3, 4]
q.pop()            # Remove from right: [0, 1, 2, 3]
q.popleft()        # Remove from left: [1, 2, 3]

# BFS implementation
def bfs(graph, start):
    visited = set()
    queue = deque([start])

    while queue:
        node = queue.popleft()  # O(1) operation!
        if node not in visited:
            visited.add(node)
            for neighbor in graph[node]:
                queue.append(neighbor)
    return visited

# Sliding window
def max_sliding_window(nums, k):
    dq = deque()  # Store indices
    result = []

    for i, num in enumerate(nums):
        # Remove elements outside window
        if dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()

        dq.append(i)

        if i >= k - 1:
            result.append(nums[dq[0]])

    return result`
        },
        {
          type: 'tip',
          content: 'Use Counter for frequency problems, defaultdict to avoid KeyError, and deque for BFS or operations at both ends of a sequence.'
        }
      ]
    },
    5: {
      title: 'List Comprehensions',
      description: 'Write Pythonic code that saves time',
      content: [
        {
          type: 'text',
          content: 'List comprehensions provide a concise way to create lists. They\'re faster and more Pythonic than traditional loops, saving you valuable time during the assessment.'
        },
        {
          type: 'section',
          title: 'Basic Syntax',
          content: 'Transform elements with a single line of code.'
        },
        {
          type: 'code',
          code: `# Traditional loop
result = []
for x in range(10):
    result.append(x * 2)

# List comprehension (much faster to write!)
result = [x * 2 for x in range(10)]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Convert to uppercase
words = ['hello', 'world', 'python']
upper = [word.upper() for word in words]
# ['HELLO', 'WORLD', 'PYTHON']

# Square numbers
nums = [1, 2, 3, 4, 5]
squares = [n**2 for n in nums]
# [1, 4, 9, 16, 25]`
        },
        {
          type: 'section',
          title: 'Filtering with Conditions',
          content: 'Add if conditions to filter elements.'
        },
        {
          type: 'code',
          code: `# Filter even numbers
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in nums if x % 2 == 0]
# [2, 4, 6, 8, 10]

# Filter and transform
nums = [1, 2, 3, 4, 5, 6]
doubled_evens = [x * 2 for x in nums if x % 2 == 0]
# [4, 8, 12]

# Filter strings by length
words = ['a', 'ab', 'abc', 'abcd']
long_words = [w for w in words if len(w) > 2]
# ['abc', 'abcd']

# Multiple conditions
nums = range(20)
result = [x for x in nums if x % 2 == 0 and x % 3 == 0]
# [0, 6, 12, 18]`
        },
        {
          type: 'section',
          title: 'Nested Comprehensions',
          content: 'Create 2D arrays and flatten nested structures.'
        },
        {
          type: 'code',
          code: `# Create 2D array (matrix)
matrix = [[i*j for j in range(5)] for i in range(5)]
# [[0, 0, 0, 0, 0],
#  [0, 1, 2, 3, 4],
#  [0, 2, 4, 6, 8],
#  [0, 3, 6, 9, 12],
#  [0, 4, 8, 12, 16]]

# Flatten 2D array
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Cartesian product
colors = ['red', 'blue']
sizes = ['S', 'M', 'L']
products = [(c, s) for c in colors for s in sizes]
# [('red', 'S'), ('red', 'M'), ('red', 'L'),
#  ('blue', 'S'), ('blue', 'M'), ('blue', 'L')]

# Filter 2D
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
evens = [num for row in matrix for num in row if num % 2 == 0]
# [2, 4, 6, 8]`
        },
        {
          type: 'section',
          title: 'Dictionary and Set Comprehensions',
          content: 'Create dictionaries and sets with similar syntax.'
        },
        {
          type: 'code',
          code: `# Dictionary comprehension
nums = [1, 2, 3, 4, 5]
squares_dict = {n: n**2 for n in nums}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Swap keys and values
original = {'a': 1, 'b': 2, 'c': 3}
swapped = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}

# Set comprehension (unique values)
nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique_squares = {n**2 for n in nums}
# {1, 4, 9, 16}

# Filter dictionary
scores = {'alice': 85, 'bob': 92, 'charlie': 78, 'david': 95}
high_scores = {k: v for k, v in scores.items() if v >= 90}
# {'bob': 92, 'david': 95}`
        },
        {
          type: 'tip',
          content: 'List comprehensions are faster to write and often more readable than loops. Use them whenever you\'re transforming or filtering a sequence!'
        }
      ]
    },
    6: {
      title: 'Built-in Functions',
      description: 'sorted(), enumerate(), zip(), map(), filter()',
      content: [
        {
          type: 'text',
          content: 'Python\'s built-in functions are optimized and save you from writing common patterns. Knowing these well can save you several minutes per problem.'
        },
        {
          type: 'section',
          title: 'sorted()',
          content: 'Sort any iterable with powerful key functions.'
        },
        {
          type: 'code',
          code: `# Basic sorting
nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(nums))  # [1, 1, 2, 3, 4, 5, 6, 9]
print(sorted(nums, reverse=True))  # [9, 6, 5, 4, 3, 2, 1, 1]

# Sort by custom key
words = ['banana', 'pie', 'Washington', 'book']
print(sorted(words, key=len))  # ['pie', 'book', 'banana', 'Washington']
print(sorted(words, key=str.lower))  # ['banana', 'book', 'pie', 'Washington']

# Sort tuples by second element
pairs = [(1, 5), (3, 2), (2, 8), (4, 1)]
print(sorted(pairs, key=lambda x: x[1]))  # [(4, 1), (3, 2), (1, 5), (2, 8)]

# Sort by multiple criteria
students = [
    ('Alice', 85, 20),
    ('Bob', 92, 19),
    ('Charlie', 85, 21),
    ('David', 92, 18)
]
# Sort by grade (desc), then age (asc)
sorted_students = sorted(students, key=lambda x: (-x[1], x[2]))
# [('David', 92, 18), ('Bob', 92, 19), ('Alice', 85, 20), ('Charlie', 85, 21)]

# Sort dictionary by values
scores = {'alice': 85, 'bob': 92, 'charlie': 78}
sorted_items = sorted(scores.items(), key=lambda x: x[1], reverse=True)
# [('bob', 92), ('alice', 85), ('charlie', 78)]`
        },
        {
          type: 'section',
          title: 'enumerate()',
          content: 'Get both index and value while iterating.'
        },
        {
          type: 'code',
          code: `# Basic enumerate
fruits = ['apple', 'banana', 'cherry']
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

# Custom start index
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry

# Find indices of all occurrences
nums = [1, 2, 3, 2, 4, 2, 5]
indices = [i for i, x in enumerate(nums) if x == 2]
# [1, 3, 5]

# Create index mapping
words = ['hello', 'world', 'python']
index_map = {word: i for i, word in enumerate(words)}
# {'hello': 0, 'world': 1, 'python': 2}`
        },
        {
          type: 'section',
          title: 'zip()',
          content: 'Iterate over multiple sequences in parallel.'
        },
        {
          type: 'code',
          code: `# Basic zip
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]
ages = [20, 19, 21]

for name, score, age in zip(names, scores, ages):
    print(f"{name} (age {age}): {score}")
# Alice (age 20): 85
# Bob (age 19): 92
# Charlie (age 21): 78

# Create dictionary from two lists
keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = dict(zip(keys, values))
# {'a': 1, 'b': 2, 'c': 3}

# Transpose matrix (rows to columns)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed = list(zip(*matrix))
# [(1, 4, 7), (2, 5, 8), (3, 6, 9)]

# Unzip (opposite of zip)
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
nums, letters = zip(*pairs)
# nums = (1, 2, 3), letters = ('a', 'b', 'c')

# Zip stops at shortest sequence
list1 = [1, 2, 3, 4, 5]
list2 = ['a', 'b', 'c']
paired = list(zip(list1, list2))
# [(1, 'a'), (2, 'b'), (3, 'c')]`
        },
        {
          type: 'section',
          title: 'any() and all()',
          content: 'Check conditions across sequences.'
        },
        {
          type: 'code',
          code: `# any() - True if at least one element is True
nums = [0, 0, 1, 0]
print(any(nums))  # True
print(any([0, 0, 0]))  # False

# Check if any element is even
nums = [1, 3, 5, 6, 7]
has_even = any(x % 2 == 0 for x in nums)  # True

# all() - True if all elements are True
nums = [1, 2, 3, 4]
print(all(nums))  # True (all non-zero)
print(all([1, 2, 0, 4]))  # False (contains 0)

# Check if all elements are positive
nums = [1, 2, 3, 4, 5]
all_positive = all(x > 0 for x in nums)  # True

# Validate password requirements
password = "MyPass123!"
is_valid = all([
    len(password) >= 8,
    any(c.isupper() for c in password),
    any(c.islower() for c in password),
    any(c.isdigit() for c in password)
])  # True`
        },
        {
          type: 'section',
          title: 'map() and filter()',
          content: 'Transform and filter sequences functionally.'
        },
        {
          type: 'code',
          code: `# map() - apply function to all elements
nums = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, nums))
# [1, 4, 9, 16, 25]

# Convert strings to integers
strings = ['1', '2', '3', '4']
nums = list(map(int, strings))
# [1, 2, 3, 4]

# Multiple iterables
nums1 = [1, 2, 3]
nums2 = [4, 5, 6]
sums = list(map(lambda x, y: x + y, nums1, nums2))
# [5, 7, 9]

# filter() - keep elements matching condition
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4, 6, 8, 10]

# Filter non-empty strings
words = ['hello', '', 'world', '', 'python']
non_empty = list(filter(None, words))  # None filters falsy values
# ['hello', 'world', 'python']

# Note: List comprehensions are often more readable
# filter: list(filter(lambda x: x % 2 == 0, nums))
# comprehension: [x for x in nums if x % 2 == 0]`
        },
        {
          type: 'tip',
          content: 'These built-in functions are optimized C implementations. Use sorted() for complex sorting, enumerate() when you need indices, and zip() for parallel iteration.'
        }
      ]
    },
    7: {
      title: 'String Operations',
      description: 'split(), join(), strip() and string slicing',
      content: [
        {
          type: 'text',
          content: 'String manipulation is common in CodeSignal problems. These operations will help you solve parsing and text processing problems quickly.'
        },
        {
          type: 'section',
          title: 'split() and join()',
          content: 'Split strings into lists and join lists into strings.'
        },
        {
          type: 'code',
          code: `# split() - string to list
sentence = "hello world python"
words = sentence.split()  # Split by whitespace
# ['hello', 'world', 'python']

# Split by custom delimiter
csv = "apple,banana,cherry"
fruits = csv.split(',')
# ['apple', 'banana', 'cherry']

# Limit splits
text = "a:b:c:d:e"
parts = text.split(':', 2)  # Max 2 splits
# ['a', 'b', 'c:d:e']

# join() - list to string
words = ['hello', 'world', 'python']
sentence = ' '.join(words)
# 'hello world python'

csv = ','.join(words)
# 'hello,world,python'

# Join with numbers (convert to strings first)
nums = [1, 2, 3, 4, 5]
result = '-'.join(map(str, nums))
# '1-2-3-4-5'

# Common pattern: split, process, join
text = "hello world"
reversed_words = ' '.join(word[::-1] for word in text.split())
# 'olleh dlrow'`
        },
        {
          type: 'section',
          title: 'strip(), lstrip(), rstrip()',
          content: 'Remove whitespace and characters from string ends.'
        },
        {
          type: 'code',
          code: `# strip() - remove from both ends
text = "   hello world   "
print(text.strip())  # "hello world"

# Remove specific characters
text = "***hello***"
print(text.strip('*'))  # "hello"

# lstrip() - remove from left only
text = "   hello world   "
print(text.lstrip())  # "hello world   "

# rstrip() - remove from right only
text = "   hello world   "
print(text.rstrip())  # "   hello world"

# Clean input lines
lines = ["  line1  \\n", "  line2  \\n", "  line3  \\n"]
cleaned = [line.strip() for line in lines]
# ['line1', 'line2', 'line3']

# Remove multiple characters
text = "!!!hello???"
print(text.strip('!?'))  # "hello"`
        },
        {
          type: 'section',
          title: 'String Slicing',
          content: 'Extract substrings using powerful slice notation.'
        },
        {
          type: 'code',
          code: `s = "hello world"

# Basic slicing [start:end]
print(s[0:5])    # "hello"
print(s[6:11])   # "world"

# Omit start or end
print(s[:5])     # "hello" (from beginning)
print(s[6:])     # "world" (to end)
print(s[:])      # "hello world" (copy)

# Negative indices (from end)
print(s[-5:])    # "world" (last 5 chars)
print(s[:-6])    # "hello" (all but last 6)

# Step parameter [start:end:step]
print(s[::2])    # "hlowrd" (every 2nd char)
print(s[1::2])   # "el ol" (every 2nd, starting at 1)

# Reverse string
print(s[::-1])   # "dlrow olleh"

# Palindrome check
word = "racecar"
is_palindrome = word == word[::-1]  # True

# Get first and last n characters
n = 3
first_three = s[:n]    # "hel"
last_three = s[-n:]    # "rld"

# Remove first and last character
s = "hello"
middle = s[1:-1]  # "ell"`
        },
        {
          type: 'section',
          title: 'Common String Methods',
          content: 'Other useful string operations.'
        },
        {
          type: 'code',
          code: `# Case conversions
s = "Hello World"
print(s.upper())      # "HELLO WORLD"
print(s.lower())      # "hello world"
print(s.title())      # "Hello World"
print(s.swapcase())   # "hELLO wORLD"

# Check properties
print("hello".isalpha())      # True
print("hello123".isalnum())   # True
print("123".isdigit())        # True
print("HELLO".isupper())      # True
print("hello".islower())      # True

# Replace
text = "hello world hello"
print(text.replace("hello", "hi"))  # "hi world hi"
print(text.replace("hello", "hi", 1))  # "hi world hello" (max 1)

# Find and count
text = "hello world hello"
print(text.find("world"))     # 6 (index)
print(text.find("xyz"))       # -1 (not found)
print(text.count("hello"))    # 2

# startswith and endswith
print("hello.txt".endswith(".txt"))   # True
print("hello.txt".startswith("he"))   # True`
        },
        {
          type: 'tip',
          content: 'String slicing with [::-1] is the fastest way to reverse a string. Use split() and join() together for word-level manipulations.'
        }
      ]
    },
    8: {
      title: 'Set Operations',
      description: 'Fast lookups and set arithmetic',
      content: [
        {
          type: 'text',
          content: 'Sets provide O(1) lookups and powerful set operations. They\'re essential for problems involving unique elements, membership testing, and set arithmetic.'
        },
        {
          type: 'section',
          title: 'Creating Sets',
          content: 'Different ways to create and initialize sets.'
        },
        {
          type: 'code',
          code: `# Create from list (removes duplicates)
nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = set(nums)
# {1, 2, 3, 4}

# Create from string
chars = set("hello")
# {'h', 'e', 'l', 'o'}

# Empty set (not {} - that's a dict!)
empty = set()

# Set literal
primes = {2, 3, 5, 7, 11}

# Set comprehension
squares = {x**2 for x in range(10)}
# {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}`
        },
        {
          type: 'section',
          title: 'Fast Membership Testing',
          content: 'O(1) lookups make sets perfect for membership testing.'
        },
        {
          type: 'code',
          code: `# List vs Set performance
# List: O(n) lookup
large_list = list(range(1000000))
print(999999 in large_list)  # Slow!

# Set: O(1) lookup
large_set = set(range(1000000))
print(999999 in large_set)  # Fast!

# Check for duplicates
def has_duplicates(nums):
    return len(nums) != len(set(nums))

nums = [1, 2, 3, 4, 5]
print(has_duplicates(nums))  # False

nums = [1, 2, 3, 2, 5]
print(has_duplicates(nums))  # True

# Find first duplicate
def first_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return num
        seen.add(num)
    return None

nums = [1, 2, 3, 2, 5]
print(first_duplicate(nums))  # 2`
        },
        {
          type: 'section',
          title: 'Set Operations',
          content: 'Union, intersection, difference, and symmetric difference.'
        },
        {
          type: 'code',
          code: `a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Union (all elements in either set)
print(a | b)           # {1, 2, 3, 4, 5, 6, 7, 8}
print(a.union(b))      # Same

# Intersection (elements in both sets)
print(a & b)           # {4, 5}
print(a.intersection(b))  # Same

# Difference (in a but not in b)
print(a - b)           # {1, 2, 3}
print(a.difference(b))  # Same

# Symmetric difference (in a or b, but not both)
print(a ^ b)           # {1, 2, 3, 6, 7, 8}
print(a.symmetric_difference(b))  # Same

# Multiple sets
a = {1, 2, 3}
b = {2, 3, 4}
c = {3, 4, 5}
print(a & b & c)       # {3}
print(a | b | c)       # {1, 2, 3, 4, 5}`
        },
        {
          type: 'section',
          title: 'Set Modifications',
          content: 'Add, remove, and update set elements.'
        },
        {
          type: 'code',
          code: `s = {1, 2, 3}

# Add element
s.add(4)
# {1, 2, 3, 4}

# Add multiple elements
s.update([5, 6, 7])
# {1, 2, 3, 4, 5, 6, 7}

# Remove element (raises KeyError if not found)
s.remove(1)
# {2, 3, 4, 5, 6, 7}

# Discard (no error if not found)
s.discard(100)  # No error
# {2, 3, 4, 5, 6, 7}

# Pop random element
elem = s.pop()

# Clear all elements
s.clear()
# set()

# In-place operations
a = {1, 2, 3}
b = {3, 4, 5}
a |= b  # a = a | b
# {1, 2, 3, 4, 5}

a &= {1, 2, 3}  # a = a & {1, 2, 3}
# {1, 2, 3}`
        },
        {
          type: 'section',
          title: 'Practical Examples',
          content: 'Common CodeSignal patterns using sets.'
        },
        {
          type: 'code',
          code: `# Find common elements in multiple lists
def common_elements(lists):
    if not lists:
        return []
    result = set(lists[0])
    for lst in lists[1:]:
        result &= set(lst)
    return list(result)

lists = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]]
print(common_elements(lists))  # [3, 4]

# Remove elements present in another list
def remove_elements(nums, to_remove):
    to_remove_set = set(to_remove)
    return [x for x in nums if x not in to_remove_set]

nums = [1, 2, 3, 4, 5, 6]
to_remove = [2, 4, 6]
print(remove_elements(nums, to_remove))  # [1, 3, 5]

# Check if two strings are anagrams
def are_anagrams(s1, s2):
    return set(s1) == set(s2) and len(s1) == len(s2)

print(are_anagrams("listen", "silent"))  # True

# Find unique characters in both strings
def unique_chars(s1, s2):
    return set(s1) ^ set(s2)  # Symmetric difference

print(unique_chars("hello", "world"))  # {'e', 'r', 'd', 'h'}

# Two Sum using set
def two_sum_exists(nums, target):
    seen = set()
    for num in nums:
        if target - num in seen:
            return True
        seen.add(num)
    return False

nums = [2, 7, 11, 15]
print(two_sum_exists(nums, 9))  # True`
        },
        {
          type: 'tip',
          content: 'Use sets for O(1) membership testing, removing duplicates, and finding common/unique elements. For problems checking "does X exist in list", always convert to set first!'
        }
      ]
    }
  }

  const lesson = lessons[id]

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/python-course" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4">
          <ArrowLeft size={20} />
          Back to Course
        </Link>
        <div className="card">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p>The requested lesson could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/python-course" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-4">
        <ArrowLeft size={20} />
        Back to Course
      </Link>

      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{lesson.description}</p>
          </div>
          <CheckCircle className="text-gray-300 dark:text-gray-600" size={32} />
        </div>
      </div>

      <div className="space-y-6">
        {lesson.content.map((section, index) => (
          <div key={index}>
            {section.type === 'text' && (
              <div className="card">
                <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
              </div>
            )}

            {section.type === 'section' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
              </div>
            )}

            {section.type === 'code' && (
              <div className="card bg-gray-900">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="text-green-400" size={20} />
                  <span className="text-green-400 font-semibold">Code Example</span>
                </div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  {section.code}
                </pre>
              </div>
            )}

            {section.type === 'tip' && (
              <div className="card bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Pro Tip</p>
                <p className="text-blue-800 dark:text-blue-200">{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Link to="/python-course" className="btn-secondary">
          <ArrowLeft size={16} />
          Back to Course
        </Link>
        {parseInt(id) < 8 && (
          <Link to={`/python-course/lesson/${parseInt(id) + 1}`} className="btn-primary">
            Next Lesson
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        )}
      </div>
    </div>
  )
}
