import React from 'react';
import './App.less';
import {Route, Switch} from 'react-router-dom';
import MainView from './components/main-view/main-view';

const App: React.FC = () => {
  return (
    <div>
        <p className={'app-name'}>Procedure scheduling Web App</p>
      <MainView/>
    </div>
  );
};

export default App;
