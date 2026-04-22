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
    throw new Error("Khong the tai binh luan bai viet");
  }

  return res.json();
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!res.ok) {
    throw new Error("Khong the tai thong tin tac gia");
  }

  return res.json();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  // Chay song song request bai viet va comments de giam thoi gian cho.
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);
  const author = await getUser(post.userId);

  return (
    <div>
      <Link
        href="/blog"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Quay lai danh sach
      </Link>

      <article>
        <h1 className="text-3xl font-bold mb-4 capitalize">{post.title}</h1>

        <div className="flex items-center gap-3 mb-6 text-sm text-gray-500">
          <span>
            Tac gia: <strong className="text-gray-700">{author.name}</strong>
          </span>
          <span>•</span>
          <span>{author.email}</span>
        </div>

        <div className="prose max-w-none text-gray-700 whitespace-pre-line mb-8 leading-relaxed">
          {post.body}
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-2">Ve tac gia</h3>
          <p className="text-gray-600 text-sm">
            <strong>{author.name}</strong> (@{author.username}) —{" "}
            {author.company.name}
          </p>
          <p className="text-gray-500 text-sm">{author.company.catchPhrase}</p>
        </div>

        <div className="border-t pt-6 mt-8">
          <h3 className="font-semibold mb-4">Binh luan ({comments.length})</h3>
          <div className="space-y-3">
            {comments.slice(0, 5).map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <p className="text-sm font-medium text-gray-800">
                    {comment.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">{comment.email}</p>
                  <p className="text-sm text-gray-700">{comment.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
