import React from "react";
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { Cpu, Globe, BookOpen, Palette, Layers, Leaf, ArrowUpRight, Rocket, Wind, Terminal, Printer, Sparkles, Film, Users, Heart, History, BarChart3, ShieldCheck, ArrowRight, Mail, Smartphone, Hexagon } from "lucide-react";

const SpaceshipBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform values for a 3D-like parallax effect
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.15, 0.3, 0.3, 0.15]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          y, 
          opacity,
          perspective: 1200 
        }}
        className="absolute top-[-10%] md:top-[-20%] right-[-20%] md:right-[-10%] w-[120vw] md:w-[80vw] h-[120vh] md:h-[140vh] flex items-center justify-center"
      >
        {/* Large Wireframe Spaceship Structure */}
        <div className="relative w-full h-full">
          <svg viewBox="0 0 800 1200" className="w-full h-full text-white/[0.1]">
            <defs>
              <linearGradient id="spaceshipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.05" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path 
              d="M400 50 L750 350 L750 850 L400 1150 L50 850 L50 350 Z" 
              fill="url(#spaceshipGrad)" 
              stroke="currentColor" 
              strokeWidth="1" 
            />
            <path d="M400 50 V1150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
            <path d="M50 350 H750" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
            <path d="M50 850 H750" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
            
            {/* Turbine-like structures */}
            <circle cx="400" cy="450" r="180" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 5" />
            <circle cx="400" cy="450" r="120" fill="none" stroke="currentColor" strokeWidth="0.4" />
            <circle cx="400" cy="750" r="180" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 5" />
            <circle cx="400" cy="750" r="120" fill="none" stroke="currentColor" strokeWidth="0.4" />
            
            {/* Hexagonal Grid Overlay */}
            {[...Array(6)].map((_, i) => (
              <path 
                key={i}
                d={`M${100 + i * 120} 200 L${160 + i * 120} 230 L${160 + i * 120} 300 L${100 + i * 120} 330 L${40 + i * 120} 300 L${40 + i * 120} 230 Z`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                opacity="0.5"
              />
            ))}
          </svg>
          
          {/* Floating Glowing Nodes */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 40px rgba(59,130,246,0.4)", "0 0 20px rgba(59,130,246,0.2)"],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[35%] left-[48%] w-6 h-6 rounded-full bg-blue-500/30 blur-[2px]" 
          />
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 20px rgba(16,185,129,0.2)", "0 0 40px rgba(16,185,129,0.4)", "0 0 20px rgba(16,185,129,0.2)"],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute top-[65%] left-[52%] w-8 h-8 rounded-full bg-emerald-500/30 blur-[3px]" 
          />
        </div>
      </motion.div>
    </div>
  );
};

const HighTechCard = ({ children, className = "", spotlightColor = "rgba(255,255,255,0.1)", skills = [] }: { children: React.ReactNode, className?: string, spotlightColor?: string, skills?: string[] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-20 h-full flex flex-col">
        {children}
        
        {skills.length > 0 && (
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6 md:p-10 z-30 translate-y-8 group-hover:translate-y-0">
            <div className="mb-4 md:mb-8">
              <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400 mb-1 md:mb-2">Curriculum</div>
              <h4 className="text-white font-bold uppercase tracking-[0.1em] text-[16px] md:text-[20px] leading-tight">Skills Learned</h4>
            </div>
            <div className="grid grid-cols-1 gap-2 md:gap-4">
              {skills.map((skill, i) => (
                <div 
                  key={i} 
                  className="text-white/90 text-[12px] md:text-[15px] flex items-center gap-2 md:gap-4 font-medium group-hover:translate-x-0 -translate-x-4 transition-transform duration-500"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="w-1 h-1 md:w-2 md:h-2 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)] shrink-0" />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 md:mt-10 pt-4 md:pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-blue-400/80">
                <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
                Industry Standard Certification
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  console.log('App component rendering...');
  return (
    <main className="relative min-h-screen w-full flex flex-col bg-black text-white font-sans overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      <SpaceshipBackground />
      
      {/* Floating Orbs for Innovation Sections */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-white/[0.02] blur-[120px]"
        />
        <motion.div 
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 150, -100, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-white/[0.02] blur-[150px]"
        />
      </div>

      {/* Background Video */}
      <section className="relative h-screen w-full flex flex-col shrink-0 overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />

        {/* Navigation */}
        <nav className="relative z-50 flex items-center justify-between px-6 md:px-[60px] lg:px-[120px] py-6 md:py-[20px] w-full">
          {/* Left: Menu - Removed as requested */}
          <div className="hidden md:flex flex-1" />

          {/* Center: Logo */}
          <div className="flex items-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <img 
              src="logo.png" 
              alt="CreaTech Innovation Academy" 
              className="h-20 md:h-40 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Right: Button */}
          <div className="flex justify-end flex-1">
            <button className="relative group">
              <div className="absolute inset-0 rounded-full border-[0.6px] border-white group-hover:border-white/50 transition-colors" />
              <div className="relative bg-black rounded-full px-5 md:px-[29px] py-2.5 md:py-[11px] text-[11px] md:text-[14px] font-bold uppercase tracking-widest overflow-hidden">
                <div className="button-glow" />
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Book</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-[120px] md:pt-[240px] pb-[80px] md:pb-[102px] flex-grow">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex flex-col items-center gap-6 md:gap-[40px]"
          >
            {/* Headline */}
            <h1 className="text-[36px] sm:text-[48px] md:text-[96px] font-medium leading-[1.1] max-w-[900px] text-silver">
              DESIGN. BUILD.<br />
              SHIP THE FUTURE.
            </h1>

            {/* Subtext */}
            <p className="text-[14px] md:text-[15px] font-normal text-white max-w-[680px] leading-relaxed md:mt-[-16px]">
              Hong Kong’s premier ArtTech partner providing turnkey EdTech curricula.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mt-4 w-full sm:w-auto">
              <motion.button 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('for-schools')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative group w-full sm:w-auto"
              >
                <div className="absolute inset-0 rounded-full border-[0.6px] border-white group-hover:border-white/50 transition-colors" />
                <div className="relative bg-white text-black rounded-full px-[29px] py-[11px] text-[14px] font-medium overflow-hidden">
                  <div className="button-glow !bg-black/20" />
                  For Schools
                </div>
              </motion.button>
              <motion.button 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('for-families')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative group w-full sm:w-auto"
              >
                <div className="absolute inset-0 rounded-full border-[0.6px] border-white group-hover:border-white/50 transition-colors" />
                <div className="relative bg-black/40 backdrop-blur-sm text-white rounded-full px-[29px] py-[11px] text-[14px] font-medium overflow-hidden">
                  <div className="button-glow" />
                  For Families
                </div>
              </motion.button>
              <motion.button 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('for-ngos')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative group w-full sm:w-auto"
              >
                <div className="absolute inset-0 rounded-full border-[0.6px] border-white group-hover:border-white/50 transition-colors" />
                <div className="relative bg-black/40 backdrop-blur-sm text-white rounded-full px-[29px] py-[11px] text-[14px] font-medium overflow-hidden">
                  <div className="button-glow" />
                  For NGOs and Associations
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>      {/* Combined Philosophy & Innovation Section */}
      <section id="philosophy" className="relative z-10 py-24 md:py-48 bg-black overflow-hidden border-y border-white/5">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-[60px] lg:px-[120px] relative">
          {/* Part 1: Philosophy Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 mb-32 md:mb-64 overflow-hidden rounded-2xl bg-white/[0.01] backdrop-blur-sm">
            
            {/* Vision & Mission */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8 p-10 md:p-12 relative border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/[0.02] transition-colors duration-500"
            >
              {/* Large Background Number */}
              <div className="absolute top-8 right-8 text-[120px] font-bold text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-blue-500/[0.05] transition-colors duration-700">
                01
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="text-[10px] uppercase tracking-[0.5em] text-blue-400/80 font-bold">Strategic Vision</span>
                </div>
                
                <h3 className="text-[28px] md:text-[32px] font-medium leading-[1.2] text-pop text-pop-blue group-hover:text-blue-400 transition-colors duration-500">
                  "We transform students from passive consumers into <span className="text-blue-500">multi-domain</span> tech creators."
                </h3>

                <div className="h-px w-full bg-gradient-to-r from-blue-500/30 to-transparent" />

                <p className="text-[15px] text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">
                  Empowering the next generation to not just use technology, but to architect the future through creative mastery.
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="text-[10px] font-mono text-blue-500/40">STATUS: ACTIVE</div>
                  <div className="flex-1 h-[1px] bg-blue-500/10" />
                </div>
              </div>
            </motion.div>

            {/* Productive Failure */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-8 p-10 md:p-12 relative border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/[0.02] transition-colors duration-500"
            >
              {/* Large Background Number */}
              <div className="absolute top-8 right-8 text-[120px] font-bold text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-blue-500/[0.05] transition-colors duration-700">
                02
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="text-[10px] uppercase tracking-[0.5em] text-blue-400/80 font-bold">Pedagogical Core</span>
                </div>
                
                <h3 className="text-[28px] md:text-[32px] font-medium leading-[1.2] text-pop text-pop-blue group-hover:text-blue-400 transition-colors duration-500">
                  Productive Failure as a <span className="italic text-blue-300">Catalyst</span> for Innovation.
                </h3>

                <div className="h-px w-full bg-gradient-to-r from-blue-500/30 to-transparent" />

                <p className="text-[15px] text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">
                  Our pedagogy focuses on learning through experimentation, iteration, and high-stakes problem solving. We believe that true mastery comes from navigating the space between what you know and what you're building.
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="text-[10px] font-mono text-blue-500/40">METHOD: ITERATIVE</div>
                  <div className="flex-1 h-[1px] bg-blue-500/10" />
                </div>
              </div>
            </motion.div>

            {/* Academic Authority */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-8 p-10 md:p-12 relative group hover:bg-white/[0.02] transition-colors duration-500"
            >
              {/* Large Background Number */}
              <div className="absolute top-8 right-8 text-[120px] font-bold text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-blue-500/[0.05] transition-colors duration-700">
                03
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="text-[10px] uppercase tracking-[0.5em] text-blue-400/80 font-bold">Academic Trust</span>
                </div>
                
                <h3 className="text-[28px] md:text-[32px] font-medium leading-[1.2] text-pop text-pop-blue group-hover:text-blue-400 transition-colors duration-500">
                  Rigorous Standards Guided by <span className="text-blue-500">Expert</span> Authority.
                </h3>

                <div className="h-px w-full bg-gradient-to-r from-blue-500/30 to-transparent" />

                <p className="text-[15px] text-white/40 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-500">
                  Trusted by schools, associations, and NGOs, and guided by an advisory board of university professors. Our curriculum is built on rigorous academic standards and real-world industry practices.
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-5 h-5 rounded-full bg-blue-500/20 border border-black flex items-center justify-center">
                        <ShieldCheck className="w-2.5 h-2.5 text-blue-400" />
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-blue-500/40 uppercase">Verified</div>
                  <div className="flex-1 h-[1px] bg-blue-500/10" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Part 2: Innovation Phases */}
          <div className="flex flex-col gap-[120px] md:gap-[180px]">
            
            {/* Section 1: Empower Schools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-white" />
                  <span className="text-[14px] font-bold uppercase tracking-widest text-white/50">Phase 01</span>
                </div>
                <div className="box">
                  <h2 className="text-[32px] md:text-[48px] font-medium leading-tight text-pop text-pop-blue">
                    Empower Schools
                  </h2>
                </div>
                <p className="text-[18px] text-white leading-relaxed max-w-[540px]">
                  We provide turnkey EdTech curricula, hardware, and expert support to help schools secure government grants ranging from <span className="text-white font-bold">HKD 500k to 2M</span>. Our mission is to modernize the classroom experience with seamless integration.
                </p>
              </div>
              <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[4px] border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200" 
                  alt="Empower Schools"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Section 2: Prepare Students */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[4px] border border-white/10 order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
                  alt="Prepare Students"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-6 order-1 md:order-2">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-white" />
                  <span className="text-[14px] font-bold uppercase tracking-widest text-white/50">Phase 02</span>
                </div>
                <div className="box">
                  <h2 className="text-[32px] md:text-[48px] font-medium leading-tight text-pop text-pop-emerald">
                    Prepare Students
                  </h2>
                </div>
                <p className="text-[18px] text-white leading-relaxed max-w-[540px]">
                  We help students build elite <span className="text-white font-bold">STEAM portfolios</span> featuring real-world prototypes. Our mentorship is designed to significantly enhance university admissions for competitive pathways like <span className="text-white font-bold">JUPAS</span> and the <span className="text-white font-bold">Ivy League</span>.
                </p>
              </div>
            </div>

            {/* Section 3: Drive Social Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-white" />
                  <span className="text-[14px] font-bold uppercase tracking-widest text-white/50">Phase 03</span>
                </div>
                <div className="box">
                  <h2 className="text-[32px] md:text-[48px] font-medium leading-tight text-pop text-pop-purple">
                    Drive Social Impact
                  </h2>
                </div>
                <p className="text-[18px] text-white leading-relaxed max-w-[540px]">
                  We bridge the digital divide through social inclusion projects. From training seniors in AI to masterminding <span className="text-white font-bold">ESG-aligned sustainability initiatives</span>, we ensure technology serves the entire community.
                </p>
              </div>
              <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[4px] border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" 
                  alt="Social Impact"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite STEAM Curricula Section */}
      <section id="for-schools" className="relative z-10 bg-titanium py-16 md:py-[80px] px-6 md:px-[60px] lg:px-[120px] overflow-hidden">
        {/* Section Glows */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-grid pointer-events-none" 
        />
        
        {/* Moving Gradient Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 150, 0],
            y: [0, -100, 0],
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-500/20 blur-[180px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/15 blur-[160px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" 
        />
        
        {/* Floating Data Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                y: [0, -150, 0],
                x: [0, Math.sin(i) * 80, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 10 + i * 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.5
              }}
              className="absolute text-[9px] md:text-[11px] font-mono text-blue-400/40 whitespace-nowrap select-none drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              {`0x${Math.random().toString(16).slice(2, 8).toUpperCase()}_STREAM_${i}`}
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header Area: Editorial Style */}
          <div className="flex flex-col gap-12 mb-[60px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">For Schools</span>
                </motion.div>
                <motion.span 
                  initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[12px] font-bold uppercase tracking-[0.4em] text-blue-400/60"
                >
                  Elite STEAM Curricula
                </motion.span>
              </div>
              <div className="box">
                <motion.h2 
                  initial={{ opacity: 0, y: 100, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[32px] sm:text-[42px] md:text-[64px] font-medium leading-[0.9] tracking-tighter uppercase text-pop text-pop-blue"
                >
                  Mastering <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">The Future</span>
                </motion.h2>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <p className="text-[16px] md:text-[18px] text-white/40 font-light max-w-[600px] leading-relaxed italic">
                "We don't just teach technology; we build the architects of tomorrow's digital landscape."
                <br />
                <span className="text-[12px] mt-4 block not-italic font-medium text-blue-500/60 uppercase tracking-widest">Available for QEF School Licensing & 12-Week Bootcamps</span>
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="relative group overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative border border-white/20 px-10 py-5 rounded-full flex items-center gap-4 transition-colors group-hover:border-transparent group-hover:text-white">
                  <span className="text-[15px] font-bold uppercase tracking-widest">License Now</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Curricula Grid: Brutalist/Editorial Style with Image in Bottom Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border-silver">
            
            {/* Module 1: Space Education */}
            <HighTechCard 
              className="bg-titanium flex flex-col min-h-[520px] transition-all duration-500 relative border-silver" 
              spotlightColor="rgba(59,130,246,0.15)"
              skills={["Aerospace Engineering", "Data Science / Big Data", "AI Computer Vision", "Generative AI (Spatial Design)", "Biology Research (\"Space Seeds\")"]}
            >
              <div className="aspect-[2/3] md:aspect-[3/2] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800" 
                  alt="Space Tech"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-blue-400/60 transition-colors">MODULE 01</div>
                <h3 className="text-[28px] md:text-[32px] font-bold leading-tight text-white tracking-tight group-hover:text-blue-400 transition-colors">
                  🌌 Space Education <br />
                  & Data Science
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-medium group-hover:text-blue-400/80 transition-colors">
                  Space education reimagined. AI adapts content instantly. Dive deep into data from telescopes and missions.
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="mt-auto flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/60 group-hover:text-blue-400 transition-all cursor-pointer"
                >
                  EXPLORE MORE <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </HighTechCard>

            {/* Module 2: Low-Altitude Economy */}
            <HighTechCard 
              className="bg-titanium flex flex-col min-h-[520px] transition-all duration-500 relative border-silver" 
              spotlightColor="rgba(16,185,129,0.15)"
              skills={["Drone Technology (UAV)", "IoT (Internet of Things)", "Sensor Technology (Spectrometers)", "Environmental Data Analysis", "Hardware Coding & Assembly"]}
            >
              <div className="aspect-[2/3] md:aspect-[3/2] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" 
                  alt="Drones"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-emerald-400/60 transition-colors">MODULE 02</div>
                <h3 className="text-[28px] md:text-[32px] font-bold leading-tight text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  🚁 Low-Altitude <br />
                  Economy (Drones)
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-medium group-hover:text-emerald-400/80 transition-colors">
                  Build and code IoT-enabled drones equipped with spectrometers to capture real-world climate data.
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="mt-auto flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/60 group-hover:text-emerald-400 transition-all cursor-pointer"
                >
                  EXPLORE MORE <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </HighTechCard>

            {/* Module 3: AI Prompt Lab */}
            <HighTechCard 
              className="bg-titanium flex flex-col min-h-[520px] transition-all duration-500 relative border-silver" 
              spotlightColor="rgba(168,85,247,0.15)"
              skills={["Prompt Engineering", "Artificial Intelligence", "Natural Language Programming", "Web Application Development", "UI/UX Logic"]}
            >
              <div className="aspect-[2/3] md:aspect-[3/2] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                  alt="Vibe Coding"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-purple-400/60 transition-colors">MODULE 03</div>
                <h3 className="text-[28px] md:text-[32px] font-bold leading-tight text-white tracking-tight group-hover:text-purple-400 transition-colors">
                  🧠 AI Prompt Lab <br />
                  (Vibe Coding)
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-medium group-hover:text-purple-400/80 transition-colors">
                  Prompting is the new coding. Build and ship functional web apps in plain English using modern AI stacks.
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="mt-auto flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/60 group-hover:text-purple-400 transition-all cursor-pointer"
                >
                  EXPLORE MORE <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </HighTechCard>

            {/* Module 4: Smart City IoT Forge */}
            <HighTechCard 
              className="bg-[#1A1A1A] flex flex-col min-h-[520px] transition-all duration-500 relative border-silver" 
              spotlightColor="rgba(251,146,60,0.15)"
              skills={["AI-to-CAD Generation", "3D Printing (FDM/SLA)", "Advanced Manufacturing / Maker Ed", "IoT Sensor Integration", "Edge Computing"]}
            >
              <div className="aspect-[2/3] md:aspect-[3/2] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800" 
                  alt="Smart City"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-orange-400/60 transition-colors">MODULE 04</div>
                <h3 className="text-[28px] md:text-[32px] font-bold leading-tight text-white tracking-tight group-hover:text-orange-400 transition-colors">
                  🛠️ Smart City <br />
                  IoT Forge (Maker Ed)
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-medium group-hover:text-orange-400/80 transition-colors">
                  “One sentence turns into a 3D model.” Master AI-to-CAD generation, 3D printing, and IoT sensor integration.
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/60 group-hover:text-orange-400 transition-all">
                  EXPLORE MORE <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </HighTechCard>

            {/* Module 5: ArtTech & Young CEO */}
            <HighTechCard 
              className="bg-[#1A1A1A] flex flex-col min-h-[520px] transition-all duration-500 relative border-silver" 
              spotlightColor="rgba(251,113,133,0.15)"
              skills={["Generative AI (Visuals & Branding)", "ArtTech", "3D Modeling (Blind-box toys)", "Tech Entrepreneurship", "Business Strategy (BOM, Market Validation, Pitching)"]}
            >
              <div className="aspect-[2/3] md:aspect-[3/2] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800" 
                  alt="Young CEO"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-rose-400/60 transition-colors">MODULE 05</div>
                <h3 className="text-[28px] md:text-[32px] font-bold leading-tight text-white tracking-tight group-hover:text-rose-400 transition-colors">
                  💼 ArtTech & <br />
                  Young CEO
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-medium group-hover:text-rose-400/80 transition-colors">
                  The ultimate startup bootcamp. Use Gen-AI for branding, design 3D blind-box toys, and pitch to investors.
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/60 group-hover:text-rose-400 transition-all">
                  EXPLORE MORE <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </HighTechCard>

            {/* Module 6: AI Movie & Director Program */}
            <HighTechCard 
              className="bg-[#1A1A1A] flex flex-col min-h-[520px] transition-all duration-500 relative border-silver" 
              spotlightColor="rgba(34,211,238,0.15)"
              skills={["AI Video Generation", "Voice Cloning", "Digital Humans / Virtual Avatars", "Natural Language Processing (NLP)", "Digital Media Production"]}
            >
              <div className="aspect-[2/3] md:aspect-[3/2] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800" 
                  alt="AI Movie"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-cyan-400/60 transition-colors">MODULE 06</div>
                <h3 className="text-[28px] md:text-[32px] font-bold leading-tight text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  🎬 AI Movie & <br />
                  Director Program
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed font-medium group-hover:text-cyan-400/80 transition-colors">
                  Step into a Hollywood-grade virtual studio! Master AI video generation, voice cloning, and digital human creation to produce impactful films.
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-white/60 group-hover:text-cyan-400 transition-all">
                  EXPLORE MORE <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </HighTechCard>

          </div>

          {/* Journey Content (Combined) */}
          <div className="mt-20 md:mt-[120px] relative overflow-hidden py-10 md:py-20">
            {/* Rotating Innovation Core */}
            <div className="max-w-[1200px] mx-auto relative h-[500px] md:h-[800px] flex items-center justify-center">
              
              {/* Central Core */}
              <div className="absolute z-20 flex flex-col items-center gap-4 md:gap-6">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 40px rgba(59,130,246,0.2)",
                      "0 0 80px rgba(59,130,246,0.4)",
                      "0 0 40px rgba(59,130,246,0.2)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-blue-600 flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <Cpu className="w-10 h-10 md:w-16 md:h-16 text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 border-4 border-white/10 rounded-full animate-ping opacity-20" />
                </motion.div>
                <div className="text-center">
                  <span className="text-[9px] md:text-[12px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-blue-400 mb-1 md:mb-2 block">Core Protocol</span>
                  <h3 className="text-[16px] md:text-[24px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-white">Implementation</h3>
                </div>
              </div>

              {/* Rotating Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Outer Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[280px] h-[280px] md:w-[600px] md:h-[600px] rounded-full border border-white/5"
                />
                {/* Middle Ring with Dashes */}
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[380px] h-[380px] md:w-[900px] md:h-[900px] rounded-full border border-dashed border-blue-500/10"
                />
                {/* Inner Glow Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[180px] h-[180px] md:w-[400px] md:h-[400px] rounded-full border border-blue-500/30 shadow-[inset_0_0_50px_rgba(59,130,246,0.2)]"
                />
              </div>

              {/* Step Nodes */}
              <div className="absolute inset-0 flex items-center justify-center">
                
                {/* Step 01: Discovery */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="absolute -translate-y-[130px] -translate-x-[90px] md:-translate-y-[280px] md:-translate-x-[280px] z-30"
                >
                  <div className="group relative flex flex-col items-center">
                    <div className="w-10 h-10 md:w-24 md:h-24 rounded-xl md:rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-blue-500/40 flex items-center justify-center group-hover:border-blue-500 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                      <div className="absolute -top-1.5 -left-1.5 w-5 h-5 md:w-10 md:h-10 rounded-md md:rounded-xl bg-blue-600 flex items-center justify-center text-[8px] md:text-[14px] font-black shadow-xl">01</div>
                      <BookOpen className="w-5 h-5 md:w-12 md:h-12 text-white group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="absolute top-full mt-3 md:mt-8 text-center w-[100px] md:w-[260px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <h4 className="text-[12px] md:text-[22px] font-black mb-0.5 md:mb-2 uppercase tracking-tight text-blue-400">Discovery</h4>
                      <p className="text-[9px] md:text-[15px] text-white/80 leading-tight md:leading-relaxed font-medium">Identify ArtTech goals through expert consultation.</p>
                    </div>
                    {/* Visual Connector to Core */}
                    <div className="absolute top-1/2 left-1/2 w-[40px] md:w-[200px] h-px bg-gradient-to-r from-blue-500/60 to-transparent origin-left rotate-[135deg] pointer-events-none" />
                  </div>
                </motion.div>

                {/* Step 02: Strategy */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="absolute -translate-y-[160px] md:-translate-y-[350px] z-30"
                >
                  <div className="group relative flex flex-col items-center">
                    <div className="w-10 h-10 md:w-24 md:h-24 rounded-xl md:rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-blue-500/40 flex items-center justify-center group-hover:border-blue-500 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                      <div className="absolute -top-1.5 -left-1.5 w-5 h-5 md:w-10 md:h-10 rounded-md md:rounded-xl bg-blue-600 flex items-center justify-center text-[8px] md:text-[14px] font-black shadow-xl">02</div>
                      <Layers className="w-5 h-5 md:w-12 md:h-12 text-white group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="absolute top-full mt-3 md:mt-8 text-center w-[100px] md:w-[260px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <h4 className="text-[12px] md:text-[22px] font-black mb-0.5 md:mb-2 uppercase tracking-tight text-blue-400">Strategy</h4>
                      <p className="text-[9px] md:text-[15px] text-white/80 leading-tight md:leading-relaxed font-medium">Receive a custom EdTech roadmap or STEAM plan.</p>
                    </div>
                    {/* Visual Connector to Core */}
                    <div className="absolute top-1/2 left-1/2 w-[60px] md:w-[300px] h-px bg-gradient-to-r from-blue-500/60 to-transparent origin-left rotate-[90deg] pointer-events-none" />
                  </div>
                </motion.div>

                {/* Step 03: Launch */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="absolute -translate-y-[130px] translate-x-[90px] md:-translate-y-[280px] md:translate-x-[280px] z-30"
                >
                  <div className="group relative flex flex-col items-center">
                    <div className="w-10 h-10 md:w-24 md:h-24 rounded-xl md:rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-blue-500/40 flex items-center justify-center group-hover:border-blue-500 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                      <div className="absolute -top-1.5 -left-1.5 w-5 h-5 md:w-10 md:h-10 rounded-md md:rounded-xl bg-blue-600 flex items-center justify-center text-[8px] md:text-[14px] font-black shadow-xl">03</div>
                      <Rocket className="w-5 h-5 md:w-12 md:h-12 text-white group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="absolute top-full mt-3 md:mt-8 text-center w-[100px] md:w-[260px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <h4 className="text-[12px] md:text-[22px] font-black mb-0.5 md:mb-2 uppercase tracking-tight text-blue-400">Launch</h4>
                      <p className="text-[9px] md:text-[15px] text-white/80 leading-tight md:leading-relaxed font-medium">Implement the curriculum or start building prototypes.</p>
                    </div>
                    {/* Visual Connector to Core */}
                    <div className="absolute top-1/2 left-1/2 w-[40px] md:w-[200px] h-px bg-gradient-to-r from-blue-500/60 to-transparent origin-left rotate-[45deg] pointer-events-none" />
                  </div>
                </motion.div>

              </div>

              {/* Background Data Streams */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[0.5px] border-blue-500/10 rounded-full scale-[1.5]"
                />
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* For Families Section */}
      <section id="for-families" className="relative z-10 bg-black py-16 md:py-[120px] px-6 md:px-[60px] lg:px-[120px] overflow-hidden">
        {/* ARTtech Generative Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Geometric Pattern - Cleaner */}
          <div className="absolute inset-0 opacity-[0.06]" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.2'%3E%3Cpath d='M50 50 L100 50 M50 50 L50 100 M50 50 L0 50 M50 50 L50 0'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '100px 100px'
               }} 
          />
          
          {/* Abstract Moving Lines - More Visible */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.2]" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M-100 200 Q 500 400 1100 200 T 2300 200"
              fill="none"
              stroke="white"
              strokeWidth="1"
              animate={{
                d: [
                  "M-100 200 Q 500 400 1100 200 T 2300 200",
                  "M-100 250 Q 550 350 1150 250 T 2350 250",
                  "M-100 200 Q 500 400 1100 200 T 2300 200"
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M-100 700 Q 600 500 1200 700 T 2500 700"
              fill="none"
              stroke="white"
              strokeWidth="1"
              animate={{
                d: [
                  "M-100 700 Q 600 500 1200 700 T 2500 700",
                  "M-100 650 Q 650 550 1250 650 T 2550 650",
                  "M-100 700 Q 600 500 1200 700 T 2500 700"
                ]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>

          {/* Floating Geometric Outlines - More Defined */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -60, 0],
                rotate: [0, 90, 180],
                opacity: [0.05, 0.12, 0.05],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 12 + i * 3, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              className="absolute border border-white/20"
              style={{
                width: `${60 + i * 30}px`,
                height: `${60 + i * 30}px`,
                left: `${(i * 20) % 100}%`,
                top: `${(i * 25) % 100}%`,
                borderRadius: i % 3 === 0 ? '0%' : i % 3 === 1 ? '50%' : '12px',
                transform: `rotate(${i * 60}deg)`
              }}
            />
          ))}

          {/* Subtle Gradient Glows (Clean, no noise) */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Column: Content */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">For Families</span>
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-purple-400/60">University-Backed Programs</span>
                </div>
                <div className="box">
                  <h2 className="text-[32px] sm:text-[48px] md:text-[72px] font-medium leading-[1] tracking-tight text-pop text-pop-purple">
                    Bridge the <br />
                    <span className="italic font-serif text-purple-200">Tech Gap</span>
                  </h2>
                </div>
                <p className="text-[18px] text-white/60 leading-relaxed max-w-[540px]">
                  Trusted by schools, associations, and NGOs, and guided by an advisory board of university professors. We turn screen time into family co-creation.
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group overflow-hidden rounded-full w-fit"
                >
                  <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative border border-white/20 px-10 py-5 rounded-full flex items-center gap-4 transition-colors group-hover:border-transparent group-hover:text-white">
                    <span className="text-[15px] font-bold uppercase tracking-widest">Book Now</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </motion.button>
              </div>

              <div className="flex flex-col gap-8">
                {/* Feature 1 */}
                <HighTechCard className="rounded-2xl bg-titanium border-silver" spotlightColor="rgba(168,85,247,0.15)">
                  <div className="flex gap-6 p-6 transition-all group">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[20px] font-bold text-white">Parent-Child AI Co-Creation</h4>
                      <p className="text-[15px] text-white/50 leading-relaxed">
                        Parents and children master Generative AI and digital storytelling side-by-side. Transform passive consumption into active creation.
                      </p>
                    </div>
                  </div>
                </HighTechCard>

                {/* Feature 2 */}
                <HighTechCard className="rounded-2xl bg-titanium border-silver" spotlightColor="rgba(168,85,247,0.15)">
                  <div className="flex gap-6 p-6 transition-all group">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Printer className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[20px] font-bold text-white">Text-to-Object: AI & 3D Printing Lab</h4>
                      <p className="text-[15px] text-white/50 leading-relaxed">
                        Turn imagination into physical reality! Families use AI to bring their custom designs to life through advanced 3D printing.
                      </p>
                    </div>
                  </div>
                </HighTechCard>

                {/* Feature 3 */}
                <HighTechCard className="rounded-2xl bg-titanium border-silver" spotlightColor="rgba(168,85,247,0.15)">
                  <div className="flex gap-6 p-6 transition-all group">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Wind className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[20px] font-bold text-white">Future-Ready Drones</h4>
                      <p className="text-[15px] text-white/50 leading-relaxed">
                        Step into the Low-Altitude Economy. Go beyond remote controls—get hands-on with drone coding, assembly, and flight data analysis.
                      </p>
                    </div>
                  </div>
                </HighTechCard>
              </div>
            </div>

            {/* Right Column: Visuals */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-[40px] overflow-hidden border-silver shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200" 
                  alt="HK Family Learning"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 bg-white p-8 rounded-[32px] shadow-2xl hidden md:block z-20"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-black/40 text-[10px] uppercase font-bold tracking-widest">Guided by</span>
                  <span className="text-black text-[18px] font-serif italic font-bold">University Professors</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* For NGOs and Associations Section */}
      <section id="for-ngos" className="relative z-10 bg-black py-16 md:py-[120px] px-6 md:px-[60px] lg:px-[120px] overflow-hidden">
        {/* Digital Grid & Scanline Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-[0.15]" />
          {/* Vertical Data Streams */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "-100%" }}
              animate={{ y: "200%" }}
              transition={{ 
                duration: 10 + Math.random() * 15, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute w-px h-[300px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"
              style={{ left: `${(i * 7) % 100}%` }}
            />
          ))}
          {/* Horizontal Scanline */}
          <motion.div 
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-px bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10"
          />
          {/* Glowing Data Points */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 3 + Math.random() * 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.8
              }}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        {/* Technical Grid Background */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col gap-20">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">For NGOs & Associations</span>
                  </div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-emerald-400/60">Digital Heritage & Social Impact</span>
                </div>
                <div className="box">
                  <h2 className="text-[32px] sm:text-[48px] md:text-[80px] font-medium leading-[0.9] tracking-tighter uppercase text-pop text-pop-emerald">
                    Beyond the <br />
                    <span className="text-emerald-400">Classroom</span>
                  </h2>
                </div>
                <p className="text-[18px] text-white/40 leading-relaxed max-w-[540px]">
                  Partner with us for SIE Fund-ready CSR and NGO co-creation projects. We bridge the digital divide with measurable community impact.
                </p>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col gap-4 items-end cursor-pointer"
              >
                <div className="flex items-center gap-3 text-emerald-400/80">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[12px] font-mono uppercase tracking-widest">Social Inclusion Certified</span>
                </div>
                <div className="text-[11px] font-mono text-white/30 text-right max-w-[200px]">
                  TRACKED BY UCLA LONELINESS SCALE TO REDUCE SOCIAL ISOLATION
                </div>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 border-silver">
              
              {/* ESG & UN SDGs */}
              <HighTechCard className="bg-titanium p-10 flex flex-col gap-8 border-silver" spotlightColor="rgba(16,185,129,0.15)">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-[24px] font-bold text-white uppercase tracking-tight">ESG & UN SDGs</h3>
                <p className="text-[15px] text-white/50 leading-relaxed">
                  All physical projects use EPD carbon calculation methods to meet Hong Kong’s 2050 net-zero mandates. We help corporate partners fulfill ESG goals while advancing UN SDGs for Quality Education and Sustainable Communities.
                </p>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">EPD Certified</span>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">2050 Mandate</span>
                </div>
              </HighTechCard>

              {/* Digital Heritage Project */}
              <HighTechCard className="lg:col-span-2 bg-titanium p-10 flex flex-col md:flex-row gap-10 border-silver" spotlightColor="rgba(20,184,166,0.15)">
                <div className="flex flex-col gap-8 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <History className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[24px] font-bold text-white uppercase tracking-tight">Recreating History with AI</h3>
                    <p className="text-[15px] text-white/50 leading-relaxed">
                      The Hilton Cheong-Leen AI Movie Project: A groundbreaking initiative where 40+ "young elders" produced an AI documentary from scratch. Mastered scriptwriting, AI video generation, and voice cloning to recreate the life of the "Father of HK Hawkers."
                    </p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[20px] font-mono font-bold text-white">40+</span>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Young Elders</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[20px] font-mono font-bold text-white">100%</span>
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">AI Produced</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[300px] aspect-video md:aspect-square rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&q=80&w=600" 
                    alt="Hilton Cheong-Leen Historical Context"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </HighTechCard>

            </div>

            {/* Impact Dashboard */}
            <div className="bg-titanium border-silver p-10 md:p-16 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BarChart3 className="w-64 h-64" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                  <span className="text-[12px] font-mono text-emerald-400 uppercase tracking-[0.3em]">Impact Metrics</span>
                  <h3 className="text-[32px] font-bold text-white">Measurable Community Impact</h3>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group overflow-hidden rounded-full w-fit"
                >
                  <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="relative border border-white/20 px-10 py-5 rounded-full flex items-center gap-4 transition-colors group-hover:border-transparent group-hover:text-white">
                    <span className="text-[15px] font-bold uppercase tracking-widest">Partner With Us</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </motion.button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {/* Metric 1 */}
                  <HighTechCard className="rounded-xl bg-titanium border-silver" spotlightColor="rgba(16,185,129,0.15)">
                    <div className="flex flex-col gap-4 p-8">
                      <span className="text-[48px] font-mono font-bold text-white leading-none">700+</span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-white uppercase tracking-tight">Young-old Empowered</span>
                        <p className="text-[12px] text-white/40 leading-relaxed">
                          Guided to confidently publish AI memoirs and digital art.
                        </p>
                      </div>
                    </div>
                  </HighTechCard>

                  {/* Metric 2 */}
                  <HighTechCard className="rounded-xl bg-titanium border-silver" spotlightColor="rgba(16,185,129,0.15)">
                    <div className="flex flex-col gap-4 p-8">
                      <span className="text-[48px] font-mono font-bold text-white leading-none">300+</span>
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-white uppercase tracking-tight">Youth Mentors</span>
                        <p className="text-[12px] text-white/40 leading-relaxed">
                          A growing network trained to bridge the digital divide.
                        </p>
                      </div>
                    </div>
                  </HighTechCard>

                  {/* Metric 3 */}
                  <HighTechCard className="rounded-xl bg-titanium border-silver" spotlightColor="rgba(16,185,129,0.15)">
                    <div className="flex flex-col gap-4 p-8">
                      <div className="flex items-center gap-3">
                        <span className="text-[48px] font-mono font-bold text-white leading-none">UCLA</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-white uppercase tracking-tight">Loneliness Scale</span>
                        <p className="text-[12px] text-white/40 leading-relaxed">
                          Scientifically tracked social inclusion and isolation reduction.
                        </p>
                      </div>
                    </div>
                  </HighTechCard>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Take Your Next Step Section */}
      <section className="relative z-10 bg-[#050505] py-24 px-6 md:px-[60px] lg:px-[120px] border-t border-white/10 overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* CTAs Grid */}
            <div className="flex-1 flex flex-col gap-12">
              <div className="box">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[32px] sm:text-[48px] md:text-[64px] font-bold text-pop text-pop-purple leading-[0.9] tracking-tighter"
                >
                  Take Your <span className="text-purple-500">Next Step</span> With Us
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* School CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17,
                    delay: 0.1 
                  }}
                  className="group p-8 rounded-2xl bg-titanium border-silver hover:border-blue-500/50 transition-colors duration-500"
                >
                  <div className="text-[32px] mb-4">🎓</div>
                  <h3 className="text-[18px] font-bold text-white mb-2">Schools</h3>
                  <p className="text-[14px] text-white/60 leading-relaxed mb-6">
                    Book a Free QEF Strategy Consultation to elevate your curriculum.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-blue-500 group-hover:gap-4 transition-all">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* Parent CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17,
                    delay: 0.2 
                  }}
                  className="group p-8 rounded-2xl bg-titanium border-silver hover:border-purple-500/50 transition-colors duration-500"
                >
                  <div className="text-[32px] mb-4">👨‍👩‍👧</div>
                  <h3 className="text-[18px] font-bold text-white mb-2">Parents</h3>
                  <p className="text-[14px] text-white/60 leading-relaxed mb-6">
                    Enroll in Parent-Child AI & Drone Bootcamps for a future-ready family.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-purple-500 group-hover:gap-4 transition-all">
                    Enroll Today <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* Association CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17,
                    delay: 0.3 
                  }}
                  className="group p-8 rounded-2xl bg-titanium border-silver hover:border-emerald-500/50 transition-colors duration-500"
                >
                  <div className="text-[32px] mb-4">🤝</div>
                  <h3 className="text-[18px] font-bold text-white mb-2">Associations</h3>
                  <p className="text-[14px] text-white/60 leading-relaxed mb-6">
                    Partner on CSR & SIE Fund Projects to create lasting social impact.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-emerald-500 group-hover:gap-4 transition-all">
                    Partner With Us <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-24 px-6 md:px-[60px] lg:px-[120px] border-t border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:grid lg:grid-cols-4 gap-16 items-start">
          {/* Brand Column */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <img 
                src="logo.png" 
                alt="Logo" 
                className="h-24 md:h-48 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <p className="text-white/40 text-[15px] leading-relaxed max-w-[300px]">
              Hong Kong’s premier ArtTech partner providing turnkey EdTech curricula.
            </p>
          </div>

          {/* Hubs Column */}
          <div className="flex flex-col gap-8">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/60">Our Hubs</span>
            <div className="flex flex-col gap-8">
                <motion.div 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex gap-4 group cursor-pointer"
                >
                  <span className="text-[20px] shrink-0">📍</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] font-bold text-white group-hover:text-emerald-400 transition-colors">Kwun Tong</span>
                    <span className="text-[14px] text-white/40 leading-tight">AI Hub & Training Center</span>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex gap-4 group cursor-pointer"
                >
                  <span className="text-[20px] shrink-0">📍</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] font-bold text-white group-hover:text-emerald-400 transition-colors">Yuen Long</span>
                    <span className="text-[14px] text-white/40 leading-tight">Community IoT & ArtTech Incubator</span>
                  </div>
                </motion.div>
            </div>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-8">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/60">Connect</span>
            <div className="flex flex-col gap-6">
              <motion.a 
                whileHover={{ scale: 1.05, x: 5 }}
                href="https://www.CreaTechAcademy.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-[15px] text-white/40 hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5 text-emerald-500" />
                www.CreaTechAcademy.com
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, x: 5 }}
                href="mailto:partnerships@createchAcademy.com" 
                className="flex items-center gap-3 text-[15px] text-white/40 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 text-emerald-500" />
                partnerships@createchAcademy.com
              </motion.a>
              <motion.div 
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-3 text-[15px] text-white/40"
              >
                <Smartphone className="w-5 h-5 text-emerald-500" />
                @CreaTechAcademy on IG & FB
              </motion.div>
            </div>
          </div>

          {/* Programs Column */}
          <div className="flex flex-col gap-8">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white/60">Programs</span>
            <div className="flex flex-col gap-4">
              <motion.a whileHover={{ scale: 1.1, x: 5 }} href="#for-schools" className="text-[15px] text-white/40 hover:text-white transition-colors inline-block origin-left">For Schools</motion.a>
              <motion.a whileHover={{ scale: 1.1, x: 5 }} href="#for-families" className="text-[15px] text-white/40 hover:text-white transition-colors inline-block origin-left">For Families</motion.a>
              <motion.a whileHover={{ scale: 1.1, x: 5 }} href="#for-ngos" className="text-[15px] text-white/40 hover:text-white transition-colors inline-block origin-left">For NGOs</motion.a>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[12px] text-white/20 font-mono tracking-wider">© 2026 CREATECH INNOVATION ACADEMY. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-12">
            <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
