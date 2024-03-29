import { withAuth as withNextAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

const checkTokenExp = (exp: number) => {
    const nowTime = new Date().getTime();
    const expTime = exp * 1000;
    return nowTime >= expTime
}

export const withAuth = () => {
    return (request: NextRequest, event: NextFetchEvent) => {
        withNextAuth({
            callbacks: {
                authorized(params: any) {
                    return params.token?.exp ? checkTokenExp(params.token.exp) : false
                },
            },
            secret: process.env.NEXTAUTH_SECRET,
            pages: { signIn: "/auth/login" },
        })(request as any, event);
    };
};