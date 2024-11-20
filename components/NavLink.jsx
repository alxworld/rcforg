'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, text }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link className={isActive ? 'opacity-100' : 'opacity-50 hover:opacity-65'} href={href}>
      {text}
    </Link>
  )
}
