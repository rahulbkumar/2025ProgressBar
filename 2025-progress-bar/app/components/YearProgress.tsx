"use client"

import { useEffect, useState } from "react"
import { format, addHours } from "date-fns"
import { motion, useAnimation } from "framer-motion"

export default function YearProgress() {
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("")
  const controls = useAnimation()

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date()
      const start = new Date(2025, 0, 1)
      const end = new Date(2026, 0, 1)
      const totalDuration = end.getTime() - start.getTime()
      const elapsed = now.getTime() - start.getTime()
      return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100))
    }

    const updateProgress = () => {
      const newProgress = calculateProgress()
      setProgress(newProgress)
      controls.start({ width: `${newProgress}%` })
    }

    const updateTime = () => {
      const utcDate = new Date()
      const estDate = addHours(utcDate, -5)
      setCurrentTime(format(estDate, "MMMM d, yyyy HH:mm:ss 'EST'"))
    }

    updateProgress()
    updateTime()

    const progressInterval = setInterval(updateProgress, 1000)
    const timeInterval = setInterval(updateTime, 1000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(timeInterval)
    }
  }, [controls])

  return (
    <div className="w-full max-w-2xl px-4">
      <h1 className="mb-4 text-center text-3xl font-bold text-white glow-text font-orbitron">2025 PROGRESS</h1>
      <div className="relative h-12 rounded-full bg-gray-900 shadow-lg overflow-hidden glow-border">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white opacity-20"
          initial={{ width: 0 }}
          animate={controls}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full bg-white opacity-40"
          initial={{ width: 0 }}
          animate={controls}
          transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.1 }}
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <motion.span
            className="text-white font-bold text-lg glow-text font-share-tech-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {progress.toFixed(2)}%
          </motion.span>
        </div>
      </div>
      <motion.p
        className="mt-4 text-center text-lg text-gray-300 glow-text font-orbitron"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        TIME FLIES! MAKE THE MOST OF IT.
      </motion.p>
      <motion.p
        className="mt-2 text-center text-md text-gray-400 font-share-tech-mono glow-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {currentTime}
      </motion.p>
    </div>
  )
}

