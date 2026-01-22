import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Lock, ShieldCheck, Heart, ArrowRight, Play, Gift } from 'lucide-react';

// --- Types ---
type StepType = 
  | 'intro' | 'bio' | 'q1' | 'q2' | 'q3' | 'q4' | 'testimonials_pre' 
  | 'agitation' | 'transformation' | 'benefits' | 'q5' | 'q6' 
  | 'effects' | 'final_ask' | 'loading' | 'sales_page';

// --- Components ---

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
    <div 
      className="bg-red-600 h-4 rounded-full transition-all duration-500 ease-out" 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = "" }) => (
  <button 
    onClick={onClick}
    className={`w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-[1.02] text-lg uppercase tracking-wide ${className}`}
  >
    {children}
  </button>
);

interface SelectableOptionProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const SelectableOption: React.FC<SelectableOptionProps> = ({ selected, onClick, children }) => (
  <div 
    onClick={onClick}
    className={`p-4 mb-3 rounded-lg border-2 cursor-pointer transition-all flex items-center ${
      selected 
        ? 'border-red-600 bg-red-50 text-red-900 font-semibold' 
        : 'border-gray-200 bg-white hover:border-red-300'
    }`}
  >
    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${selected ? 'border-red-600 bg-red-600' : 'border-gray-300'}`}>
      {selected && <CheckCircle size={16} className="text-white" />}
    </div>
    <span className="text-base">{children}</span>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepType>('intro');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<string[]>([]);
  
  // Helper to advance step
  const next = (step: StepType) => {
    window.scrollTo(0, 0);
    setCurrentStep(step);
  };

  // Loading Screen Logic
  useEffect(() => {
    if (currentStep === 'loading') {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCurrentStep('sales_page'), 500);
            return 100;
          }
          return prev + 1; // 100 ticks approx 
        });
      }, 60); // Total time approx 6 seconds
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  // --- Render Steps ---

  const renderIntro = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-center mb-6 leading-tight">
        Surpreenda seu parceiro inovando com posições nunca vistas antes
      </h1>
      <img src="https://i.imgur.com/Fgw1OG5.jpeg" alt="Casal" className="w-full rounded-xl shadow-md mb-6" />
      
      <div className="space-y-4 mb-8">
        <p className="flex items-start gap-2 text-gray-700">
          <span className="text-xl">😈</span>
          <span>Essas 50 posições secretas vão fazer ele esquecer todas as outras mulheres e desejar apenas você</span>
        </p>
        <p className="flex items-start gap-2 text-gray-700">
          <span className="text-xl">🔥</span>
          <span>Ele vai implorar pela sua atenção e pensar em você 24h por dia</span>
        </p>
        <p className="flex items-start gap-2 text-gray-700">
          <span className="text-xl">🤫</span>
          <span>Você nunca mais vai ser ignorada, trocada ou se sentir insegura porque ele não te procura mais…</span>
        </p>
      </div>

      <Button onClick={() => next('bio')}>Continuar</Button>
    </div>
  );

  const renderBio = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold mb-2 text-red-600">Conheça sua professora: Ana Julia</h2>
      <p className="font-semibold text-gray-600 mb-6">Criadora do MANUAL DAS POSIÇÕES SECRETAS</p>
      
      <img src="https://i.imgur.com/zG4MT7C.jpeg" alt="Ana Julia" className="w-64 h-64 object-cover rounded-full shadow-lg mb-6 border-4 border-red-100" />
      
      <div className="bg-gray-50 p-6 rounded-xl mb-8 space-y-4 text-left">
        <p className="text-gray-800">Uma sexóloga que se tornou uma das profissionais mais reconhecidas e respeitadas do país.</p>
        <p className="text-gray-800 font-bold">Sexóloga e especialista em sexualidade feminina</p>
        <p className="text-gray-800">Já ajudou mais de 73 mil mulheres a dominarem a mente masculina se tornarem inesquecíveis na cama</p>
      </div>

      <Button onClick={() => next('q1')}>Continuar</Button>
    </div>
  );

  const renderQ1 = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <ProgressBar progress={15} />
      <h2 className="text-xl font-bold mb-2">Antes de liberar o seu acesso ao Manual das Posições Matadoras, preciso saber:</h2>
      <p className="text-lg text-gray-600 mb-8">Em qual momento da sua vida amorosa você está nesse momento</p>
      
      <div className="space-y-2">
        {['💍 Estou em um relacionamento', '💘 Estou vivendo um romance mas ainda não é oficial', '💃 Sou solteira e estou livre', '🤔 Minha situação é complicada…'].map((opt, idx) => (
          <SelectableOption key={idx} selected={false} onClick={() => next('q2')}>{opt}</SelectableOption>
        ))}
      </div>
    </div>
  );

  const renderQ2 = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <ProgressBar progress={30} />
      <h2 className="text-xl font-bold mb-6">Quando o assunto é sexo, como você se classifica?</h2>
      
      <div className="space-y-2">
        {[
          '🙈 Sou iniciante total, preciso aprender do zero',
          '😕 Dou pro gasto, mas fico insegura em algumas situações',
          '😏 Mando bem, mas falta variedade',
          '😈 Eu arraso, mas quero novas técnicas'
        ].map((opt, idx) => (
          <SelectableOption key={idx} selected={false} onClick={() => next('q3')}>{opt}</SelectableOption>
        ))}
      </div>
    </div>
  );

  const renderQ3 = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <ProgressBar progress={45} />
      <h2 className="text-xl font-bold mb-6">Qual sua maior dificuldade na hora do sexo?</h2>
      
      <div className="space-y-2">
        {[
          '😶 Não conseguir surpreender de verdade',
          '👀 Fico sem graça de testar novas técnicas e acabo indo no básico',
          '🥱 Cansar rápido e perder o ritmo',
          '🥹 Não saber variar as técnicas'
        ].map((opt, idx) => (
          <SelectableOption key={idx} selected={false} onClick={() => {
            setMultiSelectAnswers([]);
            next('q4');
          }}>{opt}</SelectableOption>
        ))}
      </div>
    </div>
  );

  const renderQ4 = () => {
    const options = [
      '🔥 Ver ele gemendo e perdendo o controle',
      '💦 Fazer ele gozar muito e tremer de prazer',
      '😈 Sentir que ele nunca vai me esquecer',
      '🤲 Sentir que ele está totalmente nas minhas mãos',
      '👑 Ouvir dele que eu sou a melhor que ele já teve'
    ];

    const toggleOption = (opt: string) => {
      if (multiSelectAnswers.includes(opt)) {
        setMultiSelectAnswers(prev => prev.filter(i => i !== opt));
      } else {
        setMultiSelectAnswers(prev => [...prev, opt]);
      }
    };

    return (
      <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col">
        <ProgressBar progress={60} />
        <h2 className="text-xl font-bold mb-2">O que você quer que aconteça depois de aplicar as 5 Posições Matadoras?</h2>
        <p className="text-sm text-gray-500 mb-6">Pode selecionar mais de uma opção</p>
        
        <div className="space-y-2 mb-8">
          {options.map((opt, idx) => (
            <SelectableOption 
              key={idx} 
              selected={multiSelectAnswers.includes(opt)} 
              onClick={() => toggleOption(opt)}
            >
              {opt}
            </SelectableOption>
          ))}
        </div>
        <div className="mt-auto">
          <Button onClick={() => next('testimonials_pre')}>Continuar</Button>
        </div>
      </div>
    );
  };

  const renderTestimonialsPre = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-8">Veja o relato de algumas alunas que já aplicaram a técnica das posições matadoras…</h2>
      
      <div className="space-y-6 mb-8">
        {[
          { name: 'Bruna Souza', at: '@bruna.s_22', text: 'Gente, sério! Eu achava que sabia alguma coisa, mas esse manual abriu minha mente. Meu namorado perguntou onde eu aprendi isso tudo rsrs' },
          { name: 'Carla Dias', at: '@carlinha.dias', text: 'Estava super insegura depois da gravidez. As posições são super confortáveis e deram um up na nossa relação que estava meio parada.' },
          { name: 'Mariana Alves', at: '@mari.alves89', text: 'Eu só apliquei DUAS das posições e ele já ficou doido. Vale cada centavo, de verdade. Recomendo demais!' }
        ].map((t, idx) => (
          <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-1 text-yellow-400 mb-2">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p className="text-sm text-gray-600 mb-3 italic">"{t.text}"</p>
            <div className="flex justify-between items-center text-sm font-bold text-gray-900">
              <span>{t.name}</span>
              <span className="text-gray-400 font-normal">{t.at}</span>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => next('agitation')}>Continuar</Button>
    </div>
  );

  const renderAgitation = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-black text-center mb-6 uppercase leading-tight text-red-600">
        SE VOCÊ NÃO FAZ ESSAS 50 POSIÇÕES, OUTRA FARÁ POR VOCÊ.
      </h2>
      <img src="https://quentesecarentes.com.br/wp-content/uploads/2019/10/banner29112016-009.jpg" alt="Banner" className="w-full rounded-lg shadow-md mb-8" />
      
      <p className="text-xl font-bold text-center mb-8">
        Enquanto você tenta ser a certinha… ele deseja Outra Mulher que sabe ser PUTA na hora CERTA
      </p>

      <Button onClick={() => next('transformation')}>Continuar</Button>
    </div>
  );

  const renderTransformation = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Sua vida Sexual vai mudar da água pro vinho 🍷</h2>
      
      <div className="space-y-6 text-gray-700">
        <p>Você vai descobrir os pontos ocultos de prazer do seu corpo e conseguir chegar ao orgasmo em qualquer relação - mesmo que o homem seja ruim de cama…</p>
        <p>Vai eliminar suas inseguranças e se tornar uma mulher mais confiante, sensual e desejada na cama…</p>
        <p>Vai surpreender na cama e fazer ele esquecer de todas as mulheres que já passaram pela vida dele…</p>
        <p className="font-bold text-red-700">Depois de aplicar essa técnica, se ele OUSAR a ir pra cama com outra mulher, vai perceber que elas não chegam aos seus pés…</p>
      </div>

      <div className="mt-8">
        <Button onClick={() => next('benefits')}>Continuar</Button>
      </div>
    </div>
  );

  const renderBenefits = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Ao liberar acesso ao Manual das Posições você vai descobrir como:</h2>
      
      <ul className="space-y-4 mb-8">
        {[
          'Fazer qualquer homem gozar implorando o seu nome.',
          'Trazer de volta o tesão do seu parceiro (mesmo que ele esteja distante).',
          'Deixar homens desesperados por mais uma noite com você.',
          'Usar técnicas secretas que criam dependência sexual imediata.',
          'Virar aquela mulher que entra no quarto e faz todas as outras parecerem amadoras.',
          'Ser a única capaz de dar a ele a sensação de prazer total!'
        ].map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle className="text-green-500 shrink-0 mt-1" size={20} />
            <span className="text-gray-800">{item}</span>
          </li>
        ))}
      </ul>

      <Button onClick={() => {
        setMultiSelectAnswers([]);
        next('q5');
      }}>SIM EU QUERO ISSO</Button>
    </div>
  );

  const renderQ5 = () => {
    const options = [
      'Me sinto insegura por que não consigo fazer ele gozar',
      'Tenho impressão que ele pensa em outra quando está comigo',
      'Ele parece distante, como se fosse só obrigação',
      'Nunca me sinto realmente inesquecível',
      'Ele nem me procura mais...'
    ];

    const toggleOption = (opt: string) => {
      if (multiSelectAnswers.includes(opt)) {
        setMultiSelectAnswers(prev => prev.filter(i => i !== opt));
      } else {
        setMultiSelectAnswers(prev => [...prev, opt]);
      }
    };

    return (
      <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col">
        <ProgressBar progress={75} />
        <h2 className="text-xl font-bold mb-2">Qual é a sua maior frustração na cama hoje?</h2>
        <p className="text-sm text-gray-500 mb-6">Pode escolher mais de uma opção</p>
        
        <div className="space-y-2 mb-8">
          {options.map((opt, idx) => (
            <SelectableOption 
              key={idx} 
              selected={multiSelectAnswers.includes(opt)} 
              onClick={() => toggleOption(opt)}
            >
              {opt}
            </SelectableOption>
          ))}
        </div>
        <div className="mt-auto">
          <Button onClick={() => next('q6')}>Continuar</Button>
        </div>
      </div>
    );
  };

  const renderQ6 = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <ProgressBar progress={85} />
      <h2 className="text-xl font-bold mb-6">Quando foi a última vez que você realmente sentiu um homem louco de tesão por você a ponto de perder o controle?</h2>
      
      <div className="space-y-2">
        {[
          'Há muito tempo…',
          'É tão difícil que sinto que não sou boa o suficiente',
          'Recentemente, mas acho que eu poderia ter sido melhor',
          'Nunca senti isso de verdade'
        ].map((opt, idx) => (
          <SelectableOption key={idx} selected={false} onClick={() => next('effects')}>{opt}</SelectableOption>
        ))}
      </div>
    </div>
  );

  const renderEffects = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Essas 3 coisas vão acontecer logo na primeira vez que você colocar em prática alguma das posições do Manual...</h2>
      
      <div className="space-y-6 mb-8">
        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
          <h3 className="font-bold text-red-700 text-lg mb-2">Ele Vai Pedir "Arrego"</h3>
          <p className="text-gray-700 text-sm">Muitas alunas relatam que, na primeira vez, o homem fica tão excitado que não dura muito. Isso é normal. O nível de estímulo é tão alto que ele vai precisar de um tempo para se acostumar com essa nova mulher potente que você se tornou.</p>
        </div>
        
        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
          <h3 className="font-bold text-red-700 text-lg mb-2">O Efeito "Cachorrinho"</h3>
          <p className="text-gray-700 text-sm">Prepare-se para ele ficar mais carinhoso, mandar mensagens do nada durante o dia e querer dormir abraçado. Isso não é mágica, é a liberação de Ocitocina que as técnicas causam no cérebro masculino.</p>
        </div>

        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
          <h3 className="font-bold text-red-700 text-lg mb-2">A Inversão de Poder</h3>
          <p className="text-gray-700 text-sm">Você vai parar de se perguntar 'será que eu sou boa o suficiente?'. Ao ver ele revirando os olhos, perdendo a fala e ficando totalmente entregue nas suas mãos, sua autoconfiança vai explodir.</p>
        </div>
      </div>

      <Button onClick={() => next('final_ask')}>Continuar</Button>
    </div>
  );

  const renderFinalAsk = () => (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-center mb-8">Você quer ter acesso ao Manual das Posições?</h2>
      
      <div className="space-y-4">
        <div 
          onClick={() => next('loading')}
          className="bg-green-600 hover:bg-green-700 text-white font-bold p-6 rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-3 transform transition hover:scale-105"
        >
          <CheckCircle size={24} />
          <span className="text-xl">✅ Sim, quero muito</span>
        </div>

        <div 
          className="bg-gray-200 text-gray-500 font-bold p-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-3 opacity-75"
        >
          <span className="text-lg">🚫 Não sei...</span>
        </div>
      </div>
    </div>
  );

  const renderLoading = () => {
    // Dynamic messages
    const [msgIndex, setMsgIndex] = useState(0);
    const messages = [
      "Analisando seu perfil...",
      "Identificando as melhores posições para o seu caso...",
      "Personalizando seu manual...",
      "Selecionando bônus exclusivos...",
      "Você vai se sentir única...",
      "Preparando sua área de membros..."
    ];

    // Carousel Testimonials
    const [testIndex, setTestIndex] = useState(0);
    const testimonials = [
      { name: "Jessica M.", text: "Mudou minha vida completamente!" },
      { name: "Amanda R.", text: "Meu marido está obcecado por mim agora." },
      { name: "Carla T.", text: "Melhor investimento que fiz." },
      { name: "Beatriz L.", text: "Me sinto muito mais poderosa." }
    ];

    useEffect(() => {
      const msgInterval = setInterval(() => {
        setMsgIndex(prev => (prev + 1) % messages.length);
      }, 1500);

      const testInterval = setInterval(() => {
        setTestIndex(prev => (prev + 1) % testimonials.length);
      }, 2000);

      return () => {
        clearInterval(msgInterval);
        clearInterval(testInterval);
      };
    }, []);

    return (
      <div className="max-w-md mx-auto p-6 bg-white min-h-screen flex flex-col justify-center items-center">
        <div className="w-full mb-8">
          <div className="flex justify-between mb-2 font-bold text-red-600">
            <span>Carregando...</span>
            <span>{loadingProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-700 h-6 rounded-full transition-all duration-100" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="h-20 flex items-center justify-center text-center mb-12">
          <p className="text-xl font-medium text-gray-800 animate-pulse transition-all duration-500">
            {messages[msgIndex]}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl w-full shadow-sm">
          <div className="flex justify-center gap-1 text-yellow-500 mb-3">
            {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <p className="text-center text-gray-700 italic font-medium transition-opacity duration-500">
            "{testimonials[testIndex].text}"
          </p>
          <p className="text-center text-gray-500 text-sm mt-2 font-bold">
            - {testimonials[testIndex].name}
          </p>
        </div>
      </div>
    );
  };

  const renderSalesPage = () => {
    // Scroll to top on mount
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <div className="bg-white min-h-screen font-poppins pb-20">
        {/* Header */}
        <div className="bg-red-700 text-white p-4 text-center sticky top-0 z-50 shadow-md">
          <p className="font-bold text-sm uppercase tracking-widest">Oferta Exclusiva - Tempo Limitado</p>
        </div>

        <div className="max-w-md mx-auto p-5">
          {/* Hero Section */}
          <div className="text-center mb-8 mt-4">
            <h1 className="text-3xl font-black text-red-600 mb-2 leading-tight">SEU MANUAL COM AS 50 POSIÇÕES SECRETAS ESTÁ PRONTO !</h1>
            
            {/* Mockup */}
            <div className="my-8 relative">
              <div className="w-full h-80 bg-gray-900 rounded-3xl shadow-2xl border-8 border-gray-800 flex items-center justify-center overflow-hidden relative mx-auto max-w-[300px]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-purple-900 opacity-90"></div>
                <div className="relative z-10 text-center p-6 text-white">
                  <h3 className="text-2xl font-black uppercase mb-2">Manual das</h3>
                  <h2 className="text-4xl font-black text-yellow-400 mb-2">50 Posições</h2>
                  <h3 className="text-2xl font-black uppercase tracking-widest">Secretas</h3>
                  <div className="mt-8 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <p className="text-xs font-bold">Edição Exclusiva</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-red-600 text-left shadow-md space-y-4">
              <h3 className="font-bold text-xl mb-4 text-center">Dentro desse manual, você terá acesso a:</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-red-700 flex items-center gap-2"><Lock size={18}/> As 50 Posições Matadoras</h4>
                  <p className="text-sm text-gray-600">Posições secretas que ativam prazer físico intenso e criam apego emocional, deixando ele completamente viciado em você</p>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 flex items-center gap-2"><Lock size={18}/> Frases que Alteram a Química Cerebral</h4>
                  <p className="text-sm text-gray-600">e fazem ele ter 10x mais prazer. O que dizer antes, durante e depois de cada posição para potencializar o desejo e fazer ele pensar em você o tempo todo</p>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 flex items-center gap-2"><Lock size={18}/> Aulas Práticas comigo, Vanessa de Oliveira</h4>
                  <p className="text-sm text-gray-600">Demonstrações reais de como executar cada posição, mesmo sendo iniciante</p>
                </div>
                <div>
                  <h4 className="font-bold text-red-700 flex items-center gap-2"><Lock size={18}/> Técnicas de Dominação Silenciosa</h4>
                  <p className="text-sm text-gray-600">Como assumir o controle na cama sem parecer forçada, criando uma experiência inesquecível que ele vai querer repetir</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="font-bold text-center mb-4">Tudo 100% em vídeo e com conteúdo direto ao ponto, tão claro que qualquer mulher consegue aplicar na mesma noite.</p>
              <div className="bg-yellow-100 p-4 rounded-lg text-center border-2 border-yellow-400 border-dashed">
                <p className="font-bold text-yellow-900">GARANTA SUA VAGA HOJE</p>
                <p className="text-sm text-yellow-800">E RECEBA + 7 BÔNUS TOTALMENTE ESPECIAIS QUE VAI TE TORNAR UMA PROFISSIONAL NA CAMA</p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-6">Veja o que falam algumas de nossas clientes</h3>
            <div className="space-y-4">
              {[
                { name: "Patrícia Lima", time: "há 2 horas", text: "Gente, eu tava desacreditada! Meu marido nem olhava na minha cara direito. Apliquei a técnica da 'Deusa no Trono' e ele ficou chocado kkkk. Agora ele não me larga!" },
                { name: "Camila Rocha", time: "há 5 horas", text: "Eu achava que era golpe, mas paguei pra ver. O conteúdo é muito direto. A parte das frases mudou tudo pra mim. Me sinto muito mais poderosa." },
                { name: "Juliana Mendes", time: "há 1 dia", text: "Meninas, só comprem! É barato demais pelo que entrega. Meu namorado perguntou onde eu aprendi essas coisas rsrsrs 😈" },
                { name: "Fernanda Costa", time: "há 2 dias", text: "Salvou meu relacionamento de 10 anos. A rotina tinha acabado com a gente. Ontem tivemos a melhor noite das nossas vidas. Obrigada Ana!" }
              ].map((t, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.time}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{t.text}</p>
                  <div className="flex gap-4 text-xs font-bold text-gray-500">
                    <span className="text-red-600">Curtir</span>
                    <span className="text-red-600">Amei</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bonuses Section */}
          <div className="mb-12">
            <div className="bg-red-600 text-white p-4 rounded-t-xl text-center">
              <h3 className="font-bold text-lg">🎁 BÔNUS EXCLUSIVOS DO MANUAL DAS POSIÇÕES SECRETAS</h3>
              <p className="text-xs mt-1 bg-white/20 inline-block px-2 py-0.5 rounded">GRÁTIS - SOMENTE 4 VAGAS DISPONÍVEIS</p>
            </div>
            
            <div className="bg-gray-50 border-x border-b border-gray-200 rounded-b-xl p-4 space-y-6">
              {[
                { title: "Frases que Criam Desejo Imediato", price: "R$47,00", desc: "O que dizer antes, durante e depois do momento íntimo para ativar desejo, conexão emocional e fazer ele pensar em você mesmo quando estiver longe." },
                { title: "Linguagem Corporal Feminina Irresistível", price: "R$67,00", desc: "Gestos, posturas e movimentos simples que aumentam sua presença, confiança e poder de atração sem precisar falar nada." },
                { title: "Técnicas de Dominação Silenciosa", price: "R$97,00", desc: "Como conduzir a experiência de forma natural, feminina e elegante, criando uma sensação de intensidade e exclusividade que ele vai querer repetir." },
                { title: "O Guia da Mulher Inesquecível", price: "R$57,00", desc: "Os comportamentos e atitudes que fazem um homem associar você a prazer, conforto e admiração — evitando que ele perca o interesse com o tempo." },
                { title: "Como Reacender o Desejo em Relacionamentos Mornos", price: "R$77,00", desc: "Estratégias práticas para quebrar a rotina, recuperar a tensão e fazer ele voltar a te olhar com o mesmo desejo do início." },
                { title: "Perfumes e Gatilhos Sensoriais", price: "R$37,00", desc: "Como usar aromas, ambientes e estímulos sutis para criar associações emocionais profundas e aumentar a atração." },
                { title: "Grupo VIP de Alunas", price: "R$97,00", desc: "Acesso a um grupo fechado com dicas extras, conteúdos complementares e suporte para acelerar seus resultados." }
              ].map((b, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">GRÁTIS</div>
                   <h4 className="font-bold text-red-700 mb-1">BÔNUS {i+1} — {b.title}</h4>
                   <p className="text-xs text-gray-400 line-through mb-2">Valor: {b.price}</p>
                   <p className="text-sm text-gray-600">{b.desc}</p>
                </div>
              ))}
              
              <div className="text-center pt-4 border-t border-gray-200">
                 <p className="text-gray-500 font-bold mb-1">💎 VALOR TOTAL DOS BÔNUS: <span className="line-through">R$479,00</span></p>
                 <p className="text-gray-800 text-sm">Mas hoje, você vai receber TODOS esses bônus TOTALMENTE GRÁTIS ao garantir seu acesso ao MANUAL DAS POSIÇÕES SECRETAS.</p>
                 <p className="text-green-600 font-bold text-sm mt-2">Nenhum custo adicional. Nenhuma pegadinha. É só entrar agora e aproveitar.</p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-red-600 mb-12 transform scale-105">
            <div className="bg-red-600 p-4 text-center">
              <h3 className="text-white font-black text-xl uppercase animate-pulse">😈🔥 CONDIÇÃO ESPECIAL LIBERADA SOMENTE NESSA PÁGINA</h3>
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-500 font-bold mb-2">TENHA ACESSO AO MANUAL + 7 BÔNUS INÉDITOS POR APENAS:</p>
              
              <div className="flex flex-col items-center justify-center my-6">
                <span className="text-5xl font-black text-green-600 tracking-tighter">R$ 37,00</span>
                <span className="text-gray-400 text-sm uppercase font-bold tracking-widest mt-1">Pagamento Único</span>
              </div>

              <p className="text-xs text-gray-500 mb-6">Você está recebendo R$442,00 de desconto pra ter acesso ao conteúdo mais poderoso pra transformar sua vida sexual e dominar o poder de deixar qualquer homem aos seus pés</p>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-xl py-5 rounded-lg shadow-lg uppercase mb-4 animate-bounce">
                (teste hoje mesmo)
              </button>
            </div>
          </div>

          {/* Final Scarcity/Text */}
          <div className="space-y-6 mb-12 text-gray-800">
             <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500 rounded-r-lg">
                <p className="font-bold text-red-600 uppercase mb-2">Atenção</p>
                <p className="font-bold">SE VOCÊ NÃO FIZER ISSO AINDA HOJE, OUTRA VAI FAZER EM SEU LUGAR! 💔</p>
             </div>
             
             <p>Enquanto você tenta ser a certinha… ele deseja Outra Mulher que sabe ser PUTA na hora CERTA. 😈</p>
             <p>Se você deseja salvar seu relacionamento e fazer ele te olhar com o mesmo desejo de quando se conheceram, você precisa muito desse manual…</p>
             <p>Seu homem nunca mais vai sentir desejo por nenhuma outra mulher além de você.... Você será para ele a Rainha das Rainhas...</p>
             <p>E se você é solteira, com essas posições você vai deixar os homens comendo na sua mão, Eles não vão parar de te procurar, dizendo que precisam te ver de novo…</p>
             <p>Você vai ter tantos homens aos seus pés que vai poder escolher qualquer homem que você quiser pra se relacionar…</p>
             <p>A verdade é dura: Homens esquecem mulheres comuns todos os dias. Mas eles nunca esquecem uma mulher que sabe fazer as 5 Posições Matadoras. Essas mulheres dominam algo que a maioria nunca aprende: transformar prazer em vício. É como uma droga invisível: quanto mais ele prova, mais precisa.</p>
             <p>Enquanto você sofre por atenção, outras estão usando esses segredos para prender homens poderosos, receber presentes, viagens e fidelidade absoluta.</p>
             
             <p className="font-bold text-center text-lg italic">💋 Faça essas posições matadoras hoje mesmo… antes que outra mais “esperta” roube o que você chama de “seu homem”. 😉💋</p>
          </div>

          {/* Fire List */}
          <div className="space-y-3 mb-12 font-bold text-center">
            <p>🔥 Torne Ele Um "Víciado" pela sua Buceta.</p>
            <p>🔥 Faça Ele Nunca Mais Querer Outra Mulher.</p>
            <p>🔥 Salve Seu Relacionamento "morno".</p>
            <p>🔥 Faça ele pensar em você e querer te agradar o Tempo todo.</p>
          </div>

          {/* Guarantee */}
          <div className="bg-gray-100 p-6 rounded-xl border border-gray-300 text-center mb-8">
            <ShieldCheck size={48} className="mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-black mb-2">GARANTIA TOTAL DE 7 DIAS</h3>
            <h4 className="font-bold text-gray-600 mb-4">Risco Zero para Você</h4>
            <p className="text-sm text-gray-700 mb-4">Você tem 7 dias completos para acessar o Manual, aplicar as posições, assistir às aulas com Vanessa e avaliar se o método realmente entrega a transformação que promete.</p>
            <p className="text-sm text-gray-700 mb-4">Se por qualquer motivo — e eu disse qualquer motivo — você não ficar satisfeita com o Manual das Posições Matadoras, basta enviar um e-mail e devolvemos 100% do seu investimento na mesma hora.</p>
            <p className="font-bold text-sm">A responsabilidade é toda minha. Você não tem nada a perder.</p>
          </div>

          <div className="text-center text-gray-400 text-xs pb-10">
             <p>Copyright 2024 - Manual das Posições Secretas</p>
             <p>Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    );
  };

  switch (currentStep) {
    case 'intro': return renderIntro();
    case 'bio': return renderBio();
    case 'q1': return renderQ1();
    case 'q2': return renderQ2();
    case 'q3': return renderQ3();
    case 'q4': return renderQ4();
    case 'testimonials_pre': return renderTestimonialsPre();
    case 'agitation': return renderAgitation();
    case 'transformation': return renderTransformation();
    case 'benefits': return renderBenefits();
    case 'q5': return renderQ5();
    case 'q6': return renderQ6();
    case 'effects': return renderEffects();
    case 'final_ask': return renderFinalAsk();
    case 'loading': return renderLoading();
    case 'sales_page': return renderSalesPage();
    default: return renderIntro();
  }
}