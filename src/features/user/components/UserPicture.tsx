import clsx from "clsx";
import React from "react";
import UserIcon from "../assets/profile_pic.svg"

interface UserPictureProps {
    url?: string
    children?: React.ReactNode
    className?: string
}
export const UserPicture = React.memo(function ({ url, children, className }: UserPictureProps) {
    

    return (
        <img src={url ? import.meta.env.VITE_API_URL + url : UserIcon} className={clsx("base-class", className)}>
            {children}
        </img>
    )
})