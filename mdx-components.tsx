import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import MermaidDiagram from './components/MermaidDiagram';

function MDXImage(props: ImageProps) {
  return <Image {...props} alt={props.alt} />
}

function MDXPre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const child = children as React.ReactElement<{ className?: string; children?: string }> | null
  const className = child?.props?.className ?? ''
  if (className.includes('language-mermaid') && typeof child?.props?.children === 'string') {
    return <MermaidDiagram code={child.props.children.trim()} />
  }
  return <pre {...props}>{children}</pre>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Image: MDXImage,
    pre: MDXPre,
    ...components,
  }
}
