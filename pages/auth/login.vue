<template>
  <div class="login-page">
    <div class="login-container">
      <UAlert v-if="showAlert" :description="alertDescription" :title="alertTitle" @close="showAlert = false" />
      <div>
        <h1 class="title">Login Page</h1>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <UInput type="email" id="email" v-model="form.email" color="white" variant="outline" placeholder="Email" icon="i-heroicons-envelope" required />
        </div>
        <div class="form-group">
          <UInput v-model="form.password" type="password" id="password" required color="white" variant="outline" placeholder="Password" />
        </div>
        <div class="register-text">
          <p>Belum punya akun? <NuxtLink to="/auth/register" class="daftar-text">Daftar Disini</NuxtLink></p>
        </div>
        <UButton class="button" block type="submit">Login</UButton>
      </form>
    </div>
  </div>
  
</template>

<script setup>
definePageMeta({
  layout: false
});
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const form = ref({
  email: '',
  password: '',
});
const router = useRouter();
const showAlert = ref(false);
const alertTitle = ref('');
const alertDescription = ref('');
const login = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    email: form.value.email,
    password: form.value.password,
  }),
    });
    const data = await response.json();
    // Asumsikan API mengembalikan token di dalam data.token
    const token = data.token;
    if (data.response_code === 404 || !token) {
      throw new Error('Login failed');
    }
    // Simpan token ke localStorage
    localStorage.setItem('authToken', token);

    // Redirect ke halaman dashboard atau halaman lain setelah login
    router.push({ path: '/main/dashboard' });
  } catch (error) {
    console.error('Login failed:', error);
    alertTitle.value = 'Login Failed';
    alertDescription.value = 'Check Your Email and Password';
    showAlert.value = true;
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.title{
  display: flex;
  margin-bottom: 15px;
  font-size : 30px;
  font-weight: bold;
}
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.register-text{
  margin-bottom: 15px;
}
.daftar-text{
  color: blue;
}
</style>
