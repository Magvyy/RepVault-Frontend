import clsx from "clsx";
import React from "react";

interface UserCardProps {
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    className?: string
}
export const UserCard = React.memo(function ({ children, onClick, className }: UserCardProps) {
    

    return (
        <div onClick={onClick} className={clsx("base-class", className)}>
            {children}
        </div>
    )
})