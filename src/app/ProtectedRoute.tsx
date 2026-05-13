import { useNavigate } from "react-router-dom"
import { useAuth } from "./ContextProvider"
import { useEffect } from "react"


interface ProtectedRouteProps {
    children: React.ReactNode
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const { auth } = useAuth()
    
    console.log(auth)
    useEffect(() => {
        if (!auth) navigate("/login")
    }, [auth])

    if (!auth) return
    
    return children
}