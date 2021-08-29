import { ExtendedEntity } from "src/generalUtils/extendedEntity";
import { RequestContext } from "src/generalUtils/requestContext";
import { GlobalScopes } from "src/typeormGlobalScopes";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Organization } from "../organization/organization.entity";
// import { Room } from "../rooms/rooms.entity";
import { Tags } from "../tags/tags.entity";

// @GlobalScopes<RoomTags>([
//   (qb, alias) =>
//     qb.andWhere(`${alias.name}.organizationId = ${RequestContext.currentRequest().body["organizationId"]}`),
// ])
@Entity()
export class VideoTags extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Tags, (tags) => tags.videoTags, { eager: true })
  @JoinColumn({ name: "tag_id" })
  tags: Tags[];

  @Column({ name: "tag_id" })
  tag_id: number;

  //Rooms Relation
  // @ManyToOne((type) => Room, (room) => room.roomTag, { eager: false })
  // @JoinColumn({ name: "room_id" })
  // room: Room;
  // @Column({ name: "room_id", select: true })
  // room_id: number;



  @Column({ name: "organization_id", select: false })
  organizationId: number;

  @CreateDateColumn({ type: "timestamp", name: "created_at", default: () => "now()", select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at", select: false })
  updatedAt: string;

  @DeleteDateColumn({ type: "timestamp", name: "deleted_at" })
  deletedAt: string;
}
