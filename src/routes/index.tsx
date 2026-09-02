import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/cxo/Navbar";
import { Hero } from "@/components/cxo/Hero";
import { About, Purpose, Mission, Capabilities } from "@/components/cxo/SectionsA";
import {
  Audience,
  Sectors,
  Partners,
  WhyAndCommitment,
  ContactFooter,
} from "@/components/cxo/SectionsB";
import { Conferences, Gallery, PartnerLogos, Team } from "@/components/cxo/SectionsC";

const title = "CXO Media | Enterprise Technology Events for the C-Suite";
const description =
  "CXO Media, an initiative by APAC Media, runs conferences, CIO/CISO forums and executive roundtables connecting enterprise leaders with technology innovation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Purpose />
      <Mission />
      <Capabilities />
      <Conferences />
      <Gallery />
      <Audience />
      <Sectors />
      <Partners />
      <PartnerLogos />
      <Team />
      <WhyAndCommitment />
      <ContactFooter />
    </main>
  );
}
