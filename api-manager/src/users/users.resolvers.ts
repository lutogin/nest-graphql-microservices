import { Args, Query, Resolver, ResolveReference, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Resolver('User')
export class UsersResolvers {
  constructor(private usersService: UsersService) {}

  @Query()
  User(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Query()
  Users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation()
  createUser(_, { name, login }) {
    return this.usersService.create({ name, login });
  }

  @Mutation()
  updateUser(_, { id, name, login }) {
    return this.usersService.update(id, { name, login });
  }

  @Mutation()
  deleteUser(_, { id }) {
    return this.usersService.delete(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.usersService.findById(reference.id);
  }
}
