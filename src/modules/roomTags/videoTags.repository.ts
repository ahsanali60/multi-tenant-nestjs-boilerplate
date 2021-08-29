import { EntityRepository, Repository } from "typeorm";
import { VideoTags } from "./videoTags.entity";

@EntityRepository(VideoTags)
export class VideoTagsRepository extends Repository<VideoTags> {}
