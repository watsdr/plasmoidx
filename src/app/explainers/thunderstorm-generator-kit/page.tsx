import type { Metadata } from "next";
import ExplainerArticle from "@/components/ExplainerArticle";
import { getExplainer } from "@/lib/explainers";
import { pageMeta } from "@/lib/seo";

const e = getExplainer("thunderstorm-generator-kit");

export const metadata: Metadata = pageMeta({
  path: `/explainers/${e.slug}/`,
  title: e.title,
  description: e.description,
  section: "explainers",
  ogType: "article",
  ogImage: `/og/explainers/${e.slug}.png`,
});

export default function Page() {
  return <ExplainerArticle e={e} />;
}
