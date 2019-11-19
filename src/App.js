import React, {useState} from 'react';
import './App.css';
import styled from 'styled-components';
import Calendar from './Containers/Calendar';
import Header from './components/Header';
import TodoList from './components/TodoList';
import WithAuth from './Containers/WithAuth';

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
    <WithAuth>
      <Header/>
      <Calendar/>
    </WithAuth>
  );
}

export default App;
