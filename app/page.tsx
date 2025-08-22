import HeroScrollVideo from "@/components/ui/scroll-animated-video"
import { CalcioStoricoTimeline } from "@/components/calcio-storico-timeline"

export default function Home() {
  return (
    <main>
      <HeroScrollVideo
        title="Diventa Parte Della Leggenda"
        subtitle="Scopri il Calcio Storico Fiorentino, il gioco che ha dato origine al calcio e al rugby"
        meta="Q3 • 2025"
        media="https://videos.pexels.com/video-files/6151238/6151238-hd_1920_1080_30fps.mp4"
        overlay={{
          caption: "PROJECT • 07",
          heading: "Che cos'è il Calcio Storico?",
          paragraphs: ["A Firenze, dal tardo medioevo, i nobili cavalieri scendono in campo in sfarzose livree colorate. Non è una semplice partita, ma la rievocazione storica della sfida lanciata ai nemici che assediavano la città il 17 febbraio 1530. Un gioco rude, senza compromessi, praticato da fiorentini indomiti e orgogliosi per mostrare al mondo il loro valore"],
        }}
      />
      <CalcioStoricoTimeline />
    </main>
  )
}
