<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRatingStore } from '~/stores/rating';
import {api} from "~/api";
const authStore = useAuthStore();
const ratingStore = useRatingStore();
const activeTab = ref('scores');
const fetchUserScores = async () => {
  try {
    await ratingStore.fetchRatingByUserId();
    console.log("Загруженные оценки:", ratingStore.ratings);
  } catch (e) {
    console.error("Ошибка при получении оценок:", e);
  }
};
const deleteRating = async (ratingId) => {
  try {
    await ratingStore.deleteRating(authStore.authData?.id, ratingId);
    fetchUserScores();
  } catch (e) {
    console.error("Ошибка при удалении оценки:", e.response ? e.response.data : e.message);
  }
};const user = ref(null);
const fetchUserData = async () => {
  try {
    const res = await api.get(`/users/${authStore.authData.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.authData.token}`,
      },
    });
    user.value = res.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};
onMounted(() => {
  fetchUserData();
});
onMounted(() => {
  if (authStore.authData?.id && authStore.authData?.token) {
    fetchUserScores();
  }
});
</script>

<template>
  <div class="profile-page">
    <header class="header">
      <div class="user-controls">
        <span>{{ user?.fio || 'User' }}</span>
      </div>
    </header>
    <main class="content">
      <section class="stats">
        <p>FIO: {{ user?.fio }}</p>
        <p>COUNT SCORES: {{ user?.ratingCount }}</p>
        <p>COUNT REVIEWS: {{ user?.reviewCount }}</p>
      </section>
      <section class="profile">
        <nav class="tabs">
          <button @click="$router.push('/profile')">MY PROFILE</button>
          <button @click="$router.push('/myReview')">MY REVIEWS</button>
          <button @click="$router.push('/myScores')">MY SCORES</button>
        </nav>
      </section>
    </main>
  </div>
  <div v-show="activeTab === 'scores'" class="tab-pane show">
    <div v-if="ratingStore.ratings.length > 0">
      <ul class="score-list">
        <li v-for="score in ratingStore.ratings" :key="score.id" class="score-item">
          <div class="score-details">
            <h5 class="score-title">{{ score.film.name }}</h5>
            <p class="score-text">Delivered: {{user?.fio }}</p>
            <p class="score-text">Star: {{ score.score }}</p>
            <p class="score-date"><small>Date: {{ score.created_at }}</small></p>
          </div>
          <button class="btn btn-danger" @click="deleteRating(score.id)">Remove</button>
        </li>
      </ul>
    </div>
    <p v-else>No scores yet.</p>
  </div>
</template>
<style scoped>
.profile-page {
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
}

.user-controls span {
  margin-right: 10px;
}

.content {
  padding: 20px;
}

.stats p {
  margin: 5px 0;
  font-size: 16px;
}

.profile {
  margin-top: 20px;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  flex-wrap: nowrap;
  height: 100%;
}

.tabs button {
  margin-right: 10px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  background: none;
  cursor: pointer;
  width: 40%;
}

.tabs button.active {
  background-color: #ddd;
  font-weight: bold;
}

.tab-content {
  border: 1px solid #ccc;
  padding: 20px;
}

.actions {
  margin-top: 20px;
}

.actions button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.actions .delete {
  background-color: red;
  color: white;
}
</style>