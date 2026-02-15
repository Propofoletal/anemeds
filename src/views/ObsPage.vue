<template>
  <div class="obs-page">
    <div class="page-header">
      <router-link to="/" class="back-button">← Back to Home</router-link>
      <h1>Obs Anaesthesia</h1>
    </div>

    <!-- OBS Drugs Section -->
    <div class="category-section">
      <div
        class="category-header obs-drugs-header"
        @click="toggleCategory('obs-drugs')"
      >
        <h2>OBS Drugs</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['obs-drugs'] }">▼</span>
      </div>

      <div v-show="expandedCategories['obs-drugs']" class="category-drugs">
        <div v-for="drug in drugs" :key="drug.name" class="drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> <span v-html="formatDoses(drug.doses)"></span></p>
            <p v-if="drug.effects"><strong>Effects:</strong> {{ drug.effects }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ObsPage',
  setup() {
    const drugs = ref([])
    const expandedCategories = ref({})

    const loadDrugs = async () => {
      try {
        const response = await fetch('/obs-drugs.json')
        drugs.value = await response.json()
      } catch (error) {
        console.error('Error loading OBS drugs:', error)
      }
    }

    const formatDoses = (doses) => {
      return doses.replace(/\n/g, '<br>')
    }

    const saveNotes = () => {
      localStorage.setItem('obsDrugsNotes', JSON.stringify(drugs.value.map(d => ({ name: d.name, notes: d.notes }))))
    }

    const toggleCategory = (categoryId) => {
      expandedCategories.value[categoryId] = !expandedCategories.value[categoryId]
      localStorage.setItem('obsExpandedCategories', JSON.stringify(expandedCategories.value))
    }

    const loadExpandedState = () => {
      const saved = localStorage.getItem('obsExpandedCategories')
      if (saved) {
        expandedCategories.value = JSON.parse(saved)
      } else {
        // Default: collapse all categories on first visit
        expandedCategories.value['obs-drugs'] = false
      }
    }

    onMounted(() => {
      loadDrugs().then(() => {
        const savedNotes = JSON.parse(localStorage.getItem('obsDrugsNotes') || '[]')
        drugs.value.forEach(drug => {
          const saved = savedNotes.find(s => s.name === drug.name)
          if (saved) drug.notes = saved.notes
        })
        loadExpandedState()
      })
    })

    return {
      drugs,
      expandedCategories,
      formatDoses,
      saveNotes,
      toggleCategory
    }
  }
}
</script>

<style scoped>
.obs-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30px;
}

.back-button {
  display: inline-block;
  margin-bottom: 15px;
  padding: 8px 16px;
  background: #FF6B9D;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background 0.2s;
}

.back-button:hover {
  background: #ff5589;
}

h1 {
  text-align: center;
  color: #333;
  margin: 0 0 30px 0;
  font-size: 28px;
}

.category-section {
  margin-bottom: 40px;
}

.category-header {
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 0;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.2s;
}

.obs-drugs-header {
  background: #FF6B9D;
  color: white;
}

.category-header:hover {
  opacity: 0.9;
}

.category-header:active {
  opacity: 0.8;
}

.category-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  flex: 1;
}

.chevron {
  font-size: 16px;
  transition: transform 0.3s ease;
  display: inline-block;
  margin-left: 10px;
}

.chevron.expanded {
  transform: rotate(-180deg);
}

.category-drugs {
  margin-top: 0;
}

.drug {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 8px solid #FF6B9D;
}

.category-drugs .drug:first-of-type {
  border-radius: 4px 4px 0 0;
  margin-top: 0;
}

.category-drugs .drug:last-of-type {
  border-radius: 0 0 4px 4px;
  margin-bottom: 0;
}

.drug-name {
  margin: -10px -15px 10px -15px;
  padding: 8px 15px;
  font-size: 20px;
  border-radius: 4px 4px 0 0;
  word-wrap: break-word;
  font-weight: bold;
}

.drug-info {
  padding: 0;
}

.drug-info p {
  margin: 10px 0;
  line-height: 1.6;
}

.drug-info strong {
  color: #555;
  font-weight: 600;
}

.notes-section {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

textarea {
  width: 100%;
  min-height: 80px;
  margin-top: 8px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  -webkit-appearance: none;
  appearance: none;
}

textarea:focus {
  outline: none;
  border-color: #FF6B9D;
  box-shadow: 0 0 0 2px rgba(255, 107, 157, 0.1);
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .obs-page {
    padding: 10px;
  }

  h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  .category-section {
    margin-bottom: 25px;
  }

  .category-header {
    padding: 12px 15px;
    border-radius: 6px;
  }

  .category-header h2 {
    font-size: 18px;
  }

  .chevron {
    font-size: 14px;
  }

  .drug {
    padding: 12px;
    margin-bottom: 8px;
  }

  .drug-name {
    margin: -10px -12px 10px -12px;
    padding: 10px 12px;
    font-size: 17px;
    line-height: 1.3;
  }

  .drug-info p {
    margin: 8px 0;
    font-size: 15px;
    line-height: 1.5;
  }

  .drug-info strong {
    display: block;
    margin-bottom: 4px;
  }

  .notes-section {
    margin-top: 12px;
    padding-top: 8px;
  }

  textarea {
    min-height: 70px;
    font-size: 16px;
    padding: 12px;
  }
}

/* Extra small phones */
@media (max-width: 480px) {
  .obs-page {
    padding: 8px;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .category-header {
    padding: 10px 12px;
  }

  .category-header h2 {
    font-size: 16px;
  }

  .chevron {
    font-size: 12px;
  }

  .drug {
    padding: 10px;
    border-left-width: 5px;
  }

  .drug-name {
    margin: -8px -10px 8px -10px;
    padding: 8px 10px;
    font-size: 16px;
  }

  .drug-info p {
    font-size: 14px;
  }

  textarea {
    min-height: 60px;
    font-size: 16px;
  }
}

@media print {
  .back-button {
    display: none;
  }

  .drug {
    page-break-inside: avoid;
  }

  textarea {
    border: none;
    background: transparent;
  }
}
</style>
