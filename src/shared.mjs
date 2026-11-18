export var INPUT_ERROR = 'input is invalid type';
export var FINALIZE_ERROR = 'finalize already called';

var ARRAY_BUFFER = typeof ArrayBuffer !== 'undefined';

export var formatMessage = function (message) {
  var type = typeof message;
  if (type === 'string') {
    return [message, true];
  }
  if (Array.isArray(message)) {
    return [message, false];
  }
  if (ARRAY_BUFFER && message) {
    if (message.constructor === ArrayBuffer) {
      return [new Uint8Array(message), false];
    } else if (ArrayBuffer.isView(message)) {
      // read the underlying bytes of any view (Int8Array, DataView, Uint16Array, ...)
      return [new Uint8Array(message.buffer, message.byteOffset, message.byteLength), false];
    }
  }
  throw new Error(INPUT_ERROR);
}
