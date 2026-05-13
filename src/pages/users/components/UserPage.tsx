import { Button } from "@/components/ui/button"
import { UserCard, UserName, UserPicture } from "@/features/user"
import InfiniteScroller from "@/shared/components/InfiniteScroller"
import { Loader } from "@/shared/components/Loader"
import Spinner from "@/shared/components/Spinner"
import { useApiCall } from "@/shared/hooks/useApiCall"
import { useInfiniteScrollApiCall } from "@/shared/hooks/useInfiniteScrollApiCall"
import { useId } from "@/shared/hooks/useId"
import { convertTimeDifferenceToLocalString, convertToLocalString } from "@/shared/services/convertToLocalString"
import formatEnumToString from "@/shared/services/formatEnumToString"
import { type SessionResponse, type UISessionResponse } from "@/shared/types/SessionAPI"
import { type UserResponse } from "@/shared/types/UserAPI"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useFriendRequest } from "../hooks/useFriendRequest"



export default function UserPage() {
    const { state: userState, handleApiCall: handleUserApiCall } = useApiCall<UserResponse>()
    
    const navigate = useNavigate()

    const id = useId()
    
    const scrollRef = useRef<HTMLDivElement>(null)

    const { data: sessions, state: sessionsState } = useInfiniteScrollApiCall<SessionResponse, UISessionResponse>({
        contentRef: scrollRef,
        apiProps: {
            endpoint: `/sessions/user/${id}`,
            credentials: true,
            method: "GET"
        }
    })

    useEffect(() => {
        handleUserApiCall({
            endpoint: `/users/${id}`,
            credentials: true,
            method: "GET"
        })
    }, [id])

    const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest } = useFriendRequest()

    return (
        <div className="w-full h-full p-10 flex flex-col items-center">
            <UserCard className="w-fit flex flex-col items-center gap-[10px] py-2">
                <Loader state={userState}>
                    {(data) => (
                        <>
                            <UserPicture className="w-[100px] rounded-[50%]"/>
                            <UserName className="flex items-center text-xl" name={data.user_name} />
                            {
                                data.can_accept ? 
                                    <div className="flex gap-[10px]">
                                        <Button onClick={e => {
                                            acceptFriendRequest(id)
                                            data.can_accept = false
                                        }}>Accept Friend</Button>
                                        <Button onClick={e => {
                                            rejectFriendRequest(id)
                                            data.can_accept = false
                                            data.can_add = false
                                        }}>Reject Friend</Button>
                                    </div>
                                : data.can_add && 
                                    <div className="flex">
                                        <Button onClick={e => {
                                            sendFriendRequest(id)
                                            data.can_add = false
                                        }}>Add Friend</Button>
                                    </div>
                            }
                        </>
                    )}
                </Loader>
            </UserCard>
            <InfiniteScroller>
                <div ref={scrollRef} className="w-full p-8 flex flex-col gap-5 justify-start items-center">
                    {sessions.map(s => 
                        <div key={s.clientId} onClick={e => navigate(`/sessions/${s.id}`)} className="flex flex-col items-center bg-card p-2 rounded-[10px] gap-[2px] w-1/5 min-w-[350px]">
                            <div className="w-full flex flex-col p-2 gap-[10px]">
                                <div className="flex justify-between">
                                    <div className="flex flex-col justify-between">
                                        <UserCard className="flex gap-[10px] py-2">
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
                                        <p className="self-center cursor-pointer text-xs" onClick={e => navigate(`/sessions/${s.id}`)}>Click to view {s.exercises.length - 3} more exercises</p>
                                    </>
                                }
                            </div>
                        </div>
                    )}
                    {sessionsState.loading && <Spinner/>}
                </div>
            </InfiniteScroller>
        </div>
    )
}