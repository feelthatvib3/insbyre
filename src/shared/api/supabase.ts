import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://txagwhibhgydyfzwfyol.supabase.co';
const supabaseKey = 'sb_publishable_GlAe4HN7bSkAX4jniFCDMw_6f4Nf3VY';

export const supabase = createClient(supabaseUrl, supabaseKey);
