<template>
  <div id="app">
    <h1>Anaesthetic Drugs</h1>

    <div v-for="category in categoryOrder" :key="category.id" class="category-section">
      <div class="category-header" :style="getCategoryHeaderStyle(category.id)">
        <h2>{{ category.name }}</h2>
      </div>

      <div v-for="drug in getDrugsByCategory(category.id)" :key="drug.name" class="drug" :style="getDrugStyle(category.id)">
        <h3 class="drug-name" :style="getDrugNameStyle(category.id)">{{ drug.name }}</h3>
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
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const drugs = ref([])

    // ISO 26825:2020 Category definitions with RGB colors
    const categoryConfig = {
      'induction': {
        name: 'Induction Drugs',
        bgColor: 'rgb(255, 255, 0)', // Yellow
        textColor: 'black',
        order: 1
      },
      'muscle-relaxant': {
        name: 'Muscle Relaxants',
        bgColor: 'rgb(245, 64, 41)', // Warm red
        textColor: 'black',
        order: 2
      },
      'suxamethonium': {
        name: 'Suxamethonium',
        bgColor: 'rgb(245, 64, 41)', // Warm red - same as muscle relaxants
        textColor: 'black',
        order: 3
      },
      'relaxant-reversal': {
        name: 'Muscle Relaxant Reversal',
        bgColor: 'rgb(245, 64, 41)',
        textColor: 'black',
        striped: true,
        blackLine: true,
        order: 4
      },
      'opioid': {
        name: 'Opioids',
        bgColor: 'rgb(133, 199, 227)', // Blue
        textColor: 'black',
        order: 5
      },
      'opioid-antagonist': {
        name: 'Opioid Antagonists',
        bgColor: 'rgb(133, 199, 227)', // Blue
        textColor: 'black',
        striped: true,
        order: 6
      },
      'local-anaesthetic': {
        name: 'Local Anaesthetics',
        bgColor: 'rgb(194, 184, 171)', // Grey
        textColor: 'black',
        order: 7
      },
      'vasopressor': {
        name: 'Vasopressors',
        bgColor: 'rgb(222, 191, 217)', // Violet
        textColor: 'black',
        order: 8
      },
      'vasopressor-adrenaline': {
        name: 'Vasopressors - Adrenaline',
        bgColor: 'rgb(222, 191, 217)', // Violet
        textColor: 'black',
        order: 9
      },
      'anticholinergic': {
        name: 'Anticholinergic Drugs',
        bgColor: 'rgb(163, 217, 99)', // Green
        textColor: 'black',
        order: 10
      },
      'benzodiazepine': {
        name: 'Benzodiazepines',
        bgColor: 'rgb(255, 102, 0)', // Orange
        textColor: 'white',
        order: 11
      },
      'benzodiazepine-antagonist': {
        name: 'Benzodiazepine Antagonists',
        bgColor: 'rgb(255, 102, 0)', // Orange
        textColor: 'black',
        striped: true,
        order: 12
      },
      'hypotensive': {
        name: 'Hypotensive Drugs',
        bgColor: 'rgb(222, 191, 217)', // Violet
        textColor: 'black',
        striped: true,
        order: 13
      },
      'antiemetic': {
        name: 'Anti-emetics',
        bgColor: 'rgb(237, 194, 130)', // Salmon
        textColor: 'black',
        order: 14
      },
      'miscellaneous': {
        name: 'Miscellaneous',
        bgColor: 'rgb(255, 255, 255)', // White
        textColor: 'black',
        border: true,
        order: 15
      }
    }

    const categoryOrder = computed(() => {
      return Object.keys(categoryConfig)
        .map(id => ({ id, ...categoryConfig[id] }))
        .sort((a, b) => a.order - b.order)
    })

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

    const getDrugsByCategory = (categoryId) => {
      return drugs.value.filter(drug => drug.category === categoryId)
    }

    const getCategoryHeaderStyle = (categoryId) => {
      const config = categoryConfig[categoryId]
      return {
        background: config.bgColor,
        color: config.textColor,
        border: config.border ? '2px solid black' : 'none'
      }
    }

    const getDrugStyle = (categoryId) => {
      const config = categoryConfig[categoryId]
      let style = {
        borderLeft: `8px solid ${config.bgColor}`,
      }

      if (config.striped) {
        style.position = 'relative'
      }

      return style
    }

    const getDrugNameStyle = (categoryId) => {
      const config = categoryConfig[categoryId]
      let style = {
        color: config.special === 'adrenaline' ? 'white' : 'inherit',
        fontWeight: 'bold'
      }

      if (config.special === 'adrenaline') {
        style.background = 'rgb(0, 0, 0)' // Black background for adrenaline
        style.padding = '8px 12px'
        style.margin = '-10px -15px 10px -15px'
      } else if (config.striped) {
        style.padding = '8px 12px'
        style.margin = '-10px -15px 10px -15px'
      }

      if (config.striped) {
        style.backgroundImage = `
          repeating-linear-gradient(
            45deg,
            ${config.bgColor},
            ${config.bgColor} 10px,
            white 10px,
            white 20px
          )
        `
      }

      if (config.blackLine) {
        style.borderBottom = '3px solid black'
      }

      return style
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
      categoryOrder,
      formatDoses,
      saveNotes,
      getDrugsByCategory,
      getCategoryHeaderStyle,
      getDrugStyle,
      getDrugNameStyle
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.category-section {
  margin-bottom: 40px;
}

.category-header {
  padding: 15px 20px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 0;
}

.category-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.drug {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.drug:first-of-type {
  border-radius: 0 0 0 4px;
}

.drug:last-of-type {
  border-radius: 0 0 4px 4px;
  margin-bottom: 0;
}

.drug-name {
  margin: -10px -15px 10px -15px;
  padding: 8px 15px;
  font-size: 20px;
  border-radius: 4px 4px 0 0;
  word-wrap: break-word;
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
  /* Improve mobile textarea experience */
  -webkit-appearance: none;
  appearance: none;
}

textarea:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  #app {
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
    border-radius: 6px 6px 0 0;
  }

  .category-header h2 {
    font-size: 18px;
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
    font-size: 16px; /* Prevents iOS zoom on focus */
    padding: 12px;
  }
}

/* Extra small phones */
@media (max-width: 480px) {
  #app {
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
  .drug {
    page-break-inside: avoid;
  }

  textarea {
    border: none;
    background: transparent;
  }
}
</style>
