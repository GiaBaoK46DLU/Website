import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Post, User, Comment } from "@/types/post";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getComments(postId: string): Promise<Comment[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error("Không thể tải bình luận bài viết");
  }

  return res.json();
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!res.ok) {
    throw new Error("Không thể tải thông tin tác giả");
  }

  return res.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  // Chạy song song request bài viết và comments để giảm thời gian chờ.
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);
  const author = await getUser(post.userId);

  return (
    <div className="space-y-4">
      <Link
        href="/blog"
        className="inline-block rounded-md px-2 py-1 text-sm text-cyan-200 hover:bg-cyan-300/10 hover:text-cyan-100"
      >
        {"<-"} Quay lại danh sách
      </Link>

      <article className="surface-panel p-6 md:p-8">
        <h1 className="mb-4 text-3xl font-bold capitalize text-slate-100">
          {post.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-300/85">
          <span>
            Tác giả: <strong className="text-cyan-100">{author.name}</strong>
          </span>
          <span>•</span>
          <span>{author.email}</span>
        </div>

        <div className="whitespace-pre-line mb-8 max-w-none leading-relaxed text-slate-200/90">
          {post.body}
        </div>

        <div className="rounded-xl border border-fuchsia-300/25 bg-slate-950/55 p-4">
          <h3 className="mb-2 font-semibold text-fuchsia-200">Về tác giả</h3>
          <p className="text-sm text-slate-300/85">
            <strong>{author.name}</strong> (@{author.username}) —{" "}
            {author.company.name}
          </p>
          <p className="text-sm text-slate-400">{author.company.catchPhrase}</p>
        </div>

        <div className="mt-8 border-t border-cyan-300/15 pt-6">
          <h3 className="mb-4 font-semibold text-cyan-100">
            Bình luận ({comments.length})
          </h3>
          <div className="space-y-3">
            {comments.slice(0, 5).map((comment) => (
              <Card
                key={comment.id}
                className="border-cyan-300/20 bg-slate-950/50"
              >
                <CardContent className="pt-4">
                  <p className="text-sm font-medium text-slate-100">
                    {comment.name}
                  </p>
                  <p className="mb-2 text-xs text-slate-400">{comment.email}</p>
                  <p className="text-sm text-slate-300/85">{comment.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
