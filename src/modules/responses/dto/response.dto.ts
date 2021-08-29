import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class ResponseDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  videoLength: number;

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  videoUrl: string;

  @IsString()
  @IsOptional()
  thumbnailUrl: string;

  isAccpted = null;

  roomId: number;

  // @IsArray()
  @IsNotEmpty()
  customFields: Array<{ id: number; answer: string }>;

  organizationId: number;
}

export class GetResponseDto {
  @IsOptional()
  questionId: number;

  @IsNotEmpty()
  pageNumber: number;
  @IsNotEmpty()
  recordsPerPage: number;

  isAccepted: boolean;
}

export class GetPublicResponseDto {
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  pageNumber: number;
  @IsNotEmpty()
  recordsPerPage: number;
}

export class ResponseFilter {
  @IsNotEmpty()
  pageNumber: number;
  @IsNotEmpty()
  recordsPerPage: number;

  @IsOptional()
  roomId: number;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsOptional()
  questionId: number;

  @IsOptional()
  isAccepted: string;

  @IsOptional()
  respondentName: string;
}

export class ChangeResponseStatus {
  @IsBoolean()
  @IsNotEmpty()
  isAccepted: boolean;
}
