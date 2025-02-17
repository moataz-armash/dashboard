"use client";

import { Worker } from "./dummy-data";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

interface ActionsProps {
  worker: Worker;
}

export function Actions({ worker }: ActionsProps) {
  const handleEdit = () => alert(`Editing ${worker.name}`);
  const handleDelete = () => alert(`Deleting ${worker.name}`);

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" onClick={handleEdit}>
        <Edit size={16} />
      </Button>
      <Button variant="destructive" size="icon" onClick={handleDelete}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
