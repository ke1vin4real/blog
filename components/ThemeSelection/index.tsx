import React, { useState, useRef, SyntheticEvent, useEffect } from 'react';
import { THEME, THEME_SYSTEM } from '../../utils/theme';

interface Option {
  key: THEME | typeof THEME_SYSTEM,
  icon: string,
}

interface Props {
  defaultValue?: string,
  onChange: (item: THEME | typeof THEME_SYSTEM) => void,
  options: Array<Option>,
}

const ThemeSelection = ({ onChange, defaultValue, options }: Props) => {
  const [current, setCurrent] = useState<number>(options.findIndex((item) => item.key === defaultValue));
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLUListElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);

  const handleClickItem = (itemIndex: number) => {
    if (itemIndex !== current) {
      setCurrent(itemIndex);
      onChange(options?.[itemIndex]?.key);
    }

    setShowOptions(false);
  };

  const toggleShowOptions = (e: SyntheticEvent) => {
    if (!optionsRef.current || !optionsRef.current?.contains(e.target as HTMLElement)) {
      setShowOptions(!showOptions);
    }
  };

  function handleBodyClick(e: MouseEvent) {
    if (selectionRef.current && !selectionRef.current.contains(e.target as HTMLElement)) {
      setShowOptions(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    }
  }, []);

  return (
    <div ref={selectionRef} className="theme-selection" onClick={toggleShowOptions}>
      {/* language=SCSS */}
      <style jsx>{`
        .theme-selection {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 5rem;
          height: 2rem;
          border: 1px solid var(--selection-border-color);
          border-radius: 5px;
          user-select: none;
          color: #999;
          font-size: 0.75rem;
          outline: none;
          cursor: pointer;
          background-color: var(--body-color);
        }
        .options {
          position: absolute;
          top: 100%;
          width: 5rem;
          border: 1px solid var(--selection-border-color);
          border-radius: 5px;
          z-index: 2;
          background-color: inherit;
          overflow: hidden;
        }
        .options li {
          height: 1.5rem;
          display: flex;
          align-items: center;
          line-height: 0.875rem;
          padding-left: 0.4rem;
        }
        .options li:hover {
          background-color: var(--selection-item-hover-background-color);
        }
        .options li:active {
          background-color: var(--selection-item-hover-background-color);
        }
        .current {
          display: flex;
          align-items: center;
          padding-left: 0.4rem;
          width: 100%;
        }
        .icon {
          line-height: 0.875rem;
          height: 0.875rem;
          display: inline-block;
        }
        .icon :global(svg) {
          width: 0.875rem;
          height: 0.875rem;
          color: #888;
        }
        .theme-name {
          flex: 1;
          text-align: center;
        }
      `}
      </style>
      <div className="current">
        <span className="icon" dangerouslySetInnerHTML={{ __html: current !== undefined ? options?.[current]?.icon : '' }} />
        <span className="theme-name">{current !== undefined ? options?.[current]?.key : ''}</span>
      </div>
      {
        showOptions && (
          <ul className="options" ref={optionsRef}>
            {
              options.map(({ key, icon }, index) => {
                return (
                  <li key={key} onClick={() => handleClickItem(index)}>
                    <span className="icon" dangerouslySetInnerHTML={{ __html: icon }} />
                    <span className="theme-name">{key}</span>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  );
};

export default ThemeSelection;
