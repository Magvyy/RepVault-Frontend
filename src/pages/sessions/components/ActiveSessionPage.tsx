import { useActiveSession } from "@/app/ContextProvider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SessionTableInput } from "@/features/session";
import { useApiCall } from "@/shared/hooks/useApiCall";
import { convert_to_UI, convet_to_API } from "@/shared/types/Common";
import { type ActiveSessionResponse, type UISession } from "@/shared/types/SessionAPI";
import { useCallback, useEffect, useState } from "react";




export default function ActiveSessionPage() {
    const { activeSession, setActiveSession } = useActiveSession()
    if (!activeSession) return

    const [visible, setVisible] = useState<boolean>(false)

    const { state, handleApiCall } = useApiCall<ActiveSessionResponse>()
    const [session, setSession] = useState<UISession>(convert_to_UI(activeSession))

    useEffect(() => {
        if (state.loading || !state.result) return
        const result = state.result;
        if (result.error) {
            console.log(result.error)
            return
        }
        if (!result.data || typeof result.data === "string") return
        setActiveSession(undefined)
    }, [state])

    const handleClick = useCallback((session: UISession, visible: boolean) => {
        console.log(visible)
        handleApiCall({
            endpoint: `/sessions/active/${activeSession.id}`,
            credentials: true,
            method: "PUT",
            body: JSON.stringify({...convet_to_API(session), public: visible})
        })
    }, [])


    return (
        <div className="w-full h-full p-8 flex flex-col gap-5 justify-start items-center">
            <div className="w-2/5 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-[20px]">
                    <div className="flex items-center px-2 w-full !bg-card">
                        <Input
                            onChange={(e) => setSession(prev => { return {...prev, name: e.target.value} })}
                            placeholder="Template name"
                        />
                        <Field className="flex gap-[1px] w-4/10" orientation="horizontal">
                            <FieldLabel htmlFor="terms-checkbox-basic">
                                Make post visible
                            </FieldLabel>
                            <Checkbox
                                id="terms-checkbox-basic"
                                name="terms-checkbox-basic"
                                checked={visible}
                                onCheckedChange={(value: boolean) => {
                                setVisible(value);
                                }}
                            />
                        </Field>
                    </div>
                    <SessionTableInput
                        session={session}
                        setSession={setSession}
                    />
                    </div>
                <Button onClick={e => handleClick(session, visible)}>Finish Session</Button>
            </div>
        </div>
    )
}
