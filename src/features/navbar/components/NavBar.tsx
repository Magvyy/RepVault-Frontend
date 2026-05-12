import { useActiveSession } from "@/app/ContextProvider";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";




export default function NavBar() {
    const { activeSession } = useActiveSession()
    
    return (
    <NavigationMenu className="flex-0 sticky top-0 z-10 h-fit">
        <NavigationMenuList className="px-4 w-screen bg-card flex justify-between h-[50px]">
            <div className="flex">
                <NavigationMenuItem>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/sessions/templates/create">Create Session</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/sessions/templates">Session Templates</NavigationMenuLink>
                </NavigationMenuItem>
            </div>
            {activeSession && 
                <NavigationMenuItem>
                    <NavigationMenuLink href="/active">Active Session</NavigationMenuLink>
                </NavigationMenuItem>
            }
            <div className="flex">
                <NavigationMenuItem>
                    <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/register">Register</NavigationMenuLink>
                </NavigationMenuItem>
            </div>
        </NavigationMenuList>
    </NavigationMenu>
    )
}