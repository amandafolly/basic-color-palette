import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDownLeft, ArrowRight, ArrowUpRight, BookOpen, Check,
  ChevronRight, CircleHelp, Clock3, CreditCard, GraduationCap,
  History, LayoutDashboard, LogOut, Moon, ShieldCheck, Sun,
  UserRound, Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal do Aluno | BolsaID" },
      { name: "description", content: "Acompanhe sua bolsa, mensalidades e histórico acadêmico no portal demonstrativo BolsaID." },
      { property: "og:title", content: "Portal do Aluno | BolsaID" },
      { property: "og:description", content: "Portal demonstrativo para acompanhar bolsa, mensalidades e histórico acadêmico." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StudentPortal,
});

type Section = "inicio" | "pagamento" | "historico" | "perfil";
const nav = [
  { id: "inicio", label: "Início", icon: LayoutDashboard },
  { id: "pagamento", label: "Pagamento", icon: CreditCard },
  { id: "historico", label: "Histórico", icon: History },
  { id: "perfil", label: "Perfil", icon: UserRound },
] as const;

function StudentPortal() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [signedIn, setSignedIn] = useState(false);
  const [section, setSection] = useState<Section>("inicio");
  const [paymentStep, setPaymentStep] = useState<"idle" | "confirm" | "paid">("idle");

  const changeSection = (next: Section) => {
    setSection(next);
    if (next !== "pagamento" && paymentStep === "confirm") setPaymentStep("idle");
  };
  const themeButton = (
    <Button variant="outline" size="icon" aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"} title={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="shrink-0 border-border bg-card text-foreground shadow-none hover:bg-muted">
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-200">
        {!signedIn ? (
          <div className="flex min-h-screen flex-col">
            <header className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-10">
              <Brand />
              {themeButton}
            </header>
            <main className="flex flex-1 items-center justify-center px-5 py-12">
              <div className="w-full max-w-[430px]">
                <div className="mb-10 flex size-14 items-center justify-center rounded-lg border border-border bg-card text-primary"><GraduationCap className="size-7" strokeWidth={1.7} /></div>
                <p className="mb-3 text-xs font-semibold uppercase text-primary">Acesso do estudante</p>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">BolsaID<br />Portal do Aluno</h1>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">Sua bolsa, seus pagamentos e seu histórico em um só lugar.</p>
                <div className="mt-9 border-t border-border pt-7">
                  <Button size="lg" onClick={() => { setSignedIn(true); setSection("inicio"); }} className="h-12 w-full justify-between rounded-md px-5 text-sm shadow-none">
                    Entrar com e-mail institucional / Google <ArrowRight />
                  </Button>
                  <div className="mt-5 flex items-start gap-3 text-xs leading-5 text-muted-foreground">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-positive" />
                    <p>O acesso e o identificador da conta são simulados nesta demonstração. Nenhuma carteira ou conta blockchain é conectada ou criada.</p>
                  </div>
                </div>
              </div>
            </main>
            <footer className="px-6 pb-6 text-center text-xs text-muted-foreground">Ambiente demonstrativo · Nenhum valor real é movimentado</footer>
          </div>
        ) : (
          <div className="min-h-screen lg:pl-[248px]">
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-[248px] flex-col border-r border-border bg-sidebar px-4 py-7 lg:flex">
              <div className="px-3"><Brand /></div>
              <div className="mt-12 px-3 text-[11px] font-semibold uppercase text-muted-foreground">Área do aluno</div>
              <nav className="mt-4 flex flex-col gap-1" aria-label="Navegação principal">
                {nav.map(({ id, label, icon: Icon }) => (
                  <Button key={id} variant="ghost" onClick={() => changeSection(id)} aria-current={section === id ? "page" : undefined} className={`h-11 w-full justify-start gap-3 px-3 shadow-none ${section === id ? "bg-sidebar-accent text-primary hover:bg-sidebar-accent" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"}`}>
                    <Icon className="size-[18px]" strokeWidth={1.8} />{label}
                  </Button>
                ))}
              </nav>
              <div className="mt-auto border-t border-border pt-5">
                <div className="mb-4 flex items-center gap-3 px-3"><div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-secondary-foreground">AS</div><div className="min-w-0"><div className="truncate text-sm font-medium">Ana Santos</div><div className="text-xs text-muted-foreground">Estudante</div></div></div>
                <Button variant="ghost" onClick={() => { setSignedIn(false); setSection("inicio"); setPaymentStep("idle"); }} className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-foreground"><LogOut /> Sair</Button>
              </div>
            </aside>

            <header className="sticky top-0 z-10 border-b border-border bg-background">
              <div className="mx-auto flex h-[76px] max-w-[1380px] items-center justify-between gap-3 px-5 sm:px-8 lg:px-12">
                <div className="lg:hidden"><Brand /></div>
                <div className="hidden lg:block"><span className="text-sm text-muted-foreground">Portal do Aluno</span><span className="mx-2 text-muted-foreground">/</span><span className="text-sm font-medium">{nav.find((item) => item.id === section)?.label}</span></div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground sm:flex"><Wallet className="size-4 text-primary" /><span>Identificador de demonstração: <strong className="font-medium text-foreground">BG-7X3PQ</strong></span></div>
                  {themeButton}
                  <Button variant="outline" size="icon" className="border-border bg-card shadow-none hover:bg-muted lg:hidden" aria-label="Sair" title="Sair" onClick={() => { setSignedIn(false); setSection("inicio"); setPaymentStep("idle"); }}><LogOut /></Button>
                </div>
              </div>
              <nav className="mx-auto flex max-w-[1380px] overflow-x-auto border-t border-border px-3 sm:px-6 lg:hidden" aria-label="Navegação principal">
                {nav.map(({ id, label, icon: Icon }) => (
                  <Button key={id} variant="ghost" onClick={() => changeSection(id)} aria-current={section === id ? "page" : undefined} className={`h-12 min-w-max shrink-0 gap-2 rounded-none border-b-2 px-3 text-xs shadow-none sm:px-5 ${section === id ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}><Icon className="size-4" />{label}</Button>
                ))}
              </nav>
            </header>

            <main className="mx-auto max-w-[1380px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-12">
              <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
                <div><p className="mb-2 text-xs font-medium uppercase text-muted-foreground">{section === "inicio" ? "Visão geral" : "Portal do aluno"}</p><h1 className="text-[28px] font-semibold leading-tight sm:text-[34px]">{section === "inicio" ? "Olá, Ana!" : nav.find((item) => item.id === section)?.label}</h1><p className="mt-2 text-sm text-muted-foreground">{section === "inicio" ? "Aqui está o resumo da sua vida acadêmica e financeira." : section === "pagamento" ? "Confira sua mensalidade e o desconto da bolsa." : section === "historico" ? "Seus pagamentos e renovações em um só lugar." : "Seus dados acadêmicos e seu identificador de demonstração."}</p></div>
                <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground"><CircleHelp className="size-4" /> Ambiente demonstrativo</span>
              </div>

              {section === "inicio" && <>
                <div className="grid gap-4 md:grid-cols-3">
                  <Snapshot icon={GraduationCap} label="Perfil acadêmico" value="ProUni 50%" note="ana.santos@aurora.edu.br" badge="Bolsa ativa" />
                  <Snapshot icon={Clock3} label="Próxima renovação" value="10 dez 2026" note="Semestre 2027.1" />
                  <Snapshot icon={ArrowDownLeft} label="Desconto recebido no mês" value="R$ 50" note="Com sua bolsa de estudos" />
                </div>
                <div className="mt-9 grid gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(270px,1fr)]">
                  <Invoice paymentStep={paymentStep} setPaymentStep={setPaymentStep} />
                  <div className="min-w-0"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-semibold">Atividade recente</h2><Button variant="link" onClick={() => changeSection("historico")} className="h-auto p-0 text-xs">Ver histórico <ArrowRight /></Button></div><Activity paid={paymentStep === "paid"} compact /></div>
                </div>
              </>}

              {section === "pagamento" && <div className="max-w-[800px]"><Invoice paymentStep={paymentStep} setPaymentStep={setPaymentStep} /></div>}

              {section === "historico" && <div className="max-w-[1000px] space-y-9"><div><h2 className="mb-5 text-lg font-semibold">Pagamentos</h2><Activity paid={paymentStep === "paid"} /></div><div><h2 className="mb-5 text-lg font-semibold">Renovações da bolsa</h2><div className="overflow-hidden rounded-md border border-border bg-card"><HistoryRow title="Semestre 2026.2" subtitle="Bolsa ProUni 50% renovada" date="10 jun 2026" /><HistoryRow title="Semestre 2026.1" subtitle="Bolsa ProUni 50% renovada" date="12 dez 2025" last /></div></div></div>}

              {section === "perfil" && <div className="max-w-[840px]"><div className="grid gap-4 sm:grid-cols-2"><InfoCard label="Nome completo" value="Ana Santos" icon={UserRound} /><InfoCard label="E-mail institucional" value="ana.santos@aurora.edu.br" icon={BookOpen} /><InfoCard label="Bolsa de estudos" value="ProUni 50%" icon={GraduationCap} /><InfoCard label="Identificador de demonstração" value="BG-7X3PQ" icon={Wallet} /></div><div className="mt-6 flex items-start gap-3 border-t border-border pt-6 text-sm leading-6 text-muted-foreground"><ShieldCheck className="mt-1 size-4 shrink-0 text-positive" /><p>Nesta versão, a credencial e o identificador são apenas ilustrativos. Nenhum dado foi verificado na blockchain.</p></div></div>}
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

function Brand() {
  return <div className="flex items-center gap-2.5"><div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><GraduationCap className="size-5" strokeWidth={2} /></div><span className="text-[17px] font-bold">BolsaID<span className="text-primary">.</span></span></div>;
}

function Snapshot({ icon: Icon, label, value, note, badge }: { icon: typeof GraduationCap; label: string; value: string; note: string; badge?: string }) {
  return <div className="min-w-0 rounded-md border border-border bg-card p-5 sm:p-6"><div className="mb-7 flex items-start justify-between"><span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary"><Icon className="size-[18px]" strokeWidth={1.8} /></span>{badge && <span className="rounded border border-positive/30 bg-positive/10 px-2 py-1 text-[11px] font-medium text-positive">{badge}</span>}</div><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-2 break-words text-[22px] font-semibold leading-tight sm:text-2xl">{value}</p><p className="mt-2 break-all text-xs text-muted-foreground">{note}</p></div>;
}

function Invoice({ paymentStep, setPaymentStep }: { paymentStep: "idle" | "confirm" | "paid"; setPaymentStep: (step: "idle" | "confirm" | "paid") => void }) {
  return <section className="min-w-0 rounded-md border border-border bg-card p-5 sm:p-7" aria-label="Fatura da mensalidade">
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-6"><div><div className="mb-2 flex size-10 items-center justify-center rounded-md bg-secondary text-primary"><CreditCard className="size-5" /></div><h2 className="mt-4 text-lg font-semibold">Fatura da mensalidade</h2><p className="mt-1 text-xs text-muted-foreground">Referência: outubro de 2026</p></div><span className={`rounded border px-2.5 py-1.5 text-xs font-medium ${paymentStep === "paid" ? "border-positive/30 bg-positive/10 text-positive" : "border-border bg-muted text-muted-foreground"}`}>{paymentStep === "paid" ? "Pago na demonstração" : "Aguardando pagamento"}</span></div>
    <div className="space-y-5 py-6"><div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Mensalidade base</span><span className="font-medium">R$ 1.000</span></div><div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Desconto da bolsa (50%)</span><span className="font-medium text-positive">− R$ 500</span></div><div className="flex items-start gap-2.5 rounded-md border border-positive/25 bg-positive/5 px-3 py-3 text-xs leading-5 text-positive"><ShieldCheck className="mt-0.5 size-4 shrink-0" /><span>Credencial de bolsa 50% · verificação simulada</span></div></div>
    <div className="flex items-end justify-between gap-3 border-t border-border pt-5"><span className="text-sm font-medium">Total a pagar</span><span className="text-2xl font-semibold sm:text-[28px]">R$ 500</span></div>
    {paymentStep === "confirm" ? <div className="mt-7 rounded-md border border-border bg-muted p-4"><p className="text-sm font-semibold">Confirmar pagamento de exemplo?</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Esta ação apenas altera a demonstração. Nenhum valor será transferido.</p><div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => setPaymentStep("paid")} className="shadow-none"><Check /> Confirmar simulação</Button><Button variant="outline" onClick={() => setPaymentStep("idle")} className="bg-card shadow-none">Cancelar</Button></div></div> : paymentStep === "paid" ? <div className="mt-7 flex items-center gap-2 rounded-md border border-positive/30 bg-positive/10 px-4 py-3 text-sm font-medium text-positive"><Check className="size-4" /> Pagamento demonstrativo registrado no histórico</div> : <Button size="lg" onClick={() => setPaymentStep("confirm")} className="mt-7 h-12 w-full justify-between px-5 shadow-none"><span className="flex items-center gap-2"><Wallet className="size-4" /> Simular pagamento de R$ 500</span><ChevronRight /></Button>}
    <p className="mt-4 text-center text-[11px] text-muted-foreground">Simulação · Não realiza transações reais</p>
  </section>;
}

function Activity({ paid, compact = false }: { paid: boolean; compact?: boolean }) {
  return <div className="overflow-hidden rounded-md border border-border bg-card">
    {paid && <HistoryRow icon={Check} title="Mensalidade · out 2026" subtitle="R$ 500 · ID demonstrativo: BG-OUT26" date="Hoje" success />}
    <HistoryRow icon={ArrowUpRight} title="Mensalidade · set 2026" subtitle="R$ 500 · ID demonstrativo: BG-SET26" date="10 set 2026" success />
    <HistoryRow icon={ArrowUpRight} title="Mensalidade · ago 2026" subtitle="R$ 500 · ID demonstrativo: BG-AGO26" date="10 ago 2026" success={false} />
    {!compact && <HistoryRow icon={ArrowUpRight} title="Mensalidade · jul 2026" subtitle="R$ 500 · ID demonstrativo: BG-JUL26" date="10 jul 2026" success={false} last />}
    {compact && <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">Registros ilustrativos, sem transações on-chain.</div>}
  </div>;
}

function HistoryRow({ icon: Icon = ShieldCheck, title, subtitle, date, success = true, last = false }: { icon?: typeof ShieldCheck; title: string; subtitle: string; date: string; success?: boolean; last?: boolean }) {
  return <div className={`flex items-center gap-3 px-4 py-4 sm:px-5 ${last ? "" : "border-b border-border"}`}><div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-positive/10 text-positive"><Icon className="size-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{title}</p><p className="mt-1 break-words text-xs text-muted-foreground">{subtitle}</p></div><div className="shrink-0 text-right"><span className="block text-xs text-muted-foreground">{date}</span><span className="mt-1 block text-[11px] font-medium text-positive">{success ? "Concluído" : "Registrado"}</span></div></div>;
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof UserRound; label: string; value: string }) {
  return <div className="min-w-0 rounded-md border border-border bg-card p-5"><Icon className="mb-6 size-5 text-primary" strokeWidth={1.8} /><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 break-all text-base font-medium">{value}</p></div>;
}