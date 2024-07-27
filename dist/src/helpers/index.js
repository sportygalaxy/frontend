"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const validateData = (schema, data) => {
    const validation = schema.safeParse(data);
    if (!validation.success) {
        console.error(validation.error.format());
        throw new Error("Validation failed");
    }
    return validation.data;
};
exports.validateData = validateData;
