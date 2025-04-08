import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase= await createClient();
    const {data,error} = await supabase.from('todos').select();

    if(error)
    {
        return new Response(JSON.stringify({error:error.message}),{status:500});
    }

    return new Response(JSON.stringify(data),{
        headers:{'Content-Type':'application/json'}

    });

}


export async function POST(req:Request) {

    const supabase = await createClient();
    const body = await req.json();

    const {title,description,completed} = body;

    if(!title || !description )
    {
        return new  Response(JSON.stringify({error:'Missing required field'}),{status:400})

    }
    const {data,error} = await supabase.from('todos').insert({title,description,completed}).single();

    if(error)
    {
        return new Response(JSON.stringify({error:error.message}),{status:500});
    }

    return new Response(JSON.stringify(data),{
        headers:{'Content-Type':'application/json'},
        status:201,
    })

    
}