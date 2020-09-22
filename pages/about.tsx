import Layout from '../components/Layout';
import React from 'react';
import {NextSeo} from "next-seo";

export default function About() {
  return (
    <Layout>
      <NextSeo
        title="About Me - Kelvin's world"
        canonical={`https://${process.env.NEXT_PUBLIC_HOST}/about`}
      />
      <h1>About Me</h1>
    </Layout>
  );
};
