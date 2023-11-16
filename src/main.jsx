import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { PrimeReactProvider } from 'primereact/api';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
       <PrimeReactProvider>
      <App />
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
