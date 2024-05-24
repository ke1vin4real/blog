'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import IconGithub from '../../svgs/github.svg';
import IconMail from '../../svgs/mail.svg';
import * as config from '../../utils/constant';
import { THEME_LIST, THEME_SYSTEM } from '../../utils/theme';
import ThemeSelection from "../ThemeSelection";
import { detectSystemTheme } from "../../utils/func";
import { THEME } from '../../utils/theme';

export const ThemeContext = React.createContext<THEME>(THEME.LIGHT);

interface Props {
  children: React.ReactNode,
}

const Layout: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = React.useState<THEME>(THEME.LIGHT);
  const [localTheme, setLocalTheme] = React.useState<string | null>(null);
  const [isClientThemeLoaded, setLoaded] = useState<boolean>(false); // is theme in localStorage loaded
  const [themeOptions, setThemeOptions] = useState<Array<any>>([...THEME_LIST]);

  function onThemeChange(nextTheme: THEME | typeof THEME_SYSTEM) {
    let nextColorMode: THEME = THEME.LIGHT;

    if (nextTheme !== THEME_SYSTEM) {
      nextColorMode = nextTheme;
      removeMediaQueryEvent();

    } else {
      const systemTheme = detectSystemTheme();
      nextColorMode = systemTheme !== null ? systemTheme : THEME.LIGHT;
      addMediaQueryEvent();

    }

    setTheme(nextColorMode);

    try {
      window.localStorage.setItem('ke1vin-blog-theme', nextTheme);
      if (nextColorMode === THEME.DARK) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    } catch (e) {
      console.error(e);
    }
  }

  function onSystemThemeChange(e: MediaQueryListEvent) {
    const nextColorMode = e.matches ? THEME.DARK : THEME.LIGHT;

    if (nextColorMode === THEME.DARK) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    setTheme(e.matches ? THEME.DARK : THEME.LIGHT);
  }

  function addMediaQueryEvent() {
    const mediaQueryList: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    if ('addEventListener' in mediaQueryList) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onSystemThemeChange);
    } else if ('addListener' in mediaQueryList) {
      window.matchMedia('(prefers-color-scheme: dark)').addListener(onSystemThemeChange);
    }
  }

  function removeMediaQueryEvent() {
    const mediaQueryList: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    if ('removeEventListener' in mediaQueryList) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', onSystemThemeChange);
    } else if ('removeListener' in mediaQueryList) {
      window.matchMedia('(prefers-color-scheme: dark)').removeListener(onSystemThemeChange);
    }
  }

  useEffect(() => {
    let currentSystemColorMode: THEME | null = null;

    // read current system color mode(light or dark) and initialize options of ThemeSelection(reomve `SYSTEM` option when fail to read system color mode)
    try {
      currentSystemColorMode = detectSystemTheme(() => {
        setThemeOptions(THEME_LIST.filter(({ key }) => key !== 'system'));
      });
    } catch (e) {
      console.error(e);
    }

    // read theme in window.__LOCAL_THEME__, which got in app/layout.tsx
    try {
      const preloadLocalTheme = window.__LOCAL_THEME__;

      if (preloadLocalTheme) {
        const themeSystemSetted = preloadLocalTheme === THEME_SYSTEM;
        const themeDarkSetted = preloadLocalTheme === THEME.DARK;
        const themeLightSetted = preloadLocalTheme === THEME.LIGHT;

        if (themeDarkSetted || themeLightSetted) {
          setTheme(preloadLocalTheme);
        }

        if (themeSystemSetted) {
          setTheme(currentSystemColorMode !== null ? currentSystemColorMode : THEME.LIGHT);

          addMediaQueryEvent();
        }

        setLocalTheme(preloadLocalTheme);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }

    return removeMediaQueryEvent;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          user-select: none;
        }

        .nav-container ul {
          margin-left: auto;
        }

        .nav-container li {
          display: inline-block;
        }

        .nav-container .links li + li {
          margin-left: 20px;
        }

        .nav-container a {
          color: var(--nav-color);
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
          color: var(--main-text-color);
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
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        @media (max-width: 767px) {
          .app-container {
            /* mobile viewport bug fix */
            min-height: -webkit-fill-available;
          }
        }
      `}
      </style>
      {/* language=SCSS */}
      <style global jsx>{`
        .dark-theme {
          .hljs {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
            color: #abb2bf;
            background: #282c34;
          }

          .hljs-comment,
          .hljs-quote {
            color: #5c6370;
            font-style: italic;
          }

          .hljs-doctag,
          .hljs-keyword,
          .hljs-formula {
            color: #c678dd;
          }

          .hljs-section,
          .hljs-name,
          .hljs-selector-tag,
          .hljs-deletion,
          .hljs-subst {
            color: #e06c75;
          }

          .hljs-literal {
            color: #56b6c2;
          }

          .hljs-string,
          .hljs-regexp,
          .hljs-addition,
          .hljs-attribute,
          .hljs-meta-string {
            color: #98c379;
          }

          .hljs-built_in,
          .hljs-class .hljs-title {
            color: #e6c07b;
          }

          .hljs-attr,
          .hljs-variable,
          .hljs-template-variable,
          .hljs-type,
          .hljs-selector-class,
          .hljs-selector-attr,
          .hljs-selector-pseudo,
          .hljs-number {
            color: #d19a66;
          }

          .hljs-symbol,
          .hljs-bullet,
          .hljs-link,
          .hljs-meta,
          .hljs-selector-id,
          .hljs-title {
            color: #61aeee;
          }

          .hljs-emphasis {
            font-style: italic;
          }

          .hljs-strong {
            font-weight: bold;
          }

          .hljs-link {
            text-decoration: underline;
          }
        }

        /*
        
        Atom One Light by Daniel Gamage
        Original One Light Syntax theme from https://github.com/atom/one-light-syntax
        
        base:    #fafafa
        mono-1:  #383a42
        mono-2:  #686b77
        mono-3:  #a0a1a7
        hue-1:   #0184bb
        hue-2:   #4078f2
        hue-3:   #a626a4
        hue-4:   #50a14f
        hue-5:   #e45649
        hue-5-2: #c91243
        hue-6:   #986801
        hue-6-2: #c18401
        
        */

        .hljs {
          display: block;
          overflow-x: auto;
          padding: 0.5em;
          color: #383a42;
          background: #fafafa;
        }

        .hljs-comment,
        .hljs-quote {
          color: #a0a1a7;
          font-style: italic;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
          color: #a626a4;
        }

        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
          color: #e45649;
        }

        .hljs-literal {
          color: #0184bb;
        }

        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta-string {
          color: #50a14f;
        }

        .hljs-built_in,
        .hljs-class .hljs-title {
          color: #c18401;
        }

        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
          color: #986801;
        }

        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
          color: #4078f2;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: bold;
        }

        .hljs-link {
          text-decoration: underline;
        }
        body {
          background-color: var(--body-color);
        }
      `}
      </style>
      <div className='app-container'>
        <nav>
          <div className="nav-container">
            {
              isClientThemeLoaded && <ThemeSelection options={themeOptions} defaultValue={localTheme ? localTheme : theme} onChange={onThemeChange} />
            }
            <ul className="links">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
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
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;
