import '@payloadcms/next/css'
import config from '@payload-config'
import { RootLayout, metadata } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'
import { handleServerFunction } from './actions'

export const dynamic = 'force-dynamic'
export { metadata }

type Args = {
  children: React.ReactNode
}

const Layout = async ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={handleServerFunction as any}
    suppressHydrationWarning
  >
    {children}
  </RootLayout>
)

export default Layout
