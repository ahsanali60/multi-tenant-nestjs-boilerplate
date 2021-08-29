import { Controller, Get, Inject } from "@nestjs/common";
import { TagsService } from "./tags.service";

@Controller("tags")
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getRoomTags() {}
}
