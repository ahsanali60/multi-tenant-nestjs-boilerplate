import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { RequestContext } from "src/generalUtils/requestContext";
import { EntityRepository, Repository } from "typeorm";
import { Tags } from "./tags.entity";

@Injectable({ scope: Scope.REQUEST })
@EntityRepository(Tags)
export class TagsRepository extends Repository<Tags> {
  constructor(@Inject(REQUEST) private readonly request: any) {
    super();
  }
  async getAll(): Promise<Tags[]> {
    return await this.find();
  }
  async createNew(name: string) {
    return await this.create({ name }).save();
  }
}
