

class recsursion:
    def factorial(self, n):
        if n == 0 or n == 1:
            return 1
        else:
            return n * self.factorial(n - 1)

    def fibonacci(self, n):
        if n <= 0:
            return 0
        elif n == 1:
            return 1
        else:
            return self.fibonacci(n - 1) + self.fibonacci(n - 2)

    def gcd(self, a, b):
        if b == 0:
            return a
        else:
            return self.gcd(b, a % b)

    def power(self, base, exp):
        if exp == 0:
            return 1
        else:
            return base * self.power(base, exp - 1)

    def reverse_string(self, s):
        if len(s) == 0:
            return s
        else:
            return s[-1] + self.reverse_string(s[:-1])

    def sum_of_digits(self, n):
        if n == 0:
            return 0
        else:
            return n % 10 + self.sum_of_digits(n // 10)

    def is_palindrome(self, s):
        if len(s) <= 1:
            return True
        elif s[0] != s[-1]:
            return False
        else:
            return self.is_palindrome(s[1:-1])

    def count_occurrences(self, lst, target):
        if not lst:
            return 0
        elif lst[0] == target:
            return 1 + self.count_occurrences(lst[1:], target)
        else:
            return self.count_occurrences(lst[1:], target)

    def flatten_list(self, nested_lst):
        if not nested_lst:
            return []
        first, *rest = nested_lst
        if isinstance(first, list):
            return self.flatten_list(first) + self.flatten_list(rest)
        else:
            return [first] + self.flatten_list(rest)

    def binary_search(self, lst, target, low, high):
        if low > high:
            return -1
        mid = (low + high) // 2
        if lst[mid] == target:
            return mid
        elif lst[mid] < target:
            return self.binary_search(lst, target, mid + 1, high)
        else:
            return self.binary_search(lst, target, low, mid - 1)

    def merge_sort(self, lst):
        if len(lst) <= 1:
            return lst
        mid = len(lst) // 2
        left_half = self.merge_sort(lst[:mid])
        right_half = self.merge_sort(lst[mid:])
        return self.merge(left_half, right_half)

    def merge(self, left, right):
        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] < right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        result.extend(left[i:])
        result.extend(right[j:])
        return result


rec = recsursion()
print(rec.factorial(5))            # Output: 120
print(rec.fibonacci(6))            # Output: 8
print(rec.gcd(48, 18))             # Output: 6
print(rec.power(2, 3))             # Output: 8
print(rec.reverse_string("hello"))  # Output: "olleh"
print(rec.sum_of_digits(1234))     # Output: 10
print(rec.is_palindrome("racecar"))  # Output: True
print(rec.count_occurrences([1, 2, 3, 2, 4, 2], 2))  # Output: 3
