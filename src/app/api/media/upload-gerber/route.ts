import { getPayload } from '@/lib/get-payload'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(req: Request) {
  console.log('[api/media/upload-gerber] POST request received')
  try {
    const formData = await req.formData()
    console.log('[api/media/upload-gerber] FormData parsed')
    
    const file = formData.get('file') as File
    if (!file) {
      console.error('[api/media/upload-gerber] No file in formData')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const ext = path.extname(file.name).toLowerCase()
    if (ext !== '.zip' && ext !== '.rar') {
      console.error('[api/media/upload-gerber] Invalid file extension:', ext)
      return NextResponse.json({ error: 'Only .zip and .rar files are supported' }, { status: 400 })
    }

    console.log('[api/media/upload-gerber] Starting upload for:', file.name, 'Size:', file.size)
    
    console.log('[api/media/upload-gerber] Calling getPayload()...')
    const payload = await getPayload()
    console.log('[api/media/upload-gerber] getPayload() success')

    // Convert File to Buffer
    console.log('[api/media/upload-gerber] Converting to arrayBuffer...')
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    console.log('[api/media/upload-gerber] Buffer created, size:', buffer.length)

    // Create media entry
    console.log('[api/media/upload-gerber] payload.create start...')
    const media = await payload.create({
      collection: 'media',
      overrideAccess: true, // Bypass access control
      data: {
        alt: `Gerber file for quote: ${file.name}`,
      },
      file: {
        data: buffer,
        name: file.name,
        mimetype: file.type || 'application/zip',
        size: file.size,
      },
    })
    console.log('[api/media/upload-gerber] payload.create success, id:', media.id)

    return NextResponse.json({
      success: true,
      mediaId: media.id,
      url: media.url,
      filename: file.name,
    })

  } catch (error: any) {
    console.error('[api/media/upload-gerber] CRITICAL ERROR:', error)
    return NextResponse.json({ 
      error: error.message || 'Internal Server Error',
      details: error.stack 
    }, { status: 500 })
  }
}
