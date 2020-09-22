import Layout from '../components/Layout';
import React from 'react';
import { NextSeo } from 'next-seo';
import { HOST } from '../utils/constant';

export default function About() {
  return (
    <Layout>
      <NextSeo
        title="About Me - Kelvin's world"
        canonical={`https://${HOST}/about`}
      />
      <h1>About Me</h1>
    </Layout>
  );
};
