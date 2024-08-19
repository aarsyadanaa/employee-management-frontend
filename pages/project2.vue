<template>
    <div class="container">
        <template>
            <UHeader>
                <template #right>
                <UColorModeButton />
                <NuxtLink to="/main/dashboard">Main Dashboard</NuxtLink>
                </template>
            </UHeader>
            </template>
      <h1 class="title">Artikel Project</h1>
      <!-- Input Artikel -->
      <template>
        <UTextarea v-model="article" placeholder="Masukkan artikel di sini..." resize />
        </template>
        <div class="cari-kata">
            <UInput
            v-model="searchTerm" placeholder="Cari Kata"
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="white"
                :trailing="false"
            />
            <UButton @click="searchWord" color="black" variant="solid">Cari</UButton>
        </div>
      <p>Hasil Pencarian: {{ searchResult }} kali ditemukan</p>

        <!-- Input Kata Penggantian -->

      <div class="replace">
        <UInput
            v-model="replaceFrom" placeholder="Kata yang diganti"
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="white"
                :trailing="false"
            />
        <UInput
           v-model="replaceTo" placeholder="Kata pengganti"
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                color="white"
                :trailing="false"
            />
        <UButton @click="replaceWord" color="black" variant="solid">Ganti Kata</UButton>
        </div>
        <div >
            <p class="result-replace-articel">Artikel Setelah Penggantian: </p>
            <UTextarea v-model="replacedArticle" resize />
        </div>
      
      <!-- Pengurutan Kata -->

        <div class="sortWord">
        <UButton @click="sortWords" color="black" variant="solid">Urutkan Kata</UButton>
        </div>
        <p>Daftar Kata Terurut: </p>
        <div>
            <UBadge sz="lg" color="white" variant="solid">{{ sortedWords.join(', ') }}</UBadge>
        </div>
    </div>
  </template>
  
  <script>
  definePageMeta({
    layout: false
  })
  export default {
    data() {
      return {
        article: '',
        searchTerm: '',
        replaceFrom: '',
        replaceTo: '',
        searchResult: 0,
        replacedArticle: '',
        sortedWords: []
      };
    },
    methods: {
      searchWord() {
        const regex = new RegExp(this.searchTerm, 'gi');
        this.searchResult = (this.article.match(regex) || []).length;
      },
      replaceWord() {
        this.replacedArticle = this.article.replace(new RegExp(this.replaceFrom, 'gi'), this.replaceTo);
      },
      sortWords() {
        const words = this.article
        .toLowerCase() // Konversi ke huruf kecil
        .replace(/[.,!?;:\-()"']+/g, ' ') // Menghapus tanda baca
        .replace(/\s{2,}/g, ' ') // Menghapus spasi berlebih
        .trim() // Menghapus spasi di awal dan akhir
        .split(' ') // Memisahkan kata berdasarkan spasi
        .filter(Boolean); // Menghapus elemen kosong
      
      this.sortedWords = [...new Set(words)] // Menghilangkan duplikat
        .sort(); // Mengurutkan kata secara alfabetis
    }
  }
};
  </script>
  
  <style>
  .container{
    margin: auto;
  }
  .title{
    margin: auto;
    font-size: 30px;
    font-weight: bold;
  }
  .cari-kata{
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .replace{
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .replace-result-article{
    border: 1px solid grey;
    padding: 15px;
  }
  </style>
  