"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Worker } from "./dummy-data";
import { Actions } from "./actions";

export const columns: ColumnDef<Worker>[] = [
  { accessorKey: "name", header: "Worker Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "store", header: "Store" },
  { accessorKey: "email", header: "Email" },
  { id: "actions", header: "Actions", cell: ({ row }) => <Actions worker={row.original} /> },
];
