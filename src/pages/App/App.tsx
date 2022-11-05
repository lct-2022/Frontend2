import React from 'react';
import {QueryClientProvider, QueryClient,} from 'react-query';

import {BrowserRouter} from 'react-router-dom';
import Main from '../Main';
import ErrorBoundary from '../../components/Error-Boundary';

const queryClient = new QueryClient();

function App() {
  return (  
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Main/>
          </QueryClientProvider>
        </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
