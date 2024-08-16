import { Container } from "@/components/shared";
import { Dialog } from "@/components/ui/dialog";

type Params = {
  id: string;
};

interface PageParamsProps {
  params: Params;
}

export default function ProductModalPage({ params: { id } }: PageParamsProps) {
  return (
        <Dialog>
            lox
        </Dialog>
  );
}
