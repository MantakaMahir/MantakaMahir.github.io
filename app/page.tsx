import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
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
      <main id="home" className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Writing />
        <Education />
        <Now />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
