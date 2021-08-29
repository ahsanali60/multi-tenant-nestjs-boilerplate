import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class tags1618475605241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tags",
        columns: [
          {
            name: "id",
            type: "int4",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
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
    //   "tags",
    //   new TableForeignKey({
    //     columnNames: ["organization_id"],
    //     referencedTableName: "organization",
    //     referencedColumnNames: ["id"],
    //   })
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("tags");
  }
}
