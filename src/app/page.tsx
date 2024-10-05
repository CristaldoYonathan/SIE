'use client'

import React, { useState, useRef, useEffect } from 'react'
import { AlertTriangle, Volume2, Bell, Info, CheckCircle, Flame, Waves } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

export default function EvacuationApp() {
    const [accessibilityMode] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [locationSent, setLocationSent] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showProtocol, setShowProtocol] = useState(false)
    const [catastropheType, setCatastropheType] = useState<'sismo' | 'incendio' | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            const handleEnded = () => {
                setIsPlaying(false)
                audio.currentTime = 0
            }
            audio.addEventListener('ended', handleEnded)
            return () => {
                audio.removeEventListener('ended', handleEnded)
            }
        }
    }, [])

    const playJingle = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
                setIsPlaying(false)
            } else {
                audioRef.current.volume = 1
                audioRef.current.play().catch(error => {
                    console.error("Error al reproducir el audio:", error)
                    setIsPlaying(false)
                })
                setIsPlaying(true)
            }
        }
    }

    const sendLocation = () => {
        setLocationSent(true)
        setTimeout(() => setLocationSent(false), 3000)
    }

    const showCatastropheAlert = () => {
        const randomCatastrophe = Math.random() < 0.5 ? 'sismo' : 'incendio'
        setCatastropheType(randomCatastrophe)
        setShowAlert(true)
    }

    const showEvacuationProtocol = () => {
        const randomCatastrophe = Math.random() < 0.5 ? 'sismo' : 'incendio'
        setCatastropheType(randomCatastrophe)
        setShowProtocol(true)
    }

    const getProtocolSteps = (type: 'sismo' | 'incendio') => {
        if (type === 'sismo') {
            return [
                "Mantén la calma y no corras.",
                "Aléjate de ventanas y objetos que puedan caer.",
                "Ubícate en zonas de seguridad marcadas.",
                "Espera a que el temblor termine antes de evacuar.",
                "Sigue las instrucciones del personal de emergencia.",
                "Utiliza las escaleras, no los ascensores.",
                "Dirígete al punto de reunión designado."
            ]
        } else {
            return [
                "Mantén la calma y activa la alarma de incendios.",
                "Si hay humo, gatea cerca del suelo para evitar inhalarlo.",
                "Toca las puertas antes de abrirlas para detectar calor.",
                "Utiliza las escaleras de emergencia, no los ascensores.",
                "Sigue las rutas de evacuación marcadas.",
                "No regreses al edificio por ningún motivo.",
                "Reúnete en el punto de encuentro designado."
            ]
        }
    }

    return (
        <div className={`h-screen flex flex-col bg-gray-100 ${accessibilityMode ? 'text-xl' : 'text-base'}`}>
            <header className="bg-primary text-primary-foreground p-2 flex justify-center items-center">
                <h1 className="text-lg sm:text-xl font-bold">SISTEMA DE EVACUACIÓN</h1>
            </header>

            <div className="bg-warning text-warning-foreground p-2 text-center text-xs sm:text-sm" role="alert">
                <AlertTriangle className="inline-block mr-2 h-4 w-4" />
                Alerta de evacuación en progreso
            </div>

            <main className="flex-grow flex flex-col p-2 overflow-hidden">
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2 h-full">
                    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-2 flex flex-col">
                        <h2 className="text-sm font-semibold mb-1">Ruta de evacuación</h2>
                        <div className="flex-grow flex items-center justify-center">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                <rect x="10" y="10" width="180" height="180" fill="none" stroke="black" strokeWidth="2"/>
                                <rect x="20" y="20" width="70" height="70" fill="white" stroke="black"/>
                                <rect x="110" y="20" width="70" height="70" fill="white" stroke="black"/>
                                <rect x="20" y="110" width="70" height="70" fill="white" stroke="black"/>
                                <rect x="110" y="110" width="70" height="70" fill="white" stroke="black"/>
                                <rect x="95" y="20" width="10" height="160" fill="lightgray"/>
                                <rect x="20" y="95" width="160" height="10" fill="lightgray"/>
                                <rect x="90" y="180" width="20" height="10" fill="green"/>
                                <text x="100" y="195" textAnchor="middle" fill="black" fontSize="8">SALIDA</text>
                                <path d="M55 55 L55 100 L100 100 L100 185" fill="none" stroke="red" strokeWidth="2" strokeDasharray="5,5"/>
                                <circle cx="55" cy="55" r="5" fill="blue"/>
                                <text x="55" y="45" textAnchor="middle" fill="black" fontSize="8">Usted está aquí</text>
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 content-start">
                        <Button
                            className="h-12 sm:h-16 text-xs sm:text-sm relative"
                            variant="destructive"
                            onClick={sendLocation}
                            disabled={locationSent}
                        >
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            {locationSent ? "Ubicación enviada" : "Enviar ubicación"}
                            {locationSent && (
                                <CheckCircle className="absolute top-1 right-1 h-4 w-4 text-green-500" />
                            )}
                        </Button>
                        <Button
                            className="h-12 sm:h-16 text-xs sm:text-sm"
                            variant={isPlaying ? "default" : "secondary"}
                            onClick={playJingle}
                        >
                            <Volume2 className="mr-1 h-4 w-4" />
                            {isPlaying ? "Detener" : "Jingle"}
                        </Button>
                        <Button
                            className="h-12 sm:h-16 text-xs sm:text-sm"
                            variant="outline"
                            onClick={showCatastropheAlert}
                        >
                            <Bell className="mr-1 h-4 w-4" />
                            ¿Qué pasa?
                        </Button>
                        <Button
                            className="h-12 sm:h-16 text-xs sm:text-sm"
                            variant="outline"
                            onClick={showEvacuationProtocol}
                        >
                            <Info className="mr-1 h-4 w-4" />
                            ¿Qué hago?
                        </Button>
                    </div>
                </div>
            </main>

            <audio ref={audioRef} src="/camino_verde.mp3" />

            <Dialog open={showAlert} onOpenChange={setShowAlert}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-center text-xl sm:text-2xl font-bold">
                            {catastropheType === 'sismo' ? (
                                <>
                                    <Waves className="mr-2 h-6 w-6 text-blue-500" />
                                    Alerta de Sismo
                                </>
                            ) : (
                                <>
                                    <Flame className="mr-2 h-6 w-6 text-red-500" />
                                    Alerta de Incendio
                                </>
                            )}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-center text-sm sm:text-base">
                        {catastropheType === 'sismo' ? (
                            "Se ha detectado actividad sísmica. Por favor, siga el protocolo de evacuación para sismos."
                        ) : (
                            "Se ha detectado un incendio. Por favor, siga el protocolo de evacuación para incendios."
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            <Dialog open={showProtocol} onOpenChange={setShowProtocol}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-center text-xl sm:text-2xl font-bold">
                            {catastropheType === 'sismo' ? (
                                <>
                                    <Waves className="mr-2 h-6 w-6 text-blue-500" />
                                    Protocolo de Evacuación: Sismo
                                </>
                            ) : (
                                <>
                                    <Flame className="mr-2 h-6 w-6 text-red-500" />
                                    Protocolo de Evacuación: Incendio
                                </>
                            )}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-sm sm:text-base">
                        <ul className="list-decimal pl-5 space-y-2">
                            {getProtocolSteps(catastropheType || 'sismo').map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}