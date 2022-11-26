export class SessionStorage {
  //these user functions are too specific... just use setItem(key, value) and getItem 
  setUserId(userId: string): void {
    sessionStorage.setItem("userId", userId);
  }
  getUserId(): string {
    return sessionStorage.getItem("userId") ?? "";
  }
}
