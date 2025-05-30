import React, { createContext, useContext, useState } from 'react';
import { CustomHighlight } from '../components/flashcard_components/Highlights';
import { FlashcardData } from '../components/flashcard_components/Flashcard';

// Define the shape of the context data
interface AppContextData {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  highlights: CustomHighlight[];
  setHighlights: React.Dispatch<React.SetStateAction<CustomHighlight[]>>;
  flashcards: FlashcardData[];
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardData[]>>;
}

// Create the context
const AppContext = createContext<AppContextData | undefined>(undefined);

// Custom hook to use the AppContext
export const useAppContext = (): AppContextData => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
}

interface AppProviderProps {
  children: React.ReactNode;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [highlights, setHighlights] = useState<CustomHighlight[]>([]);
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);

  return (
    <AppContext.Provider
      value={{
        uploadedFile,
        setUploadedFile,
        highlights,
        setHighlights,
        flashcards,
        setFlashcards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Export the AppContext for direct use if needed
export { AppContext };