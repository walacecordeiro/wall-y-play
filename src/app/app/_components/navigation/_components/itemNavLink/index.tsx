import CloseMenu from "@/app/app/functions/closeMenu";
import Link from "next/link";

type ItemNavLinkProps = {
 href: string;
 title: string;
 description: string;
 className?: string;
};

export default function ItemNavLink({ href, title, description, className }: ItemNavLinkProps) {
 return (
  <Link
   onClick={CloseMenu}
   href={href}
   className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
  >
   <div className="text-sm font-medium leading-none">{title}</div>
   <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
  </Link>
 );
}
