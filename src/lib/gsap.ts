import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once on the client
if (typeof window !== "undefined" && gsap.core?.globals?.().ScrollTrigger == null) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

