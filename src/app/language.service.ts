import { Injectable, signal } from '@angular/core';

export type Language = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Language>('es');

  setLanguage(language: Language): void {
    this.language.set(language);
    document.documentElement.lang = language;
  }
}
