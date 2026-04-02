'use client'

import { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../Layout'
import { THEME } from '../../utils/theme'

let _id = 0

interface Props {
  code: string
}

export default function MermaidDiagram({ code }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    if (!ref.current) return
    let cancelled = false

    async function render() {
      const { default: mermaid } = await import('mermaid')
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === THEME.DARK ? 'dark' : 'default',
      })
      const id = `mermaid-${++_id}`
      try {
        const { svg } = await mermaid.render(id, code)
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
        }
      } catch (e) {
        console.error('[MermaidDiagram] render failed:', e)
      }
    }

    render()
    return () => { cancelled = true }
  }, [code, theme])

  return <div ref={ref} className="mermaid-diagram" />
}
