import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../../roles/roles.service';
import { getModelToken } from '@nestjs/sequelize';
import { Role } from '../../roles/models/roles.model';
import { User } from '../models/users.model';
import { CreateUserDto } from '../dto/create-user.dto';

describe('User service', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    destroy: jest.fn().mockResolvedValue({ message: "User o'chirildi" }),
  };

  const mockRolesRepository = {
    findOne: jest.fn().mockImplementation((value) => 'ADMIN'),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesRepository,
        },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  // describe('createUser', () => {
  //   describe('when createUser is called', () => {
  //     let createUserDto: CreateUserDto;
  //     let newUser: User;
  //     beforeEach(async () => {
  //       createUserDto = {
  //         name: userStub().name,
  //         email: userStub().email,
  //         password: userStub().password,
  //       };
  //       newUser = await usersService.createUser(createUserDto);
  //       console.log(newUser);
  //     });

  //     it('should create newUser', async () => {
  //       expect(newUser).toMatchObject({
  //         ...userStub(),
  //         roles: ['ADMIN'],
  //       });
  //     });
  //   });
  // });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      it('then it should call usersService', async () => {
        expect(await usersService.getUserById(userStub().id)).toEqual(
          userStub(),
        );
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      it('then it should call usersService', async () => {
        expect(await usersService.getAllUsers()).toEqual([userStub()]);
      });
    });
  });

  describe('deleteUserById', () => {
    describe('when deleteUserById is called', () => {
      let res: Object;
      beforeAll(async () => {
        res = await usersService.deleteUserById(userStub().id);
      });
      it('then it should return message', async () => {
        expect(res).toEqual({ message: "Foydalanuvchi o'chirildi" });
      });
    });
  });
});
