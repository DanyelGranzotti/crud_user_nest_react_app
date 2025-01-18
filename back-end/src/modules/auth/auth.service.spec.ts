import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Color } from '../colors/entities/color.entity';
import { UserRoles } from '../users/enums/user-roles.enum';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const user = {
        id: '1',
        email: 'test@test.com',
        password: 'password',
        fullName: 'Test User',
        cpf: '123456789',
        favoriteColor: new Color(),
        notes: [],
        role: UserRoles.USER,
      };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user);

      const result = await authService.validateUser(
        'test@test.com',
        'password',
      );
      expect(result).toEqual(user);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      const result = await authService.validateUser(
        'test@test.com',
        'password',
      );
      expect(result).toBeNull();
    });

    it('should throw InternalServerErrorException on error', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockRejectedValue(new Error());

      await expect(
        authService.validateUser('test@test.com', 'password'),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('login', () => {
    it('should return tokens if credentials are valid', async () => {
      const user = {
        id: '1',
        email: 'test@test.com',
        password: 'password',
        fullName: 'Test User',
        cpf: '123456789',
        favoriteColor: new Color(),
        notes: [],
        role: UserRoles.USER,
      };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await authService.login({
        email: 'test@test.com',
        password: 'password',
      });
      expect(result).toEqual({ access_token: 'token', refresh_token: 'token' });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(
        authService.login({ email: 'test@test.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens if token is valid', async () => {
      const user = {
        id: '1',
        email: 'test@test.com',
        fullName: 'Test User',
        cpf: '123456789',
        favoriteColor: new Color(),
        notes: [],
        role: UserRoles.USER,
        password: 'password',
      };
      jest.spyOn(jwtService, 'verify').mockReturnValue({ sub: '1' });
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('newToken');

      const result = await authService.refreshToken('token');
      expect(result).toEqual({
        access_token: 'newToken',
        refresh_token: 'newToken',
      });
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      await expect(authService.refreshToken('token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
