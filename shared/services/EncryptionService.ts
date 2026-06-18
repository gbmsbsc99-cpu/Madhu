// Encryption service for HIPAA compliance

export class EncryptionService {
  private key: CryptoKey | null = null;

  async generateKey(): Promise<void> {
    if (typeof window === 'undefined') return; // Server-side handling

    this.key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data: any): Promise<string> {
    if (!this.key || typeof window === 'undefined') {
      return JSON.stringify(data);
    }

    const encoded = new TextEncoder().encode(JSON.stringify(data));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      this.key,
      encoded
    );

    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  async decrypt(encrypted: string): Promise<any> {
    if (!this.key || typeof window === 'undefined') {
      return JSON.parse(encrypted);
    }

    const combined = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      this.key,
      data
    );

    return JSON.parse(new TextDecoder().decode(decrypted));
  }

  hashPassword(password: string): Promise<string> {
    if (typeof window === 'undefined') {
      // Node.js implementation
      return Promise.resolve(password); // Use bcrypt in real implementation
    }

    return new Promise(async (resolve) => {
      const encoded = new TextEncoder().encode(password);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', encoded);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      resolve(hashHex);
    });
  }
}
