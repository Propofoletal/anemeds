<template>
  <div id="app">
    <h1>Anesthetic Drugs</h1>
    <div v-for="drug in drugs" :key="drug.name" class="drug">
      <h2>{{ drug.name }}</h2>
      <p><strong>Doses:</strong> <span v-html="formatDoses(drug.doses)"></span></p>
      <p><strong>Effects:</strong> {{ drug.effects }}</p>
      <p><strong>Notes:</strong> {{ drug.notes }}</p>
      <textarea v-model="drug.notes" placeholder="Add notes" @input="saveNotes"></textarea>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const drugs = ref([])

    const loadDrugs = async () => {
      try {
        const response = await fetch('/drugs.json')
        drugs.value = await response.json()
      } catch (error) {
        console.error('Error loading drugs:', error)
      }
    }

    const formatDoses = (doses) => {
      return doses.replace(/\n/g, '<br>')
    }

    const saveNotes = () => {
      localStorage.setItem('drugsNotes', JSON.stringify(drugs.value.map(d => ({ name: d.name, notes: d.notes }))))
    }

    onMounted(() => {
      loadDrugs().then(() => {
        const savedNotes = JSON.parse(localStorage.getItem('drugsNotes') || '[]')
        drugs.value.forEach(drug => {
          const saved = savedNotes.find(s => s.name === drug.name)
          if (saved) drug.notes = saved.notes
        })
      })
    })

    return {
      drugs,
      formatDoses,
      saveNotes
    }
  }
}
</script>

<style>
.drug {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
textarea {
  width: 100%;
  height: 60px;
}
</style>