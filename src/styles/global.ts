import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  :root {
    --white: #fff;
    --background: #312E38;
    --header: #4953b8;
    --gray-line: #dcdde0;
    --text: #FFFFFF;
    --text-highlight: #b3b9ff;
    --title: #2e384d;
    --red: #e83f5b;
    --green: #4cd62b;
    --blue: #5965e0;
    --blue-dark: #4953b8;
    --blue-twitter: #2aa9e0;
  }

  @media(max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media(max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  body, input, text-area, button {
    font: 400 1rem 'Roboto Slab', serif;
  }

  h1, h2, h3, h4, h5, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 0.7rem;
    height: 100%;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--blue-dark);
    border-radius: 0.3rem;
  }
`;
