import { ReceiptDetail } from "@/components/receipts/ReceiptDetail";

type ReceiptPageProps = {
  params: { id: string };
};

export default function ReceiptPage({ params }: ReceiptPageProps) {
  return <ReceiptDetail id={decodeURIComponent(params.id)} />;
}

