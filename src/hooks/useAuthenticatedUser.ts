import { INextAuthSession } from "@/types/auth.model"
import { useSession } from "next-auth/react"

export const useAuthenticatedUser = () => {
    const session = useSession() as INextAuthSession

    return session?.data?.user
}