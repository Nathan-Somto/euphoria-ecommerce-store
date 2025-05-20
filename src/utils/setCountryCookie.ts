import { NextResponse as Response } from "next/server"
export const setCountryCookie = (res: Response, countryCode: string) => {
    res.cookies.set("x-country-code", countryCode, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });
    return res;
};