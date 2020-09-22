import Head from 'next/head';
import Layout from '../components/Layout';
import React from 'react';
import { NextSeo } from 'next-seo';
import { HOST } from '../utils/constant';

export default function Home() {
  return (
    <Layout>
      <NextSeo
        title="Kelvin's World"
        description="Kelvin's World"
        canonical={`https://${HOST}`}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home Page</h1>
    </Layout>
  );
}
