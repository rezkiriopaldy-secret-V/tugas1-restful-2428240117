const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let employees = [
  {
    id: 1,
    nip: 'EMP-0045',
    nama: 'Agus Pratama',
    jabatan: 'Staf Akuntansi',
    departemen: 'Keuangan',
    gaji: 6500000
  },
  {
    id: 2,
    nip: 'EMP-0046',
    nama: 'Siti Rahma',
    jabatan: 'HR Officer',
    departemen: 'HRD',
    gaji: 7000000
  },
  {
    id: 3,
    nip: 'EMP-0047',
    nama: 'Budi Santoso',
    jabatan: 'Software Developer',
    departemen: 'IT',
    gaji: 8500000
  }
];

let nextId = 4;

app.get('/', (req, res) => {
  res.send('RESTful API Kepegawaian berjalan!');
});

app.get('/employees', (req, res) => {
  const departemen = req.query.departemen;

  if (departemen) {
    const hasil = employees.filter(
      (employee) =>
        employee.departemen.toLowerCase() === departemen.toLowerCase()
    );

    return res.status(200).json(hasil);
  }

  res.status(200).json(employees);
});

app.get('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((item) => item.id === id);

  if (!employee) {
    return res.status(404).json({
      status: 'error',
      message: 'Data dengan id ' + id + ' tidak ditemukan',
      data: null
    });
  }

  res.status(200).json(employee);
});

app.post('/employees', (req, res) => {
  const { nip, nama, jabatan, departemen, gaji } = req.body;

  if (!nip || !nama || !jabatan || !departemen) {
    return res.status(400).json({
      status: 'error',
      message: 'nip, nama, jabatan, dan departemen wajib diisi',
      data: null
    });
  }

  const newEmployee = {
    id: nextId++,
    nip,
    nama,
    jabatan,
    departemen,
    gaji: gaji ?? 0
  };

  employees.push(newEmployee);

  res.status(201).json({
    status: 'success',
    message: 'Data karyawan berhasil ditambahkan',
    data: newEmployee
  });
});

app.put('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = employees.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Data dengan id ' + id + ' tidak ditemukan',
      data: null
    });
  }

  const { nip, nama, jabatan, departemen, gaji } = req.body;

  if (!nip || !nama || !jabatan || !departemen) {
    return res.status(400).json({
      status: 'error',
      message: 'nip, nama, jabatan, dan departemen wajib diisi',
      data: null
    });
  }

  employees[index] = {
    id,
    nip,
    nama,
    jabatan,
    departemen,
    gaji: gaji ?? 0
  };

  res.status(200).json({
    status: 'success',
    message: 'Data karyawan berhasil diperbarui',
    data: employees[index]
  });
});

app.delete('/employees/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = employees.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Data dengan id ' + id + ' tidak ditemukan',
      data: null
    });
  }

  employees.splice(index, 1);

  res.status(200).json({
    status: 'success',
    message: 'Data karyawan berhasil dihapus',
    data: null
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint tidak ditemukan',
    data: null
  });
});

app.listen(PORT, () => {
  console.log('Server berjalan di http://localhost:' + PORT);
});