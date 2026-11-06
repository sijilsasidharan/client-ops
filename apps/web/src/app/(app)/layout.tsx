import { AppHeader } from "@/components/app-header";
import AppSidenav from "@/components/app-sidenav";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <AppSidenav>{children}</AppSidenav>
    </>
  );
}
