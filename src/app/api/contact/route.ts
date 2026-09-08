import { NextRequest, NextResponse } from "next/server";

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

    const targetEmail = process.env.CONTACT_EMAIL || "brafnan26@gmail.com";

    // Direct delivery to Afnan's Gmail via FormSubmit
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: request.headers.get("referer") || "https://afnan-portfolio.vercel.app",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        _subject: `Portfolio Inquiry: ${subject.trim()} (from ${name.trim()})`,
        _replyto: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        inquiry_type: workshop || "General Inquiry",
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = await response.json().catch(() => null);

    // FormSubmit returns status 200 or success true/activation message
    if (!response.ok && data?.success === "false" && !data?.message?.includes("Activation")) {
      throw new Error(data?.message || "Failed to deliver message to Gmail.");
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
