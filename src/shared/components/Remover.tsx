import { Button } from "@/components/ui/button";

import removeSvg from "../assets/remove.svg";

interface RemoverProps {
    clientId: string
    remove: (clientId: string) => void
    className?: string
}
export default function Remover({ clientId, remove, className }: RemoverProps) {
    
    return(
        <div className={className ? "w-fit flex justify-end items-center " + className : "w-fit flex justify-end items-center"}>
            <Button variant="destructive" className="w-[30px] h-[30px] p-1 bg-white" onClick={() => remove(clientId)}>
                <img src={removeSvg}/>
            </Button>
        </div>
    )
}