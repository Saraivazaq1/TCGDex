import { Injectable } from '@nestjs/common';
import { CardBrief } from '../model/card-brief.model';

@Injectable()
export class PokemonService {

    private url = 'https://api.tcgdex.net/v2/en/cards'
    private pokemons: CardBrief[] = []
    

    async getPokemonJson() {
        let response = await fetch(this.url + '?category=Pokemon');
        let json = await response.json()
        json = json.filter((val: { image?: string }) => {
            return val.image !== undefined && val.hasOwnProperty("image")
        })

        this.pokemons = [];
        for(let i = 0; i<3; i++){
            const pokemonAtual = await (await fetch(this.url + '/'+ json[Math.floor(Math.random() * json.length)].id)).json();
    
            const cardBrief: CardBrief = {
                id: pokemonAtual.id,
                name: pokemonAtual.name,
                image: `${pokemonAtual.image}/high.jpg`,
                hp: pokemonAtual.hp,
                types: pokemonAtual.types
                    
            }
            this.pokemons.push(cardBrief);
        }
    
        return this.pokemons
    }

/*
    async addPokemon(name: string) {
        let pokemon = await this.getPokemonJson(name)

        const cardBrief: CardBrief = {
            id: pokemon.id,
            name: pokemon.name,
            image: `${pokemon.image}/high.jpg`,
            hp: pokemon.hp,
            types: pokemon.types
        }

        this.pokemons.push(cardBrief)
        return { message: 'Pokemon adicionado!', total: this.pokemons.length }

    }
        */

    getPokemons() {
        return this.pokemons
    }

    /*
    deletePokemon(name: string) {
        const index = this.pokemons.findIndex((card) => card.name?.toLowerCase().includes(name.toLowerCase()))

        if (index === -1) {
            return { message: 'Não há um pokémon com esse nome' }
        }

        const removed = this.pokemons.splice(index, 1)[0]
        return {
            message: 'Deletado',
            cartaRemovida: removed
        }
    }
*/
  

} 