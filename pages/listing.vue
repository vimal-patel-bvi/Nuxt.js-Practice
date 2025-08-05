<template>
    <div>
      <h1>Post Listings</h1>
  
      <div v-if="pending">Loading...</div>
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
  // Fetch from dummy API
  const { data: posts, pending, error } = await useFetch('https://jsonplaceholder.typicode.com/posts')
  </script>
  