import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import heading from './Syne-ExtraBold.ttf';
import buttons from './Syne-Bold.ttf';
import text from './Barlow-Regular.otf';

const growWobble = keyframes`
0% {
  height: 40px;
  font-size: 1em;
}
100% {
  height: 80px;
  font-size: 2em;
}
`

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'heading';
  src: url(${heading}) format('truetype');
  font-weight: bold;
}
@font-face {
  font-family: 'buttons';
  src: url(${buttons}) format('truetype');
  font-weight: bold;
}
@font-face {
  font-family: 'text';
  src: url(${text}) format('opentype');
  font-weight: bold;
}
body {
  background-color: #2e2f5b;
  & h1 {
    font-family: 'heading';
    font-size: 32px;
  }
  & p {
    font-family: 'text';
  }
  & button {
    font-family: 'buttons';
  }
}
`;

const Head = styled.header`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 6px;
color: #eaeaef;
& h1 {
  text-align: center;
}
`;



const Jumbotron = styled.header`
background-color: #2e2f5b;
height: 55vh;
width: 100vw;
${Head} & h1 {
  font-family: 'heading';
  font-size: 32px;
  color: #eaeaef;
  position: absolute;
  top: 0;
}
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
padding: 15px;
flex-shrink: 2;
`;

const Main = styled.div`
background-color: #faf0ca;
height: 46vh;
width: 100vw;
border-top-right-radius: 15px;
border-top-left-radius: 15px;
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
padding: 15px;
& p {
  font-family: 'text';
  font-size: 16px;
  color: #050509;
}
& input[type="text"] {
  height: 30px;
  font-size: 16px;
  font-family: 'text';
  color: #050509;
  text-align: center;
  border: none;
  border-radius: 6px;
}
& label {
  font-family: 'text';
  font-size: 14px;
  margin-bottom: 5px;
  color: #050509;
}
filter: drop-shadow(0 -7px 8px #eaeaef);
flex-grow: 1;
`;

const ButtonRow = styled.div`
display: flex;
flex-flow: row nowrap;
padding: 8px;
justify-content: space-evenly;
align-items: space-evenly;
`;

const Button = styled.button`
background-color: #f4d35e;
color: #050509;
text-align: center;
padding: 8px;
font-family: 'buttons';
font-size: 18px;
height: 40px;
border: none;
border-radius: 5px;
${props => props.loading &&`
  animation: growWobble infinite ease-in-out;
  `
}
`;

const GenerateButton = styled(Button)`
background-color: #505581;
color: #fffefa;
margin-top: 8px;
`;

const Box = styled.div`
height: 300px;
width: 198px;
border: 1px solid #eaeaef;
background: transparent;
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  function toggleLoading() {
    setLoading(!loading);
  }
  return (
    <>
    <GlobalStyles />
    <Jumbotron>
    <Head>
    <h1>Memes Make The World Go Round</h1>
    </Head>
    <Box />
    <GenerateButton>Find a Template</GenerateButton>
    </Jumbotron>
    <Main>
    <label>Top Text</label>
    <input type="text" />
    <label>Bottom Text</label>
    <input type="text" />
    <ButtonRow>
    <Button loading={loading} onClick={toggleLoading}>Meme It Up</Button>
    <Button>Scrap It</Button>
    </ButtonRow>
    </Main>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
