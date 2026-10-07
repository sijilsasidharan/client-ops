"use client";
import { useState } from "react";
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { Client } from "@/lib/schemas/clients";
import { useClients, useDeleteClient } from "@/hooks/useClients";
import { ClientFormDialog } from "@/components/clients/clients-form-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Kept at module scope so the table gets stable inputs across renders.
const features = tableFeatures({});
const helper = createColumnHelper<typeof features, Client>();
const emptyClients: Client[] = [];

const columns = helper.columns([
  helper.accessor("name", { header: "Name" }),
  helper.accessor("contactInfo", {
    header: "Contact info",
    cell: (info) => info.getValue() || "—",
  }),
  helper.accessor("notes", {
    header: "Notes",
    cell: (info) => (
      <span className="line-clamp-1 max-w-xs">{info.getValue() || "—"}</span>
    ),
  }),
  helper.accessor("createdAt", {
    header: "Created",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  helper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <ClientRowActions client={row.original} />,
  }),
]);

function ClientRowActions({ client }: { client: Client }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteMutation = useDeleteClient();

  function handleDelete() {
    deleteMutation.mutate(client.id, {
      onSuccess: () => setConfirmOpen(false),
    });
  }

  return (
    <div className="flex justify-end gap-1">
      <ClientFormDialog
        client={client}
        trigger={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Edit ${client.name}`}
          >
            <Pencil />
          </Button>
        }
      />
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Delete ${client.name}`}
            />
          }
        >
          <Trash2 />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {client.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the client. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteMutation.isError && (
            <p role="alert" className="text-sm text-destructive">
              {deleteMutation.error.message}
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

const ListClients = () => {
  const { data, isPending, isError, error } = useClients();
  const table = useTable({ features, columns, data: data ?? emptyClients });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isPending || isError || table.getRowModel().rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              {isPending
                ? "Loading clients…"
                : isError
                  ? `Failed to load clients: ${error.message}`
                  : "No clients yet."}
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ListClients;
