import { createGlobalStyle } from 'styled-components'
import { AppTheme } from './themes'
import { transparentize } from 'polished'


type GlobalStyleProps = {
  theme: AppTheme
}

export const GlobalStyle = createGlobalStyle`

  html, body {
    margin: 0;
    padding: 0;

    font-size: 16px;
  }

  body {

  background-color: ${(props: GlobalStyleProps) => props.theme.primary};
  color: ${(props: GlobalStyleProps) => props.theme.onPrimary};

  font-family: 'Aktiv Grotesk Corp';
  line-height: 1.5em;

  transition: 
    color .3s ease-in-out, 
    background-color .3s ease-in-out,
    fill .3s ease-in-out;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 56px;
    line-height: 1em;
  }

  button {
    border: none;
  }

  hr {
    margin: 1em 4em;
    border-color: ${props => transparentize(0.5, props.theme.primaryVariant)};
  }

  code {
    font-family: 'Ubuntu Mono';
  }

  blockquote {
    padding-left: 1em;
    margin-left: 0;
    border-left: .3em solid ${props => props.theme.primaryVariant};
  }
`
