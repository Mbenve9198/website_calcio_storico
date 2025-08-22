"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { QuartiereData } from "@/components/ui/3d-carousel"
import { useEffect } from "react"

interface QuartiereDialogProps {
  quartiere: QuartiereData | null
  isOpen: boolean
  onClose: () => void
}

export function QuartiereDialog({ quartiere, isOpen, onClose }: QuartiereDialogProps) {
  // Blocca lo scroll della pagina quando il dialog è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup quando il componente viene smontato
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!quartiere) return null

  const getQuartiereColor = (nome: string) => {
    if (nome.includes('Azzurri')) return 'from-blue-500 to-blue-600'
    if (nome.includes('Bianchi')) return 'from-gray-400 to-gray-500'
    if (nome.includes('Rossi')) return 'from-red-500 to-red-600'
    if (nome.includes('Verdi')) return 'from-green-500 to-green-600'
    return 'from-blue-500 to-blue-600'
  }

  const getQuartiereBadgeColor = (nome: string) => {
    if (nome.includes('Azzurri')) return 'bg-blue-600'
    if (nome.includes('Bianchi')) return 'bg-gray-600'
    if (nome.includes('Rossi')) return 'bg-red-600'
    if (nome.includes('Verdi')) return 'bg-green-600'
    return 'bg-blue-600'
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
              className="w-full max-w-2xl max-h-[90vh] bg-[#f8f9fa] rounded-2xl border-4 border-black 
                         shadow-[8px_8px_0px_0px_rgba(0,0,0,0.9)] overflow-hidden relative"
            >
              {/* Header con Gradient */}
              <div className={`bg-gradient-to-r ${getQuartiereColor(quartiere.nome)} p-6 relative`}>
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
                  {quartiere.nome}
                </motion.h2>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  className={`inline-block px-3 py-1 ${getQuartiereBadgeColor(quartiere.nome)} 
                           text-white font-black text-sm rounded-lg border-2 border-black
                           shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]`}
                >
                  {quartiere.simbolo}
                </motion.div>
              </div>

              {/* Scrollable Content */}
              <div className="max-h-[calc(90vh-200px)] overflow-y-auto overflow-x-hidden p-6 space-y-6 
                            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                   style={{ 
                     WebkitOverflowScrolling: 'touch',
                     scrollbarWidth: 'thin',
                     scrollbarColor: '#9ca3af #f3f4f6'
                   }}>
                
                {/* Immagine */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full"
                >
                  <div className="relative rounded-xl border-4 border-black overflow-hidden
                                shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
                    <img
                      src={quartiere.immagine}
                      alt={quartiere.nome}
                      className="w-full h-48 md:h-64 object-cover"
                      onError={(e) => {
                        console.error('Errore caricamento immagine:', quartiere.immagine);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>

                {/* Descrizione */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl p-4 border-3 border-black
                           shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
                >
                  <h3 className="text-lg font-black text-slate-800 mb-3 
                               bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded-lg
                               border-2 border-black inline-block">
                    Descrizione
                  </h3>
                  <p className="text-gray-700 font-semibold leading-relaxed">
                    {quartiere.descrizione}
                  </p>
                </motion.div>

                {/* Storia */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-xl p-4 border-3 border-black
                           shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]"
                >
                  <h3 className="text-lg font-black text-slate-800 mb-3
                               bg-gradient-to-r from-green-200 to-green-300 px-2 py-1 rounded-lg
                               border-2 border-black inline-block">
                    Storia del Quartiere
                  </h3>
                  <p className="text-gray-700 font-semibold leading-relaxed">
                    {quartiere.storia}
                  </p>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "6px_6px_0px_0px_rgba(0,0,0,0.9)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 bg-gradient-to-r ${getQuartiereColor(quartiere.nome)}
                             text-white font-black rounded-xl border-3 border-black
                             shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-all
                             hover:translate-x-[-1px] hover:translate-y-[-1px]`}
                  >
                    SCOPRI QUESTO QUARTIERE →
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 