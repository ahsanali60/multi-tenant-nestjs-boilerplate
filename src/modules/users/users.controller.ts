import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserProfileDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";
import { constants } from "../auth/constants";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("update-profile")
  @UseGuards(AuthGuard())
  updateProfile(@Req() request, @Body(ValidationPipe) userProfileDto: UserProfileDto) {
    if (request.user.type != constants.OrgUserTypeName)
      throw new HttpException("Not a Org User", HttpStatus.BAD_REQUEST);
    return this.userService.updateProfile(request.user.id, userProfileDto);
  }

  @Get("get-profile")
  @UseGuards(AuthGuard())
  getUser(@Req() request) {
    try {
      if (request.user.type != constants.OrgUserTypeName)
        throw new HttpException("Not a Org User", HttpStatus.BAD_REQUEST);
      return this.userService.getUser(request.user.id);
    } catch (err) {
      console.log(err);
    }
  }
}
