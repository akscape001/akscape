---
title: "Why Python Spoils Me as a Programmer"
date: 2026-10-03T23:38:01+05:30
draft: false
description: "Python makes the hard parts disappear. That's a gift, and sometimes a trap."
tags: ["python", "programming", "learning"]
---

Every time I write Python, I get a little lazier. Not in a bad way, mostly. But I've started to notice that Python does so much of the thinking for me that I sometimes skip the part where I actually learn something.

## Reversing a list

Say I want to reverse a list. In most languages, I'd have to think about it: two pointers, one at each end, swap, move inward, stop in the middle.

```python
left, right = 0, len(nums) - 1
while left < right:
    nums[left], nums[right] = nums[right], nums[left]
    left += 1
    right -= 1
```

In Python, I just write:

```python
nums[::-1]
```

Done. No loop, no indices, no off-by-one bugs.

## Counting vowels

Want to count the vowels in a sentence? No counter variable, no if-else chain:

```python
text = "Python spoils me"
sum(1 for ch in text.lower() if ch in "aeiou")   # 4
```

## Unique words, common items

Need the unique words in a piece of text? Throw it into a set:

```python
words = "the cat and the hat".split()
len(set(words))   # 4
```

Items common to two lists? One line:

```python
set([1, 2, 3, 4]) & set([3, 4, 5])   # {3, 4}
```

The most frequent word? `Counter(words).most_common(1)` and I'm done.

## So what's the problem?

The hard way is where the learning happens. Writing that two-pointer reverse teaches you how memory and indices work. Building a frequency counter by hand teaches you what a hash map actually does. Python hands me the answer before I've had a chance to understand the question.

And the shortcuts hide things worth knowing:

- `nums[::-1]` on a list **creates a brand-new copy**. That's O(n) time and memory, which matters when the list is huge. On a NumPy array, the same syntax is almost free, because NumPy just flips the strides and creates a *view*, the same trick behind [why NumPy transpose is almost instant](/learn/computer-science/why-numpy-transpose-is-almost-instant/).
- `set()` feels like magic until you realize it's a hash table. That's why checking `x in my_set` is fast, while `x in my_list` scans every element.
- `sorted()` doesn't just sort. It runs Timsort, an algorithm built to exploit the order that already exists in real-world data.

None of this shows up when everything just works.

## How I deal with it

I don't think the answer is to stop using Python's shortcuts. That would be like refusing to use a calculator. But every now and then, I try to do it the hard way first: write the loop, build the counter, reverse the list by hand. Then I use the one-liner, and appreciate what it's doing for me.

Python spoils me. I just try to make sure I know what I'm being spoiled with.

*What's the Python shortcut you can't live without? And do you actually know what it does under the hood?*
