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

// {
//   "created-at": "2022-10-29T23:06:49.000000+03:00",
//   "updated-at": "2022-10-29T23:06:49.000000+03:00",
//   "synced": true,
//   "id": 26,
//   "email": "atsukanov",
//   "password-hash": "5E21B602F2B46C942D8F32D86909E8DE093733FC",
//   "avatar-url": "http://www.gravatar.com/avatar/f02bab06a0de8a9a9b628d20a64c1ebf?s=200",
//   "fio": "atsukanov",
//   "birthday": null,
//   "gender": null,
//   "phone": null,
//   "country": null,
//   "city": null,
//   "education": null,
//   "job": null,
//   "about": null,
//   "admin": null
// }