import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ApiResponseDetail } from 'src/@constants/api-reponse-options.constant';
import { SignInAuthDto } from './dto/signin-auth.dto';

//-- instant variable --//
const CONTROLLER_NAME = 'auth';

@ApiTags(CONTROLLER_NAME.toLocaleUpperCase())
@Controller(CONTROLLER_NAME)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiResponse(ApiResponseDetail(201))
  actionSignUp(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.actionSignUp(signupAuthDto);
  }

  @Post('sign-in')
  @ApiResponse(ApiResponseDetail(201))
  actionSignIn(@Body() signIn: SignInAuthDto) {
    return this.authService.actionSignIn(signIn);
  }
}
