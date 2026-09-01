import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import type { ReactNode } from "react";

type MarkdownNode = {
  children?: MarkdownNode[];
  type: string;
  value?: string;
};

const parser = unified().use(remarkParse).use(remarkGfm);

const renderNodes = (
  nodes: readonly MarkdownNode[],
  parentKey = "markdown",
): ReactNode[] =>
  nodes.flatMap((node, index) => {
    const key = `${parentKey}-${index}`;

    if (node.type === "html") return [];

    if (node.type === "delete") {
      return <del key={key}>{renderNodes(node.children ?? [], key)}</del>;
    }

    if (node.value !== undefined) return [node.value];

    return renderNodes(node.children ?? [], key);
  });

export const InlineMarkdown = ({ children }: { children: string }) => {
  const tree = parser.parse(children) as unknown as MarkdownNode;

  return <>{renderNodes(tree.children ?? [])}</>;
};

export default InlineMarkdown;
