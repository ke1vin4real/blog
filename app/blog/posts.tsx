'use client'

import Link from 'next/link';

interface FrontMatter {
  title: string,
  description: string,
  date: string,
  image: string,
  slug: string,
}

export default function BlogPage({ posts }: { posts: FrontMatter[] }) {
  return <>
    {/* language=SCSS */}
    <style jsx>{`
      .title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--main-text-color);
        }
        .title-line {
          display: flex;
          align-items: flex-start;
        }
        .section-title {
          margin-bottom: 1rem;
          color: var(--main-text-color);
        }
        .post {
          margin-bottom: 1rem;
        }

        .post-date {
          margin-left: auto;
          margin-bottom: 0.5rem;
          color: #718096;
          min-width: 6.25rem;
          text-align: right;
        }

        .post-desc {
          color: #718096;
          font-size: 0.9375rem;
        }
        
        @media (max-width: 767px) {
          .title-line {
            flex-direction: column;
          }
          .post-date {
            margin-left: 0;
            text-align: left;
            font-size: 0.875rem;
          }
        }
      `}
    </style>
    <div className="section-title"><h2>All Posts</h2></div>
    <ul>
      {
        posts.map((frontMatter: FrontMatter) => (
          <li key={frontMatter.title} className="post">
            <Link href={'/blog/' + frontMatter.slug}>
              <div className="title-line">
                <h3 className="title">{frontMatter.title}</h3>
                <span className="post-date">{frontMatter.date}</span>
              </div>
              <p className="post-desc">{frontMatter.description}</p>
            </Link>
          </li>
        ))
      }
    </ul>
  </>;
}