import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "./shell";
import { Section } from "./scenes";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Shell current="home">
      <Section className="doc notfound in">
        <div className="wrap">
          <h1 className="display display-lg">Nothing at this address.</h1>
          <p className="define">
            The page was moved, or it never existed. The record of what is here is short: the home
            page, what Vivary is, and the workspace commands.
          </p>
          <div className="cta">
            <Link className="btn btn-solid" href="/">
              Back to the start
            </Link>
            <Link className="btn" href="/what-is-vivary/">
              What Vivary is
            </Link>
          </div>
        </div>
      </Section>
    </Shell>
  );
}
