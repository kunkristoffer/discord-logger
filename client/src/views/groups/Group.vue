<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import AutoComplete from 'primevue/autocomplete'
  import Button from 'primevue/button'
  import FloatLabel from 'primevue/floatlabel'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Card from 'primevue/card'

  const route = useRoute()
  const group = ref(null)
  const users = ref(null)
  const searchInput = ref("")
  const searchUsers = ref(null)
  // const stats = ref(null)

  const fetchGroup = async () => {
    const response = await fetch('http://localhost:2000/get/group/' + route.params.id)
    group.value = await response.json()

    console.log(group.value)
  }

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:2000/get/users/')
    users.value = await response.json()
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

  const addUserToGroup = async () => {
    const userid = searchInput.value._id
    const groupid = group.value._id

    try {
      const request = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "user": userid, "group": groupid }) }
      const response = await fetch('http://localhost:2000/post/addusertogroup', request)
      const data = await response.json()
    } catch (err) {
      console.log(err.message)
    } finally {
      fetchGroup()
    }
  }

  onMounted( async () => {
    fetchGroup()
    fetchUsers()
  })
</script>

<template>
  <main>
    <div v-if="!group">Loading...</div>
    <div v-if="group" class="group">
      <div class="profile">
        <Card style="width: 50%; overflow: hidden">
          <template #title>{{ group.name }}</template>
          <template #content>
            <div class="profile-fields">
              <span>
                <b>Created</b>
                <p>{{ new Date(group.created).toUTCString() }}</p>
              </span>
              <span>
                <b>Modified</b>
                <p>{{ group.modified ? new Date(group.modified).toUTCString() : 'n/a' }}</p>
              </span>
              <span style="margin-bottom: 2rem;">
                <b>Members</b>
                <p>{{ group.members.length }}</p>
              </span>
              <span>
                <FloatLabel>
                  <AutoComplete v-model="searchInput" :suggestions="searchUsers" optionLabel="discord_username" @complete="search" />
                  <label>Add a user</label>
                </FloatLabel>
                <Button :disabled="searchInput.length < 3" @click="addUserToGroup" label="Add" />
              </span>
            </div>
          </template>
        </Card>
        <Card style="width: 50%; overflow: hidden">
          <template #title>Statistics</template>
          <template #content>
            <div class="profile-fields">
              <span>
                <b>Attendance</b>
                <p>95%</p>
              </span>
            </div>
          </template>
        </Card>
      </div>
      <DataTable :value="group.members" size="small" tableStyle="min-width: 50rem" sortMode="multiple">
        <Column field="discord_username" header="Username" style="width: 50%" sortable>
          <template #body="slotProps">
            <RouterLink :to="'/users/' + slotProps.data._id">{{ slotProps.data.discord_username }}</RouterLink>
          </template>
        </Column>
        <Column field="joined" header="Joined" sortable >
          <template #body="slotProps">
            {{ slotProps.data.joined && new Date(slotProps.data.joined).toUTCString() }}
          </template>
        </Column>
        <Column field="updated" header="Last seen" sortable >
          <template #body="slotProps">
            {{ slotProps.data.updated && new Date(slotProps.data.updated).toUTCString() }}
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<style scoped>
  td {
    white-space: nowrap;
  }
  .group {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
  .profile {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  .profile-fields {
    display: grid;
    grid-template-columns: auto;

    p {
      margin: 0.25em;
      text-align: start;
    }
    span {
      display: grid;
      grid-auto-columns: minmax(0, 1fr);
      grid-auto-flow: column;
    }
  }

</style>