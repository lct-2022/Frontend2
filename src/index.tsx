import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App/>
);

// const [name, setName] = useState('');
// const [lastName, setLastName] = useState('');
// const [fatherName, setFatherName] = useState('');

// My token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjoyNCwicm9sZXMiOm51bGwsImlhdCI6MTY2NzA0OTgzMX0.Z2Rjqok_ApCVTPHpWLZCgOC9mZMvJe1pQWUm2a_rqAE