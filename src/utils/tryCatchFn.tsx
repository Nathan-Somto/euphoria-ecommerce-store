import { errorLogger } from "./errorLogger";
type Props<T> = {
    message: string;
    cb: () => Promise<T>;
    returnErrorMessage?:boolean
}
export async function tryCatchFn<T>({
    returnErrorMessage= false,
    message = "function failed to execute",
    cb
}: Props<T>) {
    try {
        return { data: await cb() };
    } catch (e) {
        errorLogger(e);
        if(returnErrorMessage && e instanceof Error){
            return {
                message: e.message
            }
        }
        return {
            message
        }
    }
}