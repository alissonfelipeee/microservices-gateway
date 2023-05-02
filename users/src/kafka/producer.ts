import { kafka } from "./config";

const producer = kafka.producer();
export const sendMessage = async (message: string, data: any) => {
  await producer.connect();
  await producer.send({
    topic: "auth_service",
    messages: [
      {
        value: JSON.stringify({
          message,
          data,
        }),
      },
    ],
  });
};
