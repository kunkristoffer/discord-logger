<script setup>
  import { ref, watch } from "vue"
  import Calendar from 'primevue/calendar'
  import FloatLabel from 'primevue/floatlabel'
  import InputNumber from 'primevue/inputnumber'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'

  const date = ref()
  const offset = ref()
  const groupName = ref('')
  const ready = ref(false)
  const showResponse = ref(false)
  const responseMessage = ref(null)

  watch(date, () => {
    if (date.value instanceof Date && !isNaN(date.value)) {
      ready.value = true
    }
    else {
      ready.value = false
    }
  })

  const createAttendance = async () => {
    if (offset.value < 1 || offset.value === undefined) offset.value = 1
    const from = date.value.getTime()
    const to = date.value.getTime() + ( offset.value * 60 * 60 * 1000 )

    try {
      const body = { "from": from, "to": to }
      const request = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      const response = await fetch('http://localhost:2000/post/attendance/testdata', request)
      const data = await response.json()

      responseMessage.value = data
      showResponse.value = true
    } catch (err) {
      console.log(err.message)
    }
  }

  const createGroup = async () => {
    try {
      const request = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "name": groupName.value }) }
      const response = await fetch('http://localhost:2000/post/group', request)
      const data = await response.json()

      responseMessage.value = data
      showResponse.value = true
    } catch (err) {
      console.log(err.message)
    }
  }
</script>

<template>
  <main>
    <h1>create attendance entry</h1>
    <div class="date-input">
      <FloatLabel>
        <Calendar id="calendar" v-model="date" showTime hourFormat="24" showButtonBar />
        <label for="calendar">Pick a date</label>
      </FloatLabel>
      <FloatLabel>
        <InputNumber id="offset" v-model="offset" />
        <label for="offset">How many hours?</label>
      </FloatLabel>
      <Button label="Create" :disabled="!ready" @click="createAttendance(); ready = true" />
      <Button v-if="responseMessage !== null" label="Clear log" @click="responseMessage = null" severity="warning" />
    </div>
    <h1>create group entry</h1>
    <div class="date-input">
      <FloatLabel>
        <InputText id="groupname" v-model="groupName" :invalid="groupName.length > 3" />
        <label for="groupname">Group name?</label>
      </FloatLabel>
      <Button label="Create" :disabled="groupName.length !== 3" @click="createGroup(); ready = true" />
    </div>
    <br>
    <h1>Misc usefull links during dev</h1>
    <ul>
      <li><a href="https://www.epochconverter.com/">https://www.epochconverter.com/</a></li>
      <li><a href="https://dev.to/hoanganhlam/javascript-date-cheat-sheet-ikp">https://dev.to/hoanganhlam/javascript-date-cheat-sheet-ikp</a></li>
    </ul>
    <Dialog v-model:visible="showResponse" maximizable modal header="Result" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <pre>{{ responseMessage }}</pre>
    </Dialog>
  </main>
</template>

<style scoped>
  .date-input {
    display: flex;
    gap: 2rem
  }
</style>