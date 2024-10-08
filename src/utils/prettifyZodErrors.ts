import { ZodError } from "zod";

export function prettifyZodErrors(error: ZodError, optionalMessage='Poorly formatted data') {
  const fieldErrors = error.flatten().fieldErrors;
  const errorMessages = Object.entries(fieldErrors)
    .map(([field, errors]) => {
      const fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
      const formattedErrors = errors?.join(", ") ?? "";
      return `${fieldLabel}: ${formattedErrors}\n`;
    })
    .join("\n");

  return errorMessages || optionalMessage;
}