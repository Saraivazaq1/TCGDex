import { Controller, Get, Post, Body, Res, Render } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('register')
  getRegisterPage(@Res() res: Response) {
    res.render('cadastro', { error: null });
  }

  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = body;
    const { error } = await this.authService.register(username, password);

    if (error) {
      return res.render('cadastro', { error: error.message });
    }

    return res.redirect('login');
  }

  @Get('login')
  getLoginPage(@Res() res: Response){
    res.render('login')
  }

@Post('login')
async login(
  @Body() body: { username: string; password: string },
  @Res() res: Response
) {
  const { username, password } = body;
  const { error, data } = await this.authService.login(username, password);

  if (error || !data || data.length === 0) {
    return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
  }

  return res.status(200).json({ success: true, user: data[0] }); 
}

}
