
import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { sendMail } from '../nodeMailer/mailService.js';


const connection = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null // ✅ Required for BullMQ
});

const leadWorker = new Worker(
    'leadQueue',
    async job => {
        console.log(`Processing job: ${job.id}`);

        console.log("Data in BullMQ : ", job.data)


        //send mail 
        const status = await sendMail(job.data)
        console.log("status for sending mail : ", status)

        console.log("✅ Lead send successfully by worker!");

    },
    { connection }
);
console.log("🚀 Lead Worker started. Waiting for jobs...");
leadWorker.on('completed', job => {
    console.log(`🎉 Job ${job.id} completed`);
});

leadWorker.on('failed', (job, err) => {
    console.error(`💥 Job ${job?.id} failed: ${err.message}`);
});
