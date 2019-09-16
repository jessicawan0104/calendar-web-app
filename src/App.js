import React from 'react';
import './App.css';
import styled from 'styled-components';
import Calendar from './Containers/Calendar';

const Container = styled.div`
padding: 60px;
padding-top: 30px;
/* text-align: center; */
font-size: 16px;
`;


function App() {
  return (
    <Container>
      <Calendar/>
    </Container>
  );
}

export default App;
