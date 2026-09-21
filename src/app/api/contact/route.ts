import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, workshop } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.GMAIL_USER || process.env.CONTACT_EMAIL || "brafnan26@gmail.com";
    const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    const formattedSubject = `[Portfolio] ${subject.trim()} — from ${name.trim()}`;
    const inquiryType = workshop || "General Inquiry";
    const sanitizedMessage = message.trim().replace(/\n/g, "<br/>");

    // Pre-formatted mailto URL in case direct API delivery cannot be reached
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      formattedSubject
    )}&body=${encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\nCategory: ${inquiryType}\n\nMessage:\n${message.trim()}`
    )}`;

    // Option 1: Direct Google SMTP via Nodemailer (if GMAIL_APP_PASSWORD configured)
    if (appPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: recipientEmail,
          pass: appPassword,
        },
      });

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${formattedSubject}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d0f12; color: #f4f4f5; margin: 0; padding: 24px; }
              .card { max-width: 600px; margin: 0 auto; background: #14161a; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
              .header { background: linear-gradient(135deg, #181920 0%, #20222a 100%); border-bottom: 1px solid #27272a; padding: 24px 30px; }
              .tag { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #e2b36e; background: rgba(226, 179, 110, 0.12); padding: 4px 10px; border-radius: 20px; margin-bottom: 10px; }
              .title { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
              .body { padding: 30px; }
              .field-group { margin-bottom: 20px; }
              .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; margin-bottom: 6px; font-weight: 600; }
              .value { font-size: 15px; color: #f4f4f5; font-weight: 500; }
              .message-box { background: #1a1d24; border: 1px solid #2d3139; border-radius: 12px; padding: 18px 20px; color: #e4e4e7; font-size: 14px; line-height: 1.6; margin-top: 8px; }
              .btn { display: inline-block; background: #e2b36e; color: #0d0f12; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px; margin-top: 24px; text-align: center; }
              .footer { border-top: 1px solid #22252c; padding: 18px 30px; font-size: 12px; color: #71717a; text-align: center; background: #111317; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <div class="tag">New Portfolio Message</div>
                <h1 class="title">${subject.trim()}</h1>
              </div>
              <div class="body">
                <div class="field-group">
                  <div class="label">Sender Name</div>
                  <div class="value">${name.trim()}</div>
                </div>
                <div class="field-group">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email.trim()}" style="color: #60a5fa; text-decoration: none;">${email.trim()}</a></div>
                </div>
                <div class="field-group">
                  <div class="label">Inquiry Scope / Category</div>
                  <div class="value">${inquiryType}</div>
                </div>
                <div class="field-group">
                  <div class="label">Message</div>
                  <div class="message-box">${sanitizedMessage}</div>
                </div>
                <div style="text-align: center;">
                  <a href="mailto:${email.trim()}?subject=Re:%20${encodeURIComponent(subject.trim())}" class="btn">
                    Reply Directly to ${name.trim()}
                  </a>
                </div>
              </div>
              <div class="footer">
                Delivered via Portfolio Gmail SMTP • Destination: ${recipientEmail}
              </div>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Portfolio Contact" <${recipientEmail}>`,
        to: recipientEmail,
        replyTo: `"${name.trim()}" <${email.trim()}>`,
        subject: formattedSubject,
        text: `From: ${name.trim()} (${email.trim()})\nCategory: ${inquiryType}\nSubject: ${subject.trim()}\n\nMessage:\n${message.trim()}`,
        html: htmlContent,
      });

      return NextResponse.json(
        { success: true, message: "Message sent directly to your Gmail inbox." },
        { status: 200 }
      );
    }

    // Option 2: Web3Forms (Zero Google password required - just a free access key)
    if (web3FormsKey) {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          name: name.trim(),
          email: email.trim(),
          subject: formattedSubject,
          message: message.trim(),
          from_name: "Portfolio Contact Form",
        }),
      });

      const web3Data = await web3Res.json().catch(() => null);
      if (web3Res.ok && web3Data?.success) {
        return NextResponse.json(
          { success: true, message: "Message delivered via Web3Forms." },
          { status: 200 }
        );
      }
      throw new Error(web3Data?.message || "Failed to deliver message via Web3Forms.");
    }

    // Option 3: Resend API (if RESEND_API_KEY configured)
    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: recipientEmail,
          reply_to: email.trim(),
          subject: formattedSubject,
          text: `From: ${name.trim()} (${email.trim()})\nCategory: ${inquiryType}\nSubject: ${subject.trim()}\n\nMessage:\n${message.trim()}`,
        }),
      });

      const resendData = await resendRes.json().catch(() => null);
      if (resendRes.ok) {
        return NextResponse.json(
          { success: true, message: "Message sent successfully via Resend." },
          { status: 200 }
        );
      }
      throw new Error(resendData?.message || "Failed to deliver message via Resend.");
    }

    // Option 4: No email service keys configured yet
    return NextResponse.json(
      {
        error:
          "Email service is not yet configured. Please use the direct email button below or configure GMAIL_APP_PASSWORD or WEB3FORMS_ACCESS_KEY.",
        mailtoUrl,
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    const recipientEmail = process.env.GMAIL_USER || process.env.CONTACT_EMAIL || "brafnan26@gmail.com";
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while sending your message.",
        mailtoUrl: `mailto:${recipientEmail}`,
      },
      { status: 500 }
    );
  }
}
