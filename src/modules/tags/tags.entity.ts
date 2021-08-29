import { Injectable, Scope } from "@nestjs/common";
import { ExtendedEntity } from "src/generalUtils/extendedEntity";
import { RequestContext } from "src/generalUtils/requestContext";
import { GlobalScopes } from "src/typeormGlobalScopes";
// import { ORGANIZATION_ID } from "src/middlewares/tenant.middleware";
// import { GlobalScopes } from "src/typeormGlobalScopes";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Organization } from "../organization/organization.entity";
import { VideoTags } from "../roomTags/videoTags.entity";


@Injectable({ scope: Scope.REQUEST })
@GlobalScopes<Tags>([
  (qb, alias) =>
    qb.andWhere(`${alias.name}.organizationId = ${RequestContext.currentRequest().body["organizationId"]}`),
])
// @GlobalScopes<Room>([(qb, alias) => qb.andWhere(`${alias.name}.organizationId = ${ORGANIZATION_ID}`)])
@Entity()
export class Tags extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, name: "name" })
  name: string;

 

  // Room question relation
  @OneToMany((type) => VideoTags, (videoTags) => videoTags.tags, { eager: false })
  videoTags: VideoTags[];

  // @ManyToMany((type) => Room, (room) => room.tags)
  // video: Video[];

 

  @CreateDateColumn({ type: "timestamp", name: "created_at", default: () => "now()", select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at", select: false })
  updatedAt: string;

  @DeleteDateColumn({ type: "timestamp", name: "deleted_at", select: false })
  deletedAt: string;
}
