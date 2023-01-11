class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export function checkIfNumber(
  value: string | undefined,
  errorMessage = "Id is not a number"
) {
  const numberValue = Number(value);
  if (!Number.isInteger(numberValue)) {
    // throw new HttpApplicationError(errorMessage, { statusCode: 404 });
    throw new ApiError(errorMessage, 404);
  }
  return numberValue;
}
