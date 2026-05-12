import { UserCard, UserName, UserPicture } from "@/features/user"
import InfiniteScroller from "@/shared/components/InfiniteScroller"
import Spinner from "@/shared/components/Spinner"
import { useInfiniteScrollApiCall } from "@/shared/hooks/infiniteScrollApiCall"
import { convertTimeDifferenceToLocalString, convertToLocalString } from "@/shared/services/convertToLocalString"
import formatEnumToString from "@/shared/services/formatEnumToString"
import type { SessionResponse, UISessionResponse } from "@/shared/types/SessionAPI"
import type { UserResponse } from "@/shared/types/UserAPI"
import { useRef } from "react"





export default function HomePage() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const { data: sessions, state } = useInfiniteScrollApiCall<SessionResponse, UISessionResponse>({
        contentRef: scrollRef,
        apiProps: {
            endpoint: `/sessions`,
            credentials: true,
            method: "GET"
        }
    })

    return (
        <InfiniteScroller>
            <div ref={scrollRef} className="w-full p-8 flex flex-col gap-5 justify-start items-center">
                {sessions.map(s => 
                    <div key={s.clientId} onClick={e => window.location.href = `/sessions/${s.id}`} className="flex flex-col items-center bg-card p-2 rounded-[10px] gap-[2px] w-1/5 min-w-[350px]">
                        <div className="w-full flex flex-col p-2 gap-[10px]">
                            <div className="flex justify-between">
                                <div className="flex flex-col justify-between">
                                    <UserCard onClick={e => {
                                        e.stopPropagation()
                                        window.location.href = `/users/${s.user?.id}`
                                    }} className="flex gap-[10px] py-2 cursor-pointer">
                                        <UserPicture className="w-[30px] rounded-[50%]"/>
                                        <UserName className="flex items-center" name={(s.user as UserResponse).user_name} />
                                    </UserCard>
                                    <div className="flex justify-between text-xs">
                                        {convertToLocalString(s.start as string)}
                                    </div>
                                </div>
                                <p className="flex items-center">{s.name}</p>
                            </div>
                            <div className="w-full flex gap-2 justify-between">
                                <div className="flex flex-col">
                                    <p className="flex text-xs">duration</p>
                                    <p className="flex">{convertTimeDifferenceToLocalString(s.start as string, s.end as string)}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="flex justify-end text-xs">volume</p>
                                    <p className="flex justify-end">{s.volume + "kg"}</p>
                                </div>
                            </div>
                        </div>
                        <hr className="w-full h-[1px] bg-neutral-950"/>
                        <div className="w-full flex flex-col gap-[10px]">
                            <div className="w-full p-2 flex flex-col items-center">
                                {s.exercises.map((e, i) => {
                                    if (i > 2) return
                                    return (
                                        <div key={e.clientId}>
                                            {e.sets.length + " sets of " + formatEnumToString(e.type)}
                                        </div>
                                    )}
                                )}
                            </div>
                            {(s.exercises.length > 3) &&
                                <>
                                    <hr className="w-full h-[1px] bg-neutral-950"/>
                                    <p className="self-center cursor-pointer text-xs" onClick={e => window.location.href = `/sessions/${s.id}`}>Click to view {s.exercises.length - 3} more exercises</p>
                                </>
                            }
                        </div>
                    </div>
                )}
                {state.loading && <Spinner/>}
            </div>
        </InfiniteScroller>
    )
}