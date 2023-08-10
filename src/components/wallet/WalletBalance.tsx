import { Typography } from "@mui/material";
import { useAccount, useBalance } from "wagmi";

export default function WalletBalance() {
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({ address });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <Typography>
      Balance: {data?.formatted} {data?.symbol}
    </Typography>
  );
}
