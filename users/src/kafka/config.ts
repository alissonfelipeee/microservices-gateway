import { Kafka, KafkaConfig } from "kafkajs";

const kafkaConfig: KafkaConfig = {
  clientId: "users",
  brokers: ["localhost:9092"],
};
export const kafka = new Kafka(kafkaConfig);
