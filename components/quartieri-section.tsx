"use client"

import { useState } from "react"
import { ThreeDPhotoCarousel, QuartiereData } from "@/components/ui/3d-carousel"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function QuartieriSection() {
  const [selectedQuartiere, setSelectedQuartiere] = useState<QuartiereData | null>(null)

  const quartieri: QuartiereData[] = [
    {
      nome: "Azzurri di Santa Croce",
      colore: "Azzurro",
      descrizione: "Gli Azzurri rappresentano il quartiere di Santa Croce, la cui piazza omonima è il campo di gioco della finale. Il loro stemma è caratterizzato da una croce gialla su sfondo azzurro.",
      simbolo: "Croce gialla su sfondo azzurro",
      storia: "Il quartiere di Santa Croce è legato all'omonima basilica francescana, una delle più importanti di Firenze. La piazza antistante è tradizionalmente il teatro della finale del Calcio Storico, rendendo questo quartiere il 'padrone di casa' dell'evento più importante dell'anno."
    },
    {
      nome: "Bianchi di Santo Spirito",
      colore: "Bianco", 
      descrizione: "I Bianchi scendono in campo per il quartiere di Santo Spirito. Il loro simbolo è una colomba bianca, rappresentazione dello Spirito Santo, con raggi dorati su sfondo bianco.",
      simbolo: "Colomba bianca con raggi dorati",
      storia: "Santo Spirito rappresenta l'Oltrarno fiorentino, la zona 'oltre l'Arno' che mantiene ancora oggi un carattere più popolare e autentico. La basilica di Santo Spirito, progettata da Brunelleschi, è il cuore pulsante di questo quartiere ricco di tradizioni artigianali."
    },
    {
      nome: "Rossi di Santa Maria Novella", 
      colore: "Rosso",
      descrizione: "I Rossi combattono per il quartiere di Santa Maria Novella. Sono caratterizzati dal colore rosso e il loro stemma è un sole dorato con volto umano su campo rosso.",
      simbolo: "Sole dorato con volto umano",
      storia: "Santa Maria Novella è il quartiere che accoglie i viaggiatori che arrivano a Firenze, essendo sede della stazione ferroviaria principale. La basilica domenicana che dà il nome al quartiere è famosa per la sua facciata in marmi policromi e per i capolavori artistici che custodisce."
    },
    {
      nome: "Verdi di San Giovanni",
      colore: "Verde",
      descrizione: "I Verdi rappresentano il quartiere di San Giovanni. Il simbolo che li identifica è una raffigurazione del Battistero di San Giovanni su sfondo verde.",
      simbolo: "Battistero di San Giovanni",
      storia: "San Giovanni è il cuore religioso e civile di Firenze, sede del Duomo, del Battistero e del Palazzo Arcivescovile. Il Battistero di San Giovanni, con le sue celebri porte del Paradiso del Ghiberti, è uno dei monumenti più amati dai fiorentini e simbolo di identità cittadina."
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
    <div className="w-full bg-white dark:bg-neutral-950 font-sans py-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 text-center mb-16">
        <h1 className="quartieri-title">
          I Quartieri del Calcio Storico
        </h1>
        <h2 className="quartieri-subtitle">
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="relative">
            <button
              onClick={closeDialog}
              className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
            <DialogTitle className="text-2xl font-bold pr-10">
              {selectedQuartiere?.nome}
            </DialogTitle>
          </DialogHeader>
          
          {selectedQuartiere && (
            <div className="space-y-6">
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
          )}
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .quartieri-title {
          margin: 0 0 1.5rem 0;
          font-size: clamp(36px, 8vw, 96px);
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -0.03em;
          text-wrap: balance;
          color: var(--foreground);
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
          text-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .quartieri-subtitle {
          margin: 0 0 2rem 0;
          font-size: clamp(16px, 3vw, 24px);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--muted-foreground);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
} 