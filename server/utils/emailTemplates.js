export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f0f0f0; border-radius: 8px; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #0ea5e9; font-size: 20px; margin-bottom: 5px;">
          FYP SYSTEM - 🔐 Password Reset Request
        </h2>
        <p style="color: #888; font-size: 14px; margin-top: 0;">
          Secure access to your learning journey
        </p>
      </div>
      
      <p style="font-size: 15px;">Dear User,</p>
      
      <p style="font-size: 15px; line-height: 1.5;">
        We received a request to reset your password. Please click the button below to set up a new one:
      </p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${resetPasswordUrl}" style="background-color: #0ea5e9; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
          Reset Password
        </a>
      </div>
      
      <p style="font-size: 15px; line-height: 1.5;">
        If you did not request this, you can safely ignore this email. This link will expire in <strong style="background-color: #f0f4f8; padding: 2px 6px; border-radius: 4px; color: #1e3a8a;">15 minutes</strong>.
      </p>
      
      <p style="font-size: 14px; margin-top: 30px; color: #555;">
        If the button above doesn't work, copy and paste the following link into your browser:
      </p>
      
      <p style="font-size: 13px; word-break: break-all;">
        <a href="${resetPasswordUrl}" style="color: #0ea5e9;">${resetPasswordUrl}</a>
      </p>
      
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
        <p style="font-size: 14px; margin-bottom: 5px; color: #555;">
          Thank you,<br>
          <strong>📚 BookWorm Team</strong>
        </p>
        <p style="font-size: 12px; color: #999;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    </div>
  `;
}