import React from 'react';
import './App.css';
import Header from './components/header/Header'
import Board from './components/board/Board';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './components/login/Login';

const App: React.FC = () => {
  const isAuthorized = useSelector((state: RootState) => state.app.isAuthorized)
  const username = useSelector((state: RootState) => state.app.username)

  return (
    <div className='app'>
      {
        isAuthorized ? (
          <>
            <Header
              title='Kanban Board'
              username={username} />
            <div className='app__board'>
              <Board />
            </div>
          </>
        ) : <Login />
      }

      
    </div>
  );
}

export default App;
