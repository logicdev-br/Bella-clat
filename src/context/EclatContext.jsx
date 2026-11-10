import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PROTOCOLS,
  PRODUCTS,
  BOOSTS,
  CHEZ_VOUS_PACKAGES,
  INITIAL_SPECIALIST_NOTES,
  INITIAL_HISTORY,
} from '../data/mockData';
import { sendTransactionalEmail, syncToSupabase } from '../services/apiServices';

const EclatContext = createContext(null);

const STORAGE_KEY = 'belle_eclat_maison_state_v2';

// Helper to generate dynamic 6-month clinic schedule & home routine based on quiz answers
export function buildSkinPlanFromAnswers(answers) {
  const biotipo = answers?.biotipo || 'Brilho na Zona T (Mista/Oleosa)';
  const objetivo = answers?.objetivo || 'Manchas & Luminosidade';
  const restricoes = answers?.restricoes || 'Nenhuma restrição';
  const estiloRotina = answers?.estiloRotina || 'Ritual Completo (4 passos + massagem)';
  const frequencia = answers?.frequencia || 'Mensal (Ciclo Celular de 28 dias)';

  // Select sequence of 6 protocols tailored to user's answers
  let protocolSequence = ['p1', 'p5', 'p3', 'p6', 'p4', 'p7'];
  if (objetivo === 'Lifting & Contorno Facial') {
    protocolSequence = ['p1', 'p3', 'p4', 'p8', 'p3', 'p7'];
  } else if (objetivo === 'Poros & Detox') {
    protocolSequence = ['p1', 'p2', 'p6', 'p1', 'p5', 'p4'];
  } else if (objetivo === 'Longevidade & Prevenção') {
    protocolSequence = ['p2', 'p6', 'p4', 'p8', 'p5', 'p7'];
  }

  // If pregnant/lactating or rosacea, replace invasive p7/p8 with gentle botanical protocols
  if (restricoes === 'Gestante/Lactante' || restricoes === 'Rosácea ou Melasma') {
    protocolSequence = protocolSequence.map((pid) => {
      if (pid === 'p7') return 'p4';
      if (pid === 'p8') return 'p6';
      return pid;
    });
  }

  const reasonsByMonth = [
    'Mês 01 • Desintoxicação e reequilíbrio da permeabilidade da barreira cutânea para recepção de ativos.',
    'Mês 02 • Atuação direta no objetivo biológico principal respeitando o primeiro ciclo de 28 dias.',
    'Mês 03 • Liberação miofascial e oxigenação profunda para sustentar a microcirculação dérmica.',
    'Mês 04 • Reforço antioxidante e uniformização cromática na fase de estabilização epidérmica.',
    'Mês 05 • Tonificação muscular profunda e estímulo mecânico de fibroblastos.',
    'Mês 06 • Consolidação semestral de longevidade celular e blindagem do manto hidrolipídico.',
  ];

  const monthNames = ['Mês 01', 'Mês 02', 'Mês 03', 'Mês 04', 'Mês 05', 'Mês 06'];

  const clinicSchedule = protocolSequence.map((pid, idx) => {
    const proto = PROTOCOLS.find((p) => p.id === pid) || PROTOCOLS[0];
    return {
      month: idx + 1,
      monthLabel: monthNames[idx],
      protocolId: proto.id,
      protocolName: proto.name,
      category: proto.category,
      durationLabel: proto.durationLabel,
      price: proto.price,
      exige_avaliacao: proto.exige_avaliacao,
      biologicalReason: reasonsByMonth[idx],
      status: idx === 0 ? 'Agendado' : 'Pendente',
    };
  });

  return {
    createdAt: new Date().toISOString(),
    answers: {
      biotipo,
      objetivo,
      restricoes,
      estiloRotina,
      frequencia,
    },
    profileTitle: `${biotipo.split(' ')[0]} • Foco em ${objetivo}`,
    profileSummary: `Diagnóstico personalizado para pele ${biotipo.toLowerCase()}, priorizando ${objetivo.toLowerCase()} em cadência ${frequencia.toLowerCase()}${
      restricoes !== 'Nenhuma restrição' ? `, adaptado com segurança para ${restricoes.toLowerCase()}` : ''
    }.`,
    cycleDay: 24,
    clinicSchedule,
    morningRoutine: [
      {
        stepNumber: 'Passo 01 • Limpeza Suave',
        productId: 'pr1',
        usageTip: 'Massagear 2 pumps sobre a pele seca por 45 segundos e emulsionar com água fria.',
      },
      {
        stepNumber: 'Passo 02 • Tratamento Iluminador',
        productId: 'pr3',
        usageTip: 'Aplicar 4 gotas com leves pressões palmares na face e pescoço ainda úmidos.',
      },
      {
        stepNumber: 'Passo 03 • Blindagem Mineral',
        productId: 'pr6',
        usageTip: 'Finalizar com camada uniforme de proteção mineral invisível FPS 50.',
      },
    ],
    eveningRoutine: [
      {
        stepNumber: 'Passo 01 • Equilíbrio do Microbioma',
        productId: 'pr2',
        usageTip: 'Vaporizar a bruma a 20cm da face após a limpeza noturna e aguardar absorção.',
      },
      {
        stepNumber: 'Passo 02 • Regeneração Circadiana',
        productId: 'pr5',
        usageTip: 'Aquecer 3 gotas de Bakuchiol puro entre as mãos e realizar movimentos ascendentes.',
      },
      {
        stepNumber: 'Passo 03 • Selagem de Barreira',
        productId: 'pr4',
        usageTip: 'Envolver a pele com uma camada aveludada de ceramidas vegetais para reparo noturno.',
      },
    ],
  };
}

// Helper to generate next 14 days for booking calendar
export function getNext14Days() {
  const days = [];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const base = new Date();

  for (let i = 1; i <= 14; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const dayNum = String(d.getDate()).padStart(2, '0');
    const weekName = weekDays[d.getDay()];
    const monthName = months[d.getMonth()];
    days.push({
      iso: d.toISOString().split('T')[0],
      dayNum,
      weekName,
      monthName,
      fullLabel: `${weekName}, ${dayNum} ${monthName}`,
    });
  }
  return days;
}

const initialDays = getNext14Days();

const DEFAULT_APPOINTMENTS = [
  {
    id: 'apt-initial-1',
    protocolId: 'p1',
    protocolName: 'Rituel Pureté Botanique',
    category: 'Limpeza & Detox',
    duration: 75,
    price: 380,
    boosts: [BOOSTS[0]],
    totalDuration: 95,
    totalPrice: 475,
    dateIso: initialDays[2].iso,
    dateLabel: initialDays[2].fullLabel,
    timeSlot: '10:30',
    period: 'Manhã',
    modality: 'Flagship',
    specialist: 'Dra. Camille Laurent',
    preparo: 'Suspender ácidos e esfoliantes físicos 48h antes da sessão.',
    exige_avaliacao: false,
    depositPaid: 100,
    remainingBalance: 375,
    status: 'Confirmado',
    rescheduled: false,
  },
];

export function EclatProvider({ children }) {
  // Load persisted state if available
  const loadSaved = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Erro ao ler localStorage:', e);
    }
    return null;
  };

  const saved = loadSaved();

  const [activeView, setActiveView] = useState(saved?.activeView || 'home');
  const [rituaisTab, setRituaisTab] = useState(saved?.rituaisTab || 'flagship');
  const [rituaisCategoryFilter, setRituaisCategoryFilter] = useState(saved?.rituaisCategoryFilter || 'Todos');
  const [dashboardTab, setDashboardTab] = useState(saved?.dashboardTab || 'agendamentos');

  const [isClubMember, setIsClubMember] = useState(saved?.isClubMember ?? false);
  const [chezVousCredits, setChezVousCredits] = useState(saved?.chezVousCredits ?? 0);
  const [giftCardBalance, setGiftCardBalance] = useState(saved?.giftCardBalance ?? 0);

  const [skinPlan, setSkinPlan] = useState(saved?.skinPlan || buildSkinPlanFromAnswers({}));
  const [appointments, setAppointments] = useState(saved?.appointments || DEFAULT_APPOINTMENTS);
  const [specialistNotes] = useState(INITIAL_SPECIALIST_NOTES);
  const [procedureHistory, setProcedureHistory] = useState(saved?.procedureHistory || INITIAL_HISTORY);

  const [bagItems, setBagItems] = useState(saved?.bagItems || []);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [bookingDrawer, setBookingDrawer] = useState({
    isOpen: false,
    selectedProtocol: PROTOCOLS[0],
    selectedBoosts: [],
    step: 1,
    reschedulingId: null,
    modality: 'Flagship', // 'Flagship' | 'ChezVous'
    selectedDate: initialDays[1],
    selectedTime: '10:30',
    targetPlanMonth: null,
  });

  // Save to localStorage whenever core state changes
  useEffect(() => {
    try {
      const toSave = {
        activeView,
        rituaisTab,
        rituaisCategoryFilter,
        dashboardTab,
        isClubMember,
        chezVousCredits,
        giftCardBalance,
        skinPlan,
        appointments,
        procedureHistory,
        bagItems,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Erro ao salvar estado no localStorage:', e);
    }
  }, [
    activeView,
    rituaisTab,
    rituaisCategoryFilter,
    dashboardTab,
    isClubMember,
    chezVousCredits,
    giftCardBalance,
    skinPlan,
    appointments,
    procedureHistory,
    bagItems,
  ]);

  const showToast = (message, subtitle = '') => {
    setToast({ message, subtitle, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 3800 ? null : prev));
    }, 4000);
  };

  // Navigation helper with smooth scroll to top
  const navigateTo = (view, options = {}) => {
    if (options.rituaisTab) setRituaisTab(options.rituaisTab);
    if (options.categoryFilter) setRituaisCategoryFilter(options.categoryFilter);
    if (options.dashboardTab) setDashboardTab(options.dashboardTab);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Booking Drawer (Normal or Reschedule mode)
  const openBookingDrawer = (protocol = PROTOCOLS[0], options = {}) => {
    const resolvedProtocol =
      typeof protocol === 'string'
        ? PROTOCOLS.find((p) => p.id === protocol) || PROTOCOLS[0]
        : protocol || PROTOCOLS[0];

    if (options.rescheduleAppointment) {
      const apt = options.rescheduleAppointment;
      const aptProto = PROTOCOLS.find((p) => p.id === apt.protocolId) || resolvedProtocol;
      setBookingDrawer({
        isOpen: true,
        selectedProtocol: aptProto,
        selectedBoosts: apt.boosts || [],
        step: 2, // Reabre direto na Etapa 2 de Data/Hora
        reschedulingId: apt.id,
        modality: apt.modality === 'Domicílio Chez Vous' ? 'ChezVous' : 'Flagship',
        selectedDate: initialDays.find((d) => d.iso === apt.dateIso) || initialDays[3],
        selectedTime: apt.timeSlot || '14:00',
        targetPlanMonth: null,
      });
      return;
    }

    setBookingDrawer({
      isOpen: true,
      selectedProtocol: resolvedProtocol,
      selectedBoosts: options.boosts || [],
      step: 1,
      reschedulingId: null,
      modality: options.modality || (chezVousCredits > 0 ? 'Flagship' : 'Flagship'),
      selectedDate: initialDays[1],
      selectedTime: '10:30',
      targetPlanMonth: options.targetPlanMonth || null,
    });
  };

  const closeBookingDrawer = () => {
    setBookingDrawer((prev) => ({ ...prev, isOpen: false }));
  };

  const toggleBoostInDrawer = (boost) => {
    setBookingDrawer((prev) => {
      const exists = prev.selectedBoosts.some((b) => b.id === boost.id);
      if (exists) {
        return {
          ...prev,
          selectedBoosts: prev.selectedBoosts.filter((b) => b.id !== boost.id),
        };
      }
      // Permite somar até 2 Boosts na mesma janela de visita conforme SPEC.md 7.1
      if (prev.selectedBoosts.length >= 2) {
        showToast('Limite de 2 Boosts por sessão', 'Para preservar o descanso biológico da sua pele.');
        return prev;
      }
      return {
        ...prev,
        selectedBoosts: [...prev.selectedBoosts, boost],
      };
    });
  };

  const getSpecialistByTime = (timeSlot) => {
    if (timeSlot === '09:00' || timeSlot === '10:30') return 'Dra. Camille Laurent';
    if (timeSlot === '14:00' || timeSlot === '15:30') return 'Claire Moreau';
    return 'Hélène Dubois';
  };

  const getPeriodByTime = (timeSlot) => {
    if (timeSlot === '09:00' || timeSlot === '10:30') return 'Manhã';
    if (timeSlot === '14:00' || timeSlot === '15:30' || timeSlot === '17:00') return 'Tarde';
    return 'Noite';
  };

  const confirmBooking = (paymentMethod = 'PIX') => {
    const {
      selectedProtocol,
      selectedBoosts,
      reschedulingId,
      modality,
      selectedDate,
      selectedTime,
      targetPlanMonth,
    } = bookingDrawer;

    const boostsDuration = selectedBoosts.reduce((sum, b) => sum + b.duration, 0);
    const boostsPrice = selectedBoosts.reduce((sum, b) => sum + b.price, 0);
    const totalDuration = selectedProtocol.duration + boostsDuration;
    const totalPrice = selectedProtocol.price + boostsPrice;

    const isExempt = isClubMember || modality === 'ChezVous';
    const depositPaid = isExempt ? 0 : 100;
    const remainingBalance =
      modality === 'ChezVous'
        ? 0
        : isClubMember && selectedProtocol.price <= 460
        ? boostsPrice
        : Math.max(0, totalPrice - depositPaid);

    if (reschedulingId) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === reschedulingId
            ? {
                ...apt,
                dateIso: selectedDate.iso,
                dateLabel: selectedDate.fullLabel,
                timeSlot: selectedTime,
                period: getPeriodByTime(selectedTime),
                specialist: getSpecialistByTime(selectedTime),
                rescheduled: true,
              }
            : apt
        )
      );
      setBookingDrawer((prev) => ({ ...prev, step: 4 }));
      showToast(
        'Sessão remarcada com sucesso',
        `Nova data: ${selectedDate.fullLabel} às ${selectedTime} • Sem cobrança de taxa adicional.`
      );
      return;
    }

    const newAppointment = {
      id: `apt-${Date.now()}`,
      protocolId: selectedProtocol.id,
      protocolName: selectedProtocol.name,
      category: selectedProtocol.category,
      duration: selectedProtocol.duration,
      price: selectedProtocol.price,
      boosts: selectedBoosts,
      totalDuration,
      totalPrice,
      dateIso: selectedDate.iso,
      dateLabel: selectedDate.fullLabel,
      timeSlot: selectedTime,
      period: getPeriodByTime(selectedTime),
      modality: modality === 'ChezVous' ? 'Domicílio Chez Vous' : 'Flagship',
      specialist: getSpecialistByTime(selectedTime),
      preparo: selectedProtocol.preparo,
      exige_avaliacao: selectedProtocol.exige_avaliacao,
      depositPaid,
      remainingBalance,
      paymentMethod,
      status: 'Confirmado',
      rescheduled: false,
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    sendTransactionalEmail({
      subject: `Reserva Confirmada: ${selectedProtocol.name}`,
      details: {
        protocolo: selectedProtocol.name,
        data: selectedDate.fullLabel,
        horario: selectedTime,
        modalidade: modality === 'ChezVous' ? 'Domicílio Chez Vous' : 'Flagship Jardins',
        valor_total: `R$ ${totalPrice},00`,
        preparo_obrigatorio: selectedProtocol.preparo,
      },
    });

    // If booked using Chez Vous credit, deduct 1 credit
    if (modality === 'ChezVous' && chezVousCredits > 0) {
      setChezVousCredits((c) => Math.max(0, c - 1));
    }

    // Update skinPlan corresponding month from Pendente to Agendado
    setSkinPlan((prevPlan) => {
      if (!prevPlan || !prevPlan.clinicSchedule) return prevPlan;
      let updatedOne = false;
      const newSchedule = prevPlan.clinicSchedule.map((item) => {
        if (targetPlanMonth && item.month === targetPlanMonth) {
          updatedOne = true;
          return { ...item, status: 'Agendado' };
        }
        if (!targetPlanMonth && !updatedOne && item.protocolId === selectedProtocol.id && item.status === 'Pendente') {
          updatedOne = true;
          return { ...item, status: 'Agendado' };
        }
        return item;
      });
      return {
        ...prevPlan,
        clinicSchedule: newSchedule,
      };
    });

    setBookingDrawer((prev) => ({ ...prev, step: 4 }));
  };

  // Club Éclat Subscription
  const subscribeToClub = () => {
    setIsClubMember(true);
    showToast(
      'Bem-vinda ao Le Club Éclat VIP',
      'Isenção de Taxa de Reserva e 15% OFF na Boutique já estão ativos em sua conta.'
    );
  };

  // Bag Management
  const addToBag = (item, openDrawer = true) => {
    setBagItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id && i.itemType === item.itemType);
      if (existingIndex > -1 && item.itemType !== 'giftcard') {
        const clone = [...prev];
        clone[existingIndex] = {
          ...clone[existingIndex],
          quantity: clone[existingIndex].quantity + 1,
        };
        return clone;
      }
      return [
        ...prev,
        {
          ...item,
          cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          quantity: item.quantity || 1,
        },
      ];
    });
    if (openDrawer) {
      setIsBagOpen(true);
    } else {
      showToast(`${item.name} adicionado à sacola`, 'Disponível para entrega ou retirada na Flagship.');
    }
  };

  const addFullRoutineToBag = () => {
    setBagItems((prev) => {
      let updated = [...prev];
      PRODUCTS.forEach((prod) => {
        const idx = updated.findIndex((i) => i.id === prod.id && i.itemType === 'product');
        if (idx > -1) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        } else {
          updated.push({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            image: prod.image,
            metaLine: prod.metaLine,
            itemType: 'product',
            cartItemId: `${prod.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            quantity: 1,
          });
        }
      });
      return updated;
    });
    setIsBagOpen(true);
    showToast('Rotina Completa (6 Produtos) adicionada à sacola');
  };

  const updateBagQuantity = (cartItemId, delta) => {
    setBagItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId !== cartItemId) return item;
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        })
        .filter(Boolean)
    );
  };

  const removeFromBag = (cartItemId) => {
    setBagItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const checkoutBag = (deliveryOption = 'Flagship') => {
    let addedCredits = 0;
    bagItems.forEach((item) => {
      if (item.itemType === 'chezvous') {
        const pkg = CHEZ_VOUS_PACKAGES.find((p) => p.id === item.id);
        const creditsToAdd = (pkg ? pkg.credits : item.credits || 4) * item.quantity;
        addedCredits += creditsToAdd;
      }
    });

    if (addedCredits > 0) {
      setChezVousCredits((prev) => prev + addedCredits);
    }

    setBagItems([]);
    setIsBagOpen(false);

    if (addedCredits > 0) {
      showToast(
        `Compra confirmada! +${addedCredits} Créditos Chez Vous ativados`,
        'A chave "Em Domicílio" já está liberada na sua Gaveta de Agendamento.'
      );
    } else {
      showToast(
        'Pedido confirmado na Boutique Belle Éclat',
        deliveryOption === 'Flagship'
          ? 'Seus produtos estarão separados na recepção da Flagship.'
          : 'Entrega Expressa agendada para seu endereço.'
      );
    }
  };

  const redeemGiftCardCode = (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (!clean) return { success: false, message: 'Insira um código válido.' };
    const amount = clean.includes('460') ? 460 : 380;
    setGiftCardBalance((prev) => prev + amount);
    showToast(
      `Vale-Experiência de R$ ${amount} resgatado!`,
      'O saldo foi adicionado à sua Carteira Belle Éclat.'
    );
    return { success: true, amount };
  };

  const saveNewSkinPlan = (answers) => {
    const generated = buildSkinPlanFromAnswers(answers);
    setSkinPlan(generated);
    syncToSupabase('SKIN_PLAN', generated);
    showToast(
      'Planejamento Facial salvo no Meu Espaço Éclat',
      'Seu cronograma de 6 meses e rotina diária foram sincronizados.'
    );
    return generated;
  };

  const updateCycleDay = (day) => {
    setSkinPlan((prev) => ({
      ...prev,
      cycleDay: day,
    }));
  };

  const bagCount = bagItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <EclatContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        rituaisTab,
        setRituaisTab,
        rituaisCategoryFilter,
        setRituaisCategoryFilter,
        dashboardTab,
        setDashboardTab,
        isClubMember,
        setIsClubMember,
        subscribeToClub,
        chezVousCredits,
        setChezVousCredits,
        giftCardBalance,
        redeemGiftCardCode,
        skinPlan,
        saveNewSkinPlan,
        updateCycleDay,
        appointments,
        setAppointments,
        specialistNotes,
        procedureHistory,
        setProcedureHistory,
        bookingDrawer,
        setBookingDrawer,
        openBookingDrawer,
        closeBookingDrawer,
        toggleBoostInDrawer,
        confirmBooking,
        bagItems,
        isBagOpen,
        setIsBagOpen,
        addToBag,
        addFullRoutineToBag,
        updateBagQuantity,
        removeFromBag,
        checkoutBag,
        bagCount,
        isSearchOpen,
        setIsSearchOpen,
        toast,
        showToast,
      }}
    >
      {children}
    </EclatContext.Provider>
  );
}

export function useEclat() {
  const context = useContext(EclatContext);
  if (!context) {
    throw new Error('useEclat deve ser usado dentro de um EclatProvider');
  }
  return context;
}

