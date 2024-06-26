import React from 'react';
import ReactDOM from 'react-dom/client';
import { CalendarApp } from './CalendarApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './registerServiceWorker';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>
);
