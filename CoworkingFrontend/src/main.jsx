
import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import App from './App.jsx';
import './index.css';
import Router from './Routers/Index.jsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './Store/Store.js';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root');
const root = createRoot(container); // Create root using createRoot

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
