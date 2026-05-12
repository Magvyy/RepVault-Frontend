import { useEffect, useState, type RefObject } from "react";
import { useApiCall } from "./handleApiCall";
import { convert_to_UI, type Id, type UI } from "../types/Common";
import { useInfiniteScroll } from "./infiniteScroll";

interface InfiniteScrollApiCallProps {
    contentRef: RefObject<HTMLDivElement | null>
    apiProps: {
        endpoint: string
        credentials?: boolean
        method: string
        body?: string
    }
}
export const useInfiniteScrollApiCall = <T extends Id, K extends Id & UI> ({ contentRef, apiProps }: InfiniteScrollApiCallProps) => {
    const { state, handleApiCall } = useApiCall<T[]>()
    const [data, setData] = useState<K[]>([])
    const { offset, setOffset, flags, setFlags} = useInfiniteScroll(contentRef)
    const [seen, setSeen] = useState<number[]>([])
    const [end, setEnd] = useState<boolean>(false)

    useEffect(() => {
        if ((!flags[0] && !flags[1]) || end) return
        handleApiCall({...apiProps, endpoint: apiProps.endpoint.includes("?") ? apiProps.endpoint + `&offset=${offset}` : apiProps.endpoint + `?offset=${offset}`})
        console.log("Calling API...")
    }, [flags])

    useEffect(() => {
        setOffset(data.length)
        setFlags([false, false])
    }, [data])

    useEffect(() => {
        if (state.loading || !state.result) return
        const result = state.result;
        if (result.error) {
            console.log(result.error)
            return
        }
        if (!result.data || typeof result.data === "string") return
        let data = result.data as T[]
        if (data.length === 0) {
            setEnd(true)
            return
        }
        setData(prev => {
            data = data.filter(s => !seen.includes(s.id as number))
            console.log("Added " + data.length + " elements")
            setSeen(prev => [...prev, ...data.map(d => d.id)])
            return [...prev, ...data.map(s => convert_to_UI<K>(s))]
        })
    }, [state])

    return { data, state }
}