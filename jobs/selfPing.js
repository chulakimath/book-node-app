// cron/selfPing.js
import cron from 'node-cron';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


export function startSelfPing() {
  const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

  cron.schedule('*/12 * * * *', async () => {
    try {
      const res = await axios.get(SERVER_ADDRESS);
    //   console.log(`[${new Date().toISOString()}] Self ping success: ${res.status}`);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] Self ping failed: ${err.message}`);
    }
  });

  console.log('✅ Self-ping cron job scheduled every 12 minutes');
}
