import { green, red, white } from "console-log-colors";
import { createClient } from "redis";

export class RedisService {
  private client;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379", // Update this with your Redis server address if it's different
    });

    this.client.on("error", (err) =>
      console.log(
        red.bgWhiteBright(
          `Redis client error - ${white.bgRedBright.bold(6379)}`
        ),
        err.errors
      )
    );

    this.client
      .connect()
      .catch((err) =>
        console.log(
          red.bgWhiteBright(
            `Redis connection error  - ${white.bgRedBright.bold(6379)}`
          )
        )
      );
  }

  async testConnection() {
    try {
      await this.client.ping();
      console.log(
        green.bgWhiteBright(
          `Redis is running on  - ${white.bgGreenBright.bold(6379)}`
        )
      );
    } catch (err) {
      console.log(
        red.bgWhiteBright(
          `Redis connection failed  - ${white.bgRedBright.bold(6379)}`
        )
      );
      console.log("Redis connection failed", err);
    }
  }

  async get(key: string): Promise<string | null> {
    console.log("get:", key);
    return this.client.get(key);
  }

  async set(key: string, value: string, expiry: number): Promise<void> {
    await this.client.set(key, value, { EX: expiry });
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
