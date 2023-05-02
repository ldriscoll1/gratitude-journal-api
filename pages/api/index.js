import {createClient} from '@supabase/supabase-js'

export default async function request(req,res){

    const supabaseUrl = 'https://hlgnhpxihxdmcchmxiyt.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    let { data, error } = await supabase.from('gratitudes').select('*');
    res.status(200).json(data);


}