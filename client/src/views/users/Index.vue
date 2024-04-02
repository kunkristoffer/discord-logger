<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'

  const users = ref(null)

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:2000/get/users/')
    users.value = await response.json()
  }

  onMounted( async () => {
    fetchUsers()
  })
</script>

<template>
  <main>
    <h1>users</h1>
    <ul>
      <li v-for="user in users" v-bind:key="user._id">
        <span><RouterLink :to="'/users/' + user._id">{{ user.user_name }}</RouterLink></span>
      </li>
    </ul>
  </main>
</template>

<style>

</style>
