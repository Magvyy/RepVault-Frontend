import type { ApiState, Id } from "../types/Common"
import { TailSpin } from "react-loader-spinner"


interface LoaderProps <T extends Id> {
    state: ApiState<T>
}
export function Loader <T extends Id> ({ state }: LoaderProps <T>) {
    const spinner = 
        <div className="flex w-full h-full justify-center items-center">
            <TailSpin
                height="40"
                width="40"
                color="#4fa94d"
                ariaLabel="loading"
            />
        </div>

    if (state.loading) return (
        spinner
    )

    const result = state.result;
    if (!result) return null;

    if (result.error) return (
        <div className="flex w-full h-full justify-center items-center">
            {result.error}
        </div>
    )
}
