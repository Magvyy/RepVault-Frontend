
interface InfiniteScrollerProps {
    children: React.ReactNode
}
export default function InfiniteScroller({ children }: InfiniteScrollerProps) {

    return (
        <div className="w-full h-full p-8 overflow-auto scrollbar-hide">
            {children}
        </div>
    )
}