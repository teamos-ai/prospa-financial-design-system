import { useMemo, useState } from 'react'
import {
  TAX_BRACKETS_2025_26,
  MEDICARE_LEVY,
  SUPER_GUARANTEE,
  CONCESSIONAL_CAP,
  CONTRIB_TAX,
} from '../data/powerup.js'
import { Donut, Legend, Bars, Sparkline, PALETTE } from './charts.jsx'

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

// Image drop slot — drop a file at public/calc/<k>.jpg and it appears here.
function ImageSlot({ k }) {
  const [status, setStatus] = useState('loading')
  return (
    <div className={'calc-img' + (status === 'ok' ? ' has-img' : '')}>
      <img
        src={`/calc/${k}.jpg`}
        alt=""
        aria-hidden="true"
        onLoad={() => setStatus('ok')}
        onError={() => setStatus('missing')}
        style={{ display: status === 'ok' ? 'block' : 'none' }}
      />
      {status === 'ok' ? (
        <span className="calc-img-tag">calc/{k}.jpg</span>
      ) : (
        <div className="calc-img-ph">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.6" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <b>Drop a background image</b>
          <span>
            nature · glossy · blurred — <code>public/calc/{k}.jpg</code>
          </span>
        </div>
      )}
    </div>
  )
}

function HeroStat({ label, value, delta, deltaEmber, spark }) {
  return (
    <div className="bento-card bento-hero">
      <div className="hero-top">
        <span className="hero-label">{label}</span>
        {delta && <span className={'hero-delta' + (deltaEmber ? ' ember' : '')}>{delta}</span>}
      </div>
      <div className="hero-value">{value}</div>
      {spark && <div className="hero-spark">{spark}</div>}
    </div>
  )
}

function Bento({ imgKey, inputs, hero, donut, bars }) {
  return (
    <div className="calc-bento">
      <div className="bento-card bento-inputs">
        <div className="bento-h">Your numbers</div>
        {inputs}
      </div>
      {hero}
      <div className="bento-card bento-donut">{donut}</div>
      <div className="bento-card bento-bars">{bars}</div>
      <ImageSlot k={imgKey} />
    </div>
  )
}

// 1) Compound growth ----------------------------------------------------------
function CompoundCalc() {
  const [initial, setInitial] = useState(20000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(20)

  const { fv, contributed, interest, series } = useMemo(() => {
    const r = rate / 100 / 12
    let b = initial
    const s = [b]
    for (let y = 0; y < years; y++) {
      for (let m = 0; m < 12; m++) b = b * (1 + r) + monthly
      s.push(b)
    }
    const contrib = initial + monthly * years * 12
    return { fv: b, contributed: contrib, interest: b - contrib, series: s }
  }, [initial, monthly, rate, years])

  const segs = [
    { label: 'Starting', value: initial, color: PALETTE.teal, display: fmt(initial) },
    { label: 'Contributions', value: monthly * years * 12, color: PALETTE.green, display: fmt(monthly * years * 12) },
    { label: 'Growth', value: interest, color: PALETTE.ember, display: fmt(interest) },
  ]

  return (
    <Bento
      imgKey="compound"
      inputs={
        <>
          <Field label="Starting amount" value={initial} onChange={setInitial} min={0} max={500000} step={1000} prefix="$" />
          <Field label="Monthly contribution" value={monthly} onChange={setMonthly} min={0} max={5000} step={50} prefix="$" />
          <Field label="Annual return" value={rate} onChange={setRate} min={0} max={12} step={0.1} suffix="%" />
          <Field label="Time frame" value={years} onChange={setYears} min={1} max={40} step={1} suffix="yrs" />
        </>
      }
      hero={
        <HeroStat
          label={`Balance after ${years} years`}
          value={fmt(fv)}
          delta={`+${Math.round((interest / Math.max(1, contributed)) * 100)}% growth`}
          spark={<Sparkline points={series} color="#8fe06a" />}
        />
      }
      donut={
        <>
          <div className="bento-h">What makes it up</div>
          <div className="donut-wrap">
            <Donut segments={segs} label="Balance" value={fmt(fv)} />
            <Legend items={segs} />
          </div>
        </>
      }
      bars={
        <>
          <div className="bento-h">Contributed vs growth</div>
          <Bars
            items={[
              { label: 'Total contributed', value: contributed, display: fmt(contributed), color: PALETTE.teal },
              { label: 'Investment growth', value: interest, display: fmt(interest), color: PALETTE.ember },
            ]}
          />
        </>
      }
    />
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

  const { projected, employer, netContrib, growth, series, overCap } = useMemo(() => {
    const years = Math.max(0, retire - age)
    const r = rate / 100
    const employerYr = salary * SUPER_GUARANTEE
    const concessional = employerYr + extra
    const netYr = concessional * (1 - CONTRIB_TAX)
    let b = balance
    const s = [b]
    let totalNet = 0
    for (let y = 0; y < years; y++) {
      b = b * (1 + r) + netYr
      totalNet += netYr
      s.push(b)
    }
    return { projected: b, employer: employerYr, netContrib: totalNet, growth: b - balance - totalNet, series: s, overCap: concessional > CONCESSIONAL_CAP }
  }, [age, retire, balance, salary, extra, rate])

  const segs = [
    { label: 'Today’s balance', value: balance, color: PALETTE.teal, display: fmt(balance) },
    { label: 'Net contributions', value: netContrib, color: PALETTE.green, display: fmt(netContrib) },
    { label: 'Investment growth', value: growth, color: PALETTE.ember, display: fmt(growth) },
  ]

  return (
    <Bento
      imgKey="super"
      inputs={
        <>
          <Field label="Current age" value={age} onChange={setAge} min={18} max={70} step={1} suffix="yrs" />
          <Field label="Retirement age" value={retire} onChange={setRetire} min={55} max={75} step={1} suffix="yrs" />
          <Field label="Current super balance" value={balance} onChange={setBalance} min={0} max={2000000} step={5000} prefix="$" />
          <Field label="Annual salary (before tax)" value={salary} onChange={setSalary} min={20000} max={400000} step={5000} prefix="$" />
          <Field label="Extra contributions / yr" value={extra} onChange={setExtra} min={0} max={30000} step={500} prefix="$" />
          <Field label="Annual return" value={rate} onChange={setRate} min={0} max={11} step={0.1} suffix="%" />
        </>
      }
      hero={
        <HeroStat
          label={`Projected balance at ${retire}`}
          value={fmt(projected)}
          delta={`SG ${pct(SUPER_GUARANTEE)} included`}
          spark={<Sparkline points={series} color="#8fe06a" />}
        />
      }
      donut={
        <>
          <div className="bento-h">How it builds</div>
          <div className="donut-wrap">
            <Donut segments={segs} label={`At ${retire}`} value={fmt(projected)} />
            <Legend items={segs} />
          </div>
        </>
      }
      bars={
        <>
          <div className="bento-h">Yearly contributions</div>
          <Bars
            items={[
              { label: `Employer (SG ${pct(SUPER_GUARANTEE)})`, value: employer, display: `${fmt(employer)}/yr`, color: PALETTE.teal },
              { label: 'Your extra', value: extra, display: `${fmt(extra)}/yr`, color: PALETTE.ember },
            ]}
          />
          {overCap && <p className="calc-warn">Over the {fmt(CONCESSIONAL_CAP)} concessional cap for 2025–26.</p>}
        </>
      }
    />
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

  // Remaining-balance paydown curve (yearly).
  const series = useMemo(() => {
    const mi = rate / 100 / 12
    const mn = term * 12
    const mRepay = mi === 0 ? loan / mn : (loan * mi) / (1 - (1 + mi) ** -mn)
    let bal = loan
    const s = [bal]
    for (let y = 0; y < term; y++) {
      for (let m = 0; m < 12; m++) bal = Math.max(0, bal + bal * mi - mRepay)
      s.push(bal)
    }
    return s
  }, [loan, rate, term])

  const segs = [
    { label: 'Principal', value: loan, color: PALETTE.teal, display: fmt(loan) },
    { label: 'Interest', value: totalInterest, color: PALETTE.ember, display: fmt(totalInterest) },
  ]

  return (
    <Bento
      imgKey="mortgage"
      inputs={
        <>
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
        </>
      }
      hero={
        <HeroStat
          label={`${FREQS.find((f) => f.key === freq).label} repayment`}
          value={fmt(repay)}
          delta={`over ${term} years`}
          spark={<Sparkline points={series} color="#8fe06a" />}
        />
      }
      donut={
        <>
          <div className="bento-h">Principal vs interest</div>
          <div className="donut-wrap">
            <Donut segments={segs} label="Total repaid" value={fmt(totalRepaid)} />
            <Legend items={segs} />
          </div>
        </>
      }
      bars={
        <>
          <div className="bento-h">Cost of the loan</div>
          <Bars
            items={[
              { label: 'Principal', value: loan, display: fmt(loan), color: PALETTE.teal },
              { label: 'Total interest', value: totalInterest, display: fmt(totalInterest), color: PALETTE.ember },
            ]}
          />
        </>
      }
    />
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

  const segs = [
    { label: 'Take-home', value: takeHome, color: PALETTE.green, display: fmt(takeHome) },
    { label: 'Income tax', value: tax - offset, color: PALETTE.teal, display: fmt(tax - offset) },
    { label: 'Medicare levy', value: levy, color: PALETTE.ember, display: fmt(levy) },
  ]

  return (
    <Bento
      imgKey="tax"
      inputs={
        <>
          <Field label="Taxable income (per year)" value={income} onChange={setIncome} min={0} max={400000} step={1000} prefix="$" />
          <div className="calc-mini">
            <div className="calc-mini-row">
              <span>Monthly take-home</span>
              <b>{fmt(takeHome / 12)}</b>
            </div>
            <div className="calc-mini-row">
              <span>Effective tax rate</span>
              <b>{pct(eff)}</b>
            </div>
          </div>
        </>
      }
      hero={
        <HeroStat label="Take-home pay" value={fmt(takeHome)} delta={`${pct(eff)} effective rate`} deltaEmber />
      }
      donut={
        <>
          <div className="bento-h">Where your income goes</div>
          <div className="donut-wrap">
            <Donut segments={segs} label="Income" value={fmt(income)} />
            <Legend items={segs} />
          </div>
        </>
      }
      bars={
        <>
          <div className="bento-h">Tax breakdown</div>
          <Bars
            items={[
              { label: 'Income tax', value: tax, display: fmt(tax), color: PALETTE.teal },
              { label: 'Medicare levy', value: levy, display: fmt(levy), color: PALETTE.ember },
              { label: 'Low income offset', value: offset, display: `+ ${fmt(offset)}`, color: PALETTE.green },
            ]}
          />
        </>
      }
    />
  )
}

// 5) Retirement needs ---------------------------------------------------------
const PLAN_TO_AGE = 90 // draw the plan down to this age
const RET_INFLATION = 0.025 // assumed long-run inflation (today's-dollar view)
function RetirementCalc() {
  const [age, setAge] = useState(40)
  const [retire, setRetire] = useState(67)
  const [income, setIncome] = useState(70000)
  const [balance, setBalance] = useState(200000)
  const [contrib, setContrib] = useState(15000)
  const [rate, setRate] = useState(6.5)

  const {
    projected,
    needed,
    gap,
    onTrack,
    coverage,
    sustainable,
    yearsToRetire,
    retirementYears,
    contributed,
    growth,
    series,
  } = useMemo(() => {
    // Work in today's dollars: use a real return so the desired income and the
    // projected balance are directly comparable.
    const rr = (1 + rate / 100) / (1 + RET_INFLATION) - 1
    const yToR = Math.max(0, retire - age)
    const rYears = Math.max(1, PLAN_TO_AGE - retire)
    let b = balance
    const s = [b]
    for (let y = 0; y < yToR; y++) {
      b = b * (1 + rr) + contrib
      s.push(b)
    }
    // Capital needed = present value (at retirement) of the desired income drawn
    // down over the retirement years, earning the real return.
    const annuity = rr === 0 ? rYears : (1 - (1 + rr) ** -rYears) / rr
    const need = income * annuity
    const contribTotal = contrib * yToR
    return {
      projected: b,
      needed: need,
      gap: b - need,
      onTrack: b >= need,
      coverage: need > 0 ? b / need : 1,
      sustainable: annuity > 0 ? b / annuity : 0,
      yearsToRetire: yToR,
      retirementYears: rYears,
      contributed: contribTotal,
      growth: Math.max(0, b - balance - contribTotal),
      series: s,
    }
  }, [age, retire, income, balance, contrib, rate])

  const segs = [
    { label: 'Today’s savings', value: balance, color: PALETTE.teal, display: fmt(balance) },
    { label: 'Future contributions', value: contributed, color: PALETTE.green, display: fmt(contributed) },
    { label: 'Investment growth', value: growth, color: PALETTE.ember, display: fmt(growth) },
  ]

  return (
    <Bento
      imgKey="retirement"
      inputs={
        <>
          <Field label="Current age" value={age} onChange={setAge} min={18} max={70} step={1} suffix="yrs" />
          <Field label="Retirement age" value={retire} onChange={setRetire} min={55} max={75} step={1} suffix="yrs" />
          <Field label="Desired income / yr (today’s $)" value={income} onChange={setIncome} min={20000} max={200000} step={1000} prefix="$" />
          <Field label="Current savings & super" value={balance} onChange={setBalance} min={0} max={3000000} step={5000} prefix="$" />
          <Field label="Annual contributions (incl. super)" value={contrib} onChange={setContrib} min={0} max={100000} step={500} prefix="$" />
          <Field label="Annual return" value={rate} onChange={setRate} min={0} max={11} step={0.1} suffix="%" />
          <div className="calc-mini">
            <div className="calc-mini-row">
              <span>Years until retirement</span>
              <b>{yearsToRetire} yrs · {retirementYears} in retirement</b>
            </div>
            <div className="calc-mini-row">
              <span>Income it could fund</span>
              <b>{fmt(sustainable)}/yr</b>
            </div>
          </div>
        </>
      }
      hero={
        <HeroStat
          label={`Projected at ${retire} (today’s $)`}
          value={fmt(projected)}
          delta={onTrack ? 'On track' : `Short ${fmt(-gap)}`}
          deltaEmber={!onTrack}
          spark={<Sparkline points={series} color="#8fe06a" />}
        />
      }
      donut={
        <>
          <div className="bento-h">What builds your nest egg</div>
          <div className="donut-wrap">
            <Donut segments={segs} label="Projected" value={fmt(projected)} />
            <Legend items={segs} />
          </div>
        </>
      }
      bars={
        <>
          <div className="bento-h">Projected vs target</div>
          <Bars
            items={[
              { label: 'Projected balance', value: projected, display: fmt(projected), color: PALETTE.green },
              { label: 'Target needed', value: needed, display: fmt(needed), color: PALETTE.teal },
            ]}
          />
          <p className={'calc-warn' + (onTrack ? ' ok' : '')}>
            {onTrack
              ? `On track — projected to cover about ${Math.round(coverage * 100)}% of your target, a surplus of ${fmt(gap)}.`
              : `Projected to cover about ${Math.round(coverage * 100)}% of your target — a shortfall of ${fmt(-gap)}. Lifting contributions or retiring a little later can close the gap.`}
          </p>
        </>
      }
    />
  )
}

// 6) Budget & cash flow -------------------------------------------------------
const DEBT_BUFFER = 0.8 // share of surplus a lender would let you commit to new debt
const NEW_LOAN_TERM = 30 // years, for the borrowing-power estimate
function BudgetCalc() {
  const [income, setIncome] = useState(7000)
  const [housing, setHousing] = useState(2200)
  const [essentials, setEssentials] = useState(1800)
  const [lifestyle, setLifestyle] = useState(1200)
  const [debt, setDebt] = useState(400)
  const [rate, setRate] = useState(9.0)

  const expenses = housing + essentials + lifestyle + debt
  const surplus = income - expenses
  const savingsRate = income > 0 ? surplus / income : 0
  const available = Math.max(0, surplus) * DEBT_BUFFER
  const i = rate / 100 / 12
  const n = NEW_LOAN_TERM * 12
  const borrowingPower = i === 0 ? available * n : (available * (1 - (1 + i) ** -n)) / i

  const signed = (v) => (v < 0 ? `−${fmt(Math.abs(v))}` : fmt(v))

  const segs = [
    { label: 'Housing', value: housing, color: PALETTE.teal, display: fmt(housing) },
    { label: 'Living essentials', value: essentials, color: PALETTE.tealSoft, display: fmt(essentials) },
    { label: 'Lifestyle', value: lifestyle, color: PALETTE.ember, display: fmt(lifestyle) },
    { label: 'Debt repayments', value: debt, color: PALETTE.tealDeep, display: fmt(debt) },
    { label: 'Surplus', value: Math.max(0, surplus), color: PALETTE.green, display: signed(surplus) },
  ]

  return (
    <Bento
      imgKey="budget"
      inputs={
        <>
          <Field label="Net monthly income" value={income} onChange={setIncome} min={0} max={30000} step={100} prefix="$" />
          <Field label="Housing (rent / mortgage)" value={housing} onChange={setHousing} min={0} max={15000} step={50} prefix="$" />
          <Field label="Living essentials" value={essentials} onChange={setEssentials} min={0} max={10000} step={50} prefix="$" />
          <Field label="Lifestyle & discretionary" value={lifestyle} onChange={setLifestyle} min={0} max={10000} step={50} prefix="$" />
          <Field label="Existing debt repayments" value={debt} onChange={setDebt} min={0} max={10000} step={50} prefix="$" />
          <Field label="New-loan rate (incl. buffer)" value={rate} onChange={setRate} min={0} max={15} step={0.1} suffix="%" />
          <div className="calc-mini">
            <div className="calc-mini-row">
              <span>Savings rate</span>
              <b>{pct(savingsRate)}</b>
            </div>
            <div className="calc-mini-row">
              <span>Est. borrowing power</span>
              <b>{fmt(borrowingPower)}</b>
            </div>
          </div>
        </>
      }
      hero={
        <HeroStat
          label={surplus >= 0 ? 'Monthly surplus' : 'Monthly shortfall'}
          value={signed(surplus)}
          delta={`${pct(savingsRate)} of income`}
          deltaEmber={surplus < 0}
          spark={
            <Sparkline
              points={[income, income - housing, income - housing - essentials, income - housing - essentials - lifestyle, surplus]}
              color="#8fe06a"
            />
          }
        />
      }
      donut={
        <>
          <div className="bento-h">Where your money goes</div>
          <div className="donut-wrap">
            <Donut segments={segs} label="Income" value={fmt(income)} />
            <Legend items={segs} />
          </div>
        </>
      }
      bars={
        <>
          <div className="bento-h">Monthly cash flow</div>
          <Bars
            items={[
              { label: 'Income', value: income, display: fmt(income), color: PALETTE.green },
              { label: 'Total expenses', value: expenses, display: fmt(expenses), color: PALETTE.teal },
              { label: surplus >= 0 ? 'Surplus' : 'Shortfall', value: Math.max(0, surplus), display: signed(surplus), color: PALETTE.ember },
            ]}
          />
          <p className={'calc-warn' + (surplus > 0 ? ' ok' : '')}>
            {surplus > 0
              ? `You could direct ${fmt(available)}/mo to goals — serviceable extra borrowing ≈ ${fmt(borrowingPower)} at ${rate}% over ${NEW_LOAN_TERM} yrs.`
              : surplus === 0
                ? 'You’re breaking even — no surplus to service new debt yet.'
                : `Spending exceeds income by ${fmt(Math.abs(surplus))}/mo — trim expenses before taking on new debt.`}
          </p>
        </>
      }
    />
  )
}

const TABS = [
  { key: 'compound', label: 'Compound Growth', el: CompoundCalc },
  { key: 'budget', label: 'Budget & Cash Flow', el: BudgetCalc },
  { key: 'super', label: 'Superannuation', el: SuperCalc },
  { key: 'retirement', label: 'Retirement Needs', el: RetirementCalc },
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
      <Active />
      <p className="calc-disclaimer">
        Estimates only, for illustration. Figures use 2025–26 Australian rates and don’t account for
        every personal circumstance. General advice only — speak with a Prospa adviser before acting.
      </p>
    </div>
  )
}
