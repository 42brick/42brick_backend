import { IsString, IsOptional } from 'class-validator';

export class MintNftDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly external_url: string;
}
