# akscape

Personal site at [www.akscape.com](https://www.akscape.com), built with Hugo and deployed to GitHub Pages on every push to `main`.

## Writing a post

```sh
hugo new content/learn/computer-science/my-post-slug/index.md
```

Pick the section folder that fits (`learn/…`, `reviews/movies/…`, `reflect/…`). The new file starts as a draft with the fields search engines need; fill in `description` and `tags`, write, then set `draft: false` to publish.

Preview locally (drafts included):

```sh
npm run dev        # http://localhost:1313
npm run build      # production build + search index, as CI does
```

Sections appear in the nav automatically once they have a published post.

Multi-part posts: give each part the same `series: ["Name"]` and they link to each other.

## Growing the site

The layout adapts on its own as posts accumulate (thresholds live under `[params.listing]` in `hugo.toml`):

- **Nav stays shallow**: Explore / Reviews & Takes / Reflect, each with its subsections. Volume is handled inside pages, never with deeper menus.
- **Start here**: mark your 3–5 best posts per section `featured: true` (order with `weight`). They show at the top of the home page and section pages once those lists are long enough.
- **Topics**: 2–4 tags per post from a small fixed vocabulary (lowercase, hyphenated, e.g. `python`, `machine-learning`). Topics with 2+ posts become filter chips on section pages and the archive. To give a topic page an intro, add `content/tags/<tag>/_index.md` with a `description`.
- **Series**: multi-part posts share `series: ["Name"]`.
- **Archive**: `/archive/` lists everything by year; the home page shows the latest posts and links to it.
- **New subsections**: only split one off past ~50 posts in a clearly distinct area.
- **Never move or rename a published post.** If you must, add `aliases: ["/old/url/"]` to its front matter so old links keep working.
