<template>
    <div class="login-page">
      <div class="login-container">
        <h1 class="title">Register Page</h1>
        <form @submit.prevent="register">
            <div class="form-group">
              <UInput v-model="form.email" type="email" id="email"  color="white" variant="outline" placeholder="Email" icon="i-heroicons-envelope" required />
            </div>
            <div class="form-group">
              <UInput v-model="form.name" type="text" id="name" required color="white" variant="outline" placeholder="Name" />
            </div>
            <div class="form-group">
              <UInput v-model="form.password" type="password" id="password" required color="white" variant="outline" placeholder="Password" />
            </div>
            <div class="form-group">
              <UInput v-model="form.c_password" type="password" id="c_password" required color="white" variant="outline" placeholder="Confirm Password" />
            </div>
            <div class="ins-text">
              <p>Sudah Punya Akun? <NuxtLink to="/auth/login" class="masuk-text">Masuk Disini</NuxtLink></p>
            </div>
            <UButton class="button" block type="submit">Register</UButton>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: false
  })
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const form = ref({
    email: '',
    name: '',
    password: '',
    c_password : '',
  });
  
  const router = useRouter();
  
  const register = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      email: form.value.email,
      name: form.value.name,
      password: form.value.password,
      c_password: form.value.c_password,
    }),
      });
      const data = await response.json();
    
      if (data.response_code === 404) {
        throw new Error('Register failed');
      }
      alert('Register success');
      router.push({ path: '/auth/login' });
    } catch (error) {
      console.error('Register failed:', error);
      alert('Register failed : ' );
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
  
  .ins-text{
  margin-bottom: 15px;
  }

  .masuk-text{
    color: blue;
  }
  </style>
  