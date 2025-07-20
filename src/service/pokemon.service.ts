import { Injectable } from '@nestjs/common';
import { CardBrief } from '../model/card-brief.model';

@Injectable()
export class PokemonService {

    private url = 'https://api.tcgdex.net/v2/en/cards'
    private pokemons: CardBrief[] = []

    async getPokemonJson(name: string) {
        let response = await fetch(`${this.url}?=${name}`)
        let json = await response.json()
        json = json.filter((val: { image?: string, name: string }) => {
            return val.image !== undefined && val.hasOwnProperty("image") && val.name.toLowerCase().includes(name.toLowerCase())
        })

        let randomIndex = Math.floor(Math.random() * json.length)
        let pokemon = json[randomIndex]

        let pokemonInfoResponse = await fetch(`${this.url}/${pokemon.id}`)
        let pokemonInfoJson = await pokemonInfoResponse.json()

        return pokemonInfoJson
    }

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

    getPokemons() {
        return this.pokemons
    }

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


} 