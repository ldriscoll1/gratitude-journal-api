import { createClient } from '@supabase/supabase-js'

export default async function request(req, res) {
    const supabaseUrl = 'https://xbgjgrctcwtygsrygvpe.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    if (req.method == "POST") {
        // sending data to the database
        const body = req.body
        console.log(body)
        const { data, error } = await supabase.from('gratitudes')
        .insert([
            { text: body.gratitude },
        ])
        if (error) {
            res.status(400).json({ message: "could not update gratitudes"})
            return
        }
        res.status(200).json(data)

    } else if (req.method == "GET") {
        // fetching data from the database
        let { data, error } = await supabase.from('gratitudes').select('*')

        if (error) {
            res.status(400).json({ message: "could not load gratitudes"})
            return
        }

        res.status(200).json(data)
    }

}