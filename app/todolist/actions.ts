"use server"

import { createClient } from "@/utils/supabase/server";


const supabase = createClient();

export async function create(task: string) {

    const { data, error } = await supabase
        .from('ToDo_list')
        .insert([
            { task_todo: task },
        ])
        .select()


}