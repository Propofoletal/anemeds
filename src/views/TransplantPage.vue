<template>
  <div class="transplant-page">
    <div class="page-header">
      <router-link to="/" class="back-button">← Back to Home</router-link>
      <h1>Transplant Anaesthesia</h1>
    </div>

    <div class="placeholder">
      <div class="icon">🫀</div>
      <h2>Coming Soon</h2>
      <p>Transplant anaesthesia protocols and considerations will be available here.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransplantPage'
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
  margin-bottom: 50px;
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
  margin: 0 0 30px 0;
  font-size: 28px;
}

.placeholder {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.placeholder h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
}

.placeholder p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .transplant-page {
    padding: 10px;
  }

  h1 {
    font-size: 22px;
  }

  .placeholder {
    padding: 60px 15px;
  }

  .icon {
    font-size: 60px;
  }

  .placeholder h2 {
    font-size: 24px;
  }

  .placeholder p {
    font-size: 15px;
  }
}
</style>
