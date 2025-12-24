import { MAILGUN_KEY, MAILGUN_DOMAIN, MY_EMAIL} from "@/env"

export const sendEmail = async ({ name, email, message }) => {
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

  const formData = new URLSearchParams()
  formData.append("from", `Website <mailgun@${MAILGUN_DOMAIN}>`)
  formData.append("to", MY_EMAIL)
  formData.append("reply-to", email)
  formData.append("subject", `🔥 New message from ${name}`)
  formData.append("html", html)
  formData.append("text", message) // fallback for plain-text clients

  const auth = Buffer.from(`api:${MAILGUN_KEY}`).toString("base64")

  const response = await fetch(
    `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`
      },
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response.json()
}
