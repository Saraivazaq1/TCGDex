import { Injectable } from '@nestjs/common';
import { supabase } from '../config/supabase';


@Injectable()
export class AuthService {
  async register(username: string, password: string): Promise<{ error: any; data: any }> {
    const { data, error } = await supabase
      .from("Jogador")
      .insert([{ usuario: username, senha: password }])


    return { data, error };
  }
  async login(username: string, password: string): Promise<{ error: any, data :any }> {
    const { data, error } = await supabase
    .from("Jogador")
    .select('*')
    .eq('usuario', username)
    .eq('senha', password)
    return {data, error}
  }
}

