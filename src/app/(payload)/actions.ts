'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'

// `RootLayout` expects a `ServerFunctionClient` that the UI can call with `{ name, args }`.
// `handleServerFunctions` is a handler that requires `{ config, importMap }`, so we wrap it here.
export const handleServerFunction = async (args: {
  name: string
  args: Record<string, unknown>
}) => {
  return handleServerFunctions({
    name: args.name,
    args: args.args,
    config,
    importMap,
  })
}
