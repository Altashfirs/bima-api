require('dotenv').config(); // Memuat variabel dari .env
const axios = require('axios');
const getGrade = require('./getToken.js');

const DISCORD_WEBHOOK_URL = process.env.WEBHOOK; // Ganti dengan URL webhook Discord Anda
let previousGrades = []; // Menyimpan nilai sebelumnya

async function sendDiscordNotification(message) {
    try {
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: message
        });

    } catch (error) {
        console.error('Error sending Discord notification:', error);

    }

}

async function checkGrades() {
    if (getGrade) {
        const currentGrades = getGrade;
        // const newGrades = currentGrades.filter(grade => !previousGrades.some(prev => prev.kode_mk === grade.kode_mk && prev.nilai === grade.nilai));
        console.log(currentGrades);
        // if (newGrades.length > 0) {
        //     const message = `New grades available:\n${newGrades.map(grade => `${grade.nama}: ${grade.nilai}`).join('\n')}`;
        //     await sendDiscordNotification(message);
        //     previousGrades = currentGrades; // Update previous grades

        // } else {
        //     console.log('No new grades found.');

        // }
    }
}

// Memeriksa nilai setiap 5 menit (300000 ms)
setInterval(checkGrades, 1000); // 5 menit

// Memanggil fungsi checkGrades untuk pertama kali
checkGrades();