import React from "react";

import { AppMarkdownTable } from "@/components/libresplit/AppMarkdownTable";
import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { gfm } from "micromark-extension-gfm";
import { CodeBlock } from "react-code-block";

export function Markdown({ content }: { content: string }) {
  const tree = fromMarkdown(content, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });

  function renderChildren(node: any): React.ReactNode | null {
    if (!node.children) {
      return null;
    }
    return node.children.map((child: any, i: number) => (
      <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
    ));
  }

  function renderNode(node: any): React.ReactNode {
    switch (node.type) {
      case "text":
        return node.value;

      // Handles paragraph text.
      case "paragraph":
        return <p>{renderChildren(node)}</p>;

      // Handles bold or italic text.
      case "strong":
        return <p className="font-bold">{renderChildren(node)}</p>;
      case "emphasis":
        return <p className="italic">{renderChildren(node)}</p>;

      // Handles headings #, ## and ###.
      case "heading":
        switch (node.depth) {
          case 1:
            return (
              <h1 className="text-3xl font-bold">{renderChildren(node)}</h1>
            );
          case 2:
            return (
              <h2 className="text-2xl font-semibold">{renderChildren(node)}</h2>
            );
          case 3:
            return (
              <h3 className="text-xl font-medium">{renderChildren(node)}</h3>
            );
          default:
            return <div className="text-gray-700">{renderChildren(node)}</div>;
        }

      // Handle block quotes.
      case "blockquote":
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 text-gray-700 italic">
            {node.children.map(renderNode)}
          </blockquote>
        );

      // Handles links in markdown [text](url).
      case "link":
        return <a href={node.url}>{renderChildren(node)}</a>;

      // Handles lists.
      case "list": {
        // Select between ol and ul. Apply tailwind styling.
        const ListTag = node.ordered ? "ol" : "ul";
        const cls = node.ordered ? "list-decimal ml-6" : "list-disc ml-6";
        // Start only applys to ol(s).
        const startProps =
          node.ordered && node.start ? { start: node.start } : {};
        return (
          <ListTag className={cls} {...startProps}>
            {renderChildren(node)}
          </ListTag>
        );
      }
      case "listItem": {
        return <li>{renderChildren(node)}</li>;
      }

      // Handles tables.
      case "table":
        return (
          <AppMarkdownTable
            node={node}
            renderChildren={(n) =>
              n?.children?.map((c: any, i: number) => (
                <React.Fragment key={i}>{renderNode(c)}</React.Fragment>
              ))
            }
          />
        );

      // Handles code blocks.
      case "code":
        return (
          <div>
            <CodeBlock code={node.value} language={node.lang}>
              <CodeBlock.Code>
                <CodeBlock.LineContent>
                  <CodeBlock.Token />
                </CodeBlock.LineContent>
              </CodeBlock.Code>
            </CodeBlock>
          </div>
        );
      case "inlineCode":
        return <p>{node.value}</p>;

      // Handle thematic breaks.
      case "thematicBreak":
        return <hr className="my-4 border-gray-300" />;

      default:
        return renderChildren(node);
    }
  }

  return <div>{tree.children.map(renderNode)}</div>;
}
