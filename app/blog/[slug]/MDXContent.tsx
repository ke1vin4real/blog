'use client'

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image, { ImageProps } from 'next/image'
import Giscus from '@giscus/react';
import { useContext } from 'react';
import { ThemeContext } from '../../../components/Layout';


interface FrontMatter {
  title: string,
  description: string,
  date: string,
  image: string,
  slug: string,
}


function MDXImage(props: ImageProps) {
  return <Image {...props} alt={props.alt} />
}

const components = {
  Image: MDXImage
};

export default function MDX({ source, frontMatter }: { source: MDXRemoteSerializeResult, frontMatter: FrontMatter }) {
  const { title, date } = frontMatter;
  const theme = useContext(ThemeContext);

  return (
    <>
      {/* language=SCSS */}
      <style jsx>{`
          .info {
            font-size: 0.875rem;
            color: #2D3748;
            display: flex;
            margin-bottom: 2rem;
          }
              
          .reading-time {
            font-size: 0.875rem;
            color: #718096;
            margin-left: auto;
          }  
              
          .post-date {
           color: var(--post-date-text-color);
          }
      `}
      </style>
      <article className="markdown-body">
        <h1>{title}</h1>
        <div className="info">
          <span className="post-date">{date}</span>
        </div>
        <MDXRemote {...source} components={components}></MDXRemote>
      </article>
      <Giscus
        repo="ke1vin4real/blog"
        repoId="MDEwOlJlcG9zaXRvcnkyNTg1NTM5MzM="
        category="Announcements"
        categoryId="DIC_kwDOD2k4Tc4Cfev-"
        mapping="og:title"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'LIGHT' ? 'light' : 'dark'}
        lang="zh-CN"
        loading="lazy"
      />
    </>
  );
}