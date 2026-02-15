<template>
  <div class="transplant-page">
    <div class="page-header">
      <router-link to="/" class="back-button">← Back to Home</router-link>
      <h1>Transplant Anaesthesia</h1>
      <p class="subtitle">Paediatric Liver Transplant IV Drug Doses</p>
      <p class="source">Adapted from Evelina Children's Hospital Drug Aide Memoire, BNF and Medusa</p>
    </div>

    <!-- Induction Agents -->
    <div class="category-section">
      <div
        class="category-header induction-header"
        @click="toggleCategory('induction')"
      >
        <h2>Induction Agents</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['induction'] }">▼</span>
      </div>
      <div v-show="expandedCategories['induction']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('induction')" :key="drug.name" class="drug induction-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Muscle Relaxants -->
    <div class="category-section">
      <div
        class="category-header muscle-relaxants-header"
        @click="toggleCategory('muscle-relaxants')"
      >
        <h2>Muscle Relaxants</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['muscle-relaxants'] }">▼</span>
      </div>
      <div v-show="expandedCategories['muscle-relaxants']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('muscle-relaxants')" :key="drug.name" class="drug muscle-relaxants-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Blood Products -->
    <div class="category-section">
      <div
        class="category-header blood-products-header"
        @click="toggleCategory('blood-products')"
      >
        <h2>Blood Products</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['blood-products'] }">▼</span>
      </div>
      <div v-show="expandedCategories['blood-products']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('blood-products')" :key="drug.name" class="drug blood-products-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Emergency Drugs -->
    <div class="category-section">
      <div
        class="category-header emergency-header"
        @click="toggleCategory('emergency')"
      >
        <h2>Emergency Drugs</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['emergency'] }">▼</span>
      </div>
      <div v-show="expandedCategories['emergency']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('emergency')" :key="drug.name" class="drug emergency-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Antibiotics -->
    <div class="category-section">
      <div
        class="category-header antibiotics-header"
        @click="toggleCategory('antibiotics')"
      >
        <h2>Antibiotics</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['antibiotics'] }">▼</span>
      </div>
      <div v-show="expandedCategories['antibiotics']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('antibiotics')" :key="drug.name" class="drug antibiotics-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <p v-if="drug.notes && drug.notes !== ''"><strong>Info:</strong> {{ drug.notes }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.userNotes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Antiemetics -->
    <div class="category-section">
      <div
        class="category-header antiemetics-header"
        @click="toggleCategory('antiemetics')"
      >
        <h2>Antiemetics</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['antiemetics'] }">▼</span>
      </div>
      <div v-show="expandedCategories['antiemetics']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('antiemetics')" :key="drug.name" class="drug antiemetics-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Other Useful Drugs -->
    <div class="category-section">
      <div
        class="category-header other-drugs-header"
        @click="toggleCategory('other-drugs')"
      >
        <h2>Other Useful Drugs</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['other-drugs'] }">▼</span>
      </div>
      <div v-show="expandedCategories['other-drugs']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('other-drugs')" :key="drug.name" class="drug other-drugs-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- IV Analgesia -->
    <div class="category-section">
      <div
        class="category-header analgesia-header"
        @click="toggleCategory('analgesia')"
      >
        <h2>IV Analgesia</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['analgesia'] }">▼</span>
      </div>
      <div v-show="expandedCategories['analgesia']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('analgesia')" :key="drug.name" class="drug analgesia-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- IV Infusions -->
    <div class="category-section">
      <div
        class="category-header infusions-header"
        @click="toggleCategory('infusions')"
      >
        <h2>IV Infusions</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['infusions'] }">▼</span>
      </div>
      <div v-show="expandedCategories['infusions']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('infusions')" :key="drug.name" class="drug infusions-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
            <div class="notes-section">
              <strong>Notes:</strong>
              <textarea v-model="drug.notes" placeholder="Add your notes here..." @input="saveNotes"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pre-medications -->
    <div class="category-section">
      <div
        class="category-header premedications-header"
        @click="toggleCategory('premedications')"
      >
        <h2>Pre-medications</h2>
        <span class="chevron" :class="{ expanded: expandedCategories['premedications'] }">▼</span>
      </div>
      <div v-show="expandedCategories['premedications']" class="category-drugs">
        <div v-for="drug in getDrugsByCategory('premedications')" :key="drug.name" class="drug premedications-drug">
          <h3 class="drug-name">{{ drug.name }}</h3>
          <div class="drug-info">
            <p><strong>Doses:</strong> {{ drug.doses }}</p>
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
  name: 'TransplantPage',
  setup() {
    const drugs = ref([])
    const expandedCategories = ref({})

    const loadDrugs = async () => {
      try {
        const response = await fetch('/paeds-transplant-drugs.json')
        drugs.value = await response.json()
      } catch (error) {
        console.error('Error loading paediatric transplant drugs:', error)
      }
    }

    const getDrugsByCategory = (category) => {
      return drugs.value.filter(drug => drug.category === category)
    }

    const saveNotes = () => {
      localStorage.setItem('paedstransplantDrugsNotes', JSON.stringify(drugs.value.map(d => ({ name: d.name, notes: d.notes }))))
    }

    const toggleCategory = (categoryId) => {
      expandedCategories.value[categoryId] = !expandedCategories.value[categoryId]
      localStorage.setItem('transplantExpandedCategories', JSON.stringify(expandedCategories.value))
    }

    const loadExpandedState = () => {
      const saved = localStorage.getItem('transplantExpandedCategories')
      if (saved) {
        expandedCategories.value = JSON.parse(saved)
      } else {
        // Default: collapse all categories on first visit
        const categories = ['induction', 'muscle-relaxants', 'blood-products', 'emergency', 'antibiotics', 'antiemetics', 'other-drugs', 'analgesia', 'infusions', 'premedications']
        categories.forEach(cat => {
          expandedCategories.value[cat] = false
        })
      }
    }

    onMounted(() => {
      loadDrugs().then(() => {
        const savedNotes = JSON.parse(localStorage.getItem('paedstransplantDrugsNotes') || '[]')
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
      getDrugsByCategory,
      saveNotes,
      toggleCategory
    }
  }
}
</script>

<style scoped>
.transplant-page {
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
  background: #9C27B0;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background 0.2s;
}

.back-button:hover {
  background: #8e24aa;
}

h1 {
  text-align: center;
  color: #333;
  margin: 0 0 10px 0;
  font-size: 28px;
}

.subtitle {
  text-align: center;
  color: #555;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
}

.source {
  text-align: center;
  color: #777;
  font-size: 13px;
  font-style: italic;
  margin: 0 0 30px 0;
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

/* Category Colors matching PDF */
.induction-header {
  background: #FFD700;
  color: black;
}

.muscle-relaxants-header {
  background: rgb(245,64,41);
  color: black;
}

.blood-products-header {
  background: #FF8C00;
  color: white;
}

.emergency-header {
  background: rgb(222,191,217);
  color: black;
}

.antibiotics-header {
  background: #f5f5f5;
  color: black;
  border: 2px solid #ddd;
}

.antiemetics-header {
  background: #FF8C00;
  color: white;
}

.other-drugs-header {
  background: #E8E4DC;
  color: black;
}

.analgesia-header {
  background: rgb(133,199,227);
  color: black;
}

.infusions-header {
  background: #333;
  color: white;
}

.premedications-header {
  background: #FF8C00;
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
}

.induction-drug {
  border-left: 8px solid #FFD700;
}

.muscle-relaxants-drug {
  border-left: 8px solid rgb(245,64,41);
}

.blood-products-drug {
  border-left: 8px solid #FF8C00;
}

.emergency-drug {
  border-left: 8px solid rgb(222,191,217);
}

.antibiotics-drug {
  border-left: 8px solid #999;
}

.antiemetics-drug {
  border-left: 8px solid #FF8C00;
}

.other-drugs-drug {
  border-left: 8px solid #999;
}

.analgesia-drug {
  border-left: 8px solid rgb(133,199,227);
}

.infusions-drug {
  border-left: 8px solid #333;
}

.premedications-drug {
  border-left: 8px solid #FF8C00;
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
  border-color: #9C27B0;
  box-shadow: 0 0 0 2px rgba(156, 39, 176, 0.1);
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .transplant-page {
    padding: 10px;
  }

  h1 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 16px;
  }

  .source {
    font-size: 12px;
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
  .transplant-page {
    padding: 8px;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 6px;
  }

  .subtitle {
    font-size: 14px;
  }

  .source {
    font-size: 11px;
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
