"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { create } from "./actions";

import { Button } from "@/components/ui/button"


const handleCreate = async (task:string) => {
    try{
        await create (task)
    }
    catch(error){
        console.error('Error creating new task', error);
    }
}

function AddDialog({task, setTask}: {task:string, setTask: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Button className="bg-green-500 "style={{ marginLeft: "2px" }}>Add</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
             Click save when you're done.
            </DialogDescription>
        </DialogHeader>
        <form onSubmit={() => handleCreate(task)}>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    TaskName
                </Label>
                <Input
                    id="name"
                    name="task"
                    className="col-span-3"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
            </div>
        </div>
        <DialogFooter>
            <Button className="bg-green-500 "type="submit">Save changes</Button>
        </DialogFooter>
        </form>
    </DialogContent>
</Dialog>
  )
}

export default AddDialog