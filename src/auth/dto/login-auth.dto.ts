import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    example: 'user1@mail.com',
    description: 'User email',
  })
  readonly email: string;
  @ApiProperty({
    example: 'P@$$w0rd',
    description: 'User password',
  })
  readonly password: string;
}
