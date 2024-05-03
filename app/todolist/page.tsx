import { createClient } from "@/utils/supabase/server";
import Todos from "./Todos";

export default async function ToDoList() {
    const supabase = createClient();
    let { data: todos } = await supabase.from("ToDo_list").select("*");
    


    return (
<Todos todos={todos} />
    );
}
