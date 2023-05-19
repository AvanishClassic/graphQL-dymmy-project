export type ProductCardProps = {
  updatedAt: string;
  address: string;
  description: string;
  id: string;
  name: string;
  status: string;
  taxId: string;
  npi: string;
  telecom: TelecomProps[];
  alias: string;
};

type TelecomProps = {
  value: string;
  system: string;
};
