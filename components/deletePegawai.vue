<template>
    <div class="container">
      <div v-if="isDeleting" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
      
      <div class="content">
        <h2>Detail Pegawai</h2>
        <p>ID Pegawai: <strong>{{ id }}</strong></p>
        <p>Anda yakin ingin menghapus pegawai ini?</p>
        
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        
        <div class="actions">
          <button @click="confirmDelete" class="btn btn-danger">Hapus Pegawai</button>
          <button @click="cancel" class="btn btn-secondary">Batal</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { ref } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    }
  });
  
  const isDeleting = ref(false);
  const errorMessage = ref<string | null>(null);
  
  const deletePegawai = async () => {
    if (!props.id) {
      return;
    }
  
    isDeleting.value = true;
    errorMessage.value = null;
  
    try {
      await axios.delete(`http://localhost:8000/api/pegawai/${props.id}`);
      alert('Pegawai berhasil dihapus.');
    } catch (error) {
      errorMessage.value = 'Terjadi kesalahan saat menghapus pegawai.';
      console.error(error);
    } finally {
      isDeleting.value = false;
    }
  };
  
  const confirmDelete = () => {
      deletePegawai();
  };
  
  const cancel = () => {
    console.log('Penghapusan dibatalkan.');
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .content {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .actions {
    margin-top: 20px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
  }
  
  .btn-danger {
    background-color: #e74c3c;
  }
  
  .btn-secondary {
    background-color: #95a5a6;
    margin-left: 10px;
  }
  
  .error-message {
    color: #e74c3c;
    margin-top: 10px;
  }
  
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .loading-spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  