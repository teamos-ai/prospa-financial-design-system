import { useMemo, useState } from 'react'
import {
  TAX_BRACKETS_2025_26,
  MEDICARE_LEVY,
  SUPER_GUARANTEE,
  CONCESSIONAL_CAP,
  CONTRIB_TAX,
} from '../data/powerup.js'

const fmt = (n) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(n || 0))
  )
const pct = (n) => `${(n * 100).toFixed(1)}%`

// Reusable labelled input with an optional range slider.
function Field({ label, value, onChange, min, max, step = 1, prefix, suffix, slider = true }) {
  return (
    <div className="calc-field">
      <label>{label}</label>
      <div className="calc-input">
        {prefix && <span className="calc-affix">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        />
        {suffix && <span className="calc-affix suf">{suffix}</span>}
      </div>
      {slider && (
        <input
          type="range"
          className="calc-range"
          value={Math.min(max, Math.max(min, value))}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
        />
      )}
    </div>
  )
}

function Stat({ label, value, big }) {
  return (
    <div className={'calc-stat' + (big ? ' big' : '')}>
      <span className="calc-stat-l">{label}</span>
      <span className="calc-stat-v">{value}</span>
    </div>
  )
}

// 1) Compound growth ----------------------------------------------------------
function CompoundCalc() {
  const [initial, setInitial] = useState(20000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(20)

  const r = rate / 100 / 12
  const n = years * 12
  const fv = r === 0 ? initial + monthly * n : initial * (1 + r) ** n + monthly * (((1 + r) ** n - 1) / r)
  const contributed = initial + monthly * n
  const interest = fv - contributed

  return (
    <div className="calc-grid">
      <div className="calc-inputs">
        <Field label="Starting amount" value={initial} onChange={setInitial} min={0} max={500000} step={1000} prefix="$" />
        <Field label="Monthly contribution" value={monthly} onChange={setMonthly} min={0} max={5000} step={50} prefix="$" />
        <Field label="Annual return" value={rate} onChange={setRate} min={0} max={12} step={0.1} suffix="%" />
        <Field label="Time frame" value={years} onChange={setYears} min={1} max={40} step={1} suffix="yrs" />
      </div>
      <div className="calc-results">
        <Stat label={`Balance after ${years} years`} value={fmt(fv)} big />
        <Stat label="Total contributed" value={fmt(contributed)} />
        <Stat label="Investment growth" value={fmt(interest)} />
      </div>
    </div>
  )
}

// 2) Superannuation projection ------------------------------------------------
function SuperCalc() {
  const [age, setAge] = useState(40)
  const [retire, setRetire] = useState(67)
  const [balance, setBalance] = useState(150000)
  const [salary, setSalary] = useState(110000)
  const [extra, setExtra] = useState(0)
  const [rate, setRate] = useState(6.5)

  const { projected, netContrib, employer, overCap } = useMemo(() => {
    const years = Math.max(0, retire - age)
    const r = rate / 100
    const employerYr = salary * SUPER_GUARANTEE
    const concessional = employerYr + extra
    const netYr = concessional * (1 - CONTRIB_TAX)
    let b = balance
    let totalNet = 0
    for (let y = 0; y < years; y++) {
      b = b * (1 + r) + netYr
      totalNet += netYr
    }
    return { projected: b, netContrib: totalNet, employer: employerYr, overCap: concessional > CONCESSIONAL_CAP }
  }, [age, retire, balance, salary, extra, rate])

  return (
    <div className="calc-grid">
      <div className="calc-inputs">
        <Field label="Current age" value={age} onChange={setAge} min={18} max={70} step={1} suffix="yrs" />
        <Field label="Retirement age" value={retire} onChange={setRetire} min={55} max={75} step={1} suffix="yrs" />
        <Field label="Current super balance" value={balance} onChange={setBalance} min={0} max={2000000} step={5000} prefix="$" />
        <Field label="Annual salary (before tax)" value={salary} onChange={setSalary} min={20000} max={400000} step={5000} prefix="$" />
        <Field label="Extra contributions / yr" value={extra} onChange={setExtra} min={0} max={30000} step={500} prefix="$" />
        <Field label="Annual return" value={rate} onChange={setRate} min={0} max={11} step={0.1} suffix="%" />
      </div>
      <div className="calc-results">
        <Stat label={`Projected balance at ${retire}`} value={fmt(projected)} big />
        <Stat label={`Employer (SG ${pct(SUPER_GUARANTEE)})`} value={`${fmt(employer)}/yr`} />
        <Stat label="Net contributions (after 15% tax)" value={fmt(netContrib)} />
        {overCap && (
          <p className="calc-warn">Heads up: employer + extra contributions exceed the {fmt(CONCESSIONAL_CAP)} concessional cap for 2025–26.</p>
        )}
      </div>
    </div>
  )
}

// 3) Mortgage repayments ------------------------------------------------------
const FREQS = [
  { key: 'monthly', label: 'Monthly', ppy: 12 },
  { key: 'fortnightly', label: 'Fortnightly', ppy: 26 },
  { key: 'weekly', label: 'Weekly', ppy: 52 },
]
function MortgageCalc() {
  const [loan, setLoan] = useState(650000)
  const [rate, setRate] = useState(6.1)
  const [term, setTerm] = useState(30)
  const [freq, setFreq] = useState('monthly')

  const ppy = FREQS.find((f) => f.key === freq).ppy
  const i = rate / 100 / ppy
  const n = term * ppy
  const repay = i === 0 ? loan / n : (loan * i) / (1 - (1 + i) ** -n)
  const totalRepaid = repay * n
  const totalInterest = totalRepaid - loan

  return (
    <div className="calc-grid">
      <div className="calc-inputs">
        <Field label="Loan amount" value={loan} onChange={setLoan} min={50000} max={2000000} step={10000} prefix="$" />
        <Field label="Interest rate" value={rate} onChange={setRate} min={1} max={12} step={0.05} suffix="%" />
        <Field label="Loan term" value={term} onChange={setTerm} min={1} max={30} step={1} suffix="yrs" />
        <div className="calc-field">
          <label>Repayment frequency</label>
          <div className="calc-seg">
            {FREQS.map((f) => (
              <button key={f.key} type="button" className={'calc-seg-btn' + (freq === f.key ? ' on' : '')} onClick={() => setFreq(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="calc-results">
        <Stat label={`${FREQS.find((f) => f.key === freq).label} repayment`} value={fmt(repay)} big />
        <Stat label="Total interest" value={fmt(totalInterest)} />
        <Stat label="Total repaid" value={fmt(totalRepaid)} />
      </div>
    </div>
  )
}

// 4) Income tax 2025-26 -------------------------------------------------------
function incomeTax(x) {
  let tax = 0
  let prev = 0
  for (const b of TAX_BRACKETS_2025_26) {
    if (x > prev) {
      tax += (Math.min(x, b.upTo) - prev) * b.rate
      prev = b.upTo
    } else break
  }
  return tax
}
function lito(x) {
  if (x <= 37500) return 700
  if (x <= 45000) return 700 - (x - 37500) * 0.05
  if (x <= 66667) return Math.max(0, 325 - (x - 45000) * 0.015)
  return 0
}
function medicare(x) {
  const lower = 27222
  const upper = 34027
  if (x <= lower) return 0
  if (x < upper) return Math.min(x * MEDICARE_LEVY, (x - lower) * 0.1)
  return x * MEDICARE_LEVY
}
function TaxCalc() {
  const [income, setIncome] = useState(95000)
  const tax = incomeTax(income)
  const offset = Math.min(tax, lito(income))
  const levy = medicare(income)
  const totalTax = tax - offset + levy
  const takeHome = income - totalTax
  const eff = income > 0 ? totalTax / income : 0

  return (
    <div className="calc-grid">
      <div className="calc-inputs">
        <Field label="Taxable income (per year)" value={income} onChange={setIncome} min={0} max={400000} step={1000} prefix="$" />
        <div className="calc-breakdown">
          <Stat label="Income tax" value={`− ${fmt(tax)}`} />
          <Stat label="Low income offset (LITO)" value={`+ ${fmt(offset)}`} />
          <Stat label={`Medicare levy (${pct(MEDICARE_LEVY)})`} value={`− ${fmt(levy)}`} />
        </div>
      </div>
      <div className="calc-results">
        <Stat label="Take-home pay" value={fmt(takeHome)} big />
        <Stat label="Monthly take-home" value={`${fmt(takeHome / 12)}/mo`} />
        <Stat label="Total tax" value={fmt(totalTax)} />
        <Stat label="Effective tax rate" value={pct(eff)} />
      </div>
    </div>
  )
}

const TABS = [
  { key: 'compound', label: 'Compound Growth', el: CompoundCalc },
  { key: 'super', label: 'Superannuation', el: SuperCalc },
  { key: 'mortgage', label: 'Mortgage', el: MortgageCalc },
  { key: 'tax', label: 'Income Tax', el: TaxCalc },
]

export default function Calculators() {
  const [tab, setTab] = useState('compound')
  const Active = TABS.find((t) => t.key === tab).el

  return (
    <div className="calc">
      <div className="calc-tabs" role="tablist" aria-label="Calculators">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={'calc-tab' + (tab === t.key ? ' on' : '')}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="calc-panel" role="tabpanel">
        <Active />
      </div>
      <p className="calc-disclaimer">
        Estimates only, for illustration. Figures use 2025–26 Australian rates and don’t account for
        every personal circumstance. General advice only — speak with a Prospa adviser before acting.
      </p>
    </div>
  )
}
