import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustMetrics from '@/components/TrustMetrics';
import About from '@/components/About';
import Services from '@/components/Services';
import FeaturedProjects from '@/components/FeaturedProjects';
import InverterSolutions from '@/components/InverterSolutions';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MobileContactButton from '@/components/MobileContactButton';

export default function Home() {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <Header />
      <Hero />
      <TrustMetrics />
      <About />
      <Services />
      <FeaturedProjects />
      <InverterSolutions />
      <Testimonials />
      <Contact />
      <Footer />
      <MobileContactButton />
    </main>
  );
}
