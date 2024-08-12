import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export type Pdf = {
  pdf: string;
  title: string;
  name: string;
  private: boolean;
}

export interface PdfContextInterface {
  allPdfs: Pdf[];
  setAllPdfs: Dispatch<SetStateAction<Pdf[]>>;
}

const PdfContext = createContext<PdfContextInterface>({
  allPdfs: [],
  setAllPdfs: () => []
});

export const usePdfContext = () => {
  return useContext(PdfContext);
}

type PdfContextProviderProps = {
  children: React.ReactNode;
}

export const PdfContextProvider = ({ children }: PdfContextProviderProps) => {
    const [allPdfs, setAllPdfs] = useState<Pdf[]>([]);
    return (
        <PdfContext.Provider value={{ allPdfs, setAllPdfs }}>
            {children}
        </PdfContext.Provider>
    )
}