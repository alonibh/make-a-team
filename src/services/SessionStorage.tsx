export class SessionStorage {
  setUserId(userId: string): void {
    sessionStorage.setItem("userId", userId);
  }
  getUserId(): string {
    return sessionStorage.getItem("userId") ?? "";
  }
}
