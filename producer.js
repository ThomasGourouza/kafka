const { Kafka } = require("kafkajs");
const { Partitioners } = require('kafkajs');

const msg = process.argv[2];

run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["thomas:9092"]
        });
        const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
        console.log("Connecting...");
        await producer.connect();
        console.log("Connected!");

        // A-M: 0, N-Z: 1
        const partition = (msg[0].toUpperCase() < "N") ? 0 : 1;

        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        });

        console.log(`sent successfully: ${ JSON.stringify(result) }`);
        await producer.disconnect();
    } catch(error) {
        console.error(`Error: ${ error }`);
    } finally {
        process.exit(0);
    }
}
