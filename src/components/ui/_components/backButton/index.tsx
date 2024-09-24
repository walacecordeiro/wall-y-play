import { ReactNode } from "react";
import { Button } from "../../button";

type propsBackButton = {
 icon?: ReactNode;
 text: string;
 className?: string;
};

export default function BackButton({ icon, text, className }: propsBackButton) {
 return (
  <Button
   onClick={() => window.history.back()}
   className={`flex self-end pb-4 gap-1 w-fit text-base ${className}`}
   variant="link"
  >
   {icon}
   {text}
  </Button>
 );
}
