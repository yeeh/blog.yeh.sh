import { getAllTags, getPosts, site } from '../lib/content.js';

export function GET() {
  const now = new Date().toISOString();
  const staticUrls = [
    ['', 'daily', '1.0'],
    ['/about/', 'daily', '0.2'],
    ['/about/link.html', 'daily', '1.0'],
    ['/about/log.html', 'daily', '1.0'],
    ['/about/privacy.html', 'daily', '1.0'],
    ['/tags/', 'weekly', '0.5'],
  ];
  const staticXml = staticUrls.map(([url, freq, priority]) => `	<url>
		<loc>${site.url}${url}</loc>
		<lastmod>${now}</lastmod>
		<changefreq>${freq}</changefreq>
		<priority>${priority}</priority>
	</url>`).join('\n');
  const postXml = getPosts().map((post) => `	<url>
		<loc>${site.url}${post.url}</loc>
		<lastmod>${post.dateXml}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.2</priority>
	</url>`).join('\n');
  const tagXml = getAllTags().map((tag) => `	<url>
		<loc>${site.url}${tag.url}</loc>
		<lastmod>${now}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.3</priority>
	</url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${site.url}/sitemap.xsl"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${postXml}
${tagXml}
</urlset>
`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
