import { formatRelativeDate } from "@/lib/utils";
import { CommentForm } from "./CommentForm";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentsResponse } from "../api/comments/route";
import { fetchData } from "@/lib/fetch-utils";
import { useCommentsQuery } from "./use-comments-hooks";

export default function InfiniteComments() {
  const { data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useCommentsQuery()

  // data = [[page1], [page2], [page3]]
  const comments = data?.pages.flatMap(page => page.comments)
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Comments
      </h2>

      <CommentForm />

      {isLoading && <p className="mb-4 text-blue-500">Loading comments...</p>}

      {isError && (
        <div className="mb-4 text-red-500">
          Error loading comments: {error?.message}
        </div>
      )}

      {!isLoading && !isError && comments?.length === 0 && (
        <div className="mb-4">No comments yet.</div>
      )}

      {comments && comments.length > 0 && (
        <div>
          <div className="space-y-3">
            {comments?.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-3 border rounded-lg bg-white"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    {comment.user.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{comment.user.name}</p>
                    <span className="text-xs text-gray-500">
                      {formatRelativeDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center my-4">
            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2"
              >
                {isFetchingNextPage ? "Loading more..." : "Load More Comments"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
