import { Controller, Get, Post, Body, Res, Render, Injectable } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { Response } from 'express';
import { MatchService } from '../../service/match.service';

@Controller('match')
export class MatchController {

  constructor(private readonly matchService: MatchService) {}

    @Get()
    public renderMatchScreen(){

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
    async createMatch(
        @Body() body: {name: string; username: string},
        @Res() res: Response,

    ){
        const {username, name} = body;
        const { error } = await this.matchService.createMatch(username, name);

    if (error) {
      return res.render('cadastro', { error: error.message });
    }

    }
}
