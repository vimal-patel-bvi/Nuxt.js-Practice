import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: 'https://graphqlzero.almansi.me/api'
    }),
    cache: new InMemoryCache()
  })

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
