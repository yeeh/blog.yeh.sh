import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';

export const site = {
  name: '叶子',
  tagline: '闲言碎语',
  author: 'Perry Yeh',
  url: 'https://blog.yeh.sh',
  urlyeh: 'https://yeh.sh',
  keywords: 'Perry Yeh',
  description: 'Whenever possible, find someone to save, and save them.',
  skin: 'spring',
  comments: 'yeh',
};

const root = process.cwd();
const md = new MarkdownIt({ html: true, linkify: false, typographer: false });

const linkContent = '<a target="_blank" title="聚友" href="http://www.juyo.org/">聚友</a>\n<a target="_blank" title="password generator" href="https://www.passid.org/">密码生成器</a>\n<a target="_blank" title="In乐" href="https://inyue.com/">In乐</a>\n';

function preprocess(content) {
  return content.replaceAll('{% include linkcontent.html %}', linkContent);
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (!m) return { data: {}, content: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#') || !line.includes(':')) continue;
    const idx = line.indexOf(':');
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^['"]|['"]$/g, '');
    if (key === 'tags' || key === 'categories') {
      data[key] = data[key] ? `${data[key]},${value}` : value;
    } else {
      data[key] = value;
    }
  }
  return { data, content: raw.slice(m[0].length) };
}

function slugFromFile(file) {
  return path.basename(file, '.md').replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '');
}

function parseDate(value) {
  if (value instanceof Date) return value;
  const s = String(value).trim();
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?(?:\s*([+-]\d{4}))?$/);
  if (!m) return new Date(s);
  const [, y, mo, d, h = '0', mi = '0', sec = '0', off] = m;
  let ms = Date.UTC(+y, +mo - 1, +d, +h, +mi, +sec);
  if (off) {
    const sign = off[0] === '+' ? 1 : -1;
    const offMin = sign * (+off.slice(1, 3) * 60 + +off.slice(3, 5));
    ms -= offMin * 60000;
  }
  return new Date(ms);
}

function utcParts(date) {
  return {
    year: String(date.getUTCFullYear()),
    month: String(date.getUTCMonth() + 1).padStart(2, '0'),
    day: String(date.getUTCDate()).padStart(2, '0'),
    hour: String(date.getUTCHours()).padStart(2, '0'),
    minute: String(date.getUTCMinutes()).padStart(2, '0'),
    second: String(date.getUTCSeconds()).padStart(2, '0'),
  };
}

export function dateXml(date) {
  const p = utcParts(date);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}+00:00`;
}

export function displayDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric'
  }).format(date);
}

function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String);
  const s = String(value).trim();
  if (!s) return [];
  return (s.includes(',') ? s.split(',') : s.split(/\s+/)).map(x => x.trim()).filter(Boolean);
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(s, n = 140) {
  return s.length > n ? `${s.slice(0, n)}...` : s;
}

function itemFromFile(file, kind) {
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = parseFrontmatter(raw);
  const data = parsed.data;
  const date = data.date ? parseDate(data.date) : null;
  const p = date ? utcParts(date) : null;
  const slug = slugFromFile(file);
  const content = preprocess(parsed.content);
  const html = md.render(content);
  const url = kind === 'post'
    ? `/post/${p.year}/${p.month}/${p.day}/${slug}.html`
    : `/about/${slug === 'index' ? '' : `${slug}.html`}`;
  return {
    kind,
    file,
    slug,
    title: data.title || slug,
    date,
    dateXml: date ? dateXml(date) : null,
    displayDate: date ? displayDate(date) : null,
    tags: normalizeList(data.tags),
    categories: normalizeList(data.categories),
    theme: data.theme,
    comment: data.comment === 'false' ? false : data.comment,
    url,
    html,
    rawContent: content,
    summary: truncate(stripHtml(html), 140),
  };
}

let postsCache;
export function getPosts() {
  if (!postsCache) {
    const dir = path.join(root, '_posts');
    postsCache = fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => itemFromFile(path.join(dir, f), 'post'))
      .sort((a, b) => b.date - a.date);
    postsCache.forEach((post, i) => {
      post.next = postsCache[i - 1] || null;
      post.previous = postsCache[i + 1] || null;
    });
  }
  return postsCache;
}

export function getAboutPage(slug) {
  const file = path.join(root, 'about', `${slug}.md`);
  return itemFromFile(file, 'about');
}

export function paginate(posts, page, perPage = 10) {
  const totalPages = Math.ceil(posts.length / perPage);
  const start = (page - 1) * perPage;
  return {
    page,
    perPage,
    totalPages,
    posts: posts.slice(start, start + perPage),
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    previousPagePath: page - 1 === 1 ? '/' : `/page/${page - 1}/`,
    nextPagePath: `/page/${page + 1}/`,
  };
}

export function tagSlug(tag) {
  return encodeURIComponent(String(tag));
}

export function tagUrl(tag) {
  return `/tags/${tagSlug(tag)}/`;
}

export function getAllTags() {
  const map = new Map();
  for (const post of getPosts()) {
    for (const tag of post.tags) {
      const item = map.get(tag) || { name: tag, slug: tagSlug(tag), url: tagUrl(tag), count: 0, posts: [] };
      item.count += 1;
      item.posts.push(post);
      map.set(tag, item);
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    b.count - a.count || a.name.localeCompare(b.name, 'zh-Hans-CN')
  );
}

export function getTagBySlug(slug) {
  const decoded = decodeURIComponent(String(slug));
  return getAllTags().find((tag) => tag.name === decoded || tag.slug === slug) || null;
}

export function getPostsByTag(tagName) {
  return getPosts().filter((post) => post.tags.includes(tagName));
}

export function cdata(s) {
  return String(s).replaceAll(']]>', ']]]]><![CDATA[>');
}
