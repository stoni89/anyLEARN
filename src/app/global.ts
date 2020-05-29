export class GlobalApp {

  constructor() {}

  public localStorageItem(anzahl: string): string {
      return localStorage.getItem(anzahl);
  }
}
