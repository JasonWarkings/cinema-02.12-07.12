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
        <div v-if="activeTab === 'profile'" class="tab-content">
          <p>EMAIL: {{ user?.email }}</p>
          <p>BIRTHDAY: {{ user?.birthday }}</p>
          <p>GENDER: {{ user?.gender?.name }}</p>
          <div class="actions">
            <button @click="$router.push('/editProfile')">EDIT</button>
            <button class="delete" @click="deleteAccount">DELETE ACCOUNT</button>
          </div>
        </div>
        <div v-if="activeTab === 'reviews'" class="tab-content">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <p>{{ review.content }}</p>
            <div class="comments">
              <p v-for="comment in review.comments" :key="comment.id">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'scores'" class="tab-content">
          <p v-for="rating in ratings" :key="rating.id">{{ rating.value }}</p>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import {ref, onMounted} from 'vue';
import {useAuthStore} from '~/stores/auth';
import {useReviewStore} from '~/stores/review';
import {useRatingStore} from '~/stores/rating';
import {api} from '~/api/index.js';
import {useRouter} from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const reviewStore = useReviewStore();
    const ratingStore = useRatingStore();
    const user = ref(null);
    const activeTab = ref('profile');
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
    const deleteAccount = async () => {
      try {
        await authStore.deleteAccount();
        await router.push('/');
      } catch (e) {
        console.error("Ошибка при удалении аккаунта:", e.message);
      }
    };
    onMounted(() => {
      fetchUserData();
      reviewStore.fetchReviewsByFilmId();
      ratingStore.fetchRatingByUserId();
    });
    return {
      user,
      activeTab,
      reviews: reviewStore.reviews,
      ratings: ratingStore.ratings,
      signout: authStore.signout,
      deleteAccount,
    };
  },
};
</script>


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