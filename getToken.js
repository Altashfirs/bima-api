require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');

async function getToken() {
    const url = 'https://bima.upnyk.ac.id/login'; // URL login
    const username = process.env.NIM; // Ganti dengan username yang valid
    const password = process.env.PASSWORD; // Ganti dengan password Anda

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
            //console.log('Token berhasil diambil:', token);
            return token;
        } else {
            console.log('Token tidak ditemukan.');
        }
    } catch (error) {
        console.error('Login gagal:', error.response ? error.response.data : error.message);
    }
}

async function getJson(token) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apibima.upnyk.ac.id/v2/khs/show?params=2kQP-dQKR4qvyQF1zCYYD0pmElbTfE-5HAT-dOvlXakfZpy6_NUEwt-Q_PwLqnPf-ifqAaIn92hbnl6Jti6yRg',
        headers: {
            'Jwt': token,
        }
    };

    axios.request(config)
        .then((response) => {
            // Check if data and lists exist and is an array
            if (response.data && response.data.data && Array.isArray(response.data.data.lists)) {
                // Filter the lists where nilai is not empty
                const filteredGrades = response.data.data.lists.filter(item => item.nilai !== "");

                // Pretty print the filtered JSON response
                // console.log(JSON.stringify(filteredGrades, null, 2)); // Indent with 2 spaces
                return filteredGrades;
            } else {
                console.log('Lists data is not available or is not an array.');
                return [];
            }
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
}

// Fungsi utama untuk menjalankan login dan mendapatkan grade
async function getGrade() {
    const token = await getToken(); // Tunggu hingga login selesai
    // console.log('Token:', token); // Tampilkan token
    if (token) {
        await getJson(token); // Panggil getGrade jika token berhasil diambil

    }

}

module.export = getGrade; // Jalankan fungsi utama