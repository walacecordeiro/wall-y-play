"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
 NavigationMenu,
 NavigationMenuContent,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
 navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { navigationComponents } from "../utils/navigationDB";

export function DesktopNavigation() {
 return (
  <NavigationMenu>
   <NavigationMenuList>
    <NavigationMenuItem>
     <NavigationMenuTrigger>Suas informações</NavigationMenuTrigger>
     <NavigationMenuContent>
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
       <li className="row-span-3">
        <NavigationMenuLink asChild>
         <a
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
          href="/app"
         >
          <Avatar>
           <AvatarImage src="https://github.com/shadcn.png" />
           <AvatarFallback>WC</AvatarFallback>
          </Avatar>

          <div className="mb-2 mt-4 text-lg font-medium">dashboard/Walace&apos;s</div>
          <p className="text-sm leading-tight text-muted-foreground">
           Voltar para dashboard e veja o panorama completo.
          </p>
         </a>
        </NavigationMenuLink>
       </li>
       <ListItem href="/app" title="Introduction">
        Re-usable components built using Radix UI and Tailwind CSS.
       </ListItem>
       <ListItem href="/app" title="Installation">
        How to install dependencies and structure your app.
       </ListItem>
       <ListItem href="/app" title="Typography">
        Styles for headings, paragraphs, lists...etc
       </ListItem>
      </ul>
     </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
     <NavigationMenuTrigger>categorias</NavigationMenuTrigger>
     <NavigationMenuContent>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
       {navigationComponents.map((component) => (
        <ListItem key={component.title} title={component.title} href={component.href}>
         {component.description}
        </ListItem>
       ))}
      </ul>
     </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
     <NavigationMenuTrigger>gênero</NavigationMenuTrigger>
     <NavigationMenuContent>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
       {navigationComponents.map((component) => (
        <ListItem key={component.title} title={component.title} href={component.href}>
         {component.description}
        </ListItem>
       ))}
      </ul>
     </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
     <Link href="/app" legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
       Contato
      </NavigationMenuLink>
     </Link>
    </NavigationMenuItem>
   </NavigationMenuList>
  </NavigationMenu>
 );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
 ({ className, title, children, ...props }, ref) => {
  return (
   <li>
    <NavigationMenuLink asChild>
     <a
      ref={ref}
      className={cn(
       "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
       className
      )}
      {...props}
     >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
     </a>
    </NavigationMenuLink>
   </li>
  );
 }
);
ListItem.displayName = "ListItem";
