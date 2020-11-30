import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createStore1606752310321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'fantasy_name',
            type: 'varchar',
          },
          {
            name: 'company_name',
            type: 'varchar',
          },
          {
            name: 'cnpj',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'contact_name',
            type: 'varchar',
          },
          {
            name: 'contact_phone',
            type: 'varchar',
          },
          {
            name: 'address_id',
            type: 'uuid',
          },
          {
            name: 'social_network',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'site',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'subject',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
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
            name: 'Store_Address',
            referencedTableName: 'adresses',
            referencedColumnNames: ['id'],
            columnNames: ['address_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stores');
  }
}
