export class SessionStorage {
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
  getItem(key: string): string | null {
    return sessionStorage.getItem(key) ?? null;
  }
}
