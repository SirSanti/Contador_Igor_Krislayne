import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Heart, Music, ChevronLeft, ChevronRight, Play, Pause, Calendar, Clock, Sparkles, Star } from 'lucide-react'
import casalFoto from './assets/casal-foto.jpg'
import foto1 from './assets/foto1.jpg'
import foto2 from './assets/foto2.jpg'
import foto3 from './assets/foto3.jpg'
import foto4 from './assets/foto4.jpg'
import foto5 from './assets/foto5.jpg'
import foto6 from './assets/foto6.jpg'
import foto7 from './assets/foto7.jpg'
import foto8 from './assets/foto8.jpg'
import foto9 from './assets/foto9.jpg'
import foto10 from './assets/foto10.jpg'
import heartsBg from './assets/hearts-bg.jpg'
import romanticBg from './assets/romantic-bg.jpg'
import coupleSilhouette from './assets/couple-silhouette.jpg'
import './App.css'

function App() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSpecialMessage, setShowSpecialMessage] = useState(false)
  const [heartParticles, setHeartParticles] = useState([])
  const audioRef = useRef(null)

  // Data de início do relacionamento: 16 de maio de 2024
  const startDate = new Date(2024, 4, 16) // Mês 4 = maio (0-indexado)

  // Fotos do casal e backgrounds românticos
  const photos = [
    { src: casalFoto, alt: "Igor e Krislayne - Foto Original", type: "photo" },
    { src: foto1, alt: "Igor e Krislayne na Praia", type: "photo" },
    { src: foto2, alt: "Igor e Krislayne - Momento Carinhoso", type: "photo" },
    { src: foto3, alt: "Igor e Krislayne - Beijo no Coração", type: "photo" },
    { src: foto4, alt: "Igor e Krislayne na Praia", type: "photo" },
    { src: foto5, alt: "Igor e Krislayne - Selfie Romântica", type: "photo" },
    { src: foto6, alt: "Igor e Krislayne - Noite Especial", type: "photo" },
    { src: foto7, alt: "Igor e Krislayne - Sorrisos", type: "photo" },
    { src: foto8, alt: "Igor e Krislayne em Casa", type: "photo" },
    { src: foto9, alt: "Igor e Krislayne - Look Combinando", type: "photo" },
    { src: foto10, alt: "Igor e Krislayne - Elegantes", type: "photo" },
    { src: heartsBg, alt: "Corações Românticos", type: "background" },
    { src: romanticBg, alt: "Fundo Romântico", type: "background" },
    { src: coupleSilhouette, alt: "Silhueta do Casal", type: "background" }
  ]

  // Mensagens românticas especiais
  const specialMessages = [
    "Cada segundo ao seu lado é um presente 💝",
    "Nosso amor cresce a cada batida do coração 💓",
    "Juntos somos infinito ∞",
    "Você é minha pessoa favorita no mundo inteiro 🌍",
    "Nosso amor é a música mais bonita que já ouvi 🎵"
  ]

  // Função para calcular tempo decorrido com precisão
  const calculateTimeElapsed = () => {
    const now = new Date()
    
    let years = now.getFullYear() - startDate.getFullYear()
    let months = now.getMonth() - startDate.getMonth()
    let days = now.getDate() - startDate.getDate()
    
    // Ajustar se o dia atual é menor que o dia de início
    if (days < 0) {
      months--
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += lastMonth.getDate()
    }
    
    // Ajustar se o mês atual é menor que o mês de início
    if (months < 0) {
      years--
      months += 12
    }
    
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    
    return { years, months, days, hours, minutes, seconds }
  }

  // Função para criar partículas de coração
  const createHeartParticle = () => {
    const particle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: 100,
      size: Math.random() * 20 + 10
    }
    
    setHeartParticles(prev => [...prev, particle])
    
    setTimeout(() => {
      setHeartParticles(prev => prev.filter(p => p.id !== particle.id))
    }, 4000)
  }

  // Atualizar contador a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed())
      
      // Criar partículas de coração ocasionalmente
      if (Math.random() < 0.1) {
        createHeartParticle()
      }
    }, 1000)

    // Calcular imediatamente na primeira renderização
    setTimeElapsed(calculateTimeElapsed())

    return () => clearInterval(interval)
  }, [])

  // Auto-avançar carrossel a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [photos.length])

  // Mostrar mensagem especial ocasionalmente
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setShowSpecialMessage(true)
        setTimeout(() => setShowSpecialMessage(false), 4000)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  // Função para tocar/pausar música
  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      // Criar efeito de partículas quando a música toca
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createHeartParticle(), i * 200)
      }
      // Simular reprodução por 5 segundos para demonstração
      setTimeout(() => {
        setIsPlaying(false)
      }, 5000)
    }
  }

  // Navegação do carrossel
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const currentPhoto = photos[currentPhotoIndex]

  // Calcular total de dias juntos
  const totalDays = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen love-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Partículas de coração flutuantes */}
      {heartParticles.map(particle => (
        <div
          key={particle.id}
          className="heart-particle fixed pointer-events-none z-10"
          style={{
            left: `${particle.x}%`,
            bottom: `${particle.y}%`,
            fontSize: `${particle.size}px`
          }}
        >
          ❤️
        </div>
      ))}

      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-white pulse-glow glow-border relative">
        {/* Cabeçalho com nomes melhorado */}
        <div className="text-center mb-8 bounce-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-10 h-10 text-red-400 heartbeat" />
            <h1 className="text-5xl font-bold romantic-title bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Igor & Krislayne
            </h1>
            <Heart className="w-10 h-10 text-red-400 heartbeat" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-pink-300" />
            <p className="text-lg opacity-90 elegant-script">
              Desde 16 de maio de 2024
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-300 sparkle" />
            <p className="text-sm opacity-80 satisfy">
              {totalDays} dias de puro amor
            </p>
            <Sparkles className="w-4 h-4 text-yellow-300 sparkle" />
          </div>
        </div>

        {/* Carrossel de fotos melhorado */}
        <div className="relative mb-8 float">
          <div className="carousel-container aspect-square">
            <img 
              src={currentPhoto.src} 
              alt={currentPhoto.alt}
              className={`carousel-image w-full h-full transition-all duration-700 ${
                currentPhoto.type === 'photo' ? 'object-cover' : 'object-cover'
              }`}
            />
            
            {/* Overlay para backgrounds */}
            {currentPhoto.type === 'background' && (
              <div className="absolute inset-0 carousel-overlay flex items-center justify-center">
                <div className="text-center special-moment">
                  <Heart className="w-20 h-20 text-red-400 mx-auto mb-6 heartbeat" />
                  <h2 className="text-3xl font-bold romantic-title mb-2">Igor ❤️ Krislayne</h2>
                  <p className="text-lg opacity-90 elegant-script">Amor Eterno</p>
                  <div className="flex justify-center gap-2 mt-4">
                    <Star className="w-6 h-6 text-yellow-300 sparkle" />
                    <Star className="w-6 h-6 text-yellow-300 sparkle" />
                    <Star className="w-6 h-6 text-yellow-300 sparkle" />
                  </div>
                </div>
              </div>
            )}

            {/* Contador de fotos melhorado */}
            <div className="absolute top-4 right-4 bg-black/60 rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </div>
          
          {/* Controles do carrossel melhorados */}
          <button 
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 carousel-controls bg-black/40 hover:bg-black/70 rounded-full p-3 transition-all hover-lift"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button 
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 carousel-controls bg-black/40 hover:bg-black/70 rounded-full p-3 transition-all hover-lift"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Indicadores do carrossel melhorados */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-xs overflow-x-auto bg-black/30 rounded-full px-3 py-2 backdrop-blur-sm">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`carousel-indicator w-3 h-3 transition-all flex-shrink-0 ${
                  index === currentPhotoIndex ? 'active' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contador de tempo melhorado */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="counter-card rounded-2xl p-4 text-center hover-lift">
            <div className="text-3xl font-bold pacifico text-pink-100">{timeElapsed.years}</div>
            <div className="text-sm opacity-90 elegant-script">
              {timeElapsed.years === 1 ? 'ano' : 'anos'}
            </div>
          </div>
          
          <div className="counter-card rounded-2xl p-4 text-center hover-lift">
            <div className="text-3xl font-bold pacifico text-pink-100">{timeElapsed.months}</div>
            <div className="text-sm opacity-90 elegant-script">
              {timeElapsed.months === 1 ? 'mês' : 'meses'}
            </div>
          </div>
          
          <div className="counter-card rounded-2xl p-4 text-center hover-lift">
            <div className="text-3xl font-bold pacifico text-pink-100">{timeElapsed.days}</div>
            <div className="text-sm opacity-90 elegant-script">
              {timeElapsed.days === 1 ? 'dia' : 'dias'}
            </div>
          </div>
          
          <div className="counter-card rounded-2xl p-4 text-center hover-lift">
            <div className="text-3xl font-bold pacifico text-pink-100">{timeElapsed.hours}</div>
            <div className="text-sm opacity-90 elegant-script">
              {timeElapsed.hours === 1 ? 'hora' : 'horas'}
            </div>
          </div>
          
          <div className="counter-card rounded-2xl p-4 text-center hover-lift">
            <div className="text-3xl font-bold pacifico text-pink-100">{timeElapsed.minutes}</div>
            <div className="text-sm opacity-90 elegant-script">
              {timeElapsed.minutes === 1 ? 'minuto' : 'minutos'}
            </div>
          </div>
          
          <div className="counter-card rounded-2xl p-4 text-center hover-lift">
            <div className="text-3xl font-bold pacifico animate-pulse text-pink-100">{timeElapsed.seconds}</div>
            <div className="text-sm opacity-90 elegant-script">
              {timeElapsed.seconds === 1 ? 'segundo' : 'segundos'}
            </div>
          </div>
        </div>

        {/* Mensagem especial */}
        {showSpecialMessage && (
          <div className="romantic-message text-center mb-6 special-moment">
            <p className="text-lg elegant-script text-pink-100">
              {specialMessages[Math.floor(Math.random() * specialMessages.length)]}
            </p>
          </div>
        )}

        {/* Botão Nossa Música melhorado */}
        <div className="text-center">
          <Button 
            onClick={toggleMusic}
            className={`w-full py-6 text-lg font-semibold rounded-2xl music-button elegant-script transition-all ${
              isPlaying ? 'playing' : ''
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-6 h-6 mr-3" />
                Tocando Nossa Música...
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-3" />
                🎵 Nossa Música Especial
              </>
            )}
          </Button>
          
          {isPlaying && (
            <div className="mt-4 p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-white/20 bounce-in">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Music className="w-5 h-5 text-green-400" />
                <p className="text-lg font-medium elegant-script text-green-100">
                  "É Por Você Que Canto" - Leandro & Leonardo
                </p>
              </div>
              <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                <div className="bg-green-400 h-2 rounded-full shimmer" style={{width: '35%'}}></div>
              </div>
              <p className="text-sm mt-2 opacity-80 satisfy">
                Uma música especial para um amor especial ❤️
              </p>
            </div>
          )}
        </div>

        {/* Player de música oculto */}
        <audio ref={audioRef} style={{display: 'none'}}>
          {/* Aqui seria adicionado o arquivo de áudio */}
        </audio>

        {/* Estatísticas do relacionamento */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="romantic-message">
            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-300" />
            <p className="text-sm font-semibold satisfy">Tempo Total</p>
            <p className="text-xs opacity-80">
              {Math.floor(totalDays * 24)} horas juntos
            </p>
          </div>
          <div className="romantic-message">
            <Heart className="w-6 h-6 mx-auto mb-2 text-red-300 heartbeat" />
            <p className="text-sm font-semibold satisfy">Batimentos</p>
            <p className="text-xs opacity-80">
              ∞ corações apaixonados
            </p>
          </div>
        </div>

        {/* Mensagem romântica no rodapé */}
        <div className="text-center mt-6 opacity-90">
          <p className="text-sm belle-aurore leading-relaxed">
            "O tempo pode passar, mas nosso amor só cresce a cada segundo que vivemos juntos" 💖
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

