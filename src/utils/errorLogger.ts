export function errorLogger(err: unknown){
    if(err instanceof Error){
        console.error(`[ERROR_LOG]:  ${err.message}`);
    }
}
