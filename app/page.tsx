import Compare from '@/components/sections/Compare';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';
import GetStarted from '@/components/sections/GetStarted';
import Hero from '@/components/sections/Hero';
import InsideAutoMate from '@/components/sections/InsideAutoMate';
import Nav from '@/components/sections/Nav';
import NightShift from '@/components/sections/NightShift';
import QuestionStrip from '@/components/sections/QuestionStrip';
import Rules from '@/components/sections/Rules';
import Situations from '@/components/sections/Situations';
import Skills from '@/components/sections/Skills';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <QuestionStrip />
        <Skills />
        <NightShift />
        <Compare />
        <Situations />
        <Rules />
        <InsideAutoMate />
        <FAQ />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
