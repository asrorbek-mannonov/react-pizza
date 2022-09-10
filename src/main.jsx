import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Default from './layouts/Default';
import { store } from './store'
import { Provider as ReduxProvider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Default />
      </BrowserRouter>
    </ReduxProvider>
  // React.StrictMode>
);
