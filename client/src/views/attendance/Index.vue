<script setup>
  import { onMounted, ref } from 'vue'
  import { RouterLink } from 'vue-router'
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

  const data = ref(null)
  const date = ref([])
  const listAscending = ref(true)
  const fakeData = ref(new Array(20))

  const getAttendance = async () => {
      // Create request from date input
      let body = {}

      if (date.value[0]) body.from = date.value[0]
      if (date.value[1]) body.to = date.value[1]

      // Send request for data to database
      const request = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      const response = await fetch('http://localhost:2000/get/attendance/', request)

      // Updates local data with database response
      data.value = await response.json()
  }

  const dateStringToHourMinute = (string) => {
    const date = new Date(string)

    // Check if timestamp is a date, if not, return arg
    if (date instanceof Date && !isNaN(date)) {
      const hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()

      return `${hour}:${minutes}`
    } else {
      return date
    }
  }

  const isLAte = (string) => {
    const time = new Date(string)
    const hour = time.getHours()

    if (hour >= 9) return true
    return false
  }

  onMounted( async () => {
    getAttendance()
  })
</script>

<template>
  <main>
    <div class="title">
      <span style="display: flex; gap: 1rem">
        <FloatLabel>
          <Calendar
            v-model="date"
            showButtonBar
            selectionMode="range"
          />
          <label>Date input</label>
        </FloatLabel>
        <Button
          label="Search"
          @click="getAttendance()"
        />
        <Button
          label="Reset"
          severity="danger"
          :disabled="date === null"
          @click="date = []; getAttendance()"
        />
      </span>
      <ToggleButton
        v-model="listAscending"
        @click="data.reverse()"
        onLabel="Ascending"
        onIcon="pi pi-sort-up-fill"
        offLabel="Descending"
        offIcon="pi pi-sort-down-fill"
      />
    </div>
    <Accordion :multiple="true" :activeIndex="[0]">
      <template v-for="attendance in data" v-bind:key="attendance._id">
        <AccordionTab>
          <template #header>
            <span style="display: flex; justify-content: space-between; width: 100%;">
              <span class="font-bold white-space-nowrap">{{ attendance.year }} / {{ attendance.month }} / {{ attendance.day }}</span>
              <Badge :value="attendance.messages.length" severity="secondary"/>
            </span>
          </template>
          <DataTable :value="attendance.messages" size="small" tableStyle="min-width: 50rem" sortMode="multiple">
            <Column field="date" header="Time" sortable>
              <template #body="slotProps">
                <span :class="{late: isLAte(slotProps.data.date)}">
                  {{ dateStringToHourMinute(slotProps.data.date) }}
                </span>
              </template>
            </Column>
            <Column field="user_name" header="Name" >
              <template #body="slotProps">
                <RouterLink :to="'/users/' + slotProps.data.user_ref">{{ slotProps.data.user_name }}</RouterLink>
              </template>
            </Column>
            <Column field="message" header="Message" style="width: 100%" ></Column>
            <Column field="tags" header="Tags" sortable >
              <template #body="slotProps">
                <Tag v-for="tag in slotProps.data.tags" v-bind:key="tag" value="Hjemmekontor"></Tag>
              </template>
            </Column>
          </DataTable>
        </AccordionTab>
      </template>
    </Accordion>
    <div v-if="!data">
      <Accordion :activeIndex="0">
          <AccordionTab header="Loading...">
            <DataTable :value="fakeData">
              <Column field="code" header="Time" style="width: 10%">
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
              <Column field="name" header="Name" style="width: 20%">
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
              <Column field="category" header="Message" style="width: 60%">
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
              <Column field="quantity" header="Tags" style="width: 10%">
                <template #body>
                  <Skeleton></Skeleton>
                </template>
              </Column>
            </DataTable>
          </AccordionTab>
      </Accordion>
    </div>
  </main>
</template>

<style>
  main {
    display: flex;
    flex-flow: column nowrap;
    gap: 2rem;
  }
  td {
    white-space: nowrap;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;

    :is(button) {
      padding: 0.5rem;
      color: #fff;
      background-color: var(--vt-c-black-soft);
      border: none;
      border-radius: 10px;
    }
    :is(button):hover {
      background-color: var(--vt-c-black-mute);
    }
  }
  .attendance {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }
  .header {
    display: flex;
    gap: 1rem;
    align-items: center;

    background-color: var(--vt-c-black-soft);
  }
  .messages {
    display: flex;
    gap: 1rem;
  }
  .late {
    color: red;
  }
</style>
