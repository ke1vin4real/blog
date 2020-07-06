import React from 'react';
import Link from 'next/link';

interface Props {
  frontMatter: {
    title: string,
  },
}

export default function Layout({ frontMatter: { title } }: Props) {
  return (
    <div>
      {/* language=SCSS */}
      <style jsx>{`
          nav {
            max-width: 900px;
            font-size: 16px;
            display: flex;
            align-items: center;
            height: 40px;
            padding: 32px;
            margin: 0 auto;
            
            ul {
              margin-left: auto;
            }
            
            li {
              display: inline-block;
            }
            
            li + li {
              margin-left: 20px;
            }
            
            a {
              color: #1a202c;
            }
          }
        `}
      </style>
      <nav>
        <ul>
          <li>
            <Link href="/Blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/About">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/Home">
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1>{title}</h1>
      </main>
    </div>
  );
}