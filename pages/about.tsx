import Layout from '../components/Layout';
import React from 'react';
import { NextSeo } from 'next-seo';
import { HOST } from '../utils/constant';

export default function About() {
  const title = 'About Me - Kelvin';
  const url = `https://${HOST}/about`;
  return (
    <Layout>
      <NextSeo
        title="About Me - Kelvin"
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      <h1>About Me</h1>
    </Layout>
  );
};
