<!-- components/DataTable.vue -->
<template>
  <div>
    <div v-if="data" id="table-content">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>NIP</th>
            <th>Nama</th>
            <th>Tempat Lahir</th>
            <th>Alamat</th>
            <th>Tgl Lahir</th>
            <th>L/P</th>
            <th>Gol</th>
            <th>Eselon</th>
            <th>Jabatan</th>
            <th>Tempat Tugas</th>
            <th>Agama</th>
            <th>Unit Kerja</th>
            <th>No.HP</th>
            <th>NPWP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{{ data.nip }}</td>
            <td>{{ data.nama }}</td>
            <td>{{ data.tempat_lahir }}</td>
            <td>{{ data.alamat }}</td>
            <td>{{ data.tgl_lahir }}</td>
            <td>{{ data.jenis_kelamin === 'l' ? 'L' : 'P' }}</td>
            <td>{{ data.golongan[0]?.golongan || '-' }}</td>
            <td>{{ data.jabatan[0]?.eselon || '-' }}</td>
            <td>{{ data.jabatan[0]?.nama_jabatan || '-' }}</td>
            <td>{{ data.unit_kerja[0]?.tempat_tugas || '-' }}</td>
            <td>{{ data.agama }}</td>
            <td>{{ data.unit_kerja[0]?.nama_unit_kerja || '-' }}</td>
            <td>{{ data.no_hp || '-' }}</td>
            <td>{{ data.npwp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="generatePDF">Generate PDF</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)

// Fetch data from API
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/pegawai')
    const result = await response.json()
    data.value = result
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Generate PDF (only on client-side)
const generatePDF = () => {
  if (process.client) {
    const html2pdf = require('html2pdf.js')
    const element = document.getElementById('table-content')
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'data_table.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    
    html2pdf().from(element).set(opt).save()
  }
}

// Fetch data on component mount
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
button {
  margin-top: 20px;
}
</style>
