import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class roomTags1618558668088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "room_tags",
        columns: [
          {
            name: "id",
            type: "int4",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "tag_id",
            type: "int4",
            isNullable: true,
          },
          {
            name: "room_id",
            type: "int4",
            isNullable: true,
          },

          {
            name: "organization_id",
            type: "int4",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      false
    );
    // await queryRunner.createForeignKey(
    //   "room_tags",
    //   new TableForeignKey({
    //     columnNames: ["organization_id"],
    //     referencedTableName: "organization",
    //     referencedColumnNames: ["id"],
    //   })
    // );
    // await queryRunner.createForeignKey(
    //   "room_tags",
    //   new TableForeignKey({
    //     columnNames: ["tag_id"],
    //     referencedTableName: "tags",
    //     referencedColumnNames: ["id"],
    //   })
    // );
    // await queryRunner.createForeignKey(
    //   "room_tags",
    //   new TableForeignKey({
    //     columnNames: ["room_id"],
    //     referencedTableName: "room",
    //     referencedColumnNames: ["id"],
    //   })
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("room_tags");
  }
}
