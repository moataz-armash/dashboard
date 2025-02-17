"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddWorkerProps {
  closeModal: () => void;
}

export function AddWorker({ closeModal }: AddWorkerProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    alert(`Adding worker: ${name}`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add Worker</h2>
        <Input placeholder="Worker Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex space-x-4 mt-4">
          <Button onClick={handleSubmit}>Add</Button>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
