"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const supabase = createClient();

export function ToDoEdit({todo}: {todo: any}) {
  const [title, setTitle] = useState(todo.task_todo);
  const [priority, setPriority] = useState(todo.priority);
  const [done, setDone] = useState(todo.is_done);

  const handleEdit = async () => {
    const { error } = await supabase
      .from("ToDo_list")
      .update({ priority, is_done: done })
      .eq("id", todo.id);

    if (error) {
      console.error("Error updating record:", error.message);
    } else {
      console.log("Record updated successfully!");
      // Optionally update the parent state
    //   setTaskState({ id, title, priority, done });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <div style={{ marginBottom: "20px" }}>
          <label>Title: {title ?? "NO title"}</label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Priority
            <input
              style={{ marginLeft: "5px" }}
              type="number"
              min="0"
              max="5"
              value={priority || 0}
              onChange={(e) => setPriority(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Done
            <input
              style={{ marginLeft: "5px" }}
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />
          </label>
        </div>
        <Button className="bg-green-500" onClick={handleEdit}>
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}
/*"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const supabase = createClient();

export function ToDoEdit({ task, onTaskUpdated }: { task: any; onTaskUpdated: any }) {
  // Initialize state with the current task or default values
  const [currentTask, setCurrentTask] = useState({
    id: task?.id,
    task_todo: task?.task_todo,
    start_date: task?.start_date ? new Date(task.start_date) : null,
    end_date: task?.end_date ? new Date(task.end_date) : null,
  });

  // Update state whenever the task prop changes
  useEffect(() => {
    setCurrentTask({
      id: task?.id,
      task_todo: task?.task_todo,
      start_date: task?.start_date ? new Date(task.start_date) : null,
      end_date: task?.end_date ? new Date(task.end_date) : null,
    });
  }, [task]);

  const handleEdit = async () => {
    const { error } = await supabase
      .from("TODO")
      .update({
        task: currentTask.task_todo,
        start_date: currentTask.start_date ? currentTask.start_date.toISOString() : null,
        end_date: currentTask.end_date ? currentTask.end_date.toISOString() : null,
      })
      .eq("id", currentTask.id);

    if (error) {
      console.error("Error updating record:", error.message);
    } else {
      console.log("Record updated successfully!");
      onTaskUpdated(currentTask);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <div style={{ marginBottom: "20px" }}>
          <label>Task: {currentTask.task_todo}</label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            Start Date
            <input
              type="date"
              value={currentTask.start_date ? currentTask.start_date.toISOString().substring(0, 10) : ""}
              onChange={(e) => setCurrentTask(prev => ({ ...prev, start_date: new Date(e.target.value) }))}
              style={{ marginLeft: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>
            End Date
            <input
              type="date"
              value={currentTask.end_date ? currentTask.end_date.toISOString().substring(0, 10) : ""}
              onChange={(e) => setCurrentTask(prev => ({ ...prev, end_date: new Date(e.target.value) }))}
              style={{ marginLeft: "5px" }}
            />
          </label>
        </div>
        <Button className="bg-green-500" onClick={() => {
    console.log("Edit button clicked", currentTask);
    handleEdit();
}}>
    Save Changes
</Button>
      </DialogContent>
    </Dialog>
  );
}
*/
