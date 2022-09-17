import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '../styles/App.styled';
import styled from 'styled-components';
import axios from 'axios';

const MemeGrid = styled.div`
display: flex;
flex-flow: column nowrap;
align-items: space-evenly;
justify-content: space-evenly;
`;

const MemeRow = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: space-evenly;
justify-content: space-evenly;
& img {
  height: 90px;
  width: 90px;
  margin-bottom: 5px;
  margin-top: 5px;
  filter: drop-shadow(2px 1px 5px #212021);;
}
`;

const Memes = () => {
  const [memeData, setMemeData] = useState([]);
  
  function renderImageData() {
    return memeData.map((image, index) => {
      const { Id, Name, Url } = image;
        return (
          <MemeRow>
          <img key={Id} src={Url} alt='yo' />
          </MemeRow>
        );
      });
  }
  
  useEffect(() => {
    axios.get('/findmemes').then(({data}) => 
      setMemeData(data))
  }, [])
  return(
    <>
    <GlobalStyles />
    <h1>Your Memes:</h1>
    {renderImageData()}
    </>
  );
}

export default Memes;