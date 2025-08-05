<template>
  <div>
    <h1>GraphQL Posts</h1>

    <div v-if="loading">Loading posts...</div>
    <div v-else-if="error" style="color: red;">Error: {{ error.message }}</div>

    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApolloClient } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const loading = ref(true)
const error = ref(null)
const posts = ref([])

const GET_POSTS = gql`
  query {
    posts(options: { paginate: { page: 1, limit: 5 } }) {
      data {
        id
        title
        body
      }
    }
  }
`

const { client } = useApolloClient()

onMounted(async () => {
  try {
    const { data } = await client.query({
      query: GET_POSTS,
      fetchPolicy: 'no-cache'
    })
    posts.value = data.posts.data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>
