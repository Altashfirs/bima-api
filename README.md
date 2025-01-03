# Bima Grade Notification

## Features

### **Send Notification About New Grade**

- No need to open bima everyday just to check new grade.
- Notification will be send through discord.
- Bot will check every 20 minutes.

---

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- A code editor (e.g., VSCode).

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Altashfirs/bima-api.git
   cd bima-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root of your project.
   - Add your information:
     ```env
     NIM='your_nim'
     PASSWORD='bima_password'
     WEBHOOK='discord_channel_webhook'
     ```
4. Start the development server:
   ```bash
   node api.js
   ```
---

## Technologies Used

- **Node JS**: Development server and build tool.
- **Axios**: For HTTP Request.
- **Dotenv**: For keeping the private information.
- **Cheerio**: For manipulating HTML and XML.

Happy holiday, travel the world before depressed seeing your grade!🎉
