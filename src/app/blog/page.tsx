import Link from "next/link";
import { Post } from "../../types/post";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPageProps {
  searchParams: Promise<{ strategy?: string }>;
}

async function getPosts(strategy: "revalidate" | "no-store"): Promise<Post[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    strategy === "no-store"
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error("Không thể tải danh sách bài viết");
  }

  return res.json();
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const strategy = params.strategy === "no-store" ? "no-store" : "revalidate";
  const posts = await getPosts(strategy);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-500 mb-6">
        Tổng cộng {posts.length} bài viết từ API
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Badge variant={strategy === "revalidate" ? "default" : "outline"}>
          {strategy === "revalidate"
            ? "Cache: revalidate 60s"
            : "Cache: no-store"}
        </Badge>
        <Link href="/blog?strategy=revalidate">
          <Button variant="outline" size="sm">
            Dùng revalidate
          </Button>
        </Link>
        <Link href="/blog?strategy=no-store">
          <Button variant="outline" size="sm">
            Dùng no-store
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.slice(0, 10).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">Tác giả #{post.userId}</Badge>
                  <span className="text-sm text-gray-400">Bài #{post.id}</span>
                </div>
                <CardTitle className="capitalize">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.body}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
