"use client";
import { ClientFormDialog } from "@/components/clients/clients-form-dialog";
import { Button } from "@base-ui/react";

const ClientsHeader = () => {
  const trigger = <Button onClick={() => {}}>New Client</Button>;
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-2">
      <span className="text-lg font-semibold">Clients</span>
      <ClientFormDialog trigger={trigger} />
    </div>
  );
};

export default ClientsHeader;
