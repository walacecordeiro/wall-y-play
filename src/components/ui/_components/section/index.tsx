import { ReactNode } from "react";

type propsSection = {
 title: string;
 className?: string;
 children: ReactNode;
};

export default function Section({ title, className, children }: propsSection) {
 return (
  <section>
   <h3 className={`text-xl font-bold pb-4 ${className}`}>{title}</h3>
   {children}
  </section>
 );
}
