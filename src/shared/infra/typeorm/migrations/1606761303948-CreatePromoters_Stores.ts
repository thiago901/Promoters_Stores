import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePromotersStores1606761303948
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'promoters_stores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'store_id',
            type: 'uuid',
          },
          {
            name: 'promoter_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'Promoters_Stores_Store',
            referencedTableName: 'stores',
            referencedColumnNames: ['id'],
            columnNames: ['store_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Promoters_Stores_Promoter',
            referencedTableName: 'promoters',
            referencedColumnNames: ['id'],
            columnNames: ['promoter_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('promoters_stores');
  }
}
