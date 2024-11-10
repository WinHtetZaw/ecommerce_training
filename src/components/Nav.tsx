"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps } from 'react'

export default function Nav({children} : {children: React.ReactNode}) {
  return (
    <nav className=' bg-primary text-primary-foreground flex justify-center px-4'>
      {children}
    </nav>
  )
}

export function NavLink(props : Omit<ComponentProps<typeof Link>, "className">) {
    const pathName = usePathname()
    return (
        <Link {...props} className={cn("p-4 hover:bg-rose-400", pathName === props.href && "bg-rose-400" )}/>
    )
}