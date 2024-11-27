import { headers } from "next/headers";
/**
 * @description to avoid needlessly passing the pathname to every component, we can use this function to get the pathname of the current request
 * @returns the pathname of the current request
 */
export function getPathname() {
    const headersList = headers();
    return headersList.get('x-pathname');
}