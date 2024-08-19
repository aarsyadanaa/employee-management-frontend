<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
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

// Definisikan tipe untuk form data
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
  [key: string]: string | File | null; // Indeks signature
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

const router = useRouter();

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  console.log('Event target:', event.target); // Debugging event target

  if (input && input.files && input.files.length > 0) {
    console.log('Selected file:', input.files[0]);
    form.value.foto = input.files[0]; // Set file ke state
  } else {
    form.value.foto = null; // Set ke null jika tidak ada file
  }
};


const create_pegawai = async () => {
  const formData = new FormData();

  Object.keys(form.value).forEach(key => {
    const value = form.value[key as keyof FormData];
    console.log(`Appending key: ${key}, value:`, value);
    if (key === 'foto' && value instanceof File) {
      formData.append(key, value); // Tambahkan file jika ada
    } else if (value !== null && value !== undefined) {
      formData.append(key, value as string); // Tambahkan data lainnya
    }
  });

  try {
    const response = await fetch('http://localhost:8000/api/pegawai', {
      method: 'POST',
      body: formData, // Kirim FormData
    });

    const data = await response.json();
    const message = data.message;
    if (data.response_code === 404) {
      throw new Error('Entry failed');
    }
    alert(message);
    router.push({ path: '/main/dashboard' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Entry failed:', error.message);
      alert('Entry failed: ' + error.message);
    } else {
      console.error('Entry failed:', error);
      alert('Entry failed: Unknown error');
    }
  }
};
</script>


<template>
  <div class="container">
  <form @submit.prevent="create_pegawai"  class="space-y-4">
    <div class="form-container">
    <UFormGroup name="nama" label="Nama">
      <UInput v-model="form.nama" type="text" id="nama" required color="white" variant="outline" placeholder="Name" />
    </UFormGroup>
    <UFormGroup name="nip" label="NIP">
      <UInput v-model="form.nip" type="text" id="nip" required color="white" variant="outline" placeholder="NIP" />
    </UFormGroup>
    <UFormGroup name="tempat_lahir" label="Tempat Lahir">
      <UInput v-model="form.tempat_lahir" type="text" id="tempat_lahir" required color="white" variant="outline" placeholder="Tempat Lahir" />
    </UFormGroup>
    <UFormGroup name="tgl_lahir" label="Tanggal Lahir">
      <UInput v-model="form.tgl_lahir" type="date" id="tgl_lahir" required color="white" variant="outline" placeholder="Tanggal Lahir" />
    </UFormGroup>
    <UFormGroup name="jenis_kelamin" label="Jenis Kelamin">
      <URadioGroup v-model="form.jenis_kelamin" :options="jenisKelamin" />
    </UFormGroup>
    <UFormGroup name="alamat" label="Alamat">
      <UInput v-model="form.alamat" type="text" id="alamat" required color="white" variant="outline" placeholder="Alamat" />
    </UFormGroup>
    <UFormGroup name="agama" label="Agama">
      <USelect v-model="form.agama"  placeholder="Select..." :options="agama" />
    </UFormGroup>
    <UFormGroup name="no_hp" label="Nomor HP">
      <UInput v-model="form.no_hp" type="number" id="no_hp" required color="white" variant="outline" placeholder="Nomor Hp" />
    </UFormGroup>
    <UFormGroup name="npwp" label="NPWP">
      <UInput v-model="form.npwp" type="text" id="npwp" required color="white" variant="outline" placeholder="NPWP" />
    </UFormGroup>
    <UFormGroup name="foto" label="Foto">
      <input type="file" id="foto" @change="handleFileChange" />
      </UFormGroup>
    <UFormGroup name="golongan" label="Golongan">
      <UInput v-model="form.golongan" type="text" id="golongan" required color="white" variant="outline" placeholder="Golongan" />
    </UFormGroup>
    <UFormGroup name="eselon" label="Eselon">
      <UInput v-model="form.eselon" type="text" id="eselon" required color="white" variant="outline" placeholder="Eselon" />
    </UFormGroup>
    <UFormGroup name="jabatan" label="Jabatan">
      <UInput v-model="form.jabatan" type="text" id="jabatan" required color="white" variant="outline" placeholder="Jabatan" />
    </UFormGroup>
    <UFormGroup name="unit_kerja" label="Unit Kerja">
      <UInput v-model="form.unit_kerja" type="text" id="unit_kerja" required color="white" variant="outline" placeholder="Unit Kerja" />
    </UFormGroup>
    <UFormGroup name="tempat_tugas" label="Tempat Tugas">
      <UInput v-model="form.tempat_tugas" type="text" id="tempat_tugas" required color="white" variant="outline" placeholder="Tempat Tugas" />
    </UFormGroup>
    <UFormGroup name="keterangan" label="Keterangan">
      <UTextarea v-model="form.keterangan" id="keterangan" color="white" required variant="outline" placeholder="Keterangan Tambahan" />
    </UFormGroup>
    <UButton type="submit" block>
      Submit
    </UButton>
  </div>
  </form>
</div>
</template>

<style>
.container{
  display: grid;
  gap : 15px;
    padding: 15px;
}
.form-container{
  display : grid;
  gap : 10px;
}
</style>