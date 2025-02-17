"use client";

import { useState } from "react";
import { WorkersTable } from "./components/workers-table";
import { Filters } from "./components/filters";
import { dummyWorkers } from "./components/dummy-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddWorker } from "./components/add-worker";

export default function WorkersPage() {
  const [filteredWorkers, setFilteredWorkers] = useState(dummyWorkers);
  const [showAddWorker, setShowAddWorker] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Workers Management</h1>
        <Button onClick={() => setShowAddWorker(true)}>
          <Plus size={16} className="mr-2" /> Add Worker
        </Button>
      </div>

      <Filters setFilteredWorkers={setFilteredWorkers} />
      <WorkersTable workers={filteredWorkers} />

      {showAddWorker && (
        <AddWorker closeModal={() => setShowAddWorker(false)} />
      )}
    </div>
  );
}
