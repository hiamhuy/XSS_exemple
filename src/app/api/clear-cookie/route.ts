// app/api/clear-file/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {

    // const fullPath = path.join(process.cwd(), "public/stolen-cookies.txt");
    const fullPath = path.join("/tmp", "stolen-cookies.txt");

    // Ghi đè file thành rỗng (clear content)
    fs.writeFileSync(fullPath, '', 'utf8')

    return NextResponse.json({ message: 'File content cleared successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear file', detail: String(error) },
      { status: 500 }
    )
  }
}