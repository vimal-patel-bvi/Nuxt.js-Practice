<template>
  <div>
    <h1>GraphQL Post Listings</h1>

    <div v-if="loading">Loading...</div>
    <div v-if="error">Error loading data</div>

    <ul v-if="posts">
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const query = `
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

const loading = ref(true)
const error = ref(null)
const posts = ref([])

try {
  const res = await $fetch('https://graphqlzero.almansi.me/api', {
    method: 'POST',
    body: { query }
  })

  posts.value = res.data.posts.data
} catch (err) {
  error.value = err
} finally {
  loading.value = false
}
</script>
