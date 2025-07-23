import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { PokemonController } from './controller/pokemon/pokemon.controller';
import { PokemonService } from './service/pokemon.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth.service';
import { MatchController } from './controller/match/match.controller';
import { MatchService } from './service/match.service';


@Module({
    imports: [],
    controllers: [PokemonController, AuthController, MatchController],
    providers: [PokemonService, AuthService, MatchService],
})
export class AppModule { } 