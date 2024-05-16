"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import Search from "./search";
import { cn } from "../_lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { data } = useSession();

  const handleSignInClick = () => signIn("google");
  const handleSignOutClick = () => signOut({ callbackUrl: "/" });

  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 pt-6 lg:px-32 lg:py-5",
        className,
      )}
    >
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/logo.png"
            alt="FSW Foods"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Search className="hidden lg:flex lg:min-w-[600px]" />

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col justify-between pb-10">
            <div>
              {data?.user ? (
                <>
                  <div className="flex justify-between pt-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={data?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {data?.user?.name?.split(" ")[0][0]}
                          {data?.user?.name?.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <h3 className="text-nowrap font-semibold">
                          {data?.user?.name}
                        </h3>
                        <span className="block text-sm">
                          {data?.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between pt-10">
                    <h2>Olá! Faça o seu login</h2>
                    <Button size="icon">
                      <LogInIcon onClick={handleSignInClick} />
                    </Button>
                  </div>
                </>
              )}
              <div className="py-6">
                <Separator />
              </div>
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full bg-primary text-sm font-normal text-white"
                >
                  <HomeIcon size={16} />
                  <span className="block">Início</span>
                </Button>
                {data?.user && (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                      asChild
                    >
                      <Link href="/my-orders">
                        <ScrollTextIcon size={16} />
                        <span className="block">Meus pedidos</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                      asChild
                    >
                      <Link href="/my-favorite-restaurants">
                        <HeartIcon size={16} />
                        <span className="block">Restaurantes favoritos</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
              <div className="py-6">
                <Separator />
              </div>
            </div>
            <div>
              {data?.user && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                    >
                      <LogOutIcon size={16} />
                      <span className="block">Sair da conta</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center font-semibold">
                        Sair da conta
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center text-sm text-muted-foreground">
                        Deseja mesmo sair da plataforma?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-row items-center justify-between gap-3">
                      <AlertDialogCancel className="mt-0 w-1/2">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="w-1/2"
                        onClick={handleSignOutClick}
                      >
                        Sair
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
