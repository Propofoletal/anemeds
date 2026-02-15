<template>
  <div class="home-page">
    <h1>Anaesthesia Reference</h1>
    <p class="subtitle">Quick reference guides for anaesthetic practice by BBL - for personal use only</p>

    <div class="section-grid">
      <router-link to="/drugs" class="section-card drugs-card">
        <div class="card-icon">💉</div>
        <h2>Anaesthetic Drugs</h2>
        <p>Drug reference with doses</p>
      </router-link>

      <router-link to="/obs" class="section-card obs-card">
        <div class="card-icon">🤰</div>
        <h2>Obs Anaesthesia</h2>
        <p>Obstetric anaesthesia</p>
      </router-link>

      <router-link to="/transplant" class="section-card transplant-card">
        <div class="card-icon">🏥</div>
        <h2>HPB Anaesthesia</h2>
        <p>HPB anaesthesia</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-size: 36px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 50px;
  font-size: 18px;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 900px;
}

.section-card {
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 3px solid transparent;
}

.section-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.drugs-card {
  border-color: #4CAF50;
}

.drugs-card:hover {
  background: #f1f8f4;
}

.obs-card {
  border-color: #FF6B9D;
}

.obs-card:hover {
  background: #fff5f8;
}

.transplant-card {
  border-color: #9C27B0;
}

.transplant-card:hover {
  background: #f8f4f9;
}

.card-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 20px;
}

.section-card h2 {
  margin: 0 0 12px 0;
  font-size: 24px;
  text-align: center;
  color: #333;
}

.section-card p {
  margin: 0;
  font-size: 15px;
  text-align: center;
  color: #666;
  line-height: 1.6;
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .home-page {
    padding: 30px 15px;
  }

  h1 {
    font-size: 28px;
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 40px;
  }

  .section-grid {
    gap: 20px;
  }

  .section-card {
    padding: 30px 20px;
  }

  .card-icon {
    font-size: 40px;
  }

  .section-card h2 {
    font-size: 20px;
  }

  .section-card p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 24px;
  }

  .section-grid {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 25px 15px;
  }
}
</style>
