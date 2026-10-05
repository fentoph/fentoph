const PASSWORD_SHA256 = '9e16594528ee7fc1305416f9445d7063e9511d5c75f921f9e490f59c83b74b33';
const ADMIN_EMAIL = 'admin@fentoph.io';

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function b64url(value) {
  return Buffer.from(value).toString('base64url');
}
async function sign(value, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return Buffer.from(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))).toString('base64url');
}
function secret() {
  return process.env.AUTH_SECRET || 'fentoph-production-auth-secret-change-me';
}
function cookie(name, value, maxAge) {
  return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body || {};
      if (email !== ADMIN_EMAIL || await sha256(password || '') !== PASSWORD_SHA256) {
        return res.status(401).json({ ok: false, message: 'Login yoki parol noto‘g‘ri.' });
      }
      const payload = b64url(JSON.stringify({ sub: ADMIN_EMAIL, exp: Date.now() + 8 * 60 * 60 * 1000 }));
      const signature = await sign(payload, secret());
      res.setHeader('Set-Cookie', cookie('fentoph_admin', `${payload}.${signature}`, 8 * 60 * 60));
      return res.status(200).json({ ok: true });
    } catch {
      return res.status(500).json({ ok: false, message: 'Server xatosi.' });
    }
  }
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', cookie('fentoph_admin', '', 0));
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ ok: false });
}