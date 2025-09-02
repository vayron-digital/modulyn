"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Building2, Home } from "lucide-react"

interface ModeSwitchOverlayProps {
  mode: "trade" | "crm"
  isVisible: boolean
  onAnimationComplete: () => void
}

export function ModeSwitchOverlay({
  mode,
  isVisible,
  onAnimationComplete,
}: ModeSwitchOverlayProps) {
  const Icon = mode === "trade" ? Building2 : Home
  const text = mode === "trade" ? "Trade Association" : "Real Estate CRM"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={onAnimationComplete}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black_olive/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1.2, 1],
              opacity: [0, 1, 1]
            }}
            exit={{ 
              scale: [1, 1.2, 0],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.6, 1],
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-floral_white shadow-2xl"
          >
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 180 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative z-10">
                <Icon className="h-12 w-12 text-flame" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                exit={{ scale: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute inset-0 bg-flame/10 rounded-full"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-center"
            >
              <h2 className="text-xl font-semibold text-black_olive">
                Switching to {text}
              </h2>
              <p className="text-sm text-black_olive/60 mt-1">
                Please wait while we update your view
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
