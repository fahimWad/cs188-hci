import { Highlight } from "react-pdf-highlighter-extended";

export interface CustomHighlight extends Highlight {
    flashcardID: number // Shared with both front and back
    curSide: string // Denotes front or back definition
    active: boolean // Determines if gray or not
}