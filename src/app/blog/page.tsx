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
    <div className="space-y-4">
      <div className="surface-panel p-6 md:p-7">
        <h1 className="text-3xl font-bold text-slate-100">Blog</h1>
        <p className="mt-2 text-sm text-slate-300/80">
          Tổng cộng {posts.length} bài viết từ API
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge
            variant={strategy === "revalidate" ? "default" : "outline"}
            className="border-cyan-300/40"
          >
            {strategy === "revalidate"
              ? "Cache: revalidate 60s"
              : "Cache: no-store"}
          </Badge>
          <Link href="/blog?strategy=revalidate">
            <Button
              variant="outline"
              size="sm"
              className="border-cyan-300/40 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/20"
            >
              Dùng revalidate
            </Button>
          </Link>
          <Link href="/blog?strategy=no-store">
            <Button
              variant="outline"
              size="sm"
              className="border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100 hover:bg-fuchsia-300/20"
            >
              Dùng no-store
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {posts.slice(0, 10).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="cursor-pointer border-cyan-300/20 bg-slate-950/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/45 hover:shadow-[0_0_30px_-14px_rgba(217,70,239,0.9)]">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="secondary"
                    className="bg-cyan-300/15 text-cyan-100"
                  >
                    Tác giả #{post.userId}
                  </Badge>
                  <span className="text-sm text-slate-400">Bài #{post.id}</span>
                </div>
                <CardTitle className="capitalize text-slate-100">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-slate-300/80">
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
