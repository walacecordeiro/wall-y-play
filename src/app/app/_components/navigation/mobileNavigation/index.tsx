"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import Hamburguer from "@/assets/hamburguer.svg";
import { Button } from "@/components/ui/button";
import {
 Sheet,
 SheetContent,
 SheetDescription,
 SheetHeader,
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
import Image from "next/image";
import Logo from "../../logo";
import CloseMenu from "@/app/app/functions/closeMenu";
import ItemNavLink from "../_components/itemNavLink";
import { amatic_SC } from "@/fonts";

export function MobileNavigation() {
 return (
  <Sheet>
   <SheetTrigger asChild>
    <Button variant="outline">
     <Image src={Hamburguer} alt="logo do site" width={undefined} height={undefined} />
    </Button>
   </SheetTrigger>
   <SheetContent className="overflow-y-scroll w-fit">
    <SheetHeader className="items-start text-left mb-4">
     <Logo />
     <SheetDescription className="text-xs">
      Onde a magia do cinema e a emoção das séries se encontram.
     </SheetDescription>
    </SheetHeader>
    <NavigationMenuMobile className="w-full items-start justify-start">
     <NavigationMenuList className="flex-col space-x-0 justify-start items-start">
      <NavigationMenuItem>
       <NavigationMenuTrigger className="p-0">Filmes</NavigationMenuTrigger>
       <NavigationMenuContent>
        <ul className="grid gap-3 p-2">
         {navigationComponents.map((component) => (
          <ItemNavLink
           key={component.title}
           href={component.href}
           title={component.title}
           description={component.description}
          />
         ))}
        </ul>
       </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
       <NavigationMenuTrigger className="p-0">Séries</NavigationMenuTrigger>
       <NavigationMenuContent>
        <ul className="grid gap-3 p-2">
         {navigationComponents.map((component) => (
          <ItemNavLink
           key={component.title}
           href={component.href}
           title={component.title}
           description={component.description}
          />
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
               CloseMenu();
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
         <ItemNavLink
          href="/app"
          title="Discussões"
          description="Veja todas discussões que participa ou participou."
         />
         <ItemNavLink
          href="/app"
          title="Listas"
          description="Veja a lista dos filmes que você salvou."
         />
         <ItemNavLink
          href="/app"
          title="Avaliações"
          description="Reveja todas avaliações feitas por você."
         />
         <ItemNavLink
          href="/app"
          title="Lista de interesses"
          description="Listagem de marcados como interessantes."
         />

         <Separator />

         <ItemNavLink
          href="/app"
          title="Editar perfil"
          description="Atualize seu perfil e preferências de filme."
         />
         <ItemNavLink
          href="/app"
          title="Configurações da conta"
          description="Ajuste suas configurações de conta e privacidade."
         />

         <Separator />
         <p className="line-clamp-2 p-1 text-sm text-center leading-snug text-muted-foreground">
          &copy; 2024 <span className={amatic_SC.className}>Wall-y Play</span>.
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
