import Prism from 'prismjs';
import { useEffect } from 'react';
import 'prismjs/themes/prism-okaidia.css';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-cshtml';

export type CodeBlockProps = {
  code: string;
  language: string;
};

export function CodeBlock({ code, language }: Readonly<CodeBlockProps>) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="w-full p-4 !m-0 !rounded-none">
      <code className={`!text-sm text-wrap language-${language}`}>{code}</code>
    </pre>
  );
}
