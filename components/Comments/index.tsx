'use client'

import Giscus from '@giscus/react';
import { useContext } from 'react';
import { ThemeContext } from '..//Layout';

export default function Comments() {
  const theme = useContext(ThemeContext);
  return (
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
  );
}