import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { PokemonController } from './controller/pokemon/pokemon.controller';
import { PokemonService } from './service/pokemon.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth.service';


@Module({
    imports: [],
    controllers: [PokemonController, AuthController],
    providers: [PokemonService, AuthService],
})
export class AppModule { } 