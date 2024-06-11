"use client"

import { Button } from "@/components/ui/button"

export function BtnLogout() {
  return <Button onClick={() => {console.log("Saiu")}} variant="destructive">Sair</Button>
}
