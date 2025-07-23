import { Controller, Get, Post, Body, Res, Render, Injectable, Query } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { Response } from 'express';
import { MatchService } from '../../service/match.service';

@Controller('match')
export class MatchController {

  constructor(private readonly matchService: MatchService) { }

  @Get()
  public renderMatchScreen(@Res() res: Response) {
    return res.render('match')
  }
  /*
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
  */
  @Post('new')
  async createMatch(@Body() body: { name: string; username: string }) {
    const { username, name } = body;
    const { error, data } = await this.matchService.createMatch(username, name);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, partida: data };
  }

@Post('join')
async joinMatch(@Body() body: { username: string; name: string }) {
  const { username, name } = body;
  const { error, data } = await this.matchService.joinMatch(username, name);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, partida: data };
}

  @Get('listMatch')
  async listMatch() {
    const {error, data} = await this.matchService.listMatch();

    if (error) {
      return {success: false, message: error.message}
    }

    return { error, data }
  }
}
