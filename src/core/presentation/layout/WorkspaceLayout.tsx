import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/base/app-sidebar";
import { SidebarProvider, SidebarInset } from "../components/base/ui/sidebar";
import { SiteHeader } from "../components/base/site-header";

export default function WorkspaceLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
