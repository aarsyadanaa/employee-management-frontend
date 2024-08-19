<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-3xl w-full p-8 relative">
      <!-- Close Button -->
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl focus:outline-none">
        &times;
      </button>

      <!-- Modal Content -->
      <h2 class="text-2xl font-bold mb-6">Data Pegawai</h2>

      <!-- User Information -->
      <div v-if="user" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- User Avatar -->
        <div class="flex justify-center mb-6 md:col-span-2">
          <img :src="user.foto || 'default-avatar.png'" alt="User Avatar" class="w-32 h-32 object-cover rounded-full border border-gray-300"/>
        </div>

        <!-- User Details Grid -->
        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Nama:</p>
          <p class="text-gray-600">{{ user.nama }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">NIP:</p>
          <p class="text-gray-600">{{ user.nip }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Tempat Lahir:</p>
          <p class="text-gray-600">{{ user.tempat_lahir }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Tanggal Lahir:</p>
          <p class="text-gray-600">{{ user.tgl_lahir }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Jenis Kelamin:</p>
          <p class="text-gray-600">{{ user.jenis_kelamin === 'l' ? 'Laki-laki' : 'Perempuan' }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Alamat:</p>
          <p class="text-gray-600">{{ user.alamat }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Agama:</p>
          <p class="text-gray-600">{{ user.agama }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">No HP:</p>
          <p class="text-gray-600">{{ user.no_hp || 'N/A' }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">NPWP:</p>
          <p class="text-gray-600">{{ user.npwp }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Golongan:</p>
          <p class="text-gray-600">{{ user.golongan[0]?.golongan || 'N/A' }}</p>
          <p class="text-gray-500">{{ user.golongan[0]?.keterangan || 'N/A' }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Unit Kerja:</p>
          <p class="text-gray-600">{{ user.unit_kerja[0]?.nama_unit_kerja || 'N/A' }}</p>
          <p class="text-gray-500">{{ user.unit_kerja[0]?.tempat_tugas || 'N/A' }}</p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="text-lg font-semibold text-gray-800">Jabatan:</p>
          <p class="text-gray-600">{{ user.jabatan[0]?.nama_jabatan || 'N/A' }}</p>
          <p class="text-gray-500">{{ user.jabatan[0]?.eselon || 'N/A' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Props and Emits
const props = defineProps<{
  id: number;
}>();
const emit = defineEmits(['close']);

// State
const user = ref<any>(null);

// Fetch user profile based on ID
const fetchUserProfile = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/pegawai/${props.id}`);
    if (response.ok) {
      user.value = await response.json();
    } else {
      console.error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};

// Close modal
const closeModal = () => {
  emit('close');
};

// Fetch user data on component mount
onMounted(fetchUserProfile);
</script>

<style scoped>
/* Styling for the modal */
.fixed {
  z-index: 1000; /* Ensure modal is above other content */
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}
</style>
