import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar";
import { UsersIcon, FolderIcon, LayoutDashboardIcon } from "lucide-react";

const projects = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Clients",
    url: "/clients",
    icon: UsersIcon,
  },
  {
    name: "Projects",
    url: "/projects",
    icon: FolderIcon,
  },
];

const appSidenav = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar">
        <SidebarHeader />
        <SidebarContent>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton render={<a href={project.url} />}>
                  <project.icon />
                  <span>{project.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default appSidenav;
