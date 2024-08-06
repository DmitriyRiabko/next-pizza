import {
  Container,
  Filters,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All Pizza" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Pizza"
                products={[
                  {
                    id: 1,
                    items: [{ price: 3.99 }],
                    imageUrl:
                      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cicis.com%2F&psig=AOvVaw1u2DTO3szY8n-X6_PFGAqb&ust=1722860541387000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNjY8vCp24cDFQAAAAAdAAAAABAE",
                  },
                  {
                    id: 1,
                    items: [{ price: 3.99 }],
                  },
                  {
                    id: 1,
                    items: [{ price: 3.99 }],
                  },
                  {
                    id: 1,
                    items: [{ price: 3.99 }],
                  },
                ]}
                categoryId={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
