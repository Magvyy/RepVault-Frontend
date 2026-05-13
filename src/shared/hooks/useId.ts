import { useNavigate, useParams } from "react-router-dom"


export const useId = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    if (!id) navigate("/") // change to error page?

    return id as unknown as number
}