import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      product: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  const validCategories = categories.filter(
    (category) => category.product.length > 0
  );

  return (
    <>
      <Container className="mt-10">
        <Title text="All Pizza" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={validCategories} />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.product.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      products={category.product}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
