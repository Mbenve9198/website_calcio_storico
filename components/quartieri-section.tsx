"use client"

import { useState } from "react"
import { ThreeDPhotoCarousel, QuartiereData } from "@/components/ui/3d-carousel"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

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
    <div className="w-full bg-white dark:bg-neutral-950 font-sans py-16 md:py-24 lg:py-32">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 text-center mb-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-black dark:text-white leading-tight tracking-tight drop-shadow-lg">
          I Quartieri del Calcio Storico
        </h1>
        <h2 className="text-sm md:text-base lg:text-lg font-semibold text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed tracking-wide">
          Il torneo moderno vede sfidarsi i quattro quartieri storici di Firenze, ognuno con i propri colori e il proprio simbolo.
        </h2>
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

      {/* Dialog per informazioni quartiere */}
      <Dialog open={!!selectedQuartiere} onOpenChange={closeDialog}>
        <DialogContent className="w-[95vw] max-w-2xl h-[85vh] max-h-[85vh] p-0 mx-auto overflow-hidden">
          <div className="flex flex-col h-full">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-xl md:text-2xl font-bold">
                {selectedQuartiere?.nome}
              </DialogTitle>
            </DialogHeader>
            
            {selectedQuartiere && (
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-6" style={{WebkitOverflowScrolling: 'touch'}}>
                <div className="space-y-6">
              {/* Immagine del quartiere */}
              <div className="w-full">
                <img
                  src={selectedQuartiere.immagine}
                  alt={selectedQuartiere.nome}
                  className="rounded-lg object-cover w-full h-48 md:h-64 shadow-lg"
                  onError={(e) => {
                    console.error('Errore caricamento immagine:', selectedQuartiere.immagine);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Immagine caricata con successo:', selectedQuartiere.immagine);
                  }}
                />
              </div>

              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary" 
                  className={`
                    px-3 py-1 text-white font-medium
                    ${selectedQuartiere.nome.includes('Azzurri') ? 'bg-blue-500' : ''}
                    ${selectedQuartiere.nome.includes('Bianchi') ? 'bg-gray-500' : ''}
                    ${selectedQuartiere.nome.includes('Rossi') ? 'bg-red-500' : ''}
                    ${selectedQuartiere.nome.includes('Verdi') ? 'bg-green-500' : ''}
                  `}
                >
                  Colore: {selectedQuartiere.colore}
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedQuartiere.simbolo}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Descrizione</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedQuartiere.descrizione}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Storia del Quartiere</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedQuartiere.storia}
                </p>
              </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>


    </div>
  )
} 