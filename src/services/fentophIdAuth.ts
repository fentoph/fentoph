/**
 * Fentoph ID (fentophid.vercel.app) OAuth 2.0 / OpenID Connect Client
 * Implements Authorization Code Flow with PKCE (RFC 7636)
 */

export const FENTOPH_ID_ISSUER = 'https://fentophid.vercel.app';
export const FENTOPH_ID_CLIENT_ID = 'fentoph_corporate_portal';
export const FENTOPH_ID_SCOPE = 'openid profile email';

/**
 * Resolves the callback URI based on current runtime location
 */
export function getFentophIdRedirectUri(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/fentoph-callback`;
  }
  return 'https://fentoph.vercel.app/auth/fentoph-callback';
}

/**
 * Generate cryptographically secure PKCE verifier & challenge
 */
async function generatePKCE(): Promise<{ verifier: string; challenge: string }> {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  
  const verifier = btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return { verifier, challenge };
}

/**
 * Initiates the Fentoph ID Single Sign-On flow by redirecting to authorization endpoint
 */
export async function initiateFentophIdLogin(customRedirectUri?: string): Promise<void> {
  const { verifier, challenge } = await generatePKCE();
  const state = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const redirectUri = customRedirectUri || getFentophIdRedirectUri();

  sessionStorage.setItem('fentoph_oauth_verifier', verifier);
  sessionStorage.setItem('fentoph_oauth_state', state);
  sessionStorage.setItem('fentoph_oauth_redirect_uri', redirectUri);

  const url = new URL(`${FENTOPH_ID_ISSUER}/oauth/authorize`);
  url.searchParams.set('client_id', FENTOPH_ID_CLIENT_ID);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', FENTOPH_ID_SCOPE);
  url.searchParams.set('state', state);
  url.searchParams.set('code_challenge', challenge);
  url.searchParams.set('code_challenge_method', 'S256');

  window.location.href = url.toString();
}

/**
 * Handles the returned code and state on the callback page, returning authenticated user session
 */
export async function exchangeFentophIdCode(code: string, returnedState: string): Promise<any> {
  const savedState = sessionStorage.getItem('fentoph_oauth_state');
  const verifier = sessionStorage.getItem('fentoph_oauth_verifier');
  const redirectUri = sessionStorage.getItem('fentoph_oauth_redirect_uri') || getFentophIdRedirectUri();

  if (savedState && returnedState !== savedState) {
    throw new Error('Xavfsizlik ogohlantirishi (CSRF): state parametri mos kelmadi.');
  }

  // 1. First attempt: Secure Backend Exchange
  try {
    const backendRes = await fetch('/api/auth/fentoph-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        code_verifier: verifier,
        redirect_uri: redirectUri,
      }),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      sessionStorage.removeItem('fentoph_oauth_verifier');
      sessionStorage.removeItem('fentoph_oauth_state');
      sessionStorage.removeItem('fentoph_oauth_redirect_uri');
      return data;
    }
  } catch (backendErr) {
    console.warn('Backend exchange unavailable, proceeding with direct PKCE exchange...', backendErr);
  }

  // 2. Direct PKCE Exchange with Fentoph ID (Works 100% on static frontend hosting)
  const tokenRes = await fetch(`${FENTOPH_ID_ISSUER}/api/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: FENTOPH_ID_CLIENT_ID,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(tokenData.error_description || tokenData.error || 'Token olishda xatolik yuz berdi');
  }

  // 3. Retrieve user profile
  const userinfoRes = await fetch(`${FENTOPH_ID_ISSUER}/api/oauth/userinfo`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const profile = await userinfoRes.json();
  if (!userinfoRes.ok) {
    throw new Error('Fentoph ID foydalanuvchi ma\'lumotlarini yuklab bo\'lmadi');
  }

  sessionStorage.removeItem('fentoph_oauth_verifier');
  sessionStorage.removeItem('fentoph_oauth_state');
  sessionStorage.removeItem('fentoph_oauth_redirect_uri');

  const formattedUser = {
    id: profile.sub || `fp_${Date.now()}`,
    fentoph_id: profile.username ? `${profile.username}@fmail.com` : `${String(profile.sub).slice(0, 8)}@fmail.com`,
    email: profile.email || `${profile.username}@fmail.com`,
    username: profile.username || String(profile.email || '').split('@')[0],
    fullName: profile.name || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.username,
    role: profile.role || 'USER',
    emailVerified: Boolean(profile.email_verified),
    avatar: '/images/no_bg_favicon.png',
  };

  return {
    user: formattedUser,
    sessionToken: tokenData.access_token,
    rawProfile: profile,
  };
}
