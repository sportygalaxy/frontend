import { red } from "console-log-colors";
import { NUMBERS } from "../constants/numbers";

export const logError = (_name: string, _error: number | string | any) =>
  red.bgRed.bold(
    `[${_name?.toUpperCase()}] - ${red.bgWhiteBright.bold(_error)}`
  );

export const capitalizeFirstLetter = (str: string) =>
  str ? str[0].toUpperCase() + str.slice(1) : "";

export const getPaginationParams = (
  pageString: string,
  limitString: string
) => {
  const page = pageString ? Number(pageString) : NUMBERS.ONE;
  const limit = limitString ? Number(limitString) : NUMBERS.TWENTY;

  const params = {
    take: limit,
    offset: page > 1 ? (page - 1) * limit : 0,
    page,
    limit,
  };

  return params;
};



export const getPageCount = (
  totalCount: number,
  itemsPerPage: number | string
) => {
  return Math.ceil(totalCount / Number(itemsPerPage));
};

/**
 * Generates a Prisma search query object for the given field and value.
 * @param field - The field to search on (e.g., 'name', 'description').
 * @param value - The search string.
 * @returns An object that can be used in a Prisma `where` clause.
 */
export const generateSearchQuery = (field: string, value: string) => {
  return {
    [field]: {
      contains: value,
      mode: 'insensitive',
    },
  };
};

export const getSearchableFieldOptions = (
  field: string,
  value: string,
  isArray: boolean = false
) => {
  console.log("field,value", field, value)
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
