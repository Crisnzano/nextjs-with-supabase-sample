"use client";

import AddDialog from "./AddDialog";
import { ToDoEdit } from "./TaskEdit";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

type Props = {
  todos: any[] | null;
};

function Todos({ todos }: Props) {
  const [task, setTask] = useState<string>("");
  const supabase = createClient();

//   async function edit(id: number, task: string) {
//     const { error } = await supabase
//       .from("ToDo_list")
//       .update({ task_todo: task })
//       .eq("id", id);
//   }

  async function remove(id: number) {
    const { error } = await supabase.from("ToDo_list").delete().eq("id", id);
  }

  return (
    <div className="my-6 w-full overflow-y-auto">
      <AddDialog task={task} setTask={setTask} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created At</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>StartDate </TableHead>
            <TableHead>EndDate</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Done</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.created_at}</TableCell>
              <TableCell>{todo.task_todo}</TableCell>
              <TableCell>{todo.start_date}</TableCell>
              <TableCell>{todo.end_date}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell>{todo.is_done ? "done": "not"}</TableCell>
              <TableCell>
                <ToDoEdit todo={todo} />

                <Button className="bg-red-500" onClick={() => remove(todo.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Todos;
