import ClientsHeader from "./ClientsHeader";
import ListClients from "@/components/clients/ListClients";

export default function ClientsPage() {
  return (
    <div>
      <ClientsHeader />
      <div className="p-4">
        <ListClients />
      </div>
    </div>
  );
}
