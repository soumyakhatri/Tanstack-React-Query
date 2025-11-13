"use client"

import { fetchData, postData } from "@/lib/fetch-utils"
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CommentsResponse } from "../api/comments/route"
import { Comment, comments } from "../api/comments/data"

export function useCommentsQuery() {
    // useInfiniteQuery is used when data is split into multiple pages (cursor-based or page-based pagination)
    return useInfiniteQuery({
        // A unique key to identify and cache this query
        queryKey: ["comments"],

        // The function that fetches data for each page
        // React Query automatically passes { pageParam } each time this runs
        queryFn: ({ pageParam }) =>
            // pageParam represents the "cursor" or "page" value for the current request
            // If it's undefined, we fetch the first page; otherwise, we append ?cursor=<pageParam>
            fetchData<CommentsResponse>(
                `/api/comments?${pageParam ? `cursor=${pageParam}` : ""}`
            ),

        // The starting page parameter value for the very first fetch
        // Here it's undefined, meaning the first page (no cursor)
        initialPageParam: undefined as number | undefined,

        // Tells React Query how to find the next page parameter from the most recently fetched page
        // `lastPage` is the data object returned from the last successful queryFn call
        getNextPageParam: (lastPage) =>
            // Return the next cursor if available, or null to stop pagination
            lastPage.nextCursor
    })
    // Step 1 → initialPageParam = undefined
    //          ↓
    // queryFn({ pageParam: undefined })
    //          ↓
    // lastPage = { comments, nextCursor: 5 }
    //          ↓
    // getNextPageParam(lastPage) → 5
    //          ↓
    // queryFn({ pageParam: 5 })   // next page

}

export function useCreateCommentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newComment: { text: string }) => postData<{comment: Comment}>('/api/comments', newComment),
        onSuccess: async ({comment}) => {
            // queryClient.invalidateQueries({queryKey: ["comments"]});
            await queryClient.cancelQueries({queryKey: ["comments"]})
            queryClient.setQueryData<InfiniteData<CommentsResponse, number | undefined>>(["comments"],
                (oldData) => {
                    const firstPage = oldData?.pages[0];

                    if (firstPage) {
                        return {
                            ...oldData,
                            pages: [
                                {
                                    ...firstPage,
                                    totalComments: firstPage.totalComments + 1,
                                    comments: [comment, ...firstPage.comments]
                                },
                                ...oldData.pages.slice(1)
                            ]
                        }
                    }
                })
        }
    })
}