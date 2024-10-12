export function isExpired(seconds: number): boolean {
  return Date.now() >= seconds * 1000;
}
