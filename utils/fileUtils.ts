// Utility function to convert file size string (e.g., "4MB") to bytes
export const convertSizeToBytes = (size: string): number => {
  const units: { [key: string]: number } = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
  };

  // Extract the numeric part and the unit part (e.g., "4MB" -> 4, "MB")
  const regex = /^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i;
  const match = size.match(regex);

  if (!match) {
    throw new Error("Invalid file size format");
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  // Multiply the value by the unit size in bytes
  return value * (units[unit] || 1);
};
