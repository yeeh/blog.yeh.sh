# blog.yeh.sh

Source for <https://blog.yeh.sh/>.

This repository contains a Jekyll blog published with GitHub Pages.

## Structure

- `_config.yml` — site configuration
- `_layouts/` — page layouts
- `_includes/` — reusable partials
- `_posts/` — blog posts
- `about/` — standalone pages
- `assets/` — static assets
- `upload/` — historical post images
- `CNAME` — custom domain for GitHub Pages

## Local development

### Prerequisites

- Ruby 3.1+
- Bundler

A `.ruby-version` file is included for local version managers.

### Install dependencies

```bash
bundle install
```

### Run locally

```bash
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000/>.

### Build locally

```bash
bundle exec jekyll build
```

Generated output goes to `_site/`.

## Deployment

The site is configured to deploy to GitHub Pages with GitHub Actions from the `gh-pages` branch.

Workflow file:

- `.github/workflows/pages.yml`

## Notes

- Pagination is enabled with `jekyll-paginate`.
- The custom domain is `blog.yeh.sh`.
- Comments are embedded via giscus in the site templates.
