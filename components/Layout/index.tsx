import React from 'react';
import Link from 'next/link';
import IconGithub from '../../svgs/github.svg';
import IconMail from '../../svgs/mail.svg';
import * as config from '../../utils/constant';
import { THEME_LIGHT, THEME_LIST } from '../../utils/constant';
import ThemeSelection from "../ThemeSelection";

const ThemeContext = React.createContext(THEME_LIGHT);

interface Props {
  children: React.ReactNode,
  themeSetting: number | null,
}

const Layout = ({ children, themeSetting }: Props) => {
  const [ theme, setTheme ] = React.useState(themeSetting !== null ? THEME_LIST[themeSetting].key: THEME_LIGHT);

  const onThemeChange = (themeIndex: number) => {
    const theme = THEME_LIST[themeIndex].key;
    setTheme(theme);

    try {
      window.localStorage.setItem('theme', theme);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {/* language=SCSS */}
      <style jsx>{`
        nav, main, footer {
          width: 100%;
          margin: 0 auto;
        }
        nav {
          position: sticky;
          top: 0;
          background-color: rgba(255,255,255,0.8);
          backdrop-filter: saturate(180%) blur(20px);
          height: 80px;
        }
        .nav-container {
          display: flex;
          align-items: center;
          line-height: 1rem;
          padding: 0 2rem;
          height: 100%;
            
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
          .nav-container {
            margin: 0 auto;
            padding: 0;
          }
          .nav-container, main, footer {
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
        <div className="nav-container">
          <ThemeSelection defaultValue={themeSetting !== null ? themeSetting : 0} list={THEME_LIST} onChange={onThemeChange} />
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
        </div>
      </nav>
      <main>{children}</main>
      <footer>
        <div className="icons">
          <a href={config.GITHUB_HOMEPAGE} className="icon" dangerouslySetInnerHTML={{ __html: IconGithub }} />
          <a href={`mailto:${config.MAIL}`} className="icon" dangerouslySetInnerHTML={{ __html: IconMail }} />
        </div>
        <div className="powered">Powered by Vercel</div>
      </footer>
    </ThemeContext.Provider>
  );
};

export default Layout;
