
export type ABGroup = 'A' | 'B';

export interface ABTestConfig {
  testName: string;
  expirationDays?: number;
}

export interface AnalyticsProvider {
  trackEvent: (eventName: string, properties: Record<string, any>) => void;
  setUserProperty: (properties: Record<string, any>) => void;
}

export class ABTestManager {
  private readonly cookieName: string;
  private readonly expirationDays: number;

  constructor(config: ABTestConfig) {
    this.cookieName = `ab_test_${config.testName}`;
    this.expirationDays = config.expirationDays || 30;
  }

  private getCookie(name: string): string | null {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    } catch (e) {
      console.warn('Cookie access error:', e);
    }
    return null;
  }

  private setCookie(name: string, value: string, days: number): void {
    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
    } catch (e) {
      console.warn('Failed to set cookie. Group persistence might be lost.', e);
    }
  }

  public getOrAssignGroup(): ABGroup {
    const existingGroup = this.getCookie(this.cookieName) as ABGroup | null;
    if (existingGroup === 'A' || existingGroup === 'B') {
      return existingGroup;
    }

    const newGroup: ABGroup = Math.random() < 0.5 ? 'A' : 'B';
    this.setCookie(this.cookieName, newGroup, this.expirationDays);
    return newGroup;
  }

  public logAssignment(analytics: AnalyticsProvider): void {
    const group = this.getOrAssignGroup();
    analytics.setUserProperty({ [this.cookieName]: group });
    analytics.trackEvent('view_test_page', {
      test_name: this.cookieName,
      variant: group
    });
  }
}
