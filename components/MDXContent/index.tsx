'use client'

interface Props {
  title: string;
  date: string;
  children: React.ReactNode;
}

export default function MDXContent({ title, date, children }: Props) {
  return (
    <>
      {/* language=SCSS */}
      <style global jsx>{`
        .dark-theme {
          .hljs {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
            color: #abb2bf;
            background: #282c34;
          }

          .hljs-comment,
          .hljs-quote {
            color: #5c6370;
            font-style: italic;
          }

          .hljs-doctag,
          .hljs-keyword,
          .hljs-formula {
            color: #c678dd;
          }

          .hljs-section,
          .hljs-name,
          .hljs-selector-tag,
          .hljs-deletion,
          .hljs-subst {
            color: #e06c75;
          }

          .hljs-literal {
            color: #56b6c2;
          }

          .hljs-string,
          .hljs-regexp,
          .hljs-addition,
          .hljs-attribute,
          .hljs-meta-string {
            color: #98c379;
          }

          .hljs-built_in,
          .hljs-class .hljs-title {
            color: #e6c07b;
          }

          .hljs-attr,
          .hljs-variable,
          .hljs-template-variable,
          .hljs-type,
          .hljs-selector-class,
          .hljs-selector-attr,
          .hljs-selector-pseudo,
          .hljs-number {
            color: #d19a66;
          }

          .hljs-symbol,
          .hljs-bullet,
          .hljs-link,
          .hljs-meta,
          .hljs-selector-id,
          .hljs-title {
            color: #61aeee;
          }

          .hljs-emphasis {
            font-style: italic;
          }

          .hljs-strong {
            font-weight: bold;
          }

          .hljs-link {
            text-decoration: underline;
          }
        }

        /*
        
        Atom One Light by Daniel Gamage
        Original One Light Syntax theme from https://github.com/atom/one-light-syntax
        
        base:    #fafafa
        mono-1:  #383a42
        mono-2:  #686b77
        mono-3:  #a0a1a7
        hue-1:   #0184bb
        hue-2:   #4078f2
        hue-3:   #a626a4
        hue-4:   #50a14f
        hue-5:   #e45649
        hue-5-2: #c91243
        hue-6:   #986801
        hue-6-2: #c18401
        
        */

        .hljs {
          display: block;
          overflow-x: auto;
          padding: 0.5em;
          color: #383a42;
          background: #fafafa;
        }

        .hljs-comment,
        .hljs-quote {
          color: #a0a1a7;
          font-style: italic;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
          color: #a626a4;
        }

        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
          color: #e45649;
        }

        .hljs-literal {
          color: #0184bb;
        }

        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta-string {
          color: #50a14f;
        }

        .hljs-built_in,
        .hljs-class .hljs-title {
          color: #c18401;
        }

        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
          color: #986801;
        }

        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
          color: #4078f2;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: bold;
        }

        .hljs-link {
          text-decoration: underline;
        }
      `}
      </style>
      <style jsx>{`
        .info {
          font-size: 0.875rem;
          color: #2D3746;
          display: flex;
          margin-bottom: 2rem;
        }
        .post-date {
          color: 'var(--post-date-text-color)';
        }
      `}</style>
      <article className="markdown-body">
        <h1>{title}</h1>
        <div className="info">
          <span className="post-date">{date}</span>
        </div>
        {children}
      </article>
    </>
  );
}