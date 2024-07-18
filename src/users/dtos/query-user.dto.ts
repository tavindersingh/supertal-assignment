import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryUserDto {
  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  email: string;
}
