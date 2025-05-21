import { AuthError } from "next-auth";
import { errorLogger } from "./errorLogger";
type Props<T> = {
    message: string;
    cb: () => Promise<T>;
    returnErrorMessage?: boolean
    throwRedirectError?: boolean
    throwError?: boolean
}
export async function tryCatchFn<T>({
    returnErrorMessage = false,
    message = "function failed to execute",
    throwRedirectError = false,
    throwError = false,
    cb
}: Props<T>) {
    try {
        return { data: await cb() };
    } catch (e) {
        errorLogger(e);
        if (throwError) {
            throw e;
        }
        if (throwRedirectError) {
            if (e instanceof AuthError) {
                return {
                    message: e.message,
                    error: true,
                }
            }
            // reason for throwing error
            // https://github.com/nextauthjs/next-auth/discussions/9389
            throw e;
        }
        if (returnErrorMessage && e instanceof Error) {
            return {
                message: e.message,
                error: true
            }
        }
        return {
            message,
            error: true
        }
    }
}