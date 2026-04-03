'use client'

import { useState, useRef, useEffect } from 'react'

interface Props extends React.HTMLAttributes<HTMLPreElement> {
  language: string
  children: React.ReactNode
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function CodeBlock({ language, children, ...props }: Props) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  async function handleCopy() {
    if (copied) return
    try {
      const codeText = preRef.current ? preRef.current?.textContent : '';
      await navigator.clipboard.writeText(codeText)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-language">{language}</span>
        <button
          className="code-block-copy-btn"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <pre ref={preRef} {...props}>{children}</pre>
      <style jsx>{`
        .code-block-wrapper {
          margin: 1em 0;
          border-radius: 6px;
          overflow: hidden;
        }
        .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          height: 36px;
          background-color: var(--code-header-background-color);
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
          user-select: none;
        }
        .code-block-language {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.75rem;
          color: var(--code-header-text-color);
          letter-spacing: 0.02em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .code-block-copy-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 26px;
          padding: 0;
          border: 1px solid var(--selection-border-color);
          border-radius: 4px;
          background-color: transparent;
          color: var(--code-header-text-color);
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
          flex-shrink: 0;
        }
        .code-block-copy-btn:hover {
          background-color: var(--code-header-button-hover-background-color);
        }
        .code-block-copy-btn:active {
          opacity: 0.7;
        }
        .code-block-wrapper :global(pre) {
          margin: 0 !important;
          border-radius: 0 0 6px 6px !important;
        }
      `}</style>
    </div>
  )
}
