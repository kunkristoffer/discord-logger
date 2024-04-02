<script setup>
  import { ref, watch } from "vue"
  import Calendar from 'primevue/calendar'
  import FloatLabel from 'primevue/floatlabel'
  import InputNumber from 'primevue/inputnumber'
  import Button from 'primevue/button'

  const date = ref()
  const offset = ref()
  const ready = ref(false)
  const responseMessage = ref(null)

  watch(date, () => {
    if (date.value instanceof Date && !isNaN(date.value)) {
      ready.value = true
    }
    else {
      ready.value = false
    }
  })

  const submit = async () => {
    if (offset.value < 1 || offset.value === undefined) offset.value = 1
    const from = date.value.getTime()
    const to = date.value.getTime() + ( offset.value * 60 * 60 * 1000 )

    try {
      const body = { "from": from, "to": to }
      const request = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
      const response = await fetch('http://localhost:2000/post/attendance/testdata', request)
      const data = await response.json()

      responseMessage.value = data
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
      <Button label="Create" :disabled="!ready" @click="submit(); ready = true" />
      <Button v-if="responseMessage !== null" label="Clear log" @click="responseMessage = null" severity="warning" />
    </div>
    <pre>{{ responseMessage }}</pre>
    <p>https://www.epochconverter.com/</p>
    <p>https://dev.to/hoanganhlam/javascript-date-cheat-sheet-ikp</p>
  </main>
</template>

<style scoped>
  .date-input {
    display: flex;
    gap: 2rem
  }
</style>