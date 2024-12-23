import { Session } from "next-auth";
// checks for extra fields in session object is done on a per-page basis due to this issue:
// https://github.com/nextauthjs/next-auth/issues/9836
// was pressed for time and couldn't find a better solution
// checks if a customer is banned and redirects them to the banned page
export function checkIfBanned(session: Session) {
    if (session.user.isDisabled && session.user.role === 'CUSTOMER') {
        return true;
    }
    return false;
}