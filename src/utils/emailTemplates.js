export const getEmailSubject = (type, number) => {
  const subjects = {
    welcome: [
      "🎉 Welcome to VSNR!",
      "Your journey with VSNR begins!",
      "Let’s grow your business together!"
    ],
    insights: [
      "📊 Monthly Insights from VSNR",
      "New business trends you’ll love",
      "Your weekly strategy tips from VSNR"
    ],
    "re-engage": [
      "👋 We miss you at VSNR!",
      "Your special comeback offer inside",
      "Let’s reconnect and grow again!"
    ],
  };
  return subjects[type]?.[number - 1] || "Latest update from VSNR";
};

export const getEmailTemplate = (type, name = "there") => {
  const LOGO_URL = "https://yourdomain.com/assets/logo-vsnr.png";
  const headerGradient = "linear-gradient(90deg, #6C63FF 0%, #9C8CFF 100%)";
  const buttonColor = "#6C63FF";

  const baseTemplate = (title, message, buttonText, buttonLink, tip) => `
  <div style="font-family:'Inter',Arial,sans-serif;background-color:#f8f9fb;padding:40px 0;">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 3px 8px rgba(0,0,0,0.05);">
      <div style="background:${headerGradient};padding:24px;text-align:center;color:#fff;">
        <img src="${LOGO_URL}" alt="VSNR Logo" style="height:48px;margin-bottom:10px;" />
        <h2 style="margin:0;font-size:24px;font-weight:600;">${title}</h2>
      </div>
      <div style="padding:32px;">
        <p style="font-size:16px;">Hi <b>${name}</b>,</p>
        <p style="font-size:16px;color:#333;">${message}</p>
        ${
          buttonText
            ? `<div style="text-align:center;margin:32px 0;">
                <a href="${buttonLink}" style="background:${buttonColor};color:white;padding:12px 24px;
                border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
                ${buttonText}</a></div>`
            : ""
        }
        ${
          tip
            ? `<div style="background:#f3f4ff;border-left:4px solid ${buttonColor};
                padding:12px 16px;border-radius:6px;margin-top:20px;">
                💡 <b>Pro Tip:</b> ${tip}</div>`
            : ""
        }
        <hr style="margin:32px 0;border:none;border-top:1px solid #eee;" />
        <p style="font-size:13px;color:#888;text-align:center;">
          This link will expire in 7 days. Please request access again if needed.
        </p>
      </div>
    </div>
  </div>`;

  switch (type) {
    case "welcome":
      return baseTemplate(
        "Welcome to VSNR 🎉",
        "Thank you for joining <b>VSNR</b>! We’re excited to help you grow with powerful tools.",
        "Get Started with VSNR",
        "https://vsnr.io/dashboard",
        "Explore your dashboard and discover automation features."
      );
    case "insights":
      return baseTemplate(
        "Your Monthly Insights 📊",
        "Here’s your latest digest of strategies, growth tips, and new VSNR features.",
        "Read Insights",
        "https://vsnr.io/blog",
        "Subscribe to our newsletter for weekly updates."
      );
    case "re-engage":
      return baseTemplate(
        "We Miss You 👋",
        "It’s been a while since we last saw you. Come back and enjoy <b>20% off</b> your next purchase!",
        "Redeem My Offer",
        "https://vsnr.io/special-offer",
        "Reactivating your account takes one click!"
      );
    default:
      return baseTemplate("VSNR Update", "Stay tuned for new tools and updates!", "Visit VSNR", "https://vsnr.io", "");
  }
};
