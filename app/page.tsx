import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Now } from "@/components/Now";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Writing />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
