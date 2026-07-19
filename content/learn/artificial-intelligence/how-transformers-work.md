---
title: "How Transformers Work"
date: 2026-07-18
description: "The architecture behind every modern large language model, explained from first principles — attention, positional encoding, and why it all works."
tags: ["transformers", "attention", "deep-learning"]
math: true
---

The transformer architecture, introduced in the 2017 paper *Attention Is All You Need*, is the foundation of every large language model in existence today — GPT, Claude, Gemini, Llama. Understanding it is no longer optional for anyone working in AI.

## The Core Idea: Attention

The fundamental innovation of the transformer is the **self-attention mechanism**. Before transformers, sequence models (RNNs, LSTMs) processed tokens sequentially — reading left to right, maintaining a fixed-size hidden state. This created a bottleneck: information from early tokens had to survive through many intermediate steps to influence the model's output.

Attention solves this by allowing every token to directly attend to every other token in the sequence, in parallel.

## The Attention Mechanism

For a sequence of $n$ tokens, we compute three matrices:

- $Q$ — Queries matrix
- $K$ — Keys matrix  
- $V$ — Values matrix

Each is computed by projecting the input embeddings through learned weight matrices $W^Q$, $W^K$, $W^V$.

The attention output is:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

where $d_k$ is the dimension of the key vectors. The $\sqrt{d_k}$ scaling prevents the dot products from becoming too large in high dimensions, which would push the softmax into regions with very small gradients.

## Multi-Head Attention

Rather than computing a single attention function, transformers use **multi-head attention**: running $h$ attention functions in parallel, then concatenating and projecting:

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O$$

Each head can attend to different relationships — one head might track syntactic structure, another semantic similarity.

## Implementation in PyTorch

```python
import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.d_k = d_model // n_heads
        self.n_heads = n_heads
        self.qkv = nn.Linear(d_model, 3 * d_model, bias=False)
        self.proj = nn.Linear(d_model, d_model, bias=False)

    def forward(self, x):
        B, T, C = x.shape
        q, k, v = self.qkv(x).split(C, dim=2)

        # Reshape for multi-head
        q = q.view(B, T, self.n_heads, self.d_k).transpose(1, 2)
        k = k.view(B, T, self.n_heads, self.d_k).transpose(1, 2)
        v = v.view(B, T, self.n_heads, self.d_k).transpose(1, 2)

        # Scaled dot-product attention
        scale = math.sqrt(self.d_k)
        attn = (q @ k.transpose(-2, -1)) / scale
        attn = attn.softmax(dim=-1)

        out = attn @ v
        out = out.transpose(1, 2).contiguous().view(B, T, C)
        return self.proj(out)
```

## Positional Encoding

Since attention is permutation-invariant (it doesn't care about order), we need to inject positional information. The original paper used fixed sinusoidal encodings:

$$PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$
$$PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)$$

Modern models use learned positional embeddings or relative position encodings (RoPE, ALiBi).

## Why It Works

The transformer's success comes from several properties working together:

1. **Parallelism** — unlike RNNs, attention over all positions is a single matrix operation
2. **Direct connections** — any token can attend to any other, regardless of distance
3. **Scalability** — the architecture scales gracefully with data, parameters, and compute

The simplicity of the core idea — weighted combination of values, where weights are determined by query-key similarity — belies the extraordinary complexity of what emerges when you train these models at scale.
