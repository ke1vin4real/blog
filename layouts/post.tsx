import React from 'react';
import Layout from '../components/Layout';
import {convertDateFormat} from "../utils/func";

interface frontMatterProps {
  title: string,
  readingTime: number,
  date: Date
}

interface Props {
  children: React.ReactNode,
}

export default function Post({ title, date }: frontMatterProps) {
  return ({ children: content }: Props) => {
    return (
      <Layout>
        {/* language=SCSS */}
        <style jsx>{`
          article {
            max-width: 700px;
            margin: 0 auto;
          }
        `}
        </style>
        <article className="markdown-body">
          <h1>{title}</h1>
          <div>
            <span>{convertDateFormat(date)}</span>
          </div>
          <div>{content}</div>
        </article>
      </Layout>
    );
  };
}
