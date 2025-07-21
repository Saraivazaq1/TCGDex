import { Injectable } from '@nestjs/common';
import { supabase } from '../config/supabase';

@Injectable()
export class MatchService {

    async createMatch(username: string, name: string ): Promise<{ error: any; data:any}>{
        const { data, error } = await supabase.from('partida')
        .insert({nome: name , jogador1: username, status: 'A' } );
        
        return {data, error};
    }

} 