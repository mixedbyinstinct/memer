import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {GlobalStyles, Head, Jumbotron, Container, Main, GenerateButton, AgainButton, Button, ButtonRow, ButtonGrid, Box, SaveBox} from '../styles/App.styled';

const App = () => {
  let index = Math.floor(Math.random() * 100);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [gotOne, setGotOne] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [memed, setMemed] = useState(false);
  const [showAgainButton, setShowAgainButton] = useState(false);
  const saveRef = useRef(null);
  
  function modifyTop(e) {
    setTopText(e.target.value);
  }
  
  function modifyBottom(e) {
    setBottomText(e.target.value);
  }
  
  function modifyName(e) {
    setName(e.target.value);
  }
  
  function checkDb() {
    axios.get("/dbtest").then(({data}) => alert(data.memes));
  }
  
  function getTemplate() {
    setLoading(true);
    // api request
    axios.get("https://api.imgflip.com/get_memes").then(({data}) => {
      setLoading(false);
      // reset index counter if its at 100
      if(index === 100) {
        index = Math.floor(Math.random() * 100)
      }
      // check if the template at the index in the array equal to the index counter only has 2 text boxes
      let only2Boxes = /(2$)/.test(data.data.memes[index].box_count)
      // if it does set relevant state variables to display it and store its id #
      if(only2Boxes) {
        setUrl(data.data.memes[index].url);
        setGotOne(true);
        setId(data.data.memes[index].id);
      } else {
        // otherwise increment the index counter and recurse
          index++
          getTemplate();
      }
    })
  }
  
  function scrap() {
    setGotOne(false);
    setUrl('');
    setMessage('');
    setShowMessage(false);
    setMemed(false);
    index = Math.floor(Math.random() * 100);
  }
  
  function again() {
    scrap();
    setShowAgainButton(false);
    getTemplate();

  }
  
  function save() {
    let formData = new FormData();
    
    formData.append("newMeme", url);
    formData.append("name", name);
    
    axios.post("/save-meme", formData).then(({data}) => {
      //data.dbConnect ? alert('db connected') : null;
      data.memeSaved ? setShowAgainButton(true) : null;
      setMessage(data.message);
      setShowMessage(true);
    })
  }
  
  function letsGo() {
    setGotOne(false);
    let formData = new FormData();
    formData.append("username", "mixedbyinstinct");
    formData.append("password", "i-am-him");
    formData.append("template_id", id);
    formData.append("text0", topText);
    formData.append("text1", bottomText);
    axios.post("https://api.imgflip.com/caption_image", formData).then(({data}) => {
      if(data.success) {
        setGotOne(true);
        setUrl(data.data.url);
        setMemed(true);
      } else {
        setMessage(data.error_message);
        setShowMessage(true);
      }
    })
    setTopText('');
    setBottomText('');
    saveRef.current.focus();
  }
  
  return (
    <Container>
    <GlobalStyles />
    <Jumbotron>
    <Head>
    <h1>Memes Make The World Go Round</h1>
    </Head>
    <Box>
    {gotOne ? <img src={url} alt="error" /> : <div />}
    </Box>
    <GenerateButton onClick={() => {
      checkDb();
      getTemplate();
     }}>Find a Template</GenerateButton>
    </Jumbotron>
    <Main>
    <h1>Make it so #1</h1>
    <label>Top Text</label>
    <input type="text" onChange={modifyTop} value={topText}/>
    <label>Bottom Text</label>
    <input type="text" onChange={modifyBottom} value={bottomText}/>
    <ButtonGrid>
    <ButtonRow>
    <Button onClick={letsGo}>Meme It Up</Button>
    <Button onClick={scrap}>Scrap It</Button>
    </ButtonRow>
    {memed ?
      <>
      <label>Your Name:</label>
      <input ref={saveRef} type="text" onChange={modifyName} value={name}/>
      <Button onClick={save}>Save Meme</Button> 
      </> :
      <div />
    }
    </ButtonGrid>
    {showMessage ? <p>{message}</p> : <div />}
    {showAgainButton ? 
       <AgainButton onClick={again}>OK</AgainButton> : <div />
    }

    </Main>
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
