import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class OrganizationDto {
  pictureUrl: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  domainPrefix: string;

  customDomain: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  internalDescription: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  tagLine: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}

export class GetOrganizationDto {
  @IsNumber()
  pageNumber: number;
  @IsNumber()
  recordsPerPage: number;
  organizationName: string;
}

export class OrganizationSettingsDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  pictureUrl: string;

  @MaxLength(500)
  @IsString()
  @IsNotEmpty()
  internalDescription: string;

  @MaxLength(1000)
  @IsString()
  longDescription: string;
  @IsString()
  @MaxLength(50)
  @IsOptional()
  tagLine: string;

  customDomain: string;

  @MaxLength(255)
  @IsOptional()
  homepageUrl;
  @IsString()
  @IsNotEmpty()
  headerColor: string;
  @IsString()
  @IsNotEmpty()
  headerFontColor: string;
  @IsString()
  @IsNotEmpty()
  buttonColor: string;
  @IsString()
  @IsNotEmpty()
  buttonFontColor: string;
  @IsString()
  @IsNotEmpty()
  primaryFontColor: string;

  pdfUrl: string;
}
export class EditOrganizationDto {
  @IsNumber()
  @IsNotEmpty()
  organizationId: number;
  pictureUrl: string;

  @MaxLength(255)
  @IsString()
  organizationName: string;

  @MaxLength(255)
  @IsString()
  domainPrefix: string;

  customDomain: string;

  @MaxLength(500)
  @IsString()
  internalDescription: string;
  @IsString()
  @MaxLength(50)
  @IsOptional()
  tagLine: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsString()
  password: string;
}
