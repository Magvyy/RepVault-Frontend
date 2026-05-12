import { useEffect, useState, type RefObject } from "react";


export const useInfiniteScroll = (content: RefObject<HTMLDivElement | null>) => {
    const [offset, setOffset] = useState<number>(0)
    const [pos, setPos] = useState<number>(0)
    const [flags, setFlags] = useState<boolean[]>([false, false]) // flags[0] is if content is smaller than container, flags[1] is for scrolling

    // If child.scrollHeight < parent.clientHeight => add elemenets
    // child.scrollTop + child.clientHeight > child.scrollHeight - 100px => add elements

    useEffect(() => {
        if (!content.current) return

        const handleScroll = () => {
            setPos(content.current!.parentElement!.scrollTop)
        }

        content.current.parentElement!.addEventListener("scroll", handleScroll)

        return () => {
            content.current?.parentElement?.removeEventListener("scroll", handleScroll)
        }
    }, [content.current])

    useEffect(() => {
        if (!content.current || flags[0] || flags[1]) return
        const child = content.current
        const parent = content.current.parentElement
        
        if (child.clientHeight < (parent!.clientHeight + 5)) setFlags([true, false])
        else if ((child.clientHeight - parent!.scrollTop) < (parent!.clientHeight + 5)) setFlags([false, true])
        // Should be - (parent!.scrollTop + distance from top of parent to top of child)
    }, [pos, flags])

    return {offset, setOffset, flags, setFlags};
}