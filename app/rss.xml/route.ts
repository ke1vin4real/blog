import { getAllPosts } from '../db/blog';
import { HOST } from '../../utils/constant';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://${HOST}/blog/${post.slug}</link>
      <guid>https://${HOST}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ke1vin's Blog</title>
    <link>https://${HOST}</link>
    <description>Technical articles by Ke1vin</description>
    <language>zh-CN</language>
    <atom:link href="https://${HOST}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
