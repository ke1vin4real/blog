import React, { useState, useRef, SyntheticEvent, useEffect } from 'react';

interface Props {
  defaultValue?: string,
  onChange: (item: string) => void,
  options: Array<{
    key: string,
    icon: string,
  }>,
}

const ThemeSelection = ({onChange, defaultValue, options }: Props) => {
  const [ current, setCurrent ] = useState(options.findIndex((item) => item.key === defaultValue));
  const [ showOptions, setShowOptions ] = useState(false);
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

  function handleBodyClick (e: MouseEvent) {
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
          
          li {
            height: 1.5rem;
            display: flex;
            align-items: center;
            line-height: 0.875rem;
            padding-left: 0.4rem;
            
            &:hover {
              background-color: var(--selection-item-hover-background-color);
            }
            
            &:active {
              background-color: var(--selection-item-hover-background-color);
            }
          }
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
        <a className="icon" dangerouslySetInnerHTML={{ __html: current !== undefined ? options?.[current]?.icon : '' }} />
        <span className="theme-name">{current !== undefined ? options?.[current]?.key : ''}</span>
      </div>
      {
        showOptions && (
          <ul className="options" ref={optionsRef}>
            {
              options.map(({ key, icon }, index) => {
                return (
                  <li key={key} onClick={() => handleClickItem(index)}>
                    <a className="icon" dangerouslySetInnerHTML={{ __html: icon }} />
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

ThemeSelection.defaultProps = {
  defaultValue: 0
};

export default ThemeSelection;
