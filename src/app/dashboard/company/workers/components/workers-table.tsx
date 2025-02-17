"use client";
import { DataTable } from "@/components/ui/data-table";
import { Worker } from "./dummy-data";
import { columns } from "./columns";

interface WorkersTableProps {
  workers: Worker[];
}

export function WorkersTable({ workers }: WorkersTableProps) {
  return <DataTable columns={columns} data={workers} />;
}
