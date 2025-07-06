// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { firstName, lastName, company, email, message } = await req.json()
  // DEBUG

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `"${firstName + " " + lastName}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `New message from ${firstName + " " + lastName} -  ${company}`,
      text: message,
    })

    return NextResponse.json({ success: true, info })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
