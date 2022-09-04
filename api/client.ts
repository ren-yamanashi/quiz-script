// api/client.ts
import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  createHttpLink,
} from '@apollo/client/core'

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'network-only',
  },
}

const link = createHttpLink({ uri: 'http://localhost:4000/query' })

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions,
})
