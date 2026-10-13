import FormData from "form-data"
import Mailgun from "mailgun.js"
import { MAILGUN_KEY, MAILGUN_DOMAIN, MY_EMAIL } from "@/env"

// Lazily construct the Mailgun client so importing this module during
// `next build` page-data collection does not require MAILGUN_KEY.
let _mg: ReturnType<InstanceType<typeof Mailgun>["client"]> | null = null
function getMg() {
  if (!_mg) {
    const mailgun = new Mailgun(FormData)
    _mg = mailgun.client({
      username: "api",
      key: MAILGUN_KEY,
    })
  }
  return _mg
}

export const sendEmail = async ({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) => {
  if (!name || !email || !message) {
    throw new Error("Missing required fields")
  }

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#f8f8f8; padding:40px;">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 10px 30px rgba(0,0,0,0.15);
    ">
      <div style="
        background:linear-gradient(135deg, #b00000, #ff1e1e);
        padding:32px;
        color:white;
        text-align:center;
      ">
        <h1 style="margin:0; font-size:32px; letter-spacing:1px;">
          New Website Message
        </h1>
        <p style="margin:8px 0 0; opacity:0.9;">
          Someone reached out via your site
        </p>
      </div>

      <div style="padding:32px;">
        <p style="font-size:16px; margin:0 0 16px;">
          <strong style="color:#b00000;">From:</strong> ${name}
        </p>

        <p style="font-size:16px; margin:0 0 16px;">
          <strong style="color:#b00000;">Email:</strong> ${email}
        </p>

        <div style="
          margin-top:24px;
          padding:20px;
          border-left:6px solid #b00000;
          background:#fff5f5;
          font-size:16px;
          line-height:1.6;
          color:#333;
        ">
          ${message.replace(/\n/g, "<br />")}
        </div>
      </div>

      <div style="
        background:#111;
        color:#aaa;
        text-align:center;
        padding:16px;
        font-size:12px;
      ">
        Sent from your website · ${new Date().toLocaleString()}
      </div>
    </div>
  </div>
  `

  return getMg().messages.create(MAILGUN_DOMAIN, {
    from: `Website <postmaster@${MAILGUN_DOMAIN}>`,
    to: [MY_EMAIL],
    replyTo: email,
    subject: `🔥 New message from ${name}`,
    html,
    text: message, 
  })
}
