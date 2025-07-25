import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BankCard from "./BankCard";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <Avatar className="profile-img">
            <AvatarImage src="" />
            <AvatarFallback className="text-5xl font-bold text-blue-500">
              {/* {user?.name[0]} */}
            </AvatarFallback>
          </Avatar>

          <div className="profile-details">
            <h1 className="profile-name">
              {user?.name}
            </h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href="/" className="flex gap-2">
                  <Image
                    src="/icons/plus.svg"
                    width={20}
                    height={20}
                    alt="Add Banks"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <h2 className="text-14 font-semibold text-gray-600">
                  Add Banks
                </h2>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {banks?.length > 0 && (
          <div className="relative flex flex-col flex-1 items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user?.name}`}
                showBalance={false}
              />
            </div>

            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard 
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user?.name}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSidebar;
