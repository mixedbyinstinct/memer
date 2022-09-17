import styled, { createGlobalStyle, keyframes } from 'styled-components';
import heading from './Syne-ExtraBold.ttf';
import buttons from './Syne-Bold.ttf';
import text from './Barlow-Regular.otf';

const Pulse = keyframes`
0% {
  scale(1.0);
}
50% {
  scale(2.0);
}
100% {
  scale(1.0);
}
`;

export const GlobalStyles = createGlobalStyle`
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
  background-color: #080708;
  & h1 {
    font-family: 'heading';
  }
  & p {
    font-family: 'text';
  }
  & button {
    font-family: 'buttons';
  }
}
`;

export const Head = styled.header`
position: absolute;
top: 0;
display: flex;
align-items: center;
justify-content: center;
color: #e6e8e6;
& h1 {
  text-align: center;
  font-size: 28px;
}
`;

export const Line = styled.div`
background-color: #f7f7f7;
height: 1.3px;
width: 85%;
margin-top: 3px;
margin-bottom: 3px;
border-radius: 35%;
position: absolute;
top: 74%;
`

export const Container = styled.div`
display: flex;
justify-content: center;

padding: 10px;
`

export const Jumbotron = styled.header`
background-color: #212021;
height: 60vh;
width: 98vw;
display: flex;
position: absolute;
top: 0;
border-top-left-radius: 6px;
border-top-right-radius: 6px;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
padding: 15px;
`;

export const Main = styled.div`
background-color: #00ff2f;
width: 100vw;
position: absolute;
left: 0;
top: 59vh;
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
  color: #080708;
}
& h1 {
  font-size: 20px;
  color: #080708;
  text-shadow(0 2px 4px #f7f7f7);
}
& input[type="text"] {
  background-color: e6e8e6;
  height: 30px;
  font-size: 16px;
  font-family: 'text';
  color: #080708;
  text-align: center;
  border: none;
  border-radius: 6px;
}
& label {
  font-family: 'text';
  font-size: 14px;
  margin-bottom: 5px;
  color: #080708;
}
filter: drop-shadow(0 -2px 5px #e6e8e6);
flex-grow: 1;
`;

export const ButtonRow = styled.div`
display: flex;
flex-flow: row nowrap;
padding: 8px;
justify-content: space-evenly;
align-items: space-evenly;
`;

export const ButtonGrid = styled.div`
display: flex;
flex-flow: column nowrap;
justify-content: space-evenly;
align-items: space-evenly;
`;

export const Button = styled.button`
background-color: #73f48b;
color: #080708;
text-align: center;
padding: 8px;
font-family: 'buttons';
font-size: 18px;
height: 40px;
border: none;
border-radius: 5px;
`;

export const GenerateButton = styled(Button)`
background-color: #19248b;
color: #fffefa;
margin-top: 23px;
`;

export const AgainButton = styled(Button)`
background-color: #212021;
color: #fffefa;
`

export const SaveBox = styled.div`
background-color: #51ab61;
display: flex;
flex-flow: column nowrap;
justify-content: center; arrange-items: center;
flex-grow: 9;
height: 60%;
& p {
  font-family: 'text';
  font-size: 16px;
  color: #080708;
}
& h1 {
  font-size: 20px;
  color: #080708;
  text-shadow(0 2px 4px #f7f7f7);
}
& input[type="text"] {
  background-color: e6e8e6;
  height: 30px;
  font-size: 16px;
  font-family: 'text';
  color: #080708;
  text-align: center;
  border: none;
  border-radius: 6px;
}
& label {
  font-family: 'text';
  font-size: 14px;
  margin-bottom: 5px;
  color: #080708;
}
padding: 15px;
`

export const Box = styled.div`
height: 220px;
width: 176px;
& img {
  height: 100%;
  width: 100%;
  border-radius: 2px;
  margin-top: 10px; margin-bottom: 5px;
}
background: transparent;
margin-top: 30px;
`;
