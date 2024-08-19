<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const jenisKelamin = [
  { label: 'Laki-Laki', value: 'l' },
  { label: 'Perempuan', value: 'p' }
];
const agama = [
  { label: 'Islam', value: 'islam' },
  { label: 'Kristen', value: 'kristen' },
  { label: 'Budha', value: 'budha' },
  { label: 'Hindu', value: 'hindu' },
  { label: 'Katolik', value: 'katolik' },
  { label: 'Konghucu', value: 'konghucu' },
  { label: 'Lain-lain', value: 'lain' }
];

interface FormData {
  nama: string;
  nip: string;
  tempat_lahir: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  alamat: string;
  agama: string;
  no_hp: string;
  npwp: string;
  foto: File | null;
  golongan: string;
  keterangan: string;
  unit_kerja: string;
  tempat_tugas: string;
  jabatan: string;
  eselon: string;
  [key: string]: string | File | null;
}

const form = ref<FormData>({
  nama: '',
  nip: '',
  tempat_lahir: '',
  tgl_lahir: '',
  jenis_kelamin: '',
  alamat: '',
  agama: '',
  no_hp: '',
  npwp: '',
  foto: null,
  golongan: '',
  keterangan: '',
  unit_kerja: '',
  tempat_tugas: '',
  jabatan: '',
  eselon: '',
});
const props = defineProps<{
  id: number;
}>();

const foto = ref<any>('default-avatar.png');
if(foto.value === null){
  foto.value.foto = 'default-avatar.png';
}
const fetchPegawaiData = async () => {
  try {
    const pegawaiId = props.id;
    const response = await fetch(`http://localhost:8000/api/pegawai/${pegawaiId}`);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.statusText}`);
    }
    const data = await response.json();
    foto.value = data
    // Isi form dengan data yang diterima
    form.value = {
      id: data.id,
      nama: data.nama,
      nip: data.nip,
      tempat_lahir: data.tempat_lahir,
      tgl_lahir: data.tgl_lahir,
      jenis_kelamin: data.jenis_kelamin,
      alamat: data.alamat,
      agama: data.agama,
      no_hp: data.no_hp,
      npwp: data.npwp,
      foto: data.foto,
      golongan: data.golongan.length > 0 ? data.golongan[0].golongan : '',
      keterangan: '', // Asumsikan keterangan tidak ada di data JSON
      unit_kerja: data.unit_kerja.length > 0 ? data.unit_kerja[0].nama_unit_kerja : '',
      tempat_tugas: data.unit_kerja.length > 0 ? data.unit_kerja[0].tempat_tugas : '',
      jabatan: data.jabatan.length > 0 ? data.jabatan[0].nama_jabatan : '',
      eselon: data.jabatan.length > 0 ? data.jabatan[0].eselon : ''
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to load pegawai data.');
  }
};

onMounted(fetchPegawaiData);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files.length > 0) {
    form.value.foto = input.files[0];
  } else {
    form.value.foto = null;
  }
};

const updatePegawai = async () => {
  const formData = new FormData();
  Object.keys(form.value).forEach(key => {
    const value = form.value[key as keyof FormData];
    if (key === 'foto' && value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value as string);
    }
  });

  try {
    const response = await fetch(`http://localhost:8000/api/pegawai/${props.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Update failed: ${errorText}`);
    }

    const data = await response.json();
    alert(data.message);
    router.push({ path: '/main/dashboard' });
  } catch (error) {
    console.error('Update failed:', error);
    alert('Update failed: ' + error);
  }
};
const alertUpdate = () => {
  alert("Data Pegawai Berhasil di Update")
};
</script>


<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6">Update Pegawai</h1>
    <div class="flex items-center mb-6">
          <img :src="foto.foto" alt="User Avatar" class="w-60 h-60"/>
        </div>
    <form @submit.prevent="updatePegawai" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
          <input v-model="form.nama" type="text" id="nama" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Nama" required />
        </div>
        <div>
          <label for="nip" class="block text-sm font-medium text-gray-700">NIP</label>
          <input v-model="form.nip" type="text" id="nip" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="NIP" required />
        </div>
        <div>
          <label for="tempat_lahir" class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
          <input v-model="form.tempat_lahir" type="text" id="tempat_lahir" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Tempat Lahir" required />
        </div>
        <div>
          <label for="tgl_lahir" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input v-model="form.tgl_lahir" type="date" id="tgl_lahir" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Tanggal Lahir" required />
        </div>
        <div>
          <label for="jenis_kelamin" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <select v-model="form.jenis_kelamin" id="jenis_kelamin" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            <option v-for="option in jenisKelamin" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
        <div>
          <label for="agama" class="block text-sm font-medium text-gray-700">Agama</label>
          <select v-model="form.agama" id="agama" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            <option v-for="option in agama" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
        <div>
          <label for="alamat" class="block text-sm font-medium text-gray-700">Alamat</label>
          <input v-model="form.alamat" type="text" id="alamat" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Alamat" required />
        </div>
        <div>
          <label for="no_hp" class="block text-sm font-medium text-gray-700">Nomor HP</label>
          <input v-model="form.no_hp" type="text" id="no_hp" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Nomor HP" required />
        </div>
        <div>
          <label for="npwp" class="block text-sm font-medium text-gray-700">NPWP</label>
          <input v-model="form.npwp" type="text" id="npwp" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="NPWP" required />
        </div>
        <div>
          <label for="foto" class="block text-sm font-medium text-gray-700">Update Foto</label>
          <input type="file" id="foto" @change="handleFileChange" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          <p class="mt-2 text-sm text-gray-500"> {{ form.foto ? form.foto.name : 'No file selected' }}</p>
        </div>
        <div>
          <label for="golongan" class="block text-sm font-medium text-gray-700">Golongan</label>
          <input v-model="form.golongan" type="text" id="golongan" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Golongan" required />
        </div>
        <div>
          <label for="eselon" class="block text-sm font-medium text-gray-700">Eselon</label>
          <input v-model="form.eselon" type="text" id="eselon" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Eselon" required />
        </div>
        <div>
          <label for="jabatan" class="block text-sm font-medium text-gray-700">Jabatan</label>
          <input v-model="form.jabatan" type="text" id="jabatan" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Jabatan" required />
        </div>
        <div>
          <label for="unit_kerja" class="block text-sm font-medium text-gray-700">Unit Kerja</label>
          <input v-model="form.unit_kerja" type="text" id="unit_kerja" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Unit Kerja" required />
        </div>
        <div>
          <label for="tempat_tugas" class="block text-sm font-medium text-gray-700">Tempat Tugas</label>
          <input v-model="form.tempat_tugas" type="text" id="tempat_tugas" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Tempat Tugas" required />
        </div>
        <!-- <div>
          <label for="keterangan" class="block text-sm font-medium text-gray-700">Keterangan</label>
          <textarea v-model="form.keterangan" id="keterangan" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Keterangan Tambahan" required></textarea>
        </div> -->
      </div>
      <UButton @click="alertUpdate" type="submit" block>Submit</UButton>
      <!-- <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700">Update</button> -->
    </form>
  </div>
</template>
