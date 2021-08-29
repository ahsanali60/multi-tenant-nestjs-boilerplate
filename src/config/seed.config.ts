import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const seedConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "teach_me_today_db",
  entities: [__dirname + "/../modules/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../seed/*{.ts,.js}"],
  cli: {
    migrationsDir: "./src/seed",
  },
  migrationsRun: false, // to automatically run migrations set it to true
  synchronize: false, //true if you want to create auto migrations
  migrationsTableName: "seed",
};
export default seedConfig;
