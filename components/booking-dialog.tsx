"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CalendarIcon, Users, Package, ShoppingCart, Plus, Minus } from "lucide-react"
import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"

interface BookingDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedPackage?: {
    name: string
    price: number
    description: string
    accent: string
  }
}

interface BookingData {
  selectedDate: Date | undefined
  numberOfPeople: number
  selectedPackage: string
  totalPrice: number
}

const PACKAGES = [
  {
    name: "Esperienza Storica",
    price: 89,
    description: "L'esperienza completa per conoscere il Calcio Storico",
    accent: "bg-blue-600"
  },
  {
    name: "Calciante per un Giorno",
    price: 159,
    description: "Vivi l'emozione di diventare un vero calciante fiorentino",
    accent: "bg-red-600"
  }
]

export function BookingDialog({ isOpen, onClose, selectedPackage }: BookingDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: undefined,
    numberOfPeople: 2,
    selectedPackage: selectedPackage?.name || PACKAGES[0].name,
    totalPrice: 0
  })

  // Blocca lo scroll della pagina quando il dialog è aperto
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  // Calcola il prezzo totale
  useEffect(() => {
    const selectedPkg = PACKAGES.find(pkg => pkg.name === bookingData.selectedPackage)
    if (selectedPkg) {
      setBookingData(prev => ({
        ...prev,
        totalPrice: selectedPkg.price * prev.numberOfPeople
      }))
    }
  }, [bookingData.selectedPackage, bookingData.numberOfPeople])

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }



  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-black text-slate-800 mb-2">Seleziona la Data</h3>
              <p className="text-gray-600">Scegli quando vuoi vivere l'esperienza</p>
            </div>
            
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={bookingData.selectedDate}
                onSelect={(date) => setBookingData(prev => ({ ...prev, selectedDate: date }))}
                disabled={(date) => date < new Date()}
                className="rounded-lg border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] p-4 bg-white"
              />
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-black text-slate-800 mb-2">Numero di Persone</h3>
              <p className="text-gray-600">Quanti parteciperanno all'esperienza?</p>
            </div>
            
            <div className="flex items-center justify-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setBookingData(prev => ({ 
                  ...prev, 
                  numberOfPeople: Math.max(1, prev.numberOfPeople - 1) 
                }))}
                className="w-12 h-12 bg-red-500 text-white rounded-full border-2 border-black
                         shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] flex items-center justify-center
                         hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-all"
              >
                <Minus size={20} />
              </motion.button>
              
              <div className="text-4xl font-black text-slate-800 min-w-[80px] text-center">
                {bookingData.numberOfPeople}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setBookingData(prev => ({ 
                  ...prev, 
                  numberOfPeople: Math.min(10, prev.numberOfPeople + 1) 
                }))}
                className="w-12 h-12 bg-green-500 text-white rounded-full border-2 border-black
                         shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] flex items-center justify-center
                         hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-all"
              >
                <Plus size={20} />
              </motion.button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              Minimo 1 persona, massimo 10 persone
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-black text-slate-800 mb-2">Scegli il Pacchetto</h3>
              <p className="text-gray-600">Seleziona l'esperienza che preferisci</p>
            </div>
            
            <div className="space-y-4">
              {PACKAGES.map((pkg) => (
                <motion.button
                  key={pkg.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBookingData(prev => ({ ...prev, selectedPackage: pkg.name }))}
                  className={`w-full p-4 rounded-xl border-3 border-black text-left transition-all
                    ${bookingData.selectedPackage === pkg.name 
                      ? `${pkg.accent} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]` 
                      : 'bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-lg mb-1">{pkg.name}</h4>
                      <p className={`text-sm ${bookingData.selectedPackage === pkg.name ? 'text-white/90' : 'text-gray-600'}`}>
                        {pkg.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black">€{pkg.price}</div>
                      <div className="text-sm opacity-75">per persona</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )
      
      case 4:
        const selectedPkg = PACKAGES.find(pkg => pkg.name === bookingData.selectedPackage)
        return (
          <div className="space-y-6">
            <div className="text-center">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-black text-slate-800 mb-2">Riepilogo Prenotazione</h3>
              <p className="text-gray-600">Controlla i dettagli prima di confermare</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
                  <span className="font-bold text-gray-700">Data:</span>
                  <span className="font-black text-slate-800">
                    {bookingData.selectedDate ? formatDate(bookingData.selectedDate.toISOString().split('T')[0]) : 'Nessuna data selezionata'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
                  <span className="font-bold text-gray-700">Persone:</span>
                  <span className="font-black text-slate-800">{bookingData.numberOfPeople}</span>
                </div>
                
                <div className="flex justify-between items-center border-b-2 border-gray-200 pb-3">
                  <span className="font-bold text-gray-700">Pacchetto:</span>
                  <span className="font-black text-slate-800">{bookingData.selectedPackage}</span>
                </div>
                
                <div className="flex justify-between items-center text-xl font-black">
                  <span className="text-slate-800">Totale:</span>
                  <span className="text-green-600">€{bookingData.totalPrice}</span>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white 
                       font-black text-lg rounded-xl border-3 border-black
                       shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]
                       hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)] transition-all"
            >
              CONFERMA E PAGA €{bookingData.totalPrice}
            </motion.button>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{
                type: "spring",
                duration: 0.5,
                bounce: 0.3
              }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[90vh] bg-[#f8f9fa] rounded-2xl border-4 border-black 
                         shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] overflow-hidden relative"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 relative">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full border-2 border-black
                           shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] flex items-center justify-center
                           hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-all"
                >
                  <X size={16} className="text-black font-bold" />
                </motion.button>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl font-black text-white pr-12 mb-2
                           drop-shadow-[2px_2px_0px_rgba(0,0,0,0.9)]"
                >
                  Prenota la tua Esperienza
                </motion.h2>

                {/* Step Indicator */}
                <div className="flex space-x-2 mt-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-2 rounded-full transition-all ${
                        step <= currentStep ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                {renderStep()}
              </div>

              {/* Navigation */}
              <div className="p-6 border-t-3 border-black bg-gray-50 flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl border-2 border-black font-black transition-all
                    ${currentStep === 1 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]'
                    }`}
                >
                  ← Indietro
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !bookingData.selectedDate) ||
                    (currentStep === 4)
                  }
                  className={`px-6 py-3 rounded-xl border-2 border-black font-black transition-all
                    ${(currentStep === 1 && !bookingData.selectedDate) || currentStep === 4
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]'
                    }`}
                >
                  {currentStep === 4 ? 'Completato' : 'Avanti →'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 