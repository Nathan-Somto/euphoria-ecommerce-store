import { errorLogger } from "./errorLogger";
type Props<T> = {
    message: string;
    cb: () => Promise<T>
}
export async function tryCatchFn<T>({
    message = "function failed to execute",
    cb
}: Props<T>) {
    try {
        return { data: await cb() };
    } catch (e) {
        errorLogger(e);
        return {
            message
        }
    }
}