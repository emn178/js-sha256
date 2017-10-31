/**
 * Returns the SHA-256 hash of `message` as an hexadecimal string.
 * @param message The message to hash
 */
export function sha256(message: string | ArrayLike<number> | Uint8Array | ArrayBuffer): string;

/**
 * Returns the SHA-224 hash of `message` as an hexadecimal string.
 * @param message The message to hash
 */
export function sha224(message: string | ArrayLike<number> | Uint8Array | ArrayBuffer): string;
