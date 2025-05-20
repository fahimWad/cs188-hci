let flashcardID = 0
export function getNewID():number {
    return ++flashcardID
}

export function getID():number { // Non increment version
    return flashcardID
}