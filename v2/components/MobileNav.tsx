'use client';


import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";


const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname()

  return (
    <section>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>{user.firstName[0]}</AvatarFallback>
      </Avatar>
      
      <Tabs defaultValue="Home" className="mobilenav-tabs">
        <TabsList className="mobilenav-tablist glassmorphism">
          {sidebarLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);

            return (
              <TabsTrigger 
                value={item.label} 
                key={item.label}
                className={cn("mobilenav-links", { "bg-bank-gradient": isActive })}  
              >
                <Link
                  href={item.route}
                  key={item.label}
                >
                  <div className="relative size-8">
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      fill
                      className={cn({ "brightness-[3] invert-0": isActive })}
                    />
                  </div>
                </Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </section>
  )
}

export default MobileNav;