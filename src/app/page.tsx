import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Services from "@/components/Services";
import CitasBanner from "@/components/CitasBanner";
import DoctorFinder from "@/components/DoctorFinder";
import ConvocatoriasSection from "@/components/ConvocatoriasSection";
import Blog from "@/components/Blog";
import MaternitySection from "@/components/MaternitySection";
import EnlacesInteres from "@/components/EnlacesInteres";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";
import { getAllConvocatorias } from "@/lib/convocatorias";

export default function Home() {
  const posts = getAllPosts();
  const convocatorias = getAllConvocatorias().slice(0, 8);

  return (
    <main>
      <Navbar />
      <HeroSlider />
      <Services />
      <CitasBanner />
      <DoctorFinder />
      <ConvocatoriasSection convocatorias={convocatorias} />
      <Blog posts={posts} />
      <MaternitySection />
      <EnlacesInteres />
      <Footer />
    </main>
  );
}
