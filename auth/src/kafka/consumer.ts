import { EachMessagePayload } from "kafkajs";
import { kafka } from "./config";
import { PrismaCreateUserCredentialsRepository } from "../repositories/create-user-credentials/prisma-create-user-credentials";
import { CreateUserCredentialsService } from "../services/create-user-credentials";

interface IReceivedAuthService {
  message: string;
  data: {
    name: string;
    email: string;
    password: string;
  };
}

export async function consumer() {
  const consumer = kafka.consumer({ groupId: "all" });

  await consumer.connect();
  await consumer.subscribe({ topic: "auth_service" });
  await consumer.run({
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      if (topic === "auth_service") {
        const received: IReceivedAuthService = JSON.parse(
          message.value!.toString()
        );
        if (received.message === "User created successfully") {
          const { name, email, password } = received.data;

          const prismaCreateUserCredentialsRepository =
            new PrismaCreateUserCredentialsRepository();
          const createUserCredentialsService = new CreateUserCredentialsService(
            prismaCreateUserCredentialsRepository
          );

          await createUserCredentialsService.execute(email, password);

          console.log(`User ${name} saved successfully!`);
        }
      }
    },
  });
}
