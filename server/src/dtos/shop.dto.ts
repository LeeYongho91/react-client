import { IsString, IsInt } from 'class-validator';

export class uploadDto {
  @IsString()
  public writer: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsInt()
  public price: number;

  @IsString({ each: true })
  public images: Array<string>;
}
