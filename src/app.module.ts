import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import seedConfig from "./config/seed.config";
import typeOrmConfig from "./config/typeorm.config";
import { AddOrgIdToReqBody } from "./middlewares/addOrgIdToReqBody.middleware";
import { TenantMiddleware } from "./middlewares/tenant.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { MailModule } from "./modules/mail/mail.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { OrganizationRepository } from "./modules/organization/organization.repository";
import { TagsModule } from "./modules/tags/tags.module";
import { UploadImagesModule } from "./modules/upload-images/upload-images.module";
import { UserRepository } from "./modules/users/user.repository";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forRoot(seedConfig),
    TypeOrmModule.forFeature([UserRepository, OrganizationRepository]),
    AuthModule,
    OrganizationModule,
    MailModule,
    UploadImagesModule,
    TagsModule,    
    UsersModule,
  ],
})

export class AppModule{}

//UnComment and add controllers or route if you want to add multi tenancy
// export class AppModule implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AddOrgIdToReqBody)
  //     .exclude(
  //       { path: "api/responses/all", method: RequestMethod.GET },
  //     )
  //     .forRoutes(ResponsesController, QuestionsController, RoomsController);
  //   consumer
  //     .apply(TenantMiddleware)
  //     .exclude(
  //       { path: "api/organization/uploads/logo/(.*)", method: RequestMethod.GET },
  //     )
  //     .forRoutes(
  //       UploadImagesModule,
  //       ResponsesController,
  //       OrganizationController,
  //     );
  // }
// }
