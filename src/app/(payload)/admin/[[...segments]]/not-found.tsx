import config from '@payload-config'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Page = async ({ params, searchParams }: Args) => {
  // `NotFoundPage` expects `params`/`searchParams` in the same shape Next provides.
  return NotFoundPage({ config, importMap, params, searchParams })
}

export default Page
