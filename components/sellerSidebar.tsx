import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar } from "./ui/avatar"
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

// Menu items.
const items = [
  {
    title: "Products",
    url: "/sellerPage/productsPage",
    icon: Home,
  },
  {
    title: "Sales",
    url: "/sellerPage/salesPage",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function SellerSideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col w-full h-24 justify-center my-5 space-y-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://placehold.co/150" className="w-full h-full" />
              <AvatarFallback >CN</AvatarFallback>
            </Avatar>
          </SidebarGroupLabel>
          <div className="text-base text-center mx-2">
            FIRSTNAME LASTNAME sasasasas
          </div>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
