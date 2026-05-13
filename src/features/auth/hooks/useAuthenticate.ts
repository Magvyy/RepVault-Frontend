import { useAuth } from "@/app/ContextProvider";
import { useApiCall } from "@/shared/hooks/useApiCall";
import { displayError } from "@/shared/services/displayError";
import type { UserResponse } from "@/shared/types/UserAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthenticate = (endpoint: string) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { state, handleApiCall } = useApiCall<UserResponse>()
    const navigate = useNavigate()

    const { setAuth } = useAuth()

    function isValidUsername(username: string) {
        const forbidden = /[\u200B\u200E\u200F\u202A-\u202E\u2060-\u206F]/
        return !forbidden.test(username) || username.replace("\t", "").replace("\n", "").trim().length != 0
    }

    const authenticate = () => {
        if (!isValidUsername(username)) {
            displayError("Don't try to register with an invisible name or you'll get banned!!!")
            return
        }
        handleApiCall({
            credentials: true,
            endpoint: endpoint,
            method: "POST",
            body: JSON.stringify({
                "user_name": username,
                "password": password
            }),
        });
    }

    useEffect(() => {
        if (state.loading || !state.result) return
        const result = state.result;
        if (result.error) {
            console.log(result.error)
            return
        }
        if (!result.data || typeof result.data === "string") return
        const data = result.data as UserResponse
        setAuth(data)
        navigate("/")
    }, [state])

    // if (state.called && !state.loading) {
    //     let error = state.result?.error
    //     if (error) {
    //         displayError(error)
    //     } else {
    //         navigate("/")
    //     }
    // }
    
    return { setUsername, setPassword, authenticate, state }
}