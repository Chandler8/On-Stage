import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './constants';


const httpLink = createHttpLink({
    uri: 'https://stagewood-server.herokuapp.com/'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    console.log(token)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
})

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})