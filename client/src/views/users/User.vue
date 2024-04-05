<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import Accordion from 'primevue/accordion'
  import AccordionTab from 'primevue/accordiontab'
  import ToggleButton from 'primevue/togglebutton'
  import Tag from 'primevue/tag'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import Skeleton from 'primevue/skeleton'
  import Calendar from 'primevue/calendar'
  import Badge from 'primevue/badge'
  import FloatLabel from 'primevue/floatlabel'
  import Button from 'primevue/button'

  const route = useRoute()
  const user = ref(null)

  const fetchUser = async () => {
    const response = await fetch('http://localhost:2000/get/user/' + route.params.id)
    user.value = await response.json()
  }

  const formatDate = (string) => {
    return new Date(string).toLocaleString()
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
        <span>Discord usernames: [{{ user.user_name }}]</span>
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
