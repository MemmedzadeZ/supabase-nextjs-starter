import { createClient } from "@/utils/supabase/server";

export async function GET(req:Request) {
    const supabase = await createClient();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if(!id) return new Response(JSON.stringify({error:'ID is required'}),{status:400});

    const {data,error} = await supabase.from('todos').select().eq('id',id).single();

    if(error) return new Response(JSON.stringify({error:'Todo not found'}),{status:404});

    return new Request(JSON.stringify(data),{
        headers:{'Content-Type':'application/json'}
    })

    
}



export async function PUT(req:Request) {
    const supabase = await createClient();
const body = await req.json();

const {id,title,completed} = body;


    if(!id) return new Response(JSON.stringify({error:'ID is required'}),{status:400});

    const {data,error} = await supabase.from('todos').update({title,completed}).eq('id',id).single();

    if(error) return new Response(JSON.stringify({error:error.message}),{status:500});

    return new Request(JSON.stringify(data),{
        headers:{'Content-Type':'application/json'}
    })

    
}



export async function DELETE(req:Request) {
    const supabase = await createClient();
    const body = await req.json();
    const {id} =body;
    if(!id) return new Response(JSON.stringify({error:'ID is required'}),{status:400});

    const {error} = await supabase.from('todos').delete().eq('id',id);

    if(error) return new Response(JSON.stringify({error:error.message}),{status:500});

    return new Response(null,{status:204})

    
}


