import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
//
import { store } from './frontend/redux/store/store';
import { Provider } from 'react-redux';
//
import SocialState from './frontend/reducer/SocialState'
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
         <SocialState> 
               <App />
         </SocialState>
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
