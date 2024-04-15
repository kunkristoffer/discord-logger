<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/attendance">Attendance</RouterLink>
      <RouterLink to="/users">Users</RouterLink>
      <RouterLink to="/groups">Groups</RouterLink>
      <RouterLink to="/create">Create_data</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
  header {
    padding: 1rem;
  }
  nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  a {
    color: var(--vt-c-text-dark-1);
    text-decoration: none;
    font-size: 2rem;
  }

  a:hover {
    color: var(--vt-c-text-dark-2);
  }
</style>
