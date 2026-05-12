import clsx from "clsx";
import React from "react";

interface UserNameProps {
    name: string
    className?: string
}
export const UserName = React.memo(function ({ name, className }: UserNameProps) {

    return (
        <p className={clsx("base-class", className)}>{name}</p>
    )
})