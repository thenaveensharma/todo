import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'; // Importing bcrypt library for password hashing
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Method to sign up a user
  async signUp(email: string, password: string, name: string) {
    try {
      // Check if required fields are provided
      if (!email || !name || !password) {
        throw new BadRequestException(
          'Email, name, and password are required.',
        );
      }

      // Check if user is already available in the database
      const isExists = await this.usersService.findOneByEmail(email);

      if (isExists) {
        throw new BadRequestException('User is already registered');
      }

      // Creating hashed password for the user
      const hashedPassword = await this.createHashedPassword(password);
      let newUser = await this.usersService.create(email, name, hashedPassword);
      newUser = newUser.dataValues;
      delete newUser['password']; // Removing password from the response

      // Generate access token
      const token = await this.generateAccessToken(newUser);

      return { ...newUser, accessToken: token };
    } catch (error) {
      throw new BadRequestException('Signup failed', error.message); // Handling exceptions
    }
  }

  // Method to sign in a user
  async signIn(email: string, password: string) {
    try {
      // Check if required fields are provided
      if (!email || !password) {
        throw new BadRequestException('Email and password are required.');
      }

      // Check if user is not available in the database
      let user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new BadRequestException('User is not registered');
      }
      user = user.dataValues;
      const isValidPassword = await this.comparePassword(
        password,
        user.password,
      );

      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid Email or Password');
      }

      delete user['password']; // Removing password from the response

      // Generate access token
      const token = await this.generateAccessToken(user);

      return { ...user, accessToken: token };
    } catch (error) {
      throw new UnauthorizedException('Invalid Email or Password'); // Handling exceptions
    }
  }

  // Method to create hashed password for user
  async createHashedPassword(plaintextPassword: string) {
    const salt = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);
    return hashedPassword;
  }

  // Method to compare password provided by user with the hashed password stored in database
  async comparePassword(plaintextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plaintextPassword, hashedPassword);
  }

  // Method to generate an access token for the user
  async generateAccessToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.SECRET,
    });
  }
}
