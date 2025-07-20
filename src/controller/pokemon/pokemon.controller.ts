import { Controller, Delete, Get, Post, Query, Render } from '@nestjs/common';
import { PokemonService } from '../../service/pokemon.service';

@Controller('card')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    /*
    @Get('/pokemon/random')
    async findRandomCardByNameAndCategory(@Query('name') name: string, @Query('category') category: string) {
        if (!name || !category) return { error: 'Missing name or category query param' };
        return this.pokemonService.findRandomCardByNameAndCategory(name, category);
    } 
    */


    @Get('/getPokemonJson')
    getPokemonJson(@Query('name') name: string) {
        return this.pokemonService.getPokemonJson(name)
    }

    @Post('/addPokemon')
    addPokemon(@Query('name') name: string) {
        return this.pokemonService.addPokemon(name)
    }

    @Get('/getPokemon')
    getPokemon() {
        return this.pokemonService.getPokemons()
    }

    @Delete('/deletePokemon')
    deletePokemon(@Query('name') name: string) {
        return this.pokemonService.deletePokemon(name)
    }

    @Get('/equipe')
    @Render('index')
    async renderAllPokemon() {
        const pokemons = this.pokemonService.getPokemons()
        return { pokemons }
    }
}