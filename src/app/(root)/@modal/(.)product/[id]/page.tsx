import { ChooseProductModal, Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type Params = {
  id: string;
};

interface PageParamsProps {
  params: Params;
}

export default async function ProductModalPage({
  params: { id },
}: PageParamsProps) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) return notFound();

  return <ChooseProductModal product={product} />;
}
