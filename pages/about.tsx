import Layout from '../components/Layout';
import React from 'react';
import {NextSeo} from "next-seo";

export default function About() {
  return (
    <Layout>
      <NextSeo
        title="About Me - Kelvin's world"
      />
      <h1>About Me</h1>
    </Layout>
  );
};
