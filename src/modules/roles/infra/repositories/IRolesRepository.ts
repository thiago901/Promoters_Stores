import Role from '@modules/roles/infra/typeorm/entities/Role';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';

export default interface RolesRepository {
  create(data: ICreateRoleDTO): Promise<Role>;
  findById(role_id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
}
