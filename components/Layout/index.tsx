import React from 'react';
import Link from 'next/link';
import IconGithub from '../../svgs/github.svg';
import IconMail from '../../svgs/mail.svg';
import * as config from '../../utils/constant';

interface Props {
  children: React.ReactNode,
}

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* language=SCSS */}
      <style jsx>{`
        nav, main, footer {
          width: 100%;
          margin: 0 auto;
        }
        nav {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 2rem;
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
          color: #000;
          padding: 0 2rem;
        }  
        footer {
          margin-top: auto;
          padding: 4rem 0 1rem 0;
          text-align: center;
        }
        
        .icon {
          display: inline-block;
          width: 1.25rem;
          height: 1.25rem;
        }
        
        .icon + .icon {
          margin-left: 2rem;
        }
        
        .icons {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .powered {
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: #718096;
        }
        @media (min-width: 768px) {
          nav, main, footer {
            width: 700px;
            max-width: 700px;
          }
          
          main {
            padding: 0;
          }
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
      <footer>
        <div className="icons">
          <a href={config.GITHUB_HOMEPAGE} className="icon" dangerouslySetInnerHTML={{ __html: IconGithub }} />
          <a href={`mailto:${config.MAIL}`} className="icon" dangerouslySetInnerHTML={{ __html: IconMail }} />
        </div>
        <div className="powered">Powered by Vercel</div>
      </footer>
    </>
  );
};

export default Layout;
