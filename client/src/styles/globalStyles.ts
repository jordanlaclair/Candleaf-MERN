import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.text};
  }
  `;
