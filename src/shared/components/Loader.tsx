import type { ApiState, Id } from "../types/Common"
import Spinner from "./Spinner"


interface LoaderProps <T> {
    state: ApiState<T | string>
    children: (data: T) => React.ReactNode
}
export function Loader <T extends Id> ({ state, children }: LoaderProps <T>) {

    if (state.loading) return <Spinner/>

    const result = state.result;
    if (!result) return null;

    if (result.error) return (
        <div className="flex w-full h-full justify-center items-center">
            {result.error}
        </div>
    )

    if (typeof result.data === "string") return (
        <div className="flex w-full h-full justify-center items-center">
            {result.data}
        </div>
    )

    return children(result.data as T)
}
