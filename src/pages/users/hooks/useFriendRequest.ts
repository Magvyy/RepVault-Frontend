import { useAuth } from "@/app/ContextProvider"
import { useApiCall } from "@/shared/hooks/useApiCall"
import { useCallback } from "react"



export const useFriendRequest = () => {
    const { handleApiCall } = useApiCall()
    const { auth } = useAuth()

    const sendFriendRequest = useCallback((id: number) => {
        if (auth!.id === id) return
        handleApiCall({
            endpoint: `/friends/request/${id}`,
            credentials: true,
            method: "GET"
        })
    }, [auth])

    const acceptFriendRequest = useCallback((id: number) => {
        if (auth!.id === id) return
        handleApiCall({
            endpoint: `/friends/accept/${id}`,
            credentials: true,
            method: "GET"
        })
    }, [auth])

    const rejectFriendRequest = useCallback((id: number) => {
        if (auth!.id === id) return
        handleApiCall({
            endpoint: `/friends/reject/${id}`,
            credentials: true,
            method: "GET"
        })
    }, [auth])

    return { sendFriendRequest, acceptFriendRequest, rejectFriendRequest }
}