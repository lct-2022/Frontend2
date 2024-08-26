import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import ErrorBoundary from '../../ui/Error-Boundary';
import { Provider } from 'react-redux';
import Main from '../Main';
import {store} from '../../store';

const queryClient = new QueryClient();

function App() {
    return (  
        <ErrorBoundary>
            <BrowserRouter>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <Main/>
                    </QueryClientProvider>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
