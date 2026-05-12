import NavBar from "@/features/navbar/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col scrollbar-hide h-[100vh]">
            <NavBar />
            {children}
        </main>
    )
}