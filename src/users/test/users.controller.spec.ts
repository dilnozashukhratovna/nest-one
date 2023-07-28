import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');
describe('Users controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      //   imports: [AppModule],
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  it('should be defined usersController', () => {
    expect(usersController).toBeDefined();
  });
  it('should be defined usersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeAll(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersController.createUser(createUserDto);
        console.log(user);
      });
      it('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
      });
      it('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.getUserById(userStub().id.toString());
      });
      it('then it should call usersService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().id);
      });

      it('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      let users: User[];
      beforeEach(async () => {
        users = await usersController.getAllUsers();
      });
      it('then it should call usersService', () => {
        expect(usersService.getAllUsers).toBeCalled();
      });

      it('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('deleteUserById', () => {
    describe('when deleteUserById is called', () => {
      let res: Object;
      beforeAll(async () => {
        res = await usersController.deleteUserById(userStub().id.toString());
      });
      it('then it should call usersService', () => {
        expect(usersService.deleteUserById).toBeCalledWith(userStub().id);
      });

      it('then it should return message', () => {
        expect(res).toEqual({ message: "User o'chirildi" });
      });
    });
  });
});
