import React from "react";
import Link from "next/link";

interface Props {
  children: React.ReactNode,
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      {/* language=SCSS */}
      <style jsx>{`
          nav {
            display: flex;
            max-width: 700px;
            align-items: center;
            height: 40px;
            padding: 2rem;
            margin: 0 auto;
            position: sticky;
            top: 0;
            background-color: rgba(255,255,255,0.8);
            backdrop-filter: saturate(180%) blur(20px);
            
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
          
          main {
            padding: 0 2rem;
          }
        `}
      </style>
      <nav>
        <ul>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
