import { Link, Redirect, useRoute } from "wouter";
import { Calendar, Facebook } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { RelatedArticlesBlock } from "@/components/RelatedArticlesBlock";
import { Button } from "@/components/ui/button";
import { FACEBOOK_URL } from "@/config/contact";
import { useSiteContent } from "@/context/SiteContentContext";
import { ArticleBodyContent } from "@/components/ArticleBodyContent";
import { DEFAULT_HERO_IMAGE } from "@/data/pages.defaults";
import { SERVICE_CATEGORIES } from "@/data/services-catalog";
import { buildHeroImageAlt } from "@/lib/article-seo";
import { EAGER_IMG } from "@/lib/image-loading";
import { getServiceItem, resolveServiceCategories } from "@/lib/site-cms";
import { getRelatedForService, getLocalArticlesForService } from "@/lib/topic-clusters";
import type { ServiceCategoryId } from "@/types/site-content";
import NotFound from "@/pages/not-found";

type ServiceDetailPageProps = {
  categoryId: ServiceCategoryId;
};

export default function ServiceDetailPage({ categoryId }: ServiceDetailPageProps) {
  const { content } = useSiteContent();
  const categories = resolveServiceCategories(content);
  const category = categories[categoryId];
  const [, params] = useRoute(`${category?.path ?? `/${categoryId}`}/:slug`);
  const slug = params?.slug ?? "";

  if (!category) return <NotFound />;

  if (slug === "hut-mo-cay-mo-ma") {
    return <Redirect to={category.path} />;
  }

  const service = getServiceItem(content, categoryId, slug);
  if (!service) return <NotFound />;

  const article = service.articleSlug
    ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
    : undefined;

  const title = article?.title ?? service.label;
  const description =
    article?.description ??
    service.description ??
    `Tư vấn và điều trị ${service.label.toLowerCase()} an toàn, hiệu quả tại Thiên Hoàng Kim.`;
  const image = article?.image ?? service.image ?? DEFAULT_HERO_IMAGE;
  const body =
    article?.body ??
    `Dịch vụ ${service.label} được thực hiện bởi bác sĩ có chứng chỉ hành nghề, quy trình vô trùng và theo dõi sau điều trị.

Khách hàng được thăm khám, phân tích và lên phác đồ cá nhân trước khi tiến hành.

Đặt lịch tư vấn miễn phí để được bác sĩ đánh giá tình trạng và báo giá chi tiết.`;

  const focusKeyphrase = article?.seo?.focusKeyphrase ?? service.label;
  const heroAlt = buildHeroImageAlt(focusKeyphrase, title);
  const { cluster, articles: related } = getRelatedForService(content, slug, 8);
  const localArticles = getLocalArticlesForService(content, slug);

  return (
    <SiteLayout>
      <article className="container mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
        <BreadcrumbNav
          crumbs={[
            { label: "Trang chủ", href: "/" },
            { label: "Dịch vụ", href: "/dich-vu" },
            { label: category.title, href: category.path },
            { label: service.label },
          ]}
          className="mb-6"
        />
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{category.eyebrow}</p>
        <h1 className="mt-3 font-['Noto_Serif','Cormorant_Garamond',serif] text-3xl font-semibold leading-tight text-primary md:text-4xl">
          {title}
        </h1>
        {article?.date && (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            {article.date}
          </p>
        )}
        <img src={image} alt={heroAlt} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover object-top shadow-lg" {...EAGER_IMG} />
        <p className="mt-8 text-lg font-medium leading-relaxed text-foreground/90">{description}</p>
        <ArticleBodyContent
          body={body}
          imageAlt={heroAlt}
          facebookUrl={content.settings.facebookUrl || FACEBOOK_URL}
        />
        {localArticles.length > 0 && (
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="font-serif text-xl font-bold text-primary">Thẩm mỹ Quận 5 & An Đông</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thiên Hoàng Kim — 323–325 Hùng Vương, Phường An Đông. Tư vấn miễn phí: 0896 673 320.
            </p>
            <ul className="mt-4 space-y-2">
              {localArticles.map((a) => (
                <li key={a.id}>
                  <Link href={`/tin-tuc/${a.slug}`} className="font-semibold text-primary hover:underline">
                    {a.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tin-tuc/dia-chi-tham-my-quan-5-an-dong" className="font-semibold text-primary hover:underline">
                  Địa chỉ thẩm mỹ Quận 5 An Đông — gợi ý & tiêu chí chọn
                </Link>
              </li>
            </ul>
          </div>
        )}
        <RelatedArticlesBlock
          content={content}
          cluster={cluster}
          articles={related}
          title={`Kiến thức về ${SERVICE_CATEGORIES[categoryId].eyebrow.toLowerCase()}`}
        />
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/lien-he#dat-lich">
            <Button className="rounded-full bg-primary font-bold">Đặt lịch tư vấn</Button>
          </Link>
          <a href={content.settings.facebookUrl || FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            <Button type="button" variant="outline" className="rounded-full">
              <Facebook className="mr-2 h-4 w-4" aria-hidden />
              Fanpage Facebook
            </Button>
          </a>
          <Link href="/bang-gia">
            <Button type="button" variant="outline" className="rounded-full">
              Xem bảng giá
            </Button>
          </Link>
          <Link href={category.path}>
            <Button type="button" variant="outline" className="rounded-full">
              Xem dịch vụ khác
            </Button>
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
