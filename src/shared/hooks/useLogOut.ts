import { useNavigate } from "react-router-dom"
import { useApiCall } from "./useApiCall"



export const useLogout = () => {
    const navigate = useNavigate()
    const { handleApiCall } = useApiCall()

    const logout = () => {
        handleApiCall({
            endpoint: `/auth/logout`,
            credentials: true,
            method: "GET"
        })
        navigate("/", { state: { clearAuth: true } })
    }

    return { logout }
}