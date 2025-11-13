import { NavigationCard } from "@/components/navigation-card";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Tan-Stack-React Query</h1>
      </header>

      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NavigationCard
          title="Problems with useEffect"
          description="See why traditional data fetching with useEffect is problematic and how to fix common issues."
          href="/problems-with-use-effect"
        />

        <NavigationCard
          title="Basic React Query"
          description="Learn how React Query simplifies data fetching with automatic state management and caching."
          href="/basic-react-query"
        />

        <NavigationCard
          title="Debounced Search with React Query"
          description="Learn how to implement a debounced search feature with React Query to optimize data fetching."
          href="/search-query"
        />

        <NavigationCard
          title="Infinite Queries"
          description="Explore how to implement infinite scrolling and pagination with useInfiniteQuery."
          href="/infinite-query"
        />

        <NavigationCard
          title="Mutations with React Query"
          description="Learn how to create, update, and delete data using useMutation with proper error handling."
          href="/infinite-query"
        />

        <NavigationCard
          title="Optimistic Updates"
          description="Improve user experience by updating the UI optimistically before server confirmation."
          href="/infinite-query"
        />
      </main>

      <footer className="mt-12 flex flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://tanstack.com/query/latest/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Query Docs
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
        </div>
      </footer>
    </div>
  );
}
