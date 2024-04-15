<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import AutoComplete from 'primevue/autocomplete'
  import FloatLabel from 'primevue/floatlabel'
  import Dropdown from 'primevue/dropdown'

  const users = ref(null)
  const searchInput = ref("")
  const searchUsers = ref(null)
  const selectedGroup = ref()
  const groups = ref([])

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:2000/get/users/')
    users.value = await response.json()


    groups.value.push("B01","B04","B08","B10","B12")
  }

  const search = (event) => {
    setTimeout(() => {
      if (!event.query.trim().length) {
        searchUsers.value = [...users.value]
      } else {
        searchUsers.value = users.value.filter((username) => {
          return username.discord_username.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
    }, 250)
}

  onMounted( async () => {
    fetchUsers()
  })
</script>

<template>
  <main>
    <div class="user_search">
      <FloatLabel>
        <AutoComplete v-model="searchInput" :suggestions="searchUsers" optionLabel="discord_username" @complete="search" />
        <label>Search for user</label>
      </FloatLabel>
      <FloatLabel>
        <Dropdown v-model="selectedGroup" :options="groups" placeholder="Select a Group"/>
        <label>Select a group</label>
      </FloatLabel>
    </div>
    <div class="user-table">
      <DataTable :value="users">
        <Column field="discord_username" header="Username" sortable >
          <template #body="slotProps">
            <RouterLink :to="'/users/' + slotProps.data._id">{{ slotProps.data.discord_username }}</RouterLink>
          </template>
        </Column>
        <Column field="group" header="Group" sortable >
          <template #body="slotProps">
            <RouterLink :to="'/groups/' + slotProps.data.group?.name">{{ slotProps.data.group?.name }}</RouterLink>
          </template>
        </Column>
        <Column field="joined" header="Joined" sortable >
          <template #body="slotProps">
            {{ new Date(slotProps.data.joined).toUTCString() }}
          </template>
        </Column>
        <Column field="updated" header="Updated" sortable >
          <template #body="slotProps">
            {{ new Date(slotProps.data.updated).toUTCString() }}
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<style>
  main {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }
  .user_search {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    gap:2rem;
  }
</style>
