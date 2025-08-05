<template>
  <div>
    <h1>GraphQL Post Listings (Vue Apollo)</h1>

    <div v-if="$apollo.loading">Loading...</div>

    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>

    <div v-if="error" style="color:red;">
      Error: {{ error.message }}
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      posts: [],
      error: null
    }
  },
  apollo: {
    posts: {
      query: gql`
        query {
          posts(options: { paginate: { page: 1, limit: 5 } }) {
            data {
              id
              title
              body
            }
          }
        }
      `,
      update: (data) => data.posts.data,
      error(error) {
        this.error = error
      }
    }
  }
}
</script>
