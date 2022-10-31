const { Kafka } = require("kafkajs");

run();
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["thomas:9092"]
        });
        const admin = kafka.admin();
        console.log("Connecting...");
        await admin.connect();
        console.log("Connected!");

        // A-M, N-Z
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        });
        console.log("Created successfully!");
        await admin.disconnect();
    } catch(error) {
        console.error(`Error: ${ error }`);
    } finally {
        process.exit(0);
    }
}
