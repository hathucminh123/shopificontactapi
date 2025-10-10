import cron from "node-cron";
import { Op } from "sequelize"; // ✅ MUST HAVE THIS
import EmailSequence from "../models/emailSequence.model.js";
import Contact from "../models/contact.model.js";
import transporter from "../config/mailer.js";
import { getEmailTemplate, getEmailSubject } from "../utils/emailTemplates.js";

cron.schedule("*/1 * * * *", async () => {
  console.log("🔄 Checking for scheduled emails...");
  const now = new Date();

  try {
    const sequences = await EmailSequence.findAll({
      where: {
        status: "scheduled",
        scheduled_at: { [Op.lte]: now },
      },
      include: { model: Contact, as: "contact" },
    });

    console.log(`📬 Found ${sequences.length} emails ready to send`);

    for (const seq of sequences) {
      try {
        const subject = getEmailSubject(seq.sequence_type, seq.email_number);
        const html = getEmailTemplate(seq.sequence_type, seq.email_number, seq.contact.name);

        await transporter.sendMail({
          from: `"VSNR" <no-reply@vsnr.com>`,
          to: seq.contact.email,
          subject,
          html,
        });

        await seq.update({ status: "sent", sent_at: new Date() });
        console.log(`✅ Sent email #${seq.email_number} to ${seq.contact.email}`);
      } catch (error) {
        console.error(`❌ Failed to send email: ${error.message}`);
        await seq.update({
          status: "failed",
          last_error: error.message,
          attempts: (seq.attempts ?? 0) + 1,
        });
      }
    }
  } catch (error) {
    console.error("[CRON ERROR]", error.message);
  }
});
