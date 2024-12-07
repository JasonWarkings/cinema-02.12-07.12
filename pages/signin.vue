<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref('');
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    await authStore.signin({
      email: email.value,
      password: password.value,
    });
    await router.push('/');
  } catch (e: any) {
    errorMessage.value = e.message || 'Login failed';
  }
}
</script>
<template>
  <div class="login-container min-vh-100 d-flex align-items-center bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <h1 class="h3 fw-bold text-primary mb-3">Welcome Back</h1>
                <p class="text-muted">Sign in to continue to your account</p>
              </div>

              <form @submit.prevent="login">
                <!-- Email Input -->
                <div class="form-floating mb-3">
                  <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      required
                  >
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      required
                  >
                  <label for="floatingPassword">Password</label>
                </div>

                <div v-if="errorMessage" class="alert alert-danger mb-3" role="alert">
                  {{ errorMessage }}
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        value="remember-me"
                        id="flexCheckDefault"
                    >
                    <label class="form-check-label" for="flexCheckDefault">
                      Remember me
                    </label>
                  </div>
                  <a href="#" class="text-primary text-decoration-none">Forgot password?</a>
                </div>
                <button
                    class="btn btn-primary w-100 py-2 rounded-3"
                    type="submit"
                >
                  Sign In
                </button>
                <div class="text-center mt-3">
                  <p class="text-muted">
                    Don't have an account?
                    <a href="#" class="text-primary">Sign up</a>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center mt-3 text-muted">
            <small>&copy; 2024 Your Company. All Rights Reserved.</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  background: linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%);
}
.card {
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
.btn-primary {
  transition: all 0.3s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>