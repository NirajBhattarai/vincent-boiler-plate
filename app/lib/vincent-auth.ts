import { getWebAuthClient } from "@lit-protocol/vincent-app-sdk/webAuthClient";

export interface VincentUser {
  ethAddress: string;
  publicKey: string;
  tokenId: string;
}

export interface DecodedVincentJWT {
  decodedJWT: unknown;
  jwtStr: string;
}

export function getVincentClient() {
  const appId = process.env.NEXT_PUBLIC_VINCENT_APP_ID;
  if (!appId) throw new Error("NEXT_PUBLIC_VINCENT_APP_ID is required");
  return getWebAuthClient({ appId: parseInt(appId, 10) });
}

export function getStoredVincentJWT(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("VINCENT_AUTH_JWT");
}

export function storeVincentJWT(jwt: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("VINCENT_AUTH_JWT", jwt);
}

export function removeStoredVincentJWT(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("VINCENT_AUTH_JWT");
}

function getJwtExpirationSeconds(jwt: string): number | null {
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;
    const payloadJson = atob(parts[1]);
    const payload = JSON.parse(payloadJson) as { exp?: number } | undefined;
    if (!payload || typeof payload.exp !== "number") return null;
    return payload.exp;
  } catch {
    return null;
  }
}

export function isUserAuthenticated(): boolean {
  const jwt = getStoredVincentJWT();
  if (!jwt) return false;
  const exp = getJwtExpirationSeconds(jwt);
  if (!exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return exp > now;
}

export function handleVincentAuth() {
  const jwtFromUrl = ((): string | null => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("jwt");
  })();

  if (jwtFromUrl) {
    storeVincentJWT(jwtFromUrl);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("jwt");
      window.history.replaceState({}, "", url.toString());
    }
  }

  return {
    isAuthenticated: isUserAuthenticated(),
  };
}

export function redirectToVincentConnect(redirectUri?: string): void {
  if (typeof window === "undefined") return;
  const client = getVincentClient();
  const uri = redirectUri || `${window.location.origin}/login`;
  client.redirectToConnectPage({ redirectUri: uri });
}

export function getCurrentUser(): VincentUser | null {
  const jwt = getStoredVincentJWT();
  if (!jwt) return null;
  
  const exp = getJwtExpirationSeconds(jwt);
  if (!exp) return null;
  
  const now = Math.floor(Date.now() / 1000);
  if (exp <= now) return null;
  
  try {
    const parts = jwt.split(".");
    if (parts.length !== 3) return null;
    const payloadJson = atob(parts[1]);
    const payload = JSON.parse(payloadJson) as { pkpInfo?: VincentUser } | undefined;
    return payload?.pkpInfo || null;
  } catch {
    return null;
  }
}

