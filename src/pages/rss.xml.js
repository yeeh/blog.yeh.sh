import { getPosts, site, cdata } from '../lib/content.js';

export function GET() {
  const updated = new Date().toISOString();
  const entries = getPosts().map((post) => `  <entry>
    <id>${site.url}${post.url}</id>
    <title><![CDATA[${cdata(post.title)}]]></title>
    <updated>${post.dateXml}</updated>
    <link href="${site.url}${post.url}" />
    <content type="html"><![CDATA[${cdata(post.html)}]]></content>
  </entry>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${site.url}</id>
  <title><![CDATA[${cdata(site.name)}]]></title>
  <updated>${updated}</updated>
  <author>
    <name><![CDATA[${cdata(site.author)}]]></name>
  </author>
  <link href="${site.url}/rss.xml" rel="self" />
${entries}
</feed>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
