import React from 'react';
import ThreeBackground from './ThreeBackground';
import { PROFILE, EXPERIENCE, SKILLS } from '../constants';
import { GitCommit, Download, MapPin, Mail, Phone, Code2, Brain, Cpu, Users, GraduationCap, Laptop, Landmark, Terminal, Medal } from 'lucide-react';
import ScrollPaintStroke from './ui/ScrollPaintStroke';

const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans animate-page-in">
      
      {/* Container */}
      <div className="relative flex flex-col items-center">
        
        {/* --- Hero Section --- */}
        <section className="relative w-full max-w-[1200px] px-4 md:px-10 lg:px-20 pt-32 pb-16 min-h-[90vh] flex flex-col justify-center">
          {/* Background Effect */}
          <ThreeBackground />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Image Column */}
            <div className="col-span-1 lg:col-span-4 lg:col-start-2 order-2 lg:order-1" data-aos="fade-right">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110 group-hover:bg-primary/30 transition-colors duration-500"></div>
                <div className="relative aspect-[9/12] w-full max-w-[400px] mx-auto border border-primary/30 rounded-lg overflow-hidden bg-surface shadow-hard">
                  <img 
                    src="/src/assets/hero.jpeg" 
                    alt="Ahmed Nasser" 
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Subtle grid overly */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMjAgMEwwIDBMMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="col-span-1 lg:col-span-7 order-1 lg:order-2" data-aos="fade-left">
              <h1 className="font-display italic text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-text-main">
                Engineering <span className="text-primary not-italic">Business Solutions</span> & High-ROI Architecture
              </h1>
              
              <div className="text-muted leading-relaxed space-y-6 text-lg max-w-2xl">
                <p className="text-xl text-text-main font-medium border-l-2 border-primary pl-4">
                  I'm Ahmed - a <span className="text-primary">Technical Consultant & AI Systems Orchestrator</span> solving complex enterprise constraints before the first line of code is written.
                </p>
                
                <p>
                  I am a research-driven developer building robust, scalable software architectures by combining deep systems-level knowledge (C/C++) with bleeding-edge AI orchestration. I don't just write code; I accelerate development cycles, eliminate scope creep, and prevent technical debt using advanced AI stacks.
                </p>
                
                <blockquote className="border-l-4 border-primary/50 bg-primary/5 p-4 rounded-r-lg italic font-display text-xl text-text-main">
                  "Translating low-level optimization into measurable business outcomes."
                </blockquote>
                
                <p>
                  As an AI Systems Evaluator and Technical Consultant, I've discovered that <span className="text-primary font-medium">great software emerges when strict constraints meet rapid prototyping</span>. Whether reverse-engineering complex backends or drafting precise technical feasibility studies for enterprise budgets, I bridge the gap between low-level performance and high-level business logic.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* --- Philosophy Section --- */}
        <section className="w-full py-24 relative overflow-hidden border-y border-border-color">
          
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 relative z-10 flex flex-col items-center">
            <h2 className="font-display italic text-3xl md:text-4xl font-medium tracking-tight border-b-2 border-primary pb-4 mb-16 text-center text-text-main inline-block">
              My Engineering Philosophy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background-light border border-border-color p-8 shadow-hard hover:-translate-y-2 hover:-translate-x-2 hover:shadow-hard-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="0">
                <div className="w-16 h-16 bg-primary/10 border border-primary flex items-center justify-center mb-6">
                  <Cpu className="text-primary w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-xl mb-4">Systems-Level Optimization</h3>
                <p className="text-muted leading-relaxed">
                  Performance defines user experience. From C/C++ memory management to executing robust algorithms under pressure, I optimize the lowest levels.
                </p>
              </div>

              <div className="bg-background-light border border-border-color p-8 shadow-hard hover:-translate-y-2 hover:-translate-x-2 hover:shadow-hard-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                <div className="w-16 h-16 bg-primary/10 border border-primary flex items-center justify-center mb-6">
                  <Brain className="text-primary w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-xl mb-4">AI-Augmented Architecture</h3>
                <p className="text-muted leading-relaxed">
                  Leveraging cutting-edge models (Cursor, v0, MCP) to generate systems under 135+ page highly constrained logic rules for maximum security and zero drift.
                </p>
              </div>

              <div className="bg-background-light border border-border-color p-8 shadow-hard hover:-translate-y-2 hover:-translate-x-2 hover:shadow-hard-hover transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 bg-primary/10 border border-primary flex items-center justify-center mb-6">
                  <Users className="text-primary w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-xl mb-4">Technical Business Consulting</h3>
                <p className="text-muted leading-relaxed">
                  Translating business requirements into 50+ page technical feasibility studies. Every architecture decision mitigates risk and accelerates project ROI.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Stack Agnosticism Section with Paint Stroke highlight --- */}
        <section className="w-full py-24 bg-background-light relative border-b border-border-color">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Visual/Telemetry representation of basics */}
              <div className="col-span-1 lg:col-span-5 bg-surface border border-border-color p-8 shadow-hard" data-aos="fade-right">
                <h4 className="font-mono text-xs uppercase text-primary font-bold tracking-wider border-b border-border-color pb-2 mb-4">
                  Systems Architecture Telemetry
                </h4>
                <div className="font-mono text-xs text-text-main space-y-2 leading-relaxed">
                  <div className="flex justify-between border-b border-border-color/10 py-1">
                    <span className="text-muted">MEMORY_SCOPE:</span>
                    <span className="text-primary font-bold">Manual C++ / Alloc</span>
                  </div>
                  <div className="flex justify-between border-b border-border-color/10 py-1">
                    <span className="text-muted">MUTEX_LOCKS:</span>
                    <span className="text-green-600 font-bold">Safe Concurrency</span>
                  </div>
                  <div className="flex justify-between border-b border-border-color/10 py-1">
                    <span className="text-muted">TRANSACTIONAL_INTEGRITY:</span>
                    <span className="text-blue-600 font-bold">SQL Relational ACID</span>
                  </div>
                  <div className="flex justify-between border-b border-border-color/10 py-1">
                    <span className="text-muted">COMPILATION_SCOPES:</span>
                    <span className="font-bold">Type-Safe Interface</span>
                  </div>
                  
                  {/* Decorative ascii tree */}
                  <div className="pt-4 text-muted select-none text-[10px] leading-tight">
                    <div>root_node/</div>
                    <div>├── memory_manager.cpp</div>
                    <div>├── thread_pool.h</div>
                    <div>└── acid_transaction.sql</div>
                  </div>
                </div>
              </div>

              {/* Right Column: The Pitch */}
              <div className="col-span-1 lg:col-span-7 flex flex-col gap-6" data-aos="fade-left">
                <div className="relative inline-block">
                  <h3 className="font-display italic text-3xl md:text-4xl font-extrabold tracking-tight text-text-main leading-tight">
                    The Art of the Basics: <br />
                    <ScrollPaintStroke>Stack Agnosticism</ScrollPaintStroke>
                  </h3>
                </div>
                
                <div className="text-muted text-base leading-relaxed space-y-4 font-sans mt-4">
                  <p>
                    Frameworks change, libraries deprecate, and AI can write standard syntax in seconds. But true engineering excellence doesn't come from memorizing a particular technology. It comes from <strong className="text-text-main">mastering the absolute basics</strong> of computer science.
                  </p>
                  <p>
                    Whether optimizing C/C++ memory allocations, handling multithreaded database concurrency, or implementing ACID-compliant relational schemas, I focus heavily on the hard engineering foundations. 
                  </p>
                  <p className="border-l-2 border-primary pl-4 font-display italic text-lg text-text-main bg-primary/5 py-2">
                    "When you understand how systems execute at their lowest level, adapting to any new stack—be it Next.js, .NET, or bleeding-edge AI multi-agent orchestration—becomes an exercise in syntax, not conceptual discovery."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* --- Blueprint Skills Table --- */}
        <section className="w-full py-24 relative overflow-hidden">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 relative z-10 flex flex-col items-center">
            <h2 className="font-display italic text-3xl md:text-4xl font-medium tracking-tight border-b-2 border-primary pb-4 mb-16 text-center inline-block">
              Technical Expertise
            </h2>

            <div className="w-full overflow-x-auto pb-4 custom-scrollbar" data-aos="fade-up">
              <div className="min-w-[800px] grid grid-cols-4 border border-border-color bg-surface/80 backdrop-blur-md shadow-hard mt-8">
                {SKILLS.map((category, idx) => (
                  <div key={idx} className={`flex flex-col ${idx !== SKILLS.length - 1 ? 'border-r border-border-color' : ''}`}>
                    <div className="bg-text-main text-surface p-4 flex items-center justify-between border-b border-border-color min-h-[64px]">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest">{category.name}</span>
                      {category.iconName === 'Code2' && <Code2 className="w-4 h-4 opacity-70" />}
                      {category.iconName === 'Brain' && <Brain className="w-4 h-4 opacity-70" />}
                      {category.iconName === 'Cpu' && <Cpu className="w-4 h-4 opacity-70" />}
                      {category.iconName === 'Users' && <Users className="w-4 h-4 opacity-70" />}
                    </div>
                    <div className="flex flex-col p-4 bg-surface">
                      {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className={`py-3 text-sm font-sans font-medium text-text-main ${sIdx !== category.skills.length - 1 ? 'border-b border-border-color/20' : ''}`}>
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Professional Journey --- */}
        <section className="w-full py-24 relative overflow-hidden border-y border-border-color">
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 relative z-10 flex flex-col items-center">
            <h2 className="font-display italic text-3xl md:text-4xl font-medium tracking-tight border-b-2 border-primary pb-4 mb-16 text-center text-text-main inline-block">
              My Professional Journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Journey 1 */}
              <div className="bg-background-light border border-border-color p-8 shadow-hard hover:-translate-y-2 hover:-translate-x-2 hover:shadow-hard-hover transition-all duration-300 flex flex-col" data-aos="fade-up">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center mr-4 shrink-0">
                    <Medal className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xl mb-1">Project planning & Idea <i className="font-display">Simplification</i></h3>
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 uppercase border border-primary/20">University Projects</span>
                  </div>
                </div>
                <p className="text-muted leading-relaxed mt-2 text-sm md:text-base">
                  Practically secured <strong className="text-text-main">1st Place</strong> at every University project I lead. I always start with the big picture, deeply analyze using <strong className="text-text-main">abstraction, divide and conquer</strong> allowing me to crack any big idea into its simplest components, even when I do not know the required technical knowledge to build it. This allows me to effectively divide simple tasks to my colleagues, delivering the project on time far exceeding the project requirements.
                </p>
              </div>

              {/* Journey 2 */}
              <div className="bg-background-light border border-border-color p-8 shadow-hard hover:-translate-y-2 hover:-translate-x-2 hover:shadow-hard-hover transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center mr-4 shrink-0">
                    <Users className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xl mb-1">Technical Leadership</h3>
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 uppercase border border-primary/20">ICPC PUA Director</span>
                  </div>
                </div>
                <p className="text-muted leading-relaxed mt-2 text-sm md:text-base">
                  As <strong className="text-text-main">Director & Head Trainer</strong> at ICPC PUA, I built a championship-caliber program from scratch. Developed training roadmaps, led live algorithm sessions, and engineered competition simulations that increased our team's problem-solving speed by <strong className="text-text-main">40%</strong>. Taught me how to transform individual talent into collective excellence.
                </p>
              </div>

              {/* Journey 3 */}
              <div className="bg-background-light border border-border-color p-8 shadow-hard hover:-translate-y-2 hover:-translate-x-2 hover:shadow-hard-hover transition-all duration-300 flex flex-col" data-aos="fade-up">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center mr-4 shrink-0">
                    <Code2 className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xl mb-1">Real-World System Architecture</h3>
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 uppercase border border-primary/20">Drivers Licensing System</span>
                  </div>
                </div>
                <p className="text-muted leading-relaxed mt-2 text-sm md:text-base">
                  Engineered a <strong className="text-text-main">full-stack licensing platform</strong> handling 10+ complex workflows from vision tests to international permits. This project crystallized my approach: <strong className="text-text-main">complex systems demand simple, maintainable architectures</strong>. Used C# .NET 4.7 + SQL Server to abstract bureaucratic complexity into intuitive user flows.
                </p>
              </div>

              {/* Journey 4 */}
              <div className="bg-background-light border border-border-color p-8 shadow-hard hover:-translate-y-2 hover:-translate-x-2 hover:shadow-hard-hover transition-all duration-300 flex flex-col" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center mr-4 shrink-0">
                    <Brain className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-xl mb-1">AI-Powered Development</h3>
                    <span className="font-mono text-xs bg-primary/10 text-primary px-2 py-1 uppercase border border-primary/20">Outlier Trainer</span>
                  </div>
                </div>
                <p className="text-muted leading-relaxed mt-2 text-sm md:text-base">
                  As an <strong className="text-text-main">AI Reasoning Trainer</strong>, I've honed models in advanced programming concepts. This unique vantage point taught me how to <strong className="text-text-main">leverage AI as a force multiplier</strong> - from accelerating backend development with prompt engineering to optimizing algorithm design, while keeping human judgment central.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* --- Education & Certification --- */}
        <section className="w-full py-24 relative overflow-hidden">
          <div className="w-full max-w-[800px] mx-auto px-4 md:px-10 relative z-10 flex flex-col items-center">
            <h2 className="font-display italic text-3xl md:text-4xl font-medium tracking-tight border-b-2 border-primary pb-4 mb-16 text-center text-text-main inline-block">
              Education & Professional Development
            </h2>

            <div className="flex flex-col gap-6 w-full">
              {/* BSc */}
              <div className="bg-surface text-text-main border border-border-color shadow-hard p-6 md:p-8 flex flex-col md:flex-row gap-6 border-l-4 border-l-primary hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover transition-all" data-aos="fade-up">
                <div className="w-16 h-16 bg-primary/10 shrink-0 flex items-center justify-center">
                  <GraduationCap className="text-primary w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-2xl mb-1">BSc Computer Science</h3>
                  <div className="text-muted font-medium mb-3">Pharos University in Alexandria</div>
                  <div className="font-mono text-xs bg-primary/10 text-primary px-3 py-1 inline-flex uppercase tracking-wider mb-4 border border-primary/20">2023 - 2027</div>
                  <p className="text-muted leading-relaxed">
                    Fully funded scholarship program with current GPA of ~3.8. Focus on software architecture, algorithmic problem solving, advanced data structures, and system design.
                  </p>
                </div>
              </div>

              {/* InnovEgypt */}
              <div className="bg-surface text-text-main border border-border-color shadow-hard p-6 md:p-8 flex flex-col md:flex-row gap-6 border-l-4 border-l-blue-500 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover transition-all" data-aos="fade-up">
                <div className="w-16 h-16 bg-blue-500/10 shrink-0 flex items-center justify-center">
                  <Laptop className="text-blue-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-2xl mb-1">ITI’s InnovEgypt Program</h3>
                  <div className="text-muted font-medium mb-3">Information Technology Institute</div>
                  <div className="font-mono text-xs bg-blue-500/10 text-blue-500 px-3 py-1 inline-flex uppercase tracking-wider mb-4 border border-blue-500/20">2024</div>
                  <p className="text-muted leading-relaxed">
                    An introductory training program for startups and businesses to develop strong leadership and collaborative skills. Initiated and founded a team for a startup project idea.
                  </p>
                </div>
              </div>

              {/* Web Design Diploma */}
              <div className="bg-surface text-text-main border border-border-color shadow-hard p-6 md:p-8 flex flex-col md:flex-row gap-6 border-l-4 border-l-blue-400 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover transition-all" data-aos="fade-up">
                <div className="w-16 h-16 bg-blue-400/10 shrink-0 flex items-center justify-center">
                  <Terminal className="text-blue-400 w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-2xl mb-1">Web Design & Branding Diploma</h3>
                  <div className="text-muted font-medium mb-3">National Telecommunication Institute & Career 180</div>
                  <div className="font-mono text-xs bg-blue-400/10 text-blue-400 px-3 py-1 inline-flex uppercase tracking-wider mb-4 border border-blue-400/20">2025</div>
                  <p className="text-muted leading-relaxed">
                    100-hour intensive bootcamp covering professional frontend development (HTML, CSS, JS, Bootstrap) and personal branding strategies for tech professionals.
                  </p>
                </div>
              </div>

              {/* AI/ML Diploma */}
              <div className="bg-surface text-text-main border border-border-color shadow-hard p-6 md:p-8 flex flex-col md:flex-row gap-6 border-l-4 border-l-purple-500 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover transition-all" data-aos="fade-up">
                <div className="w-16 h-16 bg-purple-500/10 shrink-0 flex items-center justify-center">
                  <Brain className="text-purple-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-2xl mb-1">AI/ML Engineering Diploma</h3>
                  <div className="text-muted font-medium mb-3">Arabian Academy</div>
                  <div className="font-mono text-xs bg-purple-500/10 text-purple-500 px-3 py-1 inline-flex uppercase tracking-wider mb-4 border border-purple-500/20">2025 - Present</div>
                  <p className="text-muted leading-relaxed">
                    Comprehensive training in AI/ML systems - from foundational models (KNN) to advanced LLMs. Hands-on projects in model training, optimization, and real-world implementation.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="w-full py-24 border-y border-border-color mt-16 relative overflow-hidden">
          <div className="w-full max-w-[800px] mx-auto px-4 relative z-10 text-center">
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl tracking-tight mb-4">I see you're convinced</h2>
            <p className="font-display italic text-2xl text-muted mb-10">Shall we begin?</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a href={PROFILE.contact.linkedin} target="_blank" rel="noopener noreferrer" className="bg-text-main text-surface hover:bg-primary transition-colors border-2 border-text-main hover:border-primary px-8 py-3 font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-hard hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover">
                LinkedIn 
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={`https://wa.me/${PROFILE.contact.phone}`} target="_blank" rel="noopener noreferrer" className="bg-background-light text-text-main hover:bg-green-500 hover:text-white transition-colors border-2 border-border-color hover:border-green-500 px-8 py-3 font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-hard hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover">
                WhatsApp
                <Phone className="w-4 h-4 ml-1" />
              </a>
              <a href="https://www.upwork.com/freelancers/~01f54fd7d135eb3939" target="_blank" rel="noopener noreferrer" className="bg-background-light text-text-main hover:bg-[#14a800] hover:text-white transition-colors border-2 border-border-color hover:border-[#14a800] px-8 py-3 font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-hard hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover">
                Upwork
                <Code2 className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-background-light border border-border-color shadow-hard p-6 max-w-[500px] mx-auto text-left flex flex-col gap-4 relative">
              <div className="absolute top-0 right-0 p-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-muted border-b border-border-color pb-2">Prefer Direct Contact?</h3>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted font-mono uppercase tracking-wider">Email Address</div>
                  <a href={`mailto:${PROFILE.contact.email}`} className="text-lg font-bold hover:text-primary transition-colors">{PROFILE.contact.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted font-mono uppercase tracking-wider">Phone</div>
                  <a href={`tel:${PROFILE.contact.phone}`} className="text-lg font-bold hover:text-primary transition-colors">{PROFILE.contact.phone}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
