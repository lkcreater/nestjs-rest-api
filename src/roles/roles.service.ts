import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { HttpAdapterHost } from '@nestjs/core';

interface IRouterStack {
  path: string;
  method: string;
  params: unknown;
}

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(private adapterHost: HttpAdapterHost) {}
  onModuleInit() {
    const httpAdapter = this.adapterHost.httpAdapter.getInstance();
    const routerStack = httpAdapter._router.stack;
    const routerList: IRouterStack[] = [];
    routerStack.forEach((e: any) => {
      if (e.route?.path) {
        routerList.push({
          path: e.route?.path,
          method: e?.route?.stack[0]?.method,
          params: e.keys,
        });
      }
    });
    //console.log(routerList);
  }

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
