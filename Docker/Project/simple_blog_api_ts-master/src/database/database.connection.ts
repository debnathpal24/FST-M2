import "reflect-metadata";
import { createConnection, Connection, ConnectionOptions } from "typeorm";
import { join } from "path";
const parentDir = join(__dirname, "..");

const connectionOpts: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USERNAME || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres_password",
  database: process.env.POSTGRES_DB || "simple_blog_api",
  entities: [`${parentDir}/**/*.entity.ts`],
  synchronize: true,
};

const connection:Promise<Connection> = createConnection(connectionOpts);

export default connection;
