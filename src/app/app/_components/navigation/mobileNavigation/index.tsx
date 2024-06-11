"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
 Sheet,
 SheetContent,
 SheetDescription,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "@/components/ui/sheet";

import {
 NavigationMenuMobile,
 NavigationMenuContent,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
} from "@/components/ui/navigation-menu-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { navigationComponents } from "../utils/navigationDB";
import { Separator } from "@/components/ui/separator";
import { BtnLogout } from "../../btnLogout";

export function MobileNavigation() {
 return (
  <Sheet>
   <SheetTrigger asChild>
    <Button variant="outline">
     <HamburgerMenuIcon />
    </Button>
   </SheetTrigger>
   <SheetContent side="left" className="overflow-y-scroll w-fit">
    <SheetHeader className="items-start text-left">
     <SheetTitle>Logo</SheetTitle>
     <SheetDescription className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit.</SheetDescription>
    </SheetHeader>
    <NavigationMenuMobile className="w-full items-start justify-start">
     <NavigationMenuList className="flex-col space-x-0 justify-start items-start">
      <NavigationMenuItem>
       <NavigationMenuTrigger className="p-0">Filmes</NavigationMenuTrigger>
       <NavigationMenuContent>
        <ul className="grid gap-3 p-2">
         {navigationComponents.map((component) => (
          <ListItem key={component.title} title={component.title} href={component.href}>
           {component.description}
          </ListItem>
         ))}
        </ul>
       </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
       <NavigationMenuTrigger className="p-0">Séries</NavigationMenuTrigger>
       <NavigationMenuContent>
        <ul className="grid gap-3 p-2 w-full">
         {navigationComponents.map((component) => (
          <ListItem key={component.title} title={component.title} href={component.href}>
           {component.description}
          </ListItem>
         ))}
        </ul>
       </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
       <NavigationMenuTrigger className="p-0">Perfil e configurações</NavigationMenuTrigger>
       <NavigationMenuContent>
        <ul className="flex flex-col gap-3 p-2">
         <li>
          <NavigationMenuLink asChild>
           <div className="flex h-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md">
            <Avatar>
             <AvatarImage src="https://github.com/shadcn.png" />
             <AvatarFallback>W</AvatarFallback>
            </Avatar>
            <div className="flex flex-col mb-2 mt-4 text-lg font-medium">
             <p>Walace Cordeiro</p>
             <span className="line-clamp-2 p-1 text-xs leading-snug text-muted-foreground">
              walacecordeirodossantos@gmail.com
             </span>
            </div>

            <div className="flex w-full justify-between">
             <Button
              onClick={() => {
               console.log("foi pro perfil");
              }}
              variant="default"
             >
              Ver dashboard
             </Button>
             <BtnLogout />
            </div>
           </div>
          </NavigationMenuLink>
         </li>
         <ListItem href="/app" title="Discussões">
          Veja todas discussões que participa ou participou.
         </ListItem>
         <ListItem href="/app" title="Listas">
          Veja a lista dos filmes que você salvou.
         </ListItem>
         <ListItem href="/app" title="Avaliações">
          Reveja todas avaliações feitas por você.
         </ListItem>
         <ListItem href="/app" title="Lista de interesses">
          Listagem de marcados como interessantes.
         </ListItem>
         <Separator />
         <ListItem href="/app" title="Editar perfil">
          Atualize seu perfil e preferências de filme.
         </ListItem>
         <ListItem href="/app" title="Configurações da conta">
         Ajuste suas configurações de conta e privacidade.
         </ListItem>
         <Separator />
         <p className="line-clamp-2 p-1 text-sm text-center leading-snug text-muted-foreground">
          &copy; 2024 The Movie.
          <br />
          Todos os direitos reservados.
         </p>
        </ul>
       </NavigationMenuContent>
      </NavigationMenuItem>
     </NavigationMenuList>
    </NavigationMenuMobile>
   </SheetContent>
  </Sheet>
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
