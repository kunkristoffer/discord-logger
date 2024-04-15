<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import Tag from 'primevue/tag'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Card from 'primevue/card'

  const route = useRoute()
  const user = ref(null)
  const stats = ref(null)

  const fetchUser = async () => {
    const response = await fetch('http://localhost:2000/get/user/' + route.params.id)
    user.value = await response.json()
  }

  const calculateStats = () => {
    const attendance = user.value.messages.length




    stats.value = {...attendance}
  }

  const formatDate = (string) => {
    return new Date(string).toLocaleString()
  }

  onMounted( async () => {
    fetchUser()
    calculateStats()
  })
</script>

<template>
  <main>
    <div v-if="!user">Loading...</div>
    <div v-if="user" class="user">
      <div class="profile">
        <Card style="width: 50%; overflow: hidden">
          <template #title>{{ user.discord_username }}</template>
          <template #content>
            <div class="profile-fields">
              <span>
                <b>First name</b>
                <p>{{ user.first_name || 'undefined' }}</p>
              </span>
              <span style="margin-bottom: 0.5rem;">
                <b>Last name</b>
                <p>{{ user.last_name || 'undefined' }}</p>
              </span>
              <span>
                <b>Joined</b>
                <p>{{ formatDate(user.joined) }}</p>
              </span>
              <span style="margin-bottom: 0.5rem;">
                <b>Updated</b>
                <p>{{ formatDate(user.updated) }}</p>
              </span>
              <span>
                <b>Discord uid</b>
                <p>{{ user.discord_id }}</p>
              </span>
              <span>
                <b>Group</b>
                <RouterLink :to="'/groups/' + user.group?.name">{{ user.group?.name }}</RouterLink>
              </span>
            </div>
          </template>
        </Card>
        <Card style="width: 50%; overflow: hidden">
          <template #title>Statistics</template>
          <template #content>
            <div class="profile-fields">
              {{ stats }}
              <span>
                <b>Attendance</b>
                <p>95%</p>
              </span>
              <span style="margin-bottom: 0.5rem;">
                <b>Absence</b>
                <p>5%</p>
              </span>
              <span>
                <b>Late</b>
                <p>10%</p>
              </span>
              <span style="margin-bottom: 0.5rem;">
                <b>Remote</b>
                <p>20%</p>
              </span>
              <span>
                <b>Avarge checkin</b>
                <p>08:30</p>
              </span>
            </div>
          </template>
        </Card>
      </div>
      <DataTable :value="user.messages" size="small" tableStyle="min-width: 50rem" sortMode="multiple">
        <Column field="date" header="Time" sortable >
          <template #body="slotProps">
            {{ formatDate(slotProps.data.date) }}
          </template>
        </Column>
        <Column field="message" header="Message" style="width: 100%" ></Column>
        <Column field="tags" header="Tags" sortable >
          <template #body="slotProps">
            <Tag v-for="tag in slotProps.data.tags" v-bind:key="tag" value="Hjemmekontor"></Tag>
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<style>
  td {
    white-space: nowrap;
  }
  .user {
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
  .messages {
    display: flex;
    gap: 1rem;
    width: clamp(200px, 100%, 50svw);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
