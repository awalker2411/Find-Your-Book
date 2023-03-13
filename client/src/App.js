import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const hLink = createHttpLink({uri: '/graphql', cache: new InMemoryCache()})

const authLink = setContext((_, { headers })=>{
  const token = localStorage.getItem(`id_token`)
  return {headers: {...headers, authorization: token ? `${token}` : ``}}
})

const client = new ApolloClient({link: authLink.concat(hLink), cache: new InMemoryCache()})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<SearchBooks/>} />
            <Route exact path='/saved' element={<SavedBooks/>} />
            <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
