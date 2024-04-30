import type { MDXComponents } from "mdx/types";
import { PropsWithChildren } from "react";
import {
  LANDSCAPE,
  PORTRAIT,
  ZoomableImage,
} from "./app/components/ZoomableImage";
import "react-medium-image-zoom/dist/styles.css";

const portrait = { ...PORTRAIT, small: { width: 200, height: 300 } };
const landscape = { ...LANDSCAPE, small: { width: 300, height: 200 } };

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="clear-both mb-4 mt-6 px-8 text-2xl font-bold md:mt-12 md:px-0  lg:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h3 className="clear-both mb-4 px-8 pt-24 text-2xl font-bold md:px-0 lg:text-2xl">
        {children}
      </h3>
    ),
    li: ({ children }: PropsWithChildren) => (
      <li className="px-2 text-base md:px-0 lg:text-xl">{children}</li>
    ),
    p: ({ children }: PropsWithChildren) => (
      <p className="mb-4 px-8 text-base md:px-0 lg:text-xl">{children}</p>
    ),
    ol: ({ children }: PropsWithChildren) => (
      <ol className="round-counter mb-4 list-outside list-decimal px-6 md:px-0">
        {children}
      </ol>
    ),
    ul: ({ children }: PropsWithChildren) => (
      <ul className="mb-4 list-inside list-disc px-8">{children}</ul>
    ),
    table: ({ children }: PropsWithChildren) => (
      <div className="flex items-center justify-center">
        <table className="elevate my-4 block border-collapse overflow-x-auto rounded-2xl md:table">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: PropsWithChildren) => (
      <th className="text-nowrap p-4 px-8 text-center first:rounded-tl-2xl last:rounded-tr-2xl">
        {children}
      </th>
    ),
    thead: ({ children }: PropsWithChildren) => (
      <thead className="bg-[var(--primary)] px-4 text-center text-[var(--white)]">
        {children}
      </thead>
    ),
    td: ({
      children,
      node,
      ...rest
    }: PropsWithChildren & { node?: Element | undefined }) => (
      <td {...rest} className="text-nowrap  p-4 px-8 text-center">
        {children}
      </td>
    ),
    tr: ({ children }: PropsWithChildren) => (
      <tr className="divide-x divide-dashed last:rounded-b-2xl  even:bg-slate-50">
        {children}
      </tr>
    ),
    tbody: ({ children }: PropsWithChildren) => (
      <tbody className="tbody rounded-b-2xl after:block after:pt-4 after:content-['']">
        {children}
      </tbody>
    ),
    img: ({ src, alt, ...rest }: { src?: string; alt?: string }) => {
      const [altText, sizing] = (alt || "|").split("|");

      return (
        <ZoomableImage
          src={src!}
          alt={altText}
          {...rest}
          {...(sizing === "landscape" ? landscape : portrait)}
        />
      );
    },
    ...components,
  };
}
