import * as React from "react";
import { ChevronDown, FileSignatureIcon, GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/core/presentation/components/base/ui/sidebar";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Statement of Work",
      url: "#",
      items: [
        {
          title: "Acknowledgement",
          url: "#",
        },
        {
          title: "Project Information",
          url: "#",
        },
        {
          title: "Application Platforms",
          url: "#",
        },
        {
          title: "Timelines",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <FileSignatureIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Draftlify</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((group) => (
              <Collapsible key={group.title} className="group/collapsible">
                <SidebarMenuItem>
                  {/* HEADER / TRIGGER */}
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="flex w-full items-center justify-between">
                      <span className="font-medium">{group.title}</span>

                      {group.items?.length ? (
                        <ChevronDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      ) : null}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {/* COLLAPSIBLE CONTENT */}
                  {group.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub className="gap-5">
                        {group.items.map((item, index) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild className="h-fit py-2">
                              {
                                <div className="flex items-center">
                                  <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-full! p-!">{index + 1}</div>
                                  <Link to={item.url}>{item.title}</Link>
                                </div>
                              }
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
