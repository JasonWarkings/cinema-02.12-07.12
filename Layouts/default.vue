<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a @click="router.push('/')" class="navbar-brand" href="#">Cinema</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>

        </ul>
        <template v-if="!authStore.authData">
          <button @click="$router.push('/signup')" class="btn btn-outline-success me-2" type="submit">SignUp</button>
          <button @click="$router.push('/signin')" type="button" class="btn btn-outline-info">SignIn</button>
        </template>
        <template v-else>
          <NuxtLink to="/profile" class="navbar-link">Profile</NuxtLink>
          <button @click="logout" type="button" class="btn btn-outline-danger">Quit</button>
        </template>
      </div>
    </div>
  </nav>
  <div class="container">
    <slot />
  </div>
  <footer class="bg-dark text-white p-3 mt-3">
    <div class="container text-center">
      <p class="lead">kilka</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useAuthStore } from "#imports";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  try {
    await authStore.signout();
    await router.push('/');
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};
</script>