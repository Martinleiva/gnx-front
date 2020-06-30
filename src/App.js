import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex">
        <Sidebar />
      </div>
    </ApolloProvider>
  );
}

export default App;
