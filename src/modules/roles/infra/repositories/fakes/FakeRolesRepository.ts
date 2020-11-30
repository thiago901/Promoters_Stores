import Role from '@modules/roles/infra/typeorm/entities/Role';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import IRolesRepository from '@modules/roles/infra/repositories/IRolesRepository';

class FakeRolesRepository implements IRolesRepository {
  private ormrepository: Role[] = [];

  public async create({ name }: ICreateRoleDTO): Promise<Role> {
    const role = new Role();
    Object.assign(role, {
      name,
    });
    this.ormrepository.push(role);
    return role;
  }

  public async findById(role_id: string): Promise<Role | undefined> {
    const role = this.ormrepository.find(r => r.id === role_id);

    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = this.ormrepository.find(r => r.name === name);

    return role;
  }
}

export default FakeRolesRepository;
