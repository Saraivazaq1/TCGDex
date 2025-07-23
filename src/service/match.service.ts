import { Injectable } from '@nestjs/common';
import { supabase } from '../config/supabase';

@Injectable()
export class MatchService {

    async createMatch(username: string, name: string ): Promise<{ error: any; data:any}>{
        const { data, error } = await supabase.from('Partida')
        .insert({nome: name , jogador1: username, status: 'A' } )
        .select();
        
        return {data, error};
    }

    async joinMatch(username: string, name: string): Promise<{ error: any; data:any}> {
        const { data, error } = await supabase.from('Partida')
        .update({jogador2: username, status: "J"})
        .eq('nome', name)
        .select();

        return {data, error};

    }

    async listMatch() {
        const { data, error } = await supabase.from('Partida')
        .select('nome')
        .eq('status', 'A')

        return {data, error};
    }

} 