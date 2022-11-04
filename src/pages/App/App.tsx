import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from '../Main';
import ErrorBoundary from '../../components/Error-Boundary';

function App() {
  return (  
    <ErrorBoundary>
      <BrowserRouter>
          <Main/>
        </BrowserRouter>
     </ErrorBoundary>
  );
}

export default App;
