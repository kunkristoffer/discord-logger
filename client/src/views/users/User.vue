<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const user = ref(null)

  const fetchUser = async () => {
    const response = await fetch('http://localhost:2000/get/user/' + route.params.id)
    user.value = await response.json()
  }

  const formatDate = (string) => {
    return new Date(string).toUTCString()
  }

  onMounted( async () => {
    fetchUser()
  })
</script>

<template>
  <main>
    <div v-if="!user">Loading...</div>
    <div v-if="user" class="user">
      <h1>Profile for: {{ user.user_name }}</h1>
      <div>
        <span>First name: {{ user.first_name }}</span>
        <span>Last name: {{ user.last_name }}</span>
        <span>Joined: {{ formatDate(user.joined) }}</span>
        <span>Updated: {{ formatDate(user.updated) }}</span>
        <span>Discord id: {{ user.discord_id }}</span>
      </div>
      <ul>
        <li class="messages" v-for="message in user.messages" v-bind:key="message.user_ref">
          <span>{{ formatDate(message.date) }}</span>
          <span>{{ message.user_name }}</span>
          <span>{{ message.message }}</span>
        </li>
      </ul>
    </div>
  </main>
</template>

<style>
  .user {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.5rem;

    span {
      display: flex;
      gap: 1rem;
    }
  }

  .messages {
    display: flex;
    gap: 1rem;
    width: clamp(200px, 100%, 50svw);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
