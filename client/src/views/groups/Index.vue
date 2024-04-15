<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'

  const groups = ref(null)

  const fetchGroups = async () => {
    const response = await fetch('http://localhost:2000/get/groups/')
    groups.value = await response.json()
  }

  onMounted(() => {
    fetchGroups()
  })
</script>

<template>
  <main>
    <div class="user-table">
      <DataTable :value="groups">
        <Column field="name" header="Group name" sortable >
          <template #body="slotProps">
            <RouterLink :to="'/groups/' + slotProps.data.name">{{ slotProps.data.name }}</RouterLink>
          </template>
        </Column>
        <Column field="members" header="Member count" sortable >
          <template #body="slotProps">
            {{ slotProps.data.members.length }}
          </template>
        </Column>
        <Column field="created" header="Created" sortable>
          <template #body="slotProps">
            {{ new Date(slotProps.data.created).toUTCString() }}
          </template>
        </Column>
        <Column field="modified" header="Modified" sortable>
          <template #body="slotProps">
            {{ slotProps.data.modified && new Date(slotProps.data.modified).toUTCString() }}
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<style scoped>

</style>