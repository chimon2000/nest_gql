import { h, render } from 'preact'
import 'preact/devtools'
import App from './app/App'

import { RestLink } from 'apollo-link-rest'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

const link = new RestLink({ uri: 'http://localhost:3000/api/' })
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
})

render(
    <div id="app">
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </div>,
    document.body
)
