import type { MDXComponents } from "mdx/types";
import { PropsWithChildren } from "react";
import {
  LANDSCAPE,
  PORTRAIT,
  ZoomableImage,
} from "./app/components/ZoomableImage";
import "react-medium-image-zoom/dist/styles.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, ...rest }: PropsWithChildren) => (
      <a className="font-bold text-(--primary) underline" {...rest}>
        {children}
      </a>
    ),
    h2: ({ children }: PropsWithChildren) => (
      <h2 className="font-display mt-24 mb-4 text-3xl leading-[0.85] font-black uppercase md:text-6xl">
        {children}
      </h2>
    ),
    h3: ({ children }: PropsWithChildren) => (
      <h3 className="font-display clear-both mb-6 text-lg font-black tracking-tighter uppercase md:text-xl lg:text-2xl">
        {children}
      </h3>
    ),
    img: ({ alt, src, ...rest }: { src?: string; alt?: string }) => {
      const [altText, sizing] = (alt || "|").split("|");

      return (
        <>
          <div className="hidden md:block">
            <ZoomableImage
              src={`/images/photos/${src!}`}
              alt={altText}
              {...rest}
              {...(sizing === "landscape"
                ? { small: LANDSCAPE.sm.small, zoomed: LANDSCAPE.lg.zoomed }
                : { small: PORTRAIT.sm.small, zoomed: PORTRAIT.lg.zoomed })}
            />
          </div>
          <div className="block md:hidden">
            <ZoomableImage
              src={`/images/photos/${src!}`}
              alt={altText}
              {...rest}
              {...(sizing === "landscape" ? LANDSCAPE.sm : PORTRAIT.sm)}
            />
          </div>
        </>
      );
    },
    li: ({ children }: PropsWithChildren) => (
      <li className="px-2 text-base lg:text-xl">{children}</li>
    ),
    ol: ({ children }: PropsWithChildren) => (
      <ol className="round-counter mb-4 list-outside list-decimal">
        {children}
      </ol>
    ),
    p: ({ children }: PropsWithChildren) => (
      <p className="mb-12 text-base lg:text-xl">{children}</p>
    ),
    table: ({ children }: PropsWithChildren) => (
      <div className="flex items-center justify-center">
        <table className="punk-border pop-shadow bg-secondary block border-collapse overflow-x-auto md:table">
          {children}
        </table>
      </div>
    ),
    td: ({
      children,
      node,
      ...rest
    }: PropsWithChildren & { node?: Element | undefined }) => (
      <td {...rest} className="p-4 px-8 text-center text-nowrap">
        {children}
      </td>
    ),
    th: ({ children }: PropsWithChildren) => (
      <th className="p-4 px-8 text-center text-nowrap">{children}</th>
    ),
    thead: ({ children }: PropsWithChildren) => (
      <thead className="text-ivory bg-primary px-4 text-center">
        {children}
      </thead>
    ),
    tr: ({ children }: PropsWithChildren) => (
      <tr className="even:bg-primary/20 divide-x divide-dashed">{children}</tr>
    ),
    ul: ({ children }: PropsWithChildren) => (
      <ul className="mb-4 list-disc pl-6">{children}</ul>
    ),
    ...components,
  };
}
