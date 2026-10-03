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
