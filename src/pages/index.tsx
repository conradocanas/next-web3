import { ExpandMore, SendSharp } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { parseEther } from "viem";
import {
  useBalance,
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";

const WalletBalance = dynamic(
  () => import("@/components/wallet/WalletBalance"),
  { ssr: false }
);

export default function Home() {
  const [amount, setAmount] = useState("");
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({ address });
  const accountBalance = data?.formatted || "";

  const { config, error, status } = usePrepareSendTransaction({
    to: "0x942AeF058cb15C9b8b89B57B4E607d464ed8Cd33",
    value: parseEther(amount),
  });
  const { sendTransactionAsync } = useSendTransaction(config);

  async function sendTokens(e: any) {
    e.preventDefault();
    setLoadingTransaction(true);

    try {
      const tx = await sendTransactionAsync?.();
    } catch (error) {
      error;
    } finally {
      setLoadingTransaction(false);
    }
  }

  function setMaxAmount(amount: string) {
    setAmount(amount);
  }

  return (
    <>
      <main>
        {" "}
        <Box
          sx={{
            background:
              "background: rgb(16,34,84); background: radial-gradient(circle, rgba(24,36,48,1) 5%, rgba(0,0,0,1) 50%);",
          }}
        >
          <Container
            sx={{
              minHeight: "calc(100dvh - 64px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Grid
              container
              spacing={8}
              sx={{ display: "flex", alignItems: "center", flex: 1 }}
            >
              <Grid item md={6}>
                <Typography variant="h2">
                  Send yourself native tokens
                </Typography>
                <Typography variant="h6">Why? There is no why.</Typography>
                <WalletBalance />
              </Grid>
              <Grid item sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Send tokens</Typography>
                    <form onSubmit={sendTokens}>
                      <TextField
                        sx={{ width: "100%", marginY: "1rem" }}
                        id="outlined-basic"
                        label="Token amount"
                        variant="outlined"
                        error={!!error}
                        helperText={error?.message?.split("\n")[0]}
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required={true}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button
                                onClick={() => setMaxAmount(accountBalance)}
                                variant="text"
                              >
                                MAX
                              </Button>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <LoadingButton
                        disabled={!sendTransactionAsync || loadingTransaction}
                        type="submit"
                        variant="contained"
                        loading={loadingTransaction}
                        loadingPosition="end"
                        sx={{ width: "100%" }}
                        endIcon={<SendSharp />}
                      >
                        Send tokens
                      </LoadingButton>
                      {loadingTransaction}
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Box sx={{ marginBottom: "1rem" }}>
              <Button variant="text" href="#why-section">
                <ExpandMore
                  sx={{ fontSize: "3rem", color: "white" }}
                ></ExpandMore>
              </Button>
            </Box>
          </Container>
        </Box>
        <Box id="why-section">
          <Container
            sx={{
              minHeight: "calc(50dvh - 64px)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography variant="h2">Why chose us?</Typography>
            <Grid container spacing={8}>
              <Grid item md={4}>
                <Typography variant="h4">Smart Devs</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  ratione veniam numquam minima vitae cum?
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="h4">Technical Leaders</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  ratione veniam numquam minima vitae cum?
                </Typography>
              </Grid>
              <Grid item sm={4}>
                <Typography variant="h4">Business Specialists</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  ratione veniam numquam minima vitae cum?
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
    </>
  );
}
