"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchableFieldOptions = exports.generateSearchQuery = exports.getPageCount = exports.getPaginationParams = exports.capitalizeFirstLetter = exports.logError = void 0;
const console_log_colors_1 = require("console-log-colors");
const numbers_1 = require("../constants/numbers");
const logError = (_name, _error) => console_log_colors_1.red.bgRed.bold(`[${_name === null || _name === void 0 ? void 0 : _name.toUpperCase()}] - ${console_log_colors_1.red.bgWhiteBright.bold(_error)}`);
exports.logError = logError;
const capitalizeFirstLetter = (str) => str ? str[0].toUpperCase() + str.slice(1) : "";
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const getPaginationParams = (pageString, limitString) => {
    const page = pageString ? Number(pageString) : numbers_1.NUMBERS.ONE;
    const limit = limitString ? Number(limitString) : numbers_1.NUMBERS.TWENTY;
    const params = {
        take: limit,
        offset: page > 1 ? (page - 1) * limit : 0,
        page,
        limit,
    };
    return params;
};
exports.getPaginationParams = getPaginationParams;
const getPageCount = (totalCount, itemsPerPage) => {
    return Math.ceil(totalCount / Number(itemsPerPage));
};
exports.getPageCount = getPageCount;
/**
 * Generates a Prisma search query object for the given field and value.
 * @param field - The field to search on (e.g., 'name', 'description').
 * @param value - The search string.
 * @returns An object that can be used in a Prisma `where` clause.
 */
const generateSearchQuery = (field, value) => {
    return {
        [field]: {
            contains: value,
            mode: 'insensitive',
        },
    };
};
exports.generateSearchQuery = generateSearchQuery;
const getSearchableFieldOptions = (field, value, isArray = false) => {
    console.log("field,value", field, value);
    if (isArray) {
        return {
            [field]: {
                some: {
                    key: {
                        contains: value,
                        mode: "insensitive",
                    },
                },
            },
        };
    }
    return {
        [field]: {
            contains: value,
            mode: "insensitive", // Case-insensitive search
        },
    };
};
exports.getSearchableFieldOptions = getSearchableFieldOptions;
