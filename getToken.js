const axios = require('axios');
const cheerio = require('cheerio');

async function login() {
    const url = 'https://bima.upnyk.ac.id/login'; // URL login
    const username = '123230062'; // Ganti dengan username yang valid
    const password = 'fw4pqs#$'; // Ganti dengan password Anda

    try {
        // Mengambil halaman login untuk mendapatkan CSRF token
        const loginPageResponse = await axios.get(url);
        const $ = cheerio.load(loginPageResponse.data);

        // Mengambil CSRF token dari elemen yang sesuai
        const csrfToken = $('input[name="_token"]').val(); // Ganti dengan selector yang sesuai
        // console.log('CSRF Token:', csrfToken); // Debugging

        // Mengirim permintaan POST untuk login
        const response = await axios.post(url, new URLSearchParams({
            'username': username,
            'password': password,
            '_token': csrfToken,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': loginPageResponse.headers['set-cookie'],
                'Referer': url
            }
        });

        // Menggunakan Cheerio untuk mem-parsing HTML dan mengambil token
        const $response = cheerio.load(response.data);
        const scripts = $response('script');


        // Mengambil isi dari tag <script> kedua
        const secondScriptContent = $response(scripts[1]).html();

        // Mencari token dalam isi script
        const tokenMatch = secondScriptContent.match(/localStorage\.setItem\("token", "(.*?)"\)/);

        if (tokenMatch && tokenMatch[1]) {
            const token = tokenMatch[1];
            console.log('Token berhasil diambil:', token);
        } else {
            console.log('Token tidak ditemukan.');
        }
    } catch (error) {
        console.error('Login gagal:', error.response ? error.response.data : error.message);
    }
}

login();