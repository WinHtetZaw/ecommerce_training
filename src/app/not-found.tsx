"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default function NotFound() {
  return (
    <div>
      not found
      <Button onClick={() => window.history.back()}>Back</Button>
      <Link href={"/"}>Home</Link>
    </div>
  )
}
