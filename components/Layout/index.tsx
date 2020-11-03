import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import IconGithub from '../../svgs/github.svg';
import IconMail from '../../svgs/mail.svg';
import * as config from '../../utils/constant';
import { THEME_DARK, THEME_LIGHT, THEME_LIST, THEME_SYSTEM } from '../../utils/constant';
import ThemeSelection from "../ThemeSelection";
import { detectSystemTheme } from "../../utils/func";
import themeColors from '../../utils/theme';

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
    if (theme === THEME_SYSTEM && nextTheme !== THEME_SYSTEM) {
      setTheme(nextTheme);
      removeMediaQueryEvent();
    } else if (theme !== THEME_SYSTEM && nextTheme === THEME_SYSTEM) {
      const systemTheme = detectSystemTheme()
      setTheme(systemTheme ? systemTheme : THEME_LIGHT);
      addMediaQueryEvent();
    } else {
      setTheme(nextTheme);
    }

    try {
      window.localStorage.setItem('ke1vin-blog-theme', nextTheme);
    } catch (e) {
      console.error(e);
    }
  }

  function onSystemThemeChange (e: MediaQueryListEvent) {
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
      const localTheme = window.localStorage.getItem('ke1vin-blog-theme');
      if (localTheme !== null) {
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

  if (typeof window !== 'undefined' && !isClientThemeLoaded) {
    return null;
  }

  console.log(theme);

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
      {/* language=SCSS */}
      <style global jsx>{`
        body {
          background-color: ${themeColors.body[theme]};
        }
      `}
      </style>
      <nav>
        <div className="nav-container">
          <ThemeSelection options={themeOptions} defaultValue={localTheme ? localTheme : theme} onChange={onThemeChange} />
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
