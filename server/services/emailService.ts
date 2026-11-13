import dotenv from 'dotenv';

dotenv.config();

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailDriver {
  send(options: EmailOptions): Promise<boolean>;
}

class ConsoleLoggerEmailDriver implements EmailDriver {
  async send(options: EmailOptions): Promise<boolean> {
    const divider = '='.repeat(60);
    console.log(`\n${divider}`);
    console.log(`[FENTOPH EMAIL SERVICE] -> TO: ${options.to}`);
    console.log(`SUBJECT: ${options.subject}`);
    console.log(`FROM: ${process.env.EMAIL_FROM || 'no-reply@fentoph.com'}`);
    console.log(`TIME: ${new Date().toISOString()}`);
    console.log('-'.repeat(60));
    console.log(options.text);
    console.log(`${divider}\n`);
    return true;
  }
}

class SmtpEmailDriver implements EmailDriver {
  async send(options: EmailOptions): Promise<boolean> {
    // In production, instantiate nodemailer transport
    console.log(`[SMTP Driver] Sending email to ${options.to}: ${options.subject}`);
    return true;
  }
}

const driver: EmailDriver = process.env.EMAIL_SERVICE_DRIVER === 'smtp' 
  ? new SmtpEmailDriver() 
  : new ConsoleLoggerEmailDriver();

export async function sendVerificationEmail(toEmail: string, code: string, name?: string): Promise<boolean> {
  const subject = `${code} — Fentoph hisobingizni tasdiqlash kodi`;
  const text = `Assalomu alaykum${name ? ' ' + name : ''}!

Fentoph ekotizimida yangi hisob ochganingiz yoki emailni tasdiqlamoqchi bo'lganingiz uchun rahmat.

Sizning bir martalik xavfsizlik kodingiz:
${code}

Ushbu kod faqat 15 daqiqa davomida amal qiladi va faqat 1 marta ishlatilishi mumkin.
Agar bu so'rovni siz yubormagan bo'lsangiz, xabarga e'tibor bermang.

Fentoph Xavfsizlik Xizmati
https://fentoph.com/security`;

  return driver.send({ to: toEmail, subject, text });
}

export async function sendPasswordResetEmail(toEmail: string, code: string): Promise<boolean> {
  const subject = `${code} — Fentoph parolini tiklash kodi`;
  const text = `Hurmatli foydalanuvchi!

Fentoph hisobingiz parolini tiklash bo'yicha so'rov qabul qilindi.

Parolni yangilash kodingiz:
${code}

Ushbu kod 15 daqiqa davomida faol. Hech kimga, hatto Fentoph xodimlariga ham bu kodni bermang.
Agar bu so'rovni siz jo'natmagan bo'lsangiz, zudlik bilan xavfsizlik sozlamalarini tekshiring.

Fentoph Security Team`;

  return driver.send({ to: toEmail, subject, text });
}

export async function sendContactNotification(toAdmin: string, senderName: string, senderEmail: string, subjectText: string, message: string): Promise<boolean> {
  const subject = `[Yangi Murojaat] ${subjectText} — ${senderName}`;
  const text = `Fentoph aloqa formasidan yangi xabar tushdi:

Yuboruvchi: ${senderName} (${senderEmail})
Mavzu: ${subjectText}
Vaqt: ${new Date().toISOString()}

Xabar matni:
${message}
`;

  return driver.send({ to: toAdmin, subject, text });
}
