import { createContext, useContext, type FC, type ReactNode } from 'react'

export const context = createContext<string>('initial value')

export interface TestProviderProps {
  children: ReactNode
}

export const TestProvider: FC<TestProviderProps> = ({ children }) => {
  return <context.Provider value="another value">{children}</context.Provider>
}

export function useTest(): string {
  return useContext(context)
}
