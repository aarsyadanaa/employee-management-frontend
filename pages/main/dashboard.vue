<!-- headers -->
<template>
  <UHeader :links="links">
    <template #logo>
      <Logo class="w-auto h-6" />
    </template>
    <template #right>
      <UColorModeToggle />
      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost" />
      <UButton @click="logout" color="black" variant="solid">Log Out</UButton>
    </template>
    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>

<!-- page header -->
  <div class="page-header">
    <UPageHeader 
      title="Dashboard Pegawai"
    />
  </div>

<!-- option content -->
<UPage class="main-option">
    

    <template  #right>
      <div class="main-option-right">
      <h2> Pilih Filter : </h2>
      <!-- filter pegawai -->
      <div class="flex">
        <UInput v-model="q" placeholder="Filter people..." />
      </div>
      <!-- filter departemen -->
      <USelect
        v-model="selectedDept"
        :options="departement"
        placeholder="Select a departement"
      />
      <UButton to="/cetak" color="primary" variant="solid"> Cetak </UButton>
      <UButton to="/project2" color="primary" variant="solid"> Project 2 </UButton>
    </div>
    </template>
  </UPage>

<!-- main content page -->

<template>
  <div class="main-content">
    <div>
      <UButton label="Open" @click="isOpen = true" color="primary" variant="solid"> Tambah Pegawai </UButton>
      <UModal v-model="isOpen">
        <formTambahPegawai/>
      </UModal>
      
    </div>
          <UTable :rows="rows" :columns="columns">
            <template #actions-data="{ row }">
              <UButton icon="i-heroicons-arrow-right-circle-20-solid" @click="openDetailModal(row.id)" color="primary" size="xs"></UButton>
                <UModal v-model="isDetail">
                  <viewDetailPegawai :id="selectedRowId"/>
                </UModal>
              <UButton icon="i-heroicons-pencil-square-20-solid" @click="openUpdateModal(row.id)" color="yellow" size="xs" ></UButton>
                <UModal v-model="isUpdate" prevent-close>
                  <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="refreshPage" />
                  <updatePegawai :id="selectedUpdateRowId"/>
                </UModal>
              <UButton icon="i-heroicons-trash-20-solid" @click="openDeleteModal(row.id)" color="red" size="xs" ></UButton>
                <UModal v-model="isDelete">
                  <deletePegawai :id="selectedDeleteRowId"/>
                </UModal>
            </template>
          </UTable>
          <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="totalPages" :total="filteredPeople.length" />
          </div>
  </div>
</template>

<!-- footer -->


</template>

<!-- script -->

<script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted, computed } from 'vue'
  import formTambahPegawai from '~/components/formTambahPegawai.vue';
  import viewDetailPegawai from '~/components/viewDetailPegawai.vue';
  import updatePegawai from '~/components/updatePegawai.vue';
  import deletePegawai from '~/components/deletePegawai.vue';
  const router = useRouter();
  definePageMeta({
    middleware: 'auth',
    layout: false
  })
  
  const logout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('authToken');
    // Redirect ke halaman login
    router.push({ path: '/auth/login' });
  };

  //search departement
  const departement = ['All', 'militer', 'admin', 'Keuangan', 'Pemasaran', 'Produksi', 'Sumber Daya Manusia']

  //modal state 
  const isOpen = ref(false)
  const isDetail = ref(false)
  const isUpdate = ref(false)
  const isDelete = ref(false)
    const refreshPage = () => {
    window.location.reload();
  };

  //table
  const columns = [
    { key: 'id', label: 'ID'}, 
    { key: 'nip', label: 'NIP'}, 
    { key: 'name', label: 'Name'}, 
    { key: 'tempat_lahir', label: 'Tempat Lahir'}, 
    { key: 'alamat', label: 'Alamat'}, 
    { key: 'tgl_lahir', label: 'Tanggal Lahir'}, 
    { key: 'jenis_kelamin', label: 'L/P'}, 
    { key: 'golongan', label: 'Gol'}, 
    { key: 'eselon', label: 'Eselon'}, 
    { key: 'jabatan', label: 'Jabatan'}, 
    { key: 'tempat_tugas', label: 'Tempat Tugas'}, 
    { key: 'agama', label: 'Agama' }, 
    { key: 'unit_kerja', label: 'Unit Kerja'}, 
    { key: 'no_hp', label: 'No. Hp'}, 
    { key: 'npwp', label: 'NPWP'}, 
    { key: 'actions', label: 'action'}
  ]

  const people = ref([]);

// Function to fetch data from the API
  const fetchDataAll = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pegawai');
      if (response.ok) {
        const data = await response.json();
        people.value = data.map(user => ({
          id: user.id,
          nip: user.nip,
          name: user.nama,
          tempat_lahir: user.tempat_lahir,
          alamat: user.alamat,
          tgl_lahir: user.tgl_lahir,
          jenis_kelamin: user.jenis_kelamin === 'l' ? 'Laki-laki' : 'Perempuan',
          golongan: user.golongan.length > 0 ? user.golongan[0].golongan : 'N/A',
          eselon: user.jabatan.length > 0 ? user.jabatan[0].eselon : 'N/A',
          jabatan: user.jabatan.length > 0 ? user.jabatan[0].nama_jabatan : 'N/A',
          tempat_tugas: user.unit_kerja.length > 0 ? user.unit_kerja[0].tempat_tugas : 'N/A',
          agama: user.agama,
          unit_kerja: user.unit_kerja.length > 0 ? user.unit_kerja[0].nama_unit_kerja : 'N/A',
          no_hp: user.no_hp,
          npwp: user.npwp,
          act: 'Edit',
        }));

        console.log('Fetched and formatted people data:', people.value);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  onMounted(fetchDataAll);
  const selectedDept = ref('All'); 
  const q = ref(''); 
  const page = ref(1); 
  const pageSize = ref(5); 

// Filtered people based on department and search query
  const filteredPeople = computed(() => {
    let result = people.value;

    if (selectedDept.value && selectedDept.value !== "All") {
      result = result.filter(person =>
        person.unit_kerja && person.unit_kerja.toLowerCase() === selectedDept.value.toLowerCase()
      );
    }

    if (q.value) {
      result = result.filter(person =>
        person.name && person.name.toLowerCase().includes(q.value.toLowerCase())
      );
    }

    return result;
  });
  const rows = computed(() => {
    const start = (page.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredPeople.value.slice(start, end);
  });

  const totalPages = computed(() => {
    return Math.ceil(people.value.length / pageSize.value);
  });


      //action modal
  const selectedRowId = ref(null);
  const selectedUpdateRowId = ref(null);
  const selectedDeleteRowId = ref(null);

  const openDetailModal = (id) => {
    selectedRowId.value = id;
    isDetail.value = true;
  };
  const openUpdateModal = (id) => {
    selectedUpdateRowId.value = id;
    isUpdate.value = true;
  };
  const openDeleteModal = (id) => {
    selectedDeleteRowId.value = id;
    isDelete.value = true;
  };

</script>

<style scoped>
.page-header {
  font-size: 24px;
  padding: 15px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-bottom: 1px grey;
}
.main-option {
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.main-option-right {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.main-content{
  max-width: 98%;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>
  