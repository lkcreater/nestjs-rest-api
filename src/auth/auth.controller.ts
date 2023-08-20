import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ApiResponseDetail } from 'src/@constants/api-reponse-options.constant';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Logge } from 'src/logger/logger.decorator';
import { interDecoratorLogger, interLogger } from 'src/@types';

//-- instant variable --//
const CONTROLLER_NAME = 'auth';

@ApiTags(CONTROLLER_NAME.toLocaleUpperCase())
@Controller(CONTROLLER_NAME)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiResponse(ApiResponseDetail(201))
  actionSignUp(
    @Logge() origin: interDecoratorLogger,
    @Body() signupAuthDto: SignupAuthDto,
  ) {
    return this.authService.actionSignUp(origin, signupAuthDto);
  }

  @Post('sign-in')
  @ApiResponse(ApiResponseDetail(201))
  actionSignIn(
    @Logge() origin: interDecoratorLogger,
    @Body() signIn: SignInAuthDto,
  ) {
    return this.authService.actionSignIn(origin, signIn);
  }
}
