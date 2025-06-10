import {
  AdfCodeBlock,
  AdfParagraph,
  AtlassianDocumentFormat,
} from "../steps/api/jiraApiSteps";

export class AdfBuilder {
  private readonly content: (AdfParagraph | AdfCodeBlock)[] = [];

  /**
   * Adds a standard paragraph with a bolded title and text.
   */
  public addParagraph(title: string, text: string): this {
    if (!text) return this; // Don't add empty sections
    this.content.push({
      type: "paragraph",
      content: [
        { type: "text", text: `${title}`, marks: [{ type: "strong" }] },
        { type: "hardBreak" },
        { type: "text", text: text },
      ],
    });
    return this; // Return 'this' to allow chaining
  }

  /**
   * Adds a code block with an optional language for syntax highlighting.
   */
  public addCodeBlock(code: string, language: string = "text"): this {
    if (!code) return this;
    this.content.push({
      type: "codeBlock",
      attrs: { language },
      content: [{ type: "text", text: code }],
    });
    return this;
  }

  /**
   * Builds the final Atlassian Document Format object.
   */
  public build(): AtlassianDocumentFormat {
    return {
      version: 1,
      type: "doc",
      content: this.content,
    };
  }
}
