"use client"

import { PricingContainer } from "@/components/ui/pricing-container";

interface PricingPlan {
    name: string;
    price: number;
    features: string[];
    isPopular?: boolean;
    accent: string;
    description: string;
}

const CALCIO_STORICO_PLANS: PricingPlan[] = [
    {
        name: "Esperienza Storica",
        price: 89,
        description: "L'esperienza completa per conoscere il Calcio Storico",
        features: [
            "Introduzione storica immersiva",
            "Visita museo costumi del Corteo",
            "Dimostrazione sbandieratori privata",
            "Accesso sede quartiere storico",
            "Guida esperta per 3 ore",
            "Materiale storico-informativo"
        ],
        isPopular: false,
        accent: "bg-blue-600"
    },
    {
        name: "Calciante per un Giorno",
        price: 159,
        description: "Vivi l'emozione di diventare un vero calciante fiorentino",
        features: [
            "Tutto dell'Esperienza Storica",
            "Allenamento con veri calcianti",
            "Costume d'epoca personalizzato",
            "Sessione fotografica professionale",
            "Certificato di partecipazione",
            "Video ricordo dell'esperienza",
            "Aperitivo post-allenamento"
        ],
        isPopular: true,
        accent: "bg-red-600"
    }
];

export function CalcioStoricoPricing() {
    return (
        <div className="w-full py-16 md:py-24 lg:py-32">
            <PricingContainer
                title="Vivi la Leggenda"
                plans={CALCIO_STORICO_PLANS}
                className="bg-transparent"
            />
        </div>
    );
} 