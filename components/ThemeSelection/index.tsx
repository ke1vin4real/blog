import React, { useState, useRef, SyntheticEvent } from 'react';
import {setCookie} from "../../utils/func";

interface Props {
  defaultValue?: number,
  list: Array<{
    key: string,
    icon: string,
  }>,
  onChange: (item: number) => void,
}

const ThemeSelection = ({ list, onChange, defaultValue }: Props) => {
  const [ current, setCurrent ] = useState(defaultValue);
  const [ showOptions, setShowOptions ] = useState(false);
  const optionsRef = useRef<HTMLUListElement>(null);

  const handleClickItem = (itemIndex: number) => {
    setCurrent(itemIndex);
    onChange(itemIndex);
    setShowOptions(false);
    setCookie('theme', itemIndex.toString());
  };

  const toggleShowOptions = (e: SyntheticEvent) => {
    if (!optionsRef.current || !optionsRef.current?.contains(e.target as HTMLElement)) {
      setShowOptions(!showOptions);
    }
  };

  return (
    <div className="theme-selection" onClick={toggleShowOptions}>
      {/* language=SCSS */}
      <style jsx>{`
        .theme-selection {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 5rem;
          height: 2rem;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          user-select: none;
          color: #999;
          font-size: 0.75rem;
          outline: none;
          cursor: pointer;
        }
        .options {
          position: absolute;
          top: 100%;
          width: 5rem;
          border: 1px solid #eaeaea;
          border-radius: 5px;
          z-index: 2;
          background-color: #fff;
          
          li {
            height: 1.5rem;
            display: flex;
            align-items: center;
            line-height: 0.875rem;
            padding-left: 0.4rem;
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
        <a className="icon" dangerouslySetInnerHTML={{ __html: current !== undefined ? list?.[current]?.icon : '' }} />
        <span className="theme-name">{current !== undefined ? list?.[current]?.key : ''}</span>
      </div>
      {
        showOptions && (
          <ul className="options" ref={optionsRef}>
            {
              list.map(({ key, icon }, index) => {
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
