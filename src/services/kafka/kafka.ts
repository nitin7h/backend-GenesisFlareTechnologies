
import { Kafka, type Consumer, type Producer } from "kafkajs";
import { Lead } from "../../model/lead.js";


const kafka = new Kafka({
    clientId: "growly",
    brokers: ["localhost:9092"], // Docker advertised listener
});

let producer: null | Producer
async function createProducer() {
    if (producer) {
        console.log("Kafka Producer Already connected and created ========>")
        return producer
    };
    console.log("Kafka creating Producer... ========>")
    const _producer = kafka.producer();
    console.log("Kafka connecting Producer... ========>")
    await _producer.connect()
    console.log("Kafka Producer connected successfully ! ========>")
    producer = _producer
    console.log("Kafka Producer created successfully ! ========>")
    return producer
}

interface DataInterface {
    name: string,
    email: string,
    phone: number,
    businessType: string,
    message: string,

}
export const dataProduceToKafka = async (lead: DataInterface) => {
    await createProducer(); // ensures connected
    console.log("Kafka Producing Data... ========> : ", lead)
    try {
        await producer?.send({
            topic: 'lead-topic',
            messages: [{ value: JSON.stringify(lead) }],
        });
        console.log("✅ Message successfully Produced to Kafka!");
    } catch (error) {
        console.error("❌ Message not Produced!", error);
    }
};

let consumer: null | Consumer = null
async function createConsumer() {
    if (consumer) {
        console.log("Kafka consumer Already connected and created ========>")
        return consumer
    };
    console.log("Kafka creating consumer... ========>")
    const _consumer = kafka.consumer({
        groupId: 'lead-topic',

    });

    try {
        console.log("Connecting Kafka consumer...");
        await _consumer.connect();
        console.log("Kafka consumer connected successfully ✅");

        consumer = _consumer;
        return consumer;
    } catch (error) {
        console.error("Error connecting Kafka consumer ❌", error);
        throw error;
    }

}


export const dataConsumeFromeKafka = async () => {
    console.log("Kafka creating consumer... ========>")
    await createConsumer()
    console.log("Kafka consuming Messages... ========>")

    // now subscribe the consumer
    console.log("Subscriving the consumer")
    await consumer?.subscribe({
        topic: 'lead-topic',
        fromBeginning: true // or false depending on your case
    });
    console.log("successfully Subscrived the consumer")
    try {
        await consumer?.run({
            eachMessage: async ({ message }) => {
                if (!message.value) return;
                const leadData = JSON.parse(message.value.toString());
                console.log("Lead data 👌 : ", leadData)

                try {
                    // Save data in DB
                    const lead = new Lead(leadData);
                    await lead.save();

                    console.log("✅ Lead successfully saved in DB")
                } catch (err) {
                    console.error("❌ Error saving lead from Kafka:", err);

                }
            }
        });

    } catch (error) {
        console.log("something went wrong while consuming messages ===================>>> : ")
        console.log(error)
    }
}