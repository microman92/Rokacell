import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { fullName, phone, email, company } = await request.json();

    // Создаем транспорт для отправки письма через SMTP
    const transporter = nodemailer.createTransport({
      host: "mail.rokacell.com",
      port: 465,
      secure: true, // true для 465, false для других портов
      auth: {
        user: "marketing@rokacell.com",
        pass: process.env.SMTP_PASSWORD, // Берем пароль из .env файла
      },
    });

    // Настраиваем содержимое письма
    const mailOptions = {
      from: '"Форма Доступа (Rokacell)" <marketing@rokacell.com>', // От кого
      to: "marketing@rokacell.com", // Кому (можно указать эту же почту для уведомлений)
      subject: `Новая заявка на доступ от: ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #004481;">Новая заявка на доступ к калькулятору</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Имя (ФИО):</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Телефон:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Компания:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${company || "Не указана"}</td>
            </tr>
          </table>
        </div>
      `,
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Error sending email" },
      { status: 500 }
    );
  }
}
