import { Session } from "next-auth";

export function checkIfAdmin(session: Session) {
    return session.user.role === 'ADMIN';
}