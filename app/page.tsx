'use client'

import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  LockKeyhole,
  Radio,
  ScanLine,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from 'lucide-react'

const steps = [
  { number: '01', label: 'Identity', icon: Building2 },
  { number: '02', label: 'W-9 Baseline', icon: FileText },
  { number: '03', label: 'Insurance', icon: ShieldCheck },
  { number: '04', label: 'Review', icon: ClipboardCheck },
]

const fieldClass = 'h-11 w-full border border-[#8b6a2b] bg-[#0d0e0c] px-3 text-sm text-[#e8b84d] outline-none transition placeholder:text-[#76633b] focus:border-[#f2c45e] focus:shadow-[0_0_14px_rgba(231,174,55,.14)]'

export default function Page() {
  const [activeStep, setActiveStep] = useState(0)
  const [saved, setSaved] = useState(false)
  const [showNotice, setShowNotice] = useState(true)
  const [form, setForm] = useState({ legalName: '', dba: '', taxId: '', entity: 'LLC', carrier: '', policy: '', expiry: '' })

  const completion = useMemo(() => Math.round(((activeStep + (form.legalName && form.taxId ? 1 : 0)) / 5) * 100), [activeStep, form.legalName, form.taxId])
  const update = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [key]: event.target.value })

  return (
    <main className="min-h-screen bg-[#080908] text-[#eee7d3] selection:bg-[#d6a934] selection:text-black">
      <div className="mx-auto min-h-screen max-w-[1500px] border-x border-[#5d481d] bg-[radial-gradient(circle_at_78%_0%,rgba(150,104,22,.09),transparent_28%),linear-gradient(110deg,#090a09,#0d0e0d_52%,#090a09)]">
        <header className="border-b border-[#8b6a2b] bg-[#11120f] px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative grid h-12 w-12 place-items-center border border-[#d1a43d] bg-[#19170f] text-[#e8b84d] shadow-[0_0_18px_rgba(205,153,43,.12)]"><ScanLine size={25} strokeWidth={1.2} /><span className="absolute -bottom-2 bg-[#11120f] px-1 text-[8px] tracking-[.2em]">SSE</span></div>
              <div><p className="text-[10px] font-semibold tracking-[.32em] text-[#b58a32]">SOVEREIGN SYSTEMS / FLEET OPERATIONS</p><h1 className="mt-1 text-lg font-semibold tracking-[.16em] text-[#f3ebd8] sm:text-xl">SUBCONTRACTOR COMPLIANCE ENGINE</h1></div>
            </div>
            <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-[9px] tracking-[.2em] text-[#877750]">CLEARANCE TOKEN</p><p className="font-mono text-sm text-[#e8b84d]">MD.SEL ACTIVE</p></div><div className="grid h-9 w-9 place-items-center border border-[#896b2c] text-[#dcae43]"><LockKeyhole size={16} /></div></div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[250px_1fr]">
          <aside className="border-b border-[#5d481d] bg-[#0b0c0b] p-5 lg:min-h-[calc(100vh-82px)] lg:border-r lg:border-b-0 lg:p-7">
            <div className="mb-8 flex items-center justify-between"><div><p className="text-[9px] tracking-[.25em] text-[#8f7749]">ONBOARDING PROTOCOL</p><p className="mt-2 text-sm font-medium tracking-widest text-[#e1d4b8]">NEW CONTRACTOR</p></div><Radio size={16} className="text-[#d8a638]" /></div>
            <nav className="space-y-2" aria-label="Onboarding steps">{steps.map((step, index) => { const Icon = step.icon; const active = index === activeStep; const done = index < activeStep; return <button key={step.label} onClick={() => setActiveStep(index)} className={`group flex w-full items-center gap-3 border px-3 py-3 text-left transition ${active ? 'border-[#c79b38] bg-[#1a1710] text-[#f3c65b]' : 'border-transparent text-[#766d5a] hover:border-[#55431e] hover:text-[#c0a96d]'}`}><span className={`grid h-7 w-7 place-items-center border text-[10px] font-bold ${done ? 'border-[#9eca70] text-[#9eca70]' : active ? 'border-[#d6a43c] text-[#d6a43c]' : 'border-[#4b4028]'}`}>{done ? <Check size={14} /> : step.number}</span><Icon size={15} strokeWidth={1.5} /><span className="text-xs tracking-wider">{step.label}</span>{active && <ArrowRight size={14} className="ml-auto" />}</button> })}</nav>
            <div className="mt-10 border-t border-[#3d331e] pt-5"><div className="mb-2 flex justify-between text-[9px] tracking-[.2em] text-[#88774f]"><span>RECORD COMPLETION</span><span className="text-[#d8a638]">{completion}%</span></div><div className="h-1 bg-[#2a2519]"><div className="h-full bg-[#d3a438] transition-all" style={{ width: `${Math.max(18, completion)}%` }} /></div><p className="mt-4 text-[10px] leading-relaxed text-[#716853]">All entries are processed within this session. No external transmission is enabled.</p></div>
          </aside>

          <section className="p-5 sm:p-8 lg:p-12">
            {showNotice && <div className="mb-7 flex items-start gap-3 border border-[#80632a] bg-[#17140d] px-4 py-3 text-xs text-[#cdb77e]"><AlertTriangle size={16} className="mt-0.5 shrink-0 text-[#e4b445]" /><p><span className="font-semibold tracking-wider text-[#e4b445]">LOCAL PROCESSING NOTICE:</span> This intake console stores data in the active session only. Validate all source documents before submission to fleet command.</p><button onClick={() => setShowNotice(false)} aria-label="Dismiss notice" className="ml-auto text-[#8e7542] hover:text-[#e3b54c]"><X size={16} /></button></div>}
            <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 font-mono text-[10px] tracking-[.3em] text-[#b18b3c]">DOSSIER // SSCE-2026-00481</p><h2 className="text-3xl font-light tracking-[.08em] text-[#f0e6d0]">Contractor intake</h2><p className="mt-2 max-w-xl text-sm text-[#837963]">Establish a verified compliance record for logistics network access.</p></div><div className="border-l border-[#8b6a2b] pl-4 text-right"><p className="text-[9px] tracking-[.2em] text-[#81734f]">SESSION STATUS</p><p className="mt-1 flex items-center gap-2 text-xs tracking-widest text-[#a8d17d]"><span className="h-1.5 w-1.5 rounded-full bg-[#a8d17d] shadow-[0_0_8px_#a8d17d]" /> ENCRYPTED / LOCAL</p></div></div>

            <div className="border border-[#765a25] bg-[#10110f] shadow-[0_12px_40px_rgba(0,0,0,.24)]">
              <div className="flex items-center justify-between border-b border-[#5f4b23] px-5 py-4"><div className="flex items-center gap-3"><div className="text-[#d7a63d]"><FileCheck2 size={18} /></div><div><h3 className="text-sm tracking-[.15em] text-[#e7d9ba]">{steps[activeStep].label.toUpperCase()} DECLARATION</h3><p className="mt-1 text-[10px] tracking-wider text-[#786d56]">REQUIRED FIELD MARKERS: <span className="text-[#e4af42]">*</span></p></div></div><span className="font-mono text-[10px] text-[#8c794d]">MODULE {steps[activeStep].number} / 04</span></div>
              <div className="p-5 sm:p-8">
                {activeStep === 0 && <div className="space-y-7"><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">LEGAL BUSINESS NAME <span className="text-[#e4af42]">*</span><input value={form.legalName} onChange={update('legalName')} className={fieldClass} placeholder="Enter registered entity" /></label><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">DBA / OPERATING NAME<input value={form.dba} onChange={update('dba')} className={fieldClass} placeholder="If different from legal name" /></label></div><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">ENTITY TYPE<select value={form.entity} onChange={update('entity')} className={fieldClass}><option>LLC</option><option>Corporation</option><option>Sole Proprietor</option><option>Partnership</option></select></label><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">PRIMARY CONTACT<input className={fieldClass} placeholder="Name / title" /></label></div></div>}
                {activeStep === 1 && <div className="space-y-7"><div className="border border-[#3e3522] bg-[#0b0c0b] p-4 text-xs leading-relaxed text-[#958565]">W-9 baseline establishes the payee record used for 1099 reporting. Enter the tax classification exactly as shown on the source document.</div><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">TAXPAYER IDENTIFICATION NUMBER <span className="text-[#e4af42]">*</span><input value={form.taxId} onChange={update('taxId')} className={fieldClass} placeholder="XX-XXXXXXX" /></label><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">FEDERAL TAX CLASSIFICATION<select className={fieldClass}><option>Limited liability company</option><option>Corporation</option><option>Individual / sole proprietor</option></select></label></div><button className="flex items-center gap-3 border border-dashed border-[#a07a2e] px-4 py-4 text-xs tracking-widest text-[#d5a73f] hover:bg-[#1a1710]"><Upload size={16} /> ATTACH SIGNED W-9 <span className="text-[#776a4e]">PDF / JPG, 10MB MAX</span></button></div>}
                {activeStep === 2 && <div className="space-y-7"><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">INSURANCE CARRIER<input value={form.carrier} onChange={update('carrier')} className={fieldClass} placeholder="Carrier legal name" /></label><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">POLICY NUMBER<input value={form.policy} onChange={update('policy')} className={fieldClass} placeholder="Policy reference" /></label></div><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">CERTIFICATE EXPIRY<input type="date" value={form.expiry} onChange={update('expiry')} className={`${fieldClass} [color-scheme:dark]`} /></label><label className="space-y-2 text-[10px] tracking-[.16em] text-[#9b8657]">COVERAGE TIER<select className={fieldClass}><option>Standard freight — $1M</option><option>Hazmat operations — $2M</option><option>Specialty cargo — $5M</option></select></label></div><button className="flex items-center gap-3 border border-dashed border-[#a07a2e] px-4 py-4 text-xs tracking-widest text-[#d5a73f] hover:bg-[#1a1710]"><Upload size={16} /> ATTACH CERTIFICATE OF INSURANCE <span className="text-[#776a4e]">PDF / JPG, 10MB MAX</span></button></div>}
                {activeStep === 3 && <div className="space-y-5"><div className="flex items-center gap-3 border border-[#66804a] bg-[#11180e] p-4 text-sm text-[#b9d891]"><BadgeCheck size={20} /> Ready for local validation. Review the declaration modules before committing this dossier.</div>{[['Identity', form.legalName || 'Awaiting legal business name'], ['W-9 Baseline', form.taxId ? 'Tax ID entered' : 'Awaiting taxpayer ID'], ['Insurance', form.carrier ? `${form.carrier} / ${form.policy || 'Policy pending'}` : 'Awaiting carrier details']].map(([title, value]) => <div key={title} className="flex items-center justify-between border-b border-[#3e3522] py-4"><div><p className="text-[10px] tracking-[.2em] text-[#8f7d55]">{title}</p><p className="mt-1 text-sm text-[#ddd0b6]">{value}</p></div>{value.includes('Awaiting') ? <span className="text-[10px] tracking-widest text-[#a47430]">PENDING</span> : <Check size={17} className="text-[#9dc274]" />}</div>)}</div>}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#5f4b23] bg-[#0c0d0b] px-5 py-4"><p className="font-mono text-[10px] tracking-wider text-[#70674f]">AUTO-SAVE: {saved ? 'RECORDED JUST NOW' : 'STANDBY'}</p><div className="flex gap-3"><button onClick={() => setSaved(true)} className="border border-[#675225] px-4 py-2 text-[10px] tracking-[.16em] text-[#bda36a] hover:bg-[#1b1811]">SAVE SESSION</button><button onClick={() => activeStep < 3 ? setActiveStep(activeStep + 1) : setSaved(true)} className="flex items-center gap-2 bg-[#d2a33a] px-5 py-2 text-[10px] font-bold tracking-[.16em] text-[#161208] hover:bg-[#e6b84d]">{activeStep < 3 ? 'CONTINUE' : 'COMMIT DOSSIER'} <ArrowRight size={14} /></button></div></div>
            </div>
            <footer className="mt-7 flex flex-wrap items-center justify-between gap-3 text-[9px] tracking-[.18em] text-[#605744]"><span>SSCE / CONTROLLED INTERFACE / REV 04.26</span><span className="flex items-center gap-2"><UserRound size={12} /> OPERATOR: MD.SEL</span></footer>
          </section>
        </div>
      </div>
    </main>
  )
}

