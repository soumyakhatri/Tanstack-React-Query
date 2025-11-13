import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
// import { useCreateCommentMutation } from "./use-comments-hooks";
import { useCreateCommentMutationOptimistic } from "./use-comments-hook-optimistic";

export function CommentForm() {
  const [commentText, setCommentText] = useState("");

  // const { mutate, error, isPending } = useCreateCommentMutation()
  const { mutate, error, isPending } = useCreateCommentMutationOptimistic()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!commentText.trim()) return;
    mutate({
      text: commentText
    }, {
      onSuccess: () => {
        setCommentText("");
        toast.success("Comment added successfully");
      },
      onError: () => {
        toast.error(`Error adding comment: ${error}`)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1"
        disabled={isPending}
      />
      <Button type="submit" disabled={!commentText.trim() || isPending} >
       {isPending ? 'Posting...' : 'Post'}
      </Button>
    </form>
  );
}
