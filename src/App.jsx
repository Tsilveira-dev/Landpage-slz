
import React, { useEffect, useRef } from 'react';

export default function App() {
  const containerRef = useRef(null);
  const heroImageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Certifica-se de que o GSAP e o ScrollTrigger estão carregados globalmente
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      let ctx = window.gsap.context(() => {
        const tl = window.gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000", // Distância da rolagem fixada (pin)
            pin: true,     // Fixa a seção na tela durante a animação
            scrub: 1,      // Sincroniza suavemente com o movimento do scroll
          }
        });

        // 1. Zoom out / escurecimento sutil da imagem de fundo
        tl.to(heroImageRef.current, {
          scale: 1.25,
          filter: "brightness(0.35)",
          ease: "none"
        }, 0);

        // 2. O título "SÃO LUÍS" ganha destaque e se desloca
        tl.to(titleRef.current, {
          scale: 1.2,
          opacity: 0.75,
          y: -40,
          ease: "none"
        }, 0);

        // 3. O texto descritivo surge de baixo para cima suavemente
        tl.fromTo(contentRef.current, 
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out" },
          0.2
        );

      }, containerRef);

      return () => ctx.revert(); // Limpa os triggers ao desmontar
    }
  }, []);

  return (
    <div className="bg-[#071628] text-white overflow-x-hidden font-sans">
      
      {/* SEÇÃO PRINCIPAL COM GSAP SCROLLTRIGGER */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* IMAGEM DE FUNDO (Inspirada no Monumento dos Pescadores) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            ref={heroImageRef}
            src="watermarked_img_16684332346736787400.jpg.jpeg" 
            alt="São Luís - Maranhão" 
            className="w-full h-full object-cover filter brightness-90 transform scale-100"
          />
          <div className="absolute inset-0 .bg-gradient-to-t from-[#0b2545]/90 via-transparent to-black/40" />
        </div>


        {/* CONTEÚDO DE APRESENTAÇÃO INICIAL */}
        <div 
          ref={contentRef}
          className="absolute z-20 bottom-12 max-w-3xl px-6 text-center opacity-0"
        >
          <span className="00FFF bg-cyan-300/30 border border-blue-400/40 text-white text-xs font-bold uppercase px-4 py-1.5 rounded-full backdrop-blur-md">
            Fundada em 1612 • A Ilha do Amor
          </span>
          <p className="text-gray-200 text-base md:text-lg font-light mt-4 leading-relaxed drop-shadow-md">
            A São Luís do Maranhão e Capital do Reggae guarda em suas pedras <br></br>
           de paralelepípedo e casarões coloniais um tesouro único na América Latina.
          </p>
        </div>

      </div>

      {/* SEÇÕES POSTERIORES DA LANDPAGE (História e Pontos Turísticos) */}
      <section className="relative z-30 bg-[#0b2545] py-32 px-6 md:px-20 border-t border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto space-y-28">
          
          {/* Bloco História */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-4xl font-extrabold font-serif mt-2 mb-6">
                A Cidade dos Azulejos
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-['Petit_Formal_Script',cursive] text-left">
                Os azulejos são um dos principais símbolos do Centro Histótico de São Luís. Trazido principalmente pelos portugueses entre os séculos XVIII e XIX, eles decoravam e protegiam as fachadas dos casarões contra o clima quente e chuvoso. Hoje, fazem parte da identidade da cidade, conhecida como "Cidade dos azulejos".
              </p>
                <h3 className="text-xl md:text-2xl font-bold font-serif text-center mt-8 mb-8">
                Patrimônio Mundial da UNESCO</h3>
            </div>    
            <div className="rounded-3xl overflow-hidden border border-white/10 h-100 shadow-2xl">
              <img src="download.jfif" alt="Azulejos" className="w-full h-full object-cover hover:scale-100 transition duration-700" />
            </div>
          </div>

          {/* Bloco Espigão Costeiro */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Cartão Postal</span>
            <h2 className="text-3xl md:text-5xl font-extrabold">O Espigão Costeiro</h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Situado na Ponta d'Areia, é o point ideal para contemplar o mar, curtir a brisa da ilha e assistir a um dos pores do sol mais marcantes do Brasil.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}