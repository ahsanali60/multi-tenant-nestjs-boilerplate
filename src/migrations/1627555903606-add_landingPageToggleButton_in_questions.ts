import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addLandingPageToggleButtonInQuestions1627555903606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("question", [
      new TableColumn({
        name: "is_showed_on_landing_page",
        type: "boolean",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("question", [
      new TableColumn({
        name: "is_showed_on_landing_page",
        type: "boolean",
        isNullable: true,
      }),
    ]);
  }
}
