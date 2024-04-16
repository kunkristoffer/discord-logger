<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import DataTable from 'primevue/datatable'
  import Button from 'primevue/button'
  import Column from 'primevue/column'
  import AutoComplete from 'primevue/autocomplete'
  import FloatLabel from 'primevue/floatlabel'
  import Dropdown from 'primevue/dropdown'
  import Tag from 'primevue/tag'

  const users = ref(null)
  const userList = ref(null)
  const searchInput = ref("")
  const searchUsers = ref(null)
  const selectedGroup = ref(null)
  const groups = ref([])

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:2000/get/users/')
    users.value = await response.json()
    userList.value = users.value
  }

  const fetchGroups = async () => {
    const response = await fetch('http://localhost:2000/get/groups/')
    groups.value = await response.json()
  }

  const searchName = (event) => {
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

  const reset = () => {
    userList.value = users.value
    searchInput.value = ""
    selectedGroup.value = null
  }

  const search = () => {
    if (searchInput.value?.discord_username) {
      userList.value = users.value.filter((username) => {
        return username.discord_username.includes(searchInput.value.discord_username)
      })
    }
    if (selectedGroup.value?.name) {
      userList.value = users.value.filter((username) => {
        return username.group?.name.includes(selectedGroup.value.name)
      })
    }
  }

  onMounted( async () => {
    fetchUsers()
    fetchGroups()
  })
</script>

<template>
  <main>
    <div class="user_search">
      <FloatLabel>
        <AutoComplete v-model="searchInput" :suggestions="searchUsers" optionLabel="discord_username" @complete="searchName" />
        <label>Search for user</label>
      </FloatLabel>
      <FloatLabel>
        <Dropdown v-model="selectedGroup" :options="groups" optionLabel="name" placeholder="Select a Group"/>
        <label>Select a group</label>
      </FloatLabel>
      <Button @click="search" label="Search" :disabled="!searchInput && !selectedGroup" />
      <Button @click="reset" label="Reset" severity="danger" :disabled="users?.length === userList?.length  && (!searchInput && !selectedGroup)" />
    </div>
    <div class="user-table">
      <DataTable :value="userList">
        <Column field="discord_username" sortable >
          <template #header>
            <span style="flex:1">Username</span>
            <Tag severity="secondary" icon="pi pi-user" :value="userList?.length"></Tag>
          </template>
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
  .p-column-header-content {
    display: flex;
  }
</style>
