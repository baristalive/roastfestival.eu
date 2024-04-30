import type { MDXComponents } from 'mdx/types'
import { PropsWithChildren } from "react";
import { LANDSCAPE, PORTRAIT, ZoomableImage } from './app/components/ZoomableImage';
 
const portrait = {...PORTRAIT, small: { width: 200, height: 300}}
const landscape = {...LANDSCAPE, small: { width: 300, height: 200}}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="px-8 md:px-0 mb-4 mt-6 md:mt-12 text-2xl lg:text-3xl font-bold  clear-both">{children}</h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h3 className="px-8 md:px-0 mb-4 pt-24 text-2xl lg:text-2xl font-bold clear-both">{children}</h3>
    ),
    li: ({ children }: PropsWithChildren) => (
      <li className="px-2 md:px-0 text-base lg:text-xl">{children}</li>
    ),
    p: ({ children }: PropsWithChildren) => (
      <p className="px-8 md:px-0 mb-4 text-base lg:text-xl">{children}</p>
    ),
    ol: ({ children }: PropsWithChildren) => (
      <ol className="px-6 md:px-0 mb-4 list-outside list-decimal round-counter">{children}</ol>
    ),
    ul: ({ children }: PropsWithChildren) => (
      <ul className="mb-4 px-8 list-inside list-disc">{children}</ul>
    ),
    table: ({ children }: PropsWithChildren) => (
      <div className="flex items-center justify-center">
          <table className="border-collapse rounded-2xl overflow-x-auto block md:table elevate my-4">{children}</table>
      </div>
    ),
    th: ({ children }: PropsWithChildren) => (
      <th className="text-center first:rounded-tl-2xl last:rounded-tr-2xl p-4 px-8 text-nowrap">{children}</th>
    ),
    thead:  ({ children }: PropsWithChildren) => (
      <thead className="px-4 text-center text-[var(--white)] bg-[var(--primary)]">{children}</thead>
    ),
    td: ({ children, node, ...rest }: PropsWithChildren & { node?: Element | undefined}) => (
      <td {...rest} className="p-4  px-8 text-center text-nowrap">{children}</td>
    ),
    tr: ({ children }: PropsWithChildren) => (
      <tr className="divide-x divide-dashed even:bg-slate-50  last:rounded-b-2xl">{children}</tr>
    ),
    tbody: ({ children }: PropsWithChildren) => (
      <tbody className="after:content-[''] after:pt-4 after:block rounded-b-2xl tbody">{children}</tbody>
    ),
    img: ({ src, alt, ...rest }: {src?: string, alt?: string}) => {
      const [altText, sizing] = (alt || "|").split("|")
  
      return (
        <ZoomableImage src={src!} alt={altText} {...rest} {...(sizing === "landscape" ? landscape : portrait)} />
      );
    },
    ...components,
  }
}
