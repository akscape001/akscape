---
title: "Understanding Binary Trees"
date: 2026-07-15
description: "A clear, ground-up explanation of binary trees — one of the most fundamental data structures in computer science."
featured: true
tags: ["algorithms", "data-structures"]
---

A binary tree is one of the most fundamental data structures in computer science. Simple enough to explain in five minutes, yet rich enough to underpin databases, file systems, and compilers.

## What is a Binary Tree?

A binary tree is a hierarchical data structure where every node has **at most two children**: conventionally called the *left* child and the *right* child.

```
        (8)
       /   \
     (3)   (10)
     / \      \
   (1) (6)   (14)
       / \   /
     (4) (7)(13)
```

Every node contains:
- A **value** (sometimes called the key)
- A reference to the **left subtree** (may be empty)
- A reference to the **right subtree** (may be empty)

## Implementing a Binary Tree in Python

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left  = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if self.root is None:
            self.root = Node(value)
        else:
            self._insert(self.root, value)

    def _insert(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = Node(value)
            else:
                self._insert(node.left, value)
        else:
            if node.right is None:
                node.right = Node(value)
            else:
                self._insert(node.right, value)
```

## Traversal Orders

There are three classical ways to visit every node in a binary tree:

### In-order (Left → Root → Right)

Produces values in *sorted ascending order* for a binary search tree.

```python
def inorder(node):
    if node:
        inorder(node.left)
        print(node.value)
        inorder(node.right)
```

### Pre-order (Root → Left → Right)

Useful for copying or serialising a tree.

### Post-order (Left → Right → Root)

Useful for deleting a tree or evaluating expression trees.

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search    | O(log n)| O(n)       |
| Insert    | O(log n)| O(n)       |
| Delete    | O(log n)| O(n)       |

The worst case O(n) occurs when the tree degenerates into a linked list — for example, inserting values in sorted order into an unbalanced tree.

## Why It Matters

Binary trees are not merely an academic exercise. They underpin:

- **Databases** — B-trees and B+-trees (generalised binary trees) are the storage engine of virtually every SQL database
- **Compilers** — Abstract syntax trees (ASTs) are trees that represent program structure
- **File systems** — Directory structures are trees

Understanding binary trees is the first step towards understanding balanced trees (AVL trees, Red-Black trees), heaps, tries, and the broader zoo of tree-based data structures.
