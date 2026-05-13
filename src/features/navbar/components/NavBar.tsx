import { useActiveSession, useAuth } from "@/app/ContextProvider"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { UserCard, UserPicture } from "@/features/user"
import { useLogout } from "@/shared/hooks/useLogOut"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"




export default function NavBar() {
    const { activeSession } = useActiveSession()
    const navigate = useNavigate()
    const { auth } = useAuth()
    const { logout } = useLogout()

    const cols = useMemo(() => activeSession ? 3 : 2, [activeSession])
    
    return (
        <NavigationMenu className="flex-0 sticky top-0 z-10 h-fit">
            <NavigationMenuList className="px-4 w-screen bg-card grid gap-[20px] h-fit min-w-fit!"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
                <div className="flex">
                    <NavigationMenuItem className="flex items-center">
                        <NavigationMenuLink onClick={e => navigate("/")}>Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    {auth &&
                        <>
                            <NavigationMenuItem className="flex items-center">
                                <NavigationMenuLink onClick={e => navigate("/sessions/templates/create")}>Create Session</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="flex items-center">
                                <NavigationMenuLink onClick={e => navigate("/sessions/templates")}>Session Templates</NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    }
                </div>
                {activeSession && 
                    <NavigationMenuItem className="flex justify-center">
                        <NavigationMenuLink onClick={e => navigate("/active")}>Active Session</NavigationMenuLink>
                    </NavigationMenuItem>
                }
                <div className="flex justify-end">
                    {!auth
                    ?
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink onClick={e => navigate("/login")}>Login</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink onClick={e => navigate("/register")}>Register</NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    :
                        <>
                            <NavigationMenuItem className="flex items-center">
                                <NavigationMenuLink
                                    onClick={e => {
                                        logout()
                                    }}>Logout</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink onClick={e => navigate(`/users/${auth.id}`)}>
                                    <UserCard>
                                        <UserPicture className="w-[30px] rounded-[50%]"/>
                                    </UserCard>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    }
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )
}