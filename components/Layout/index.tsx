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
            max-width: 900px;
            display: flex;
            align-items: center;
            height: 40px;
            padding: 2rem;
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
          
          main {
            padding: 0 2rem;
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
      <main>{children}</main>
    </div>
  );
};

export default Layout;
