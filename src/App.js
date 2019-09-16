import React from 'react';
import './App.css';
import styled from 'styled-components';
import Calendar from './Containers/Calendar';

export const Container = styled.div`
padding-right: 60px;
padding-top: 30px;
text-align: center;
font-size: 16px;
display: flex;
.main{
  flex-grow: 1;
}

.side {
  width: 200px;
}
`;


function App() {
  return (
    // <Container>
    //   <div className="side">

    //   </div>
    //   <div className="main">
    //     <Calendar/>
    //   </div>
    // </Container>
    <Calendar/>
  );
}

export default App;
