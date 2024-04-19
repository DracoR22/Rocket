import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import SidebarItem from "./sidebar-item"

type Props = {
    className?: string
}

const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
      <Link
            href="/learn"
            className="group flex h-16 w-14 items-center gap-x-2  px-[6px] pt-2 text-2xl sm:size-32 sm:rounded-b-4xl sm:pt-4 sm:text-3xl"
            title="Rocket app"
          >
            <Image src={'/logo.svg'} alt="logo" height={100} width={100} className="w-[1.5em] " />
            <span className="font-display -tracking-widest max-sm:sr-only">Rocket</span>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn"/>
      </div>
    </div>
  )
}

export default Sidebar
