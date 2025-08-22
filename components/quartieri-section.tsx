"use client"

import { useState } from "react"
import { ThreeDPhotoCarousel, QuartiereData } from "@/components/ui/3d-carousel"
import { QuartiereDialog } from "@/components/quartiere-dialog"

export function QuartieriSection() {
  const [selectedQuartiere, setSelectedQuartiere] = useState<QuartiereData | null>(null)

  const quartieri: QuartiereData[] = [
    {
      nome: "Azzurri di Santa Croce",
      colore: "Azzurro",
      descrizione: "Gli Azzurri rappresentano il quartiere di Santa Croce, la cui piazza omonima è il campo di gioco della finale. Il loro stemma è caratterizzato da una croce gialla su sfondo azzurro.",
      simbolo: "Croce gialla su sfondo azzurro",
      storia: "Il quartiere di Santa Croce è legato all'omonima basilica francescana, una delle più importanti di Firenze. La piazza antistante è tradizionalmente il teatro della finale del Calcio Storico, rendendo questo quartiere il 'padrone di casa' dell'evento più importante dell'anno.",
      immagine: "/Santa-Croce-.jpg"
    },
    {
      nome: "Bianchi di Santo Spirito",
      colore: "Bianco", 
      descrizione: "I Bianchi scendono in campo per il quartiere di Santo Spirito. Il loro simbolo è una colomba bianca, rappresentazione dello Spirito Santo, con raggi dorati su sfondo bianco.",
      simbolo: "Colomba bianca con raggi dorati",
      storia: "Santo Spirito rappresenta l'Oltrarno fiorentino, la zona 'oltre l'Arno' che mantiene ancora oggi un carattere più popolare e autentico. La basilica di Santo Spirito, progettata da Brunelleschi, è il cuore pulsante di questo quartiere ricco di tradizioni artigianali.",
      immagine: "/santospirito.jpg"
    },
    {
      nome: "Rossi di Santa Maria Novella", 
      colore: "Rosso",
      descrizione: "I Rossi combattono per il quartiere di Santa Maria Novella. Sono caratterizzati dal colore rosso e il loro stemma è un sole dorato con volto umano su campo rosso.",
      simbolo: "Sole dorato con volto umano",
      storia: "Santa Maria Novella è il quartiere che accoglie i viaggiatori che arrivano a Firenze, essendo sede della stazione ferroviaria principale. La basilica domenicana che dà il nome al quartiere è famosa per la sua facciata in marmi policromi e per i capolavori artistici che custodisce.",
      immagine: "/santamarianovella.jpg"
    },
    {
      nome: "Verdi di San Giovanni",
      colore: "Verde",
      descrizione: "I Verdi rappresentano il quartiere di San Giovanni. Il simbolo che li identifica è una raffigurazione del Battistero di San Giovanni su sfondo verde.",
      simbolo: "Battistero di San Giovanni",
      storia: "San Giovanni è il cuore religioso e civile di Firenze, sede del Duomo, del Battistero e del Palazzo Arcivescovile. Il Battistero di San Giovanni, con le sue celebri porte del Paradiso del Ghiberti, è uno dei monumenti più amati dai fiorentini e simbolo di identità cittadina.",
      immagine: "/sangiovanni.jpeg"
    }
  ]

  const stemmi = [
    "/azzurri.png",
    "/bianchi.png", 
    "/rossi.png",
    "/verdi.png"
  ]

  const handleQuartiereClick = (quartiere: QuartiereData) => {
    setSelectedQuartiere(quartiere)
  }

  const closeDialog = () => {
    setSelectedQuartiere(null)
  }

  return (
    <div className="w-full bg-[#f0f0f0] font-sans py-16 md:py-24 lg:py-32">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 text-center mb-16">
        <div className="inline-block mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 
              bg-gradient-to-r from-white to-gray-100 px-6 py-3 rounded-xl border-4 border-black
              shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9),_12px_12px_12px_-3px_rgba(0,0,0,0.1)]
              transform transition-transform hover:translate-x-1 hover:translate-y-1 mb-3 relative
              before:absolute before:inset-0 before:bg-white/50 before:rounded-xl before:blur-sm before:-z-10">
            I Quartieri del Calcio Storico
          </h1>
          <div className="h-2 bg-gradient-to-r from-red-600 via-blue-600 to-green-600 rounded-full" />
        </div>
        <p className="text-sm md:text-base font-bold text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Il torneo moderno vede sfidarsi i quattro quartieri storici di Firenze, ognuno con i propri colori e il proprio simbolo.
        </p>
      </div>

      {/* 3D Carousel */}
      <div className="max-w-6xl mx-auto px-4">
        <ThreeDPhotoCarousel 
          cards={stemmi}
          quartieri={quartieri}
          onQuartiereClick={handleQuartiereClick}
        />
      </div>

      {/* Istruzioni per l'utente */}
      <div className="text-center mt-8 px-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
          Il carosello ruota automaticamente. Trascina per controllarlo manualmente e clicca su uno stemma per scoprire la storia del quartiere.
        </p>
      </div>

      {/* Nuovo Dialog Quartiere */}
      <QuartiereDialog 
        quartiere={selectedQuartiere}
        isOpen={!!selectedQuartiere}
        onClose={closeDialog}
      />


    </div>
  )
} 