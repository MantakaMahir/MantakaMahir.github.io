import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Portfolio } from "@/components/Portfolio";
import { Now } from "@/components/Now";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Writing } from "@/components/Writing";

export default function Home() {
  return (
    <Portfolio sections={[
      { id: "about", label: "About", content: <><About /><Now /></> },
      { id: "projects", label: "Projects", content: <Projects /> },
      { id: "experience", label: "Experience", content: <Experience /> },
      { id: "skills", label: "Skills", content: <Skills /> },
      { id: "writing", label: "Certifications", content: <Writing /> },
      { id: "contact", label: "Connect", content: <Contact /> },
    ]} />
  );
}
