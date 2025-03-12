import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { HealthCheckController } from "./health-check/health-check.controller";
import { ConfigModule } from "../config/config.module";

@Module({
     imports: [
          ServeStaticModule.forRoot({
               rootPath: join(__dirname, "..", "build"),
               exclude: ["/api/{*test}"],
               serveStaticOptions: {
                    fallthrough: false,
               },
          }),
          ConfigModule,
     ],
     controllers: [HealthCheckController],
})
export class MonitoringModule {}
