'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";


const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname()

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src='/icons/hamburger.svg'
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        
        <SheetContent>
          {sidebarLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
              >
                <div className="relative size-6">
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    fill
                    className={cn({ "brightness-[3] invert-0": isActive })}
                  />
                </div>

                <p className={cn("sidebar-label", { "!text-white": isActive })}>
                  {item.label}
                </p>
              </Link>
            );
          })}
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav;