<script setup lang="ts">
import {useReviewStore} from "~/stores/review";
import {useAuthStore} from "#imports";

const filmStore = useFilmStore();
const route = useRoute();
const reviewStore = useReviewStore();
const authStore = useAuthStore()
filmStore.fetchfilmById(route.params.id);
reviewStore.fetchReviewsByFilmId(route.params.id);
const message = ref('');
const sendReview =async () => {
  await reviewStore.addReview({
    film_id: route.params.id,
    message: message.value,
  });
  alert('Your review has been added successfully!');
}
</script>

<template>
  <template v-if="filmStore.film">
    <div class="row">
      <div class="col-md-2">
        <h2>{{ filmStore.film.ratingAvg }} </h2>
      </div>
      <div class="col-md-8">
        <iframe width="750" height="450" :src="filmStore.film.link_video"></iframe>
      </div>
      <div v-if="authStore.authData" class="col-md-2">
        <rating-stars :film-id="filmStore.film.id"/>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1>{{ filmStore.film.name }}</h1>
      </div>
      <div class="col-vd-8 fs-4">
        {{ filmStore.film.duration }} min. |
        {{ filmStore.film.country_name }}
        {{ filmStore.film.year_of_issue }} |
        {{ filmStore.film.age }}+
        {{ filmStore.film.careated_at }} |
        <template
            v-for="category in filmStore.film.categories"
            :key="category.id">
          {{category.name}},
        </template>
      </div>
      <div class="col-md-4 fs-4 text-end">
        <a href="#">Kinopoisk</a>
      </div>
    </div>
    <div v-if="authStore.authData" class="row-mt-5 fs-4">
      <div class="col-md-10">
        <label for="exampleFormControlTextarea1" class="form-label">Add review</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="message"></textarea>
      </div>
      <div class="col-md-2 d-flex flex-column-reverse">
        <button class="btn btn-outline-success" @click="sendReview">Send</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 fs-4 mt-2">Reviews</div>
      <div
          v-for="review in reviewStore.reviews"
          :key="review.id"
          class="row">
        <div class="col">
          <div class="row">
            <div class="col-md-10 fw-bold fs-5">{{ review.user.fio }}</div>
            <div class="col-md-2 text-end">{{ review.created_at }}</div>
          </div>
          <div class="row">
            <div class="col fs-4">{{ review.message }}</div>
          </div>
        </div>
        <div class="col-12">
          <hr class="border border-success border-2 opacity-50">
        </div>
      </div>
    </div>
  </template>
  <div v-else class="d-flex justify-content-center mt-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
<style scoped>

</style>
