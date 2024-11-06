import * as crypto from 'crypto';

export abstract class PasswordUtil {
  static decodeBase64(str: string) {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  static hash(str: string) {
    return crypto.createHash('sha256').update(str).digest('hex');
  }
}
