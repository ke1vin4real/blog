import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

function MDXImage(props: ImageProps) {
  return <Image {...props} alt={props.alt} />
}
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Image: MDXImage,
    ...components,
  }
}