import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import App from './components/app';

//declare a function render()
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.body.appendChild(document.createElement('div'))
  );
};

//invoke the render()
render(App);

