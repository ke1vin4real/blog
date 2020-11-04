import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import IconGithub from '../../svgs/github.svg';
import IconMail from '../../svgs/mail.svg';
import * as config from '../../utils/constant';
import { THEME_DARK, THEME_LIGHT, THEME_LIST, THEME_SYSTEM } from '../../utils/constant';
import ThemeSelection from "../ThemeSelection";
import { detectSystemTheme } from "../../utils/func";

const ThemeContext = React.createContext(THEME_LIGHT);

interface Props {
  children: React.ReactNode,
}

const Layout: React.FC<Props> = ({ children }) => {
  const [ theme, setTheme ] = React.useState<string>(THEME_LIGHT);
  const [ localTheme, setLocalTheme ] = React.useState<string | null>(null);
  const [ isClientThemeLoaded, setLoaded ] = useState<boolean>(false); // is theme in localStorage loaded
  const [ themeOptions, setThemeOptions ] = useState<Array<any>>([...THEME_LIST]);

  function onThemeChange (nextTheme: string) {
    let nextColorMode = null;
    if (theme === THEME_SYSTEM && nextTheme !== THEME_SYSTEM) {
      nextColorMode = nextTheme;
      removeMediaQueryEvent();

    } else if (theme !== THEME_SYSTEM && nextTheme === THEME_SYSTEM) {
      const systemTheme = detectSystemTheme();
      nextColorMode = systemTheme ? systemTheme : THEME_LIGHT;
      addMediaQueryEvent();

    } else {
      nextColorMode = nextTheme;
    }

    setTheme(nextTheme);

    try {
      window.localStorage.setItem('ke1vin-blog-theme', nextTheme);
      if (nextColorMode === THEME_DARK) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    } catch (e) {
      console.error(e);
    }
  }

  function onSystemThemeChange (e: MediaQueryListEvent) {
    const nextColorMode = e.matches ? THEME_DARK : THEME_LIGHT;

    if (nextColorMode === THEME_DARK) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
  }

  function addMediaQueryEvent () {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onSystemThemeChange);
  }

  function removeMediaQueryEvent () {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', onSystemThemeChange);
  }

  useEffect(() => {
    let currentSystemColorMode = null;

    try {
      currentSystemColorMode = detectSystemTheme(() => {
        setThemeOptions(THEME_LIST.filter(({ key }) => key !== 'system'));
      });
    } catch (e) {
      console.error(e);
    }

    try {
      const localTheme = window.__LOCAL_THEME__;
      if (localTheme !== undefined) {
        const isSystemColor = localTheme === THEME_SYSTEM;
        setLocalTheme(localTheme);
        setTheme(isSystemColor ? currentSystemColorMode !== null ? currentSystemColorMode : THEME_LIGHT : localTheme);

        if (isSystemColor) {
          addMediaQueryEvent();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }

    return removeMediaQueryEvent;
  }, []);

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
          background-color: var(--nav-background-color);
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
            color: var(--nav-color);
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
      {/* language=SCSS */}
      <style global jsx>{`
        :root {
          --body-color: #fff;
          --nav-background-color: rgba(255,255,255,0.8);
          --main-text-color: #000;
          --nav-color: #1a202c;
        }
        
        .dark-theme :root {
          --body-color: rgb(23, 25, 35);
          --nav-background-color: rgba(23, 25, 35, 0.8);
          --main-text-color: #fff;
          --nav-color: #fff;
        }
        
        body {
          background-color: var(--body-color);
        }
      `}
      </style>
      <nav>
        <div className="nav-container">
          {
            isClientThemeLoaded && <ThemeSelection options={themeOptions} defaultValue={localTheme ? localTheme : theme} onChange={onThemeChange} />
          }
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
