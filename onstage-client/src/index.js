import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';
import { 
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
 } from '@apollo/client';

  const httpLink = createHttpLink({
    uri: 'https://onstage-server.herokuapp.com'
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
);

reportWebVitals();
