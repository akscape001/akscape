---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true          # set to false to publish (drafts never deploy)
description: ""      # REQUIRED: 1–2 sentences; shown in Google results and share cards
tags: []             # e.g. ["python", "numpy"]; shown as #hashtags, links related posts
# series: [""]       # optional: group multi-part posts, e.g. ["Understanding NumPy"]
# image: "cover.png" # optional: custom share image (otherwise a title card is generated)
# math: true         # optional: enable KaTeX for $…$ math
---

<!--
Checklist before publishing:
- Title reads like a question or promise people would search for
- First paragraph answers the "why should I read this" in 2–3 sentences
- Use ## headings (they build the table of contents)
- Link to at least one older related post
- Images go in this folder next to index.md: ![alt text](figure.png)
-->
