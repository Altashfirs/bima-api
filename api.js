const axios = require('axios');
const FormData = require('form-data');

// URL login dan API setelah login
const loginUrl = 'https://bima.upnyk.ac.id/login';
const apiUrl = 'https://apibima.upnyk.ac.id/v2/profil'; // Ganti dengan API yang membutuhkan otentikasi

// Session untuk mempertahankan cookies jika diperlukan
const session = axios.create({
  withCredentials: true, // Mengirimkan cookies bersama setiap permintaan
  headers: {
    'Content-Type': 'text/html; charset=UTF-8',
    'Connection': 'keep-alive',
    'Cache-Control': 'private, must-revalidate',
    'pragma': 'no-cache',
    'expires': '-1',
    'Set-Cookie': 'XSRF-TOKEN=eyJpdiI6Inp6ZmtjSTY3TmxpdU50azk1UmZ1dXc9PSIsInZhbHVlIjoiOTBrWnFsUUg5YXlpSDZMN3VmdEVFc0dCV1dBS3FVMFBpTXNVNjBaakI5ZnRpVGFTSFlwb1E0Z01UQlFZdTF3QisyVmhFVklzYmhFdGFhTXhNRDVIT1dJN3E3R1RZd3grcHEvbzdoVGxYUFVoMlljZlFIWG5WSkpmbm5aK0J5c1IiLCJtYWMiOiIyZjNlOGUzYTc2MmJkOTgzZWNkM2FhM2YxOTUyMGM5YjFmNjRjODhmMGI1ODk0YjY2ZDBmMWIxMjkwZjk2NjU2IiwidGFnIjoiIn0%3D; expires=Thu, 02 Jan 2025 22:26:28 GMT; Max-Age=7200; path=/; samesite=lax',
    'Set-Cookie': 'laravel_session=eyJpdiI6ImlJQXZ3eWU3a3B0bmNzQXZSYm43MWc9PSIsInZhbHVlIjoiMkgvTEtmRHU0aHY4b2ViOS9ORWFhVXJpTnJKVkptaHNla0REVjE1VFVDa1VKZnMyY3Yya25lR0RVNXd2Z2U2ckkwMllrVDZ5TEdpQUU0UHJZR3lqeTk1Rk1vMGwvcTZzRWcyZTZXUnBvTWNPSGtoMTU2YzYydGNvTUZFWTIrVnoiLCJtYWMiOiJhNjUwNzYzYTVmMGExNmVlMjY2ZWQ5YWFkNmVhMjUxZDY2NDY5MWI2MDA4MDY2ZTVhNmRjZmFhNDU3ZGRlYzVjIiwidGFnIjoiIn0%3D; expires=Thu, 02 Jan 2025 22:26:28 GMT; Max-Age=7200; path=/; httponly; samesite=lax',
    'Content-Encoding': 'gzip',
    'Set-Cookie': 'TS01b95a83=015117132d9ff48bf5b2dba4fdfda88c822c1a6d96fafaa97234a975ccd37943b906623cda7fb64b881f210d0b64bd582d7ad4d7d3991cca2af478698610f241c0b3dd1e6b4217a162a0619f0caf9dc0b13db9a491; Path=/;', 
    'Transfer-Encoding': 'chunked',
  }
});

// Fungsi untuk login dan mendapatkan JWT token
async function login(username, password) {
  try {
    // Kirimkan permintaan login untuk mendapatkan JWT token
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);

    const loginResponse = await session.post(loginUrl, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    // Cek apakah JWT token ada di dalam request header
    const jwtToken = loginResponse.headers['Jwt']; // Ganti dengan nama header yang sesuai
    if (jwtToken) {
      console.log('Login successful! JWT Token from headers:', jwtToken);
      
      // Gunakan JWT token untuk permintaan selanjutnya
      await accessApiWithJwt(jwtToken);
    } else {
      console.log('JWT Token not found in response headers.');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// Fungsi untuk mengakses API setelah login dengan JWT token
async function accessApiWithJwt(jwtToken) {
  try {
    const apiResponse = await axios.get(apiUrl, {
      headers: {
        'Jwt': jwtToken, // Kirimkan JWT token di request header
      },
    });

    console.log('API Response:', apiResponse.data);
  } catch (error) {
    console.error('Error accessing API:', error);
  }
}

// Panggil fungsi login dengan username dan password
const username = '123230062'; // Ganti dengan username yang valid
const password = 'fw4pqs#$'; // Ganti dengan password yang valid
login(username, password);
