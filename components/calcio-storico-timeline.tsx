import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function CalcioStoricoTimeline() {
  const data = [
    {
      title: "Inizia Il Viaggio",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 leading-relaxed">
            Un'introduzione storica con supporti audio-visivi per immergerti subito nell'atmosfera del 1500.
          </p>
          <div className="w-full">
            <Image
              src="/iniziailviaggio1.jpg"
              alt="Inizia il Viaggio - Introduzione storica del Calcio Storico"
              width={800}
              height={400}
              className="rounded-lg object-cover h-48 md:h-64 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "L'Arte Della Bandiera",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 leading-relaxed">
            Visiterai il museo dei costumi del Corteo Storico e assisterai a una dimostrazione privata degli sbandieratori fiorentini.
          </p>
          <div className="mb-8">
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🏛️ Museo dei Costumi del Corteo Storico
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🚩 Dimostrazione privata degli sbandieratori
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              👘 Costumi d'epoca originali
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🎭 Arte e tradizione fiorentina
            </div>
          </div>
          <div className="w-full">
            <Image
              src="/L'ARTE DELLA BANDIERA.jpg"
              alt="L'Arte Della Bandiera - Museo dei costumi e sbandieratori"
              width={800}
              height={400}
              className="rounded-lg object-cover h-48 md:h-64 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Nel Cuore Della Squadra",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 leading-relaxed">
            Varcherai le porte della sede di uno dei quattro storici quartieri, un luogo normalmente chiuso al pubblico, per respirare l'aria della competizione.
          </p>
          <div className="mb-8">
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🏰 Accesso esclusivo alle sedi storiche
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🔒 Luoghi normalmente chiusi al pubblico
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              ⚔️ Atmosfera di competizione autentica
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🏛️ I quattro quartieri storici
            </div>
          </div>
          <div className="w-full">
            <Image
              src="/NEL CUORE DELLA SQUADRA.jpg"
              alt="Nel Cuore Della Squadra - Accesso alle sedi dei quartieri"
              width={800}
              height={400}
              className="rounded-lg object-cover h-48 md:h-64 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Il Calciante",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4 leading-relaxed">
            Il momento clou. In una palestra dedicata, con veri atleti in costume d'epoca, potrai scegliere se metterti in gioco in un vero allenamento o goderti lo spettacolo.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8 leading-relaxed">
            Un'emozione unica, tra sudore e gloria.
          </p>
          <div className="mb-8">
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              💪 Allenamento con veri calcianti
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              👕 Costumi d'epoca autentici
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🏟️ Palestra dedicata al Calcio Storico
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🔥 Emozione tra sudore e gloria
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2">
              🎯 Scelta tra partecipazione attiva o spettatore
            </div>
          </div>
          <div className="w-full">
            <Image
              src="/L'ALLENAMENTO DEL CALCIANTE.jpeg"
              alt="Il Calciante - Allenamento con veri atleti in costume d'epoca"
              width={800}
              height={400}
              className="rounded-lg object-cover h-48 md:h-64 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen w-full">
      <Timeline data={data} />
    </div>
  );
} 