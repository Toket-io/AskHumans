import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";
import { Typography } from "@mui/joy";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {/* <Typography level="h1" noWrap={false} variant="plain">
        Ask Humans{" "}
      </Typography> */}
      <main>{children}</main>
      <Analytics />
      {/* <Footer /> */}
    </>
  );
}
