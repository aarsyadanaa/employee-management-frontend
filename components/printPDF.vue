<template>
    <div>
      <button @click="generatePDF" class="btn btn-print">Cetak PDF</button>
      <!-- Hidden content to print -->
      <div id="pdf-content" class="print-table" style="display: none;">
        <h1>Daftar Pegawai</h1>
        <table>
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pegawai in pegawai" :key="pegawai.id">
              <td v-for="column in columns" :key="column.key">{{ pegawai[column.key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  const columns = ref([
    { key: 'id', label: 'ID' },
    { key: 'nip', label: 'NIP' },
    { key: 'name', label: 'Nama' },
    { key: 'tempat_lahir', label: 'Tempat Lahir' },
    { key: 'alamat', label: 'Alamat' },
    { key: 'tgl_lahir', label: 'Tgl Lahir' },
    { key: 'jenis_kelamin', label: 'L/P' },
    { key: 'golongan', label: 'Gol' },
    { key: 'eselon', label: 'Eselon' },
    { key: 'jabatan', label: 'Jabatan' },
    { key: 'tempat_tugas', label: 'Tempat Tugas' },
    { key: 'agama', label: 'Agama' },
    { key: 'unit_kerja', label: 'Unit Kerja' },
    { key: 'no_hp', label: 'No. HP' },
    { key: 'npwp', label: 'NPWP' },
  ]);
  
  const pegawai = ref([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pegawai');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      pegawai.value = data;
    } catch (error) {
      console.error(error);
    }
  };
  
  onMounted(() => {
    fetchData();
  });
  
  const generatePDF = () => {
    const tableHeaders = columns.value.map(col => ({ text: col.label, style: 'tableHeader' }));
    const tableBody = pegawai.value.map(item => columns.value.map(col => item[col.key] || ''));
  
    const docDefinition = {
      content: [
        {
          text: 'Daftar Pegawai',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: Array(columns.value.length).fill('*'),
            body: [tableHeaders, ...tableBody]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableHeader: {
          fillColor: '#16a085', // Background color for header
          color: '#ffffff',     // Text color for header
          bold: true,
          fontSize: 12
        }
      }
    };
  
    pdfMake.createPdf(docDefinition).download('daftar-pegawai.pdf');
  };
  </script>
  
  <style scoped>
  .btn-print {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .btn-print:hover {
    background-color: #0056b3;
  }
  
  .print-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .print-table th, .print-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .print-table th {
    background-color: #16a085; /* Background color for header */
    color: #ffffff; /* Text color for header */
  }
  
  .print-table tr:nth-child(even) {
    background-color: #f2f2f2; /* Light background for rows */
  }
  </style>
  