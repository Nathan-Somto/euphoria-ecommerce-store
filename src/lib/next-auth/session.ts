import { auth } from "./auth";

export const currentSession = async () => {
    const session = await auth();
    return session;
}
export const currentUserRole = async () => {
    const session = await auth();
    return session?.user.role;
}