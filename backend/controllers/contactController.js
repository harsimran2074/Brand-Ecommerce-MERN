const nodemailer = require("nodemailer");
const validator = require("validator");

exports.sendContactMessage = async (req, res) => {
    try {
        const { firstName, lastName, email, subject, message } = req.body;

        if (!firstName || !email || !message) {
            return res.json({
                success: false,
                message: "Please fill in all required fields (First Name, Email, Message)."
            });
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        const recipientEmail = process.env.ADMIN_EMAIL || "harsimran2074handa@gmail.com";
        const senderEmail = process.env.SMTP_USER || process.env.ADMIN_EMAIL || "harsimran2074handa@gmail.com";
        const senderPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

        const fullName = `${firstName} ${lastName || ""}`.trim();

        if (!senderPass) {
            return res.json({
                success: true,
                message: "Thank you! Your message has been received."
            });
        }

        const cleanPass = senderPass.replace(/\s+/g, '');

        // Create nodemailer transporter for Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: senderEmail,
                pass: cleanPass,
            },
        });

        // Email to Store Admin
        const mailOptions = {
            from: `"${fullName} (via Contact Form)" <${senderEmail}>`,
            to: recipientEmail,
            replyTo: email,
            subject: `[Store Inquiry] ${subject || "General Inquiry"} - from ${fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
                    <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 140px;">Sender Name:</td>
                            <td style="padding: 8px 0; color: #0f172a;">${fullName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
                            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Inquiry Type:</td>
                            <td style="padding: 8px 0; color: #0f172a;">${subject || "General Inquiry"}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 4px;">
                        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 14px;">Message:</h4>
                        <p style="margin: 0; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>

                    <p style="margin-top: 25px; font-size: 12px; color: #94a3b8; text-align: center;">
                        This email was sent from your Brand E-Commerce website contact form.
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: "Thank you! Your message has been sent successfully."
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message || "Failed to send email. Please try again later."
        });
    }
};
