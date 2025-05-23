import { Highlight } from "react-pdf-highlighter-extended";

export interface CustomHighlight extends Highlight {
    side: string // Denotes front or back definition
    flashcardID: number // Shared with both front and back
    active: boolean // Determines if gray or not
}