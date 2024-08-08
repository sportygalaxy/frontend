"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = generateCode;
/**
 * Generates a random numeric code of specified length.
 *
 * @param length - The length of the code to generate.
 * @returns A string representing the generated code.
 */
function generateCode(length) {
    const digits = "0123456789";
    const codeArray = new Array(length);
    for (let i = 0; i < length; i++) {
        codeArray[i] = digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return codeArray.join("");
}
