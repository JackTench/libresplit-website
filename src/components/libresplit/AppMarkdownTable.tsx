import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Align = "left" | "center" | "right" | null;

type MarkdownTableCell = {
  type: "tableCell";
  children?: any[];
};

type MarkdownTableRow = {
  type: "tableRow";
  children: MarkdownTableCell[];
};

type MarkdownTable = {
  type: "table";
  align?: Align[];
  children: MarkdownTableRow[];
};

export function AppMarkdownTable({
  node,
  renderChildren,
  caption,
  className,
}: {
  node: MarkdownTable;
  renderChildren: (n: any) => React.ReactNode | null;
  caption?: React.ReactNode;
  className?: string;
}) {
  const align = node.align || [];
  const [headerRow, ...bodyRows] = node.children || [];

  const alignClass = (idx: number) => {
    const a = align[idx];
    if (a === "center") return "text-center";
    if (a === "right") return "text-right";
    return "text-left";
  };

  return (
    <Table className={className ?? "my-4"}>
      {caption ? <TableCaption>{caption}</TableCaption> : null}

      {headerRow ? (
        <TableHeader>
          <TableRow>
            {headerRow.children.map((cell, i) => (
              <TableHead key={i} className={alignClass(i)}>
                {renderChildren(cell)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      ) : null}

      <TableBody>
        {bodyRows.map((row, rIdx) => (
          <TableRow key={rIdx}>
            {row.children.map((cell, cIdx) => (
              <TableCell key={cIdx} className={alignClass(cIdx)}>
                {renderChildren(cell)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
