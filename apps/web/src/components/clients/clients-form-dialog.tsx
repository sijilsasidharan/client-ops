"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, ClientInput, Client } from "@/lib/schemas/clients";
import { useCreateClient, useUpdateClient } from "@/hooks/useClients";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function toFormValues(client?: Client): ClientInput {
  return {
    name: client?.name ?? "",
    contactInfo: client?.contactInfo ?? "",
    notes: client?.notes ?? "",
  };
}

export function ClientFormDialog({
  client,
  trigger,
}: {
  client?: Client;
  trigger: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const isEdit = !!client;
  const form = useForm<ClientInput>({
    resolver: zodResolver(clientSchema),
    defaultValues: toFormValues(client),
  });
  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();

  // Load the latest values each time the dialog opens, so edits made
  // elsewhere (or abandoned here) never show up stale.
  function handleOpenChange(next: boolean) {
    if (next) form.reset(toFormValues(client));
    setOpen(next);
  }

  function onSubmit(data: ClientInput) {
    const action = isEdit
      ? updateMutation.mutateAsync({ id: client!.id, data })
      : createMutation.mutateAsync(data);
    action.then(() => setOpen(false));
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit client" : "New client"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="client-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="client-name"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="contactInfo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="client-contactInfo">Contact info</FieldLabel>
                  <Input
                    {...field}
                    id="client-contactInfo"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="client-notes">Notes</FieldLabel>
                  <Textarea
                    {...field}
                    id="client-notes"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              Save
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
