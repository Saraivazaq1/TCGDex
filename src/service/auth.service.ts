import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from '../const';

const supabaseUrl =SUPABASE_URL;
const supabaseKey = SUPABASE_SERVICE_KEY;


const supabase = createClient(supabaseUrl, supabaseKey);


@Injectable()
export class AuthService {
  async register(username: string, password: string): Promise<{ error: any; data: any }> {
    const { data, error } = await supabase
      .from("Jogador")
      .insert([{ usuario: username, senha: password }])


    return { data, error };
  }
}

