type Message = string | number[] | ArrayBuffer | Uint8Array;

interface Hasher {
  /**
   * Update hash
   *
   * @param message The message you want to hash.
   */
  update(message: Message): Hasher;

  /**
   * Return hash in hex string.
   */
  hex(): string;

  /**
   * Return hash in hex string.
   */
  toString(): string;

  /**
   * Return hash in ArrayBuffer.
   */
  arrayBuffer(): ArrayBuffer;

  /**
   * Return hash in integer array.
   */
  digest(): number[];

  /**
   * Return hash in integer array.
   */
  array(): number[];
}

interface Hash {
  /**
   * Hash and return hex string.
   *
   * @param message The message you want to hash.
   */
  (message: Message): string;

  /**
   * Create a hash object.
   */
  create(): Hasher;

  /**
   * Create a hash object and hash message.
   *
   * @param message The message you want to hash.
   */
  update(message: Message): Hasher;

  /**
   * Computes a Hash-based message authentication code (HMAC) using a secret key
   *
   * @param secretKey The Secret Key
   * @param message The message you want to hash.
   */
  hmac(secretKey: string, message: Message): string;
}

export var sha256: Hash;
export var sha224: Hash;
