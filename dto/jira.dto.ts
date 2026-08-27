export interface AdfTextNode {
  type: "text";
  text: string;
  marks?: { type: "strong" | "em" }[];
}

export interface AdfHardBreakNode {
  type: "hardBreak";
}

export type AdfContentNode = AdfTextNode | AdfHardBreakNode;

export interface AdfParagraph {
  type: "paragraph";
  content: AdfContentNode[];
}

export interface AdfCodeBlock {
  type: "codeBlock";
  attrs?: { language: string };
  content: [AdfTextNode];
}

export interface AtlassianDocumentFormat {
  version: 1;
  type: "doc";
  content: (AdfParagraph | AdfCodeBlock)[];
}

export interface JiraIssueDto {
  fields: {
    project: { id: string };
    issuetype: { id: string };
    summary: string;
    description: AtlassianDocumentFormat;
    reporter: { id: string };
    labels: string[];
    priority?: { name: string };
    [key: string]: unknown;
  };
}

export interface JiraCreateResponse {
  id: string;
  key: string;
  self: string;
}
