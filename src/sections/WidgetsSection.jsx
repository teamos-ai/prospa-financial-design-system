/* ============================================================
   WIDGETS — the thirty-one-piece library, each in its own frame.
   ============================================================ */
import SectionHead from '../components/SectionHead.jsx'
import * as W from '../components/widgets/index.js'
import * as D from '../data/widgets.js'

/* One framed demo: number, name, what it is for, then the widget itself.
   `wide` gives a widget the full two columns where its shape needs it. */
function Case({ no, name, note, wide, center, children }) {
  return (
    <figure className={'wcase' + (wide ? ' wide' : '') + (center ? ' center' : '')}>
      <figcaption className="wcase-head">
        <span className="wcase-no">{no}</span>
        <span className="wcase-meta">
          <b>{name}</b>
          <span>{note}</span>
        </span>
      </figcaption>
      <div className="wcase-body">{children}</div>
    </figure>
  )
}

export default function WidgetsSection() {
  return (
    <section id="widgets">
      <SectionHead eyebrow="Applied" title="Widgets">
        Thirty-one functional pieces, ported from the Health OS design system and rebuilt on this
        one — the same teal and green, the same Poppins scale, the same radii and soft teal
        shadows. Each takes real data as props and animates its measurement once as it comes into
        view; each settles on its final state when the viewer has asked for less motion. Colour
        follows the brand semantic the calculators use: green is a positive outcome, ember a cost,
        teal the base.
      </SectionHead>

      <div className="wgrid">
        <Case no="01" name="Stat tiles" note="Three headline counts, each on a brand tile" wide>
          <W.StatTiles items={D.statTiles} />
        </Case>

        <Case no="02" name="Gradient ring" note="One proportion, swept teal into green" center>
          <W.GradientRing {...D.ringData} />
        </Case>

        <Case no="03" name="Capacity meter" note="Used against available, with what is left" center>
          <W.CapacityMeter {...D.capacity} />
        </Case>

        <Case no="04" name="Trend card" note="A figure, its change, and the line behind it">
          <W.TrendCard {...D.trend} />
        </Case>

        <Case no="05" name="Live timer" note="Counts from the moment it enters view" center>
          <W.LiveTimer label="Client meeting in progress" startSeconds={132} />
        </Case>

        <Case no="06" name="Tracking cluster" note="Several small proportions side by side" wide>
          <W.TrackingCluster items={D.tracking} />
        </Case>

        <Case no="07" name="Bar cluster" note="This period against the one before it" wide>
          <W.BarCluster {...D.barCluster} />
        </Case>

        <Case no="08" name="Countdown" note="Time remaining, to the end of the financial year" center>
          <W.Countdown target={D.eofyTarget} />
        </Case>

        <Case no="09" name="Leaderboard" note="Ranked rows with a bar and a figure">
          <W.Leaderboard rows={D.leaderboard} />
        </Case>

        <Case no="10" name="Agenda" note="A day in rows, status carried by a chip">
          <W.Agenda rows={D.agenda} />
        </Case>

        <Case no="11" name="Score gauge" note="A score out of a maximum, on a half ring" center>
          <W.ScoreGauge {...D.score} />
        </Case>

        <Case no="12" name="Breakdown bar" note="Parts of a whole, with a labelled legend">
          <W.BreakdownBar segments={D.breakdown} />
        </Case>

        <Case no="13" name="Activity heatmap" note="Six weeks of contact at five levels">
          <W.ActivityHeatmap {...D.heatmap} />
        </Case>

        <Case no="14" name="Revenue card" note="Collected against billed, then by category" wide>
          <W.RevenueCard {...D.revenue} />
        </Case>

        <Case no="15" name="Avatar cluster" note="Who is attached, and how many more" center>
          <W.AvatarCluster {...D.avatarCluster} />
        </Case>

        <Case no="16" name="Conversion funnel" note="Each stage sized against the first" wide>
          <W.ConversionFunnel stages={D.funnel} />
        </Case>

        <Case no="17" name="Metric strip" note="Four framed figures with their change" wide>
          <W.MetricStrip {...D.metricStrip} />
        </Case>

        <Case no="18" name="Category donut" note="A share of a total, masked into a ring" wide>
          <W.CategoryDonut {...D.donut} />
        </Case>

        <Case no="19" name="Progress rows" note="Several percentages down a column">
          <W.ProgressRows rows={D.progressRows} />
        </Case>

        <Case no="20" name="Ticked gauge" note="Thirteen ticks lighting up in turn" center>
          <W.TickedGauge {...D.ticked} />
        </Case>

        <Case no="21" name="Goal progress" note="Where a goal stands, and whether it is on track">
          <W.GoalProgress {...D.goal} />
        </Case>

        <Case no="22" name="Comparison" note="Two figures either side of a rule">
          <W.Comparison {...D.comparison} />
        </Case>

        <Case no="23" name="Mini calendar" note="A month, with today, a selection and booked days" center>
          <W.MiniCalendar {...D.calendar} />
        </Case>

        <Case no="24" name="Slot picker" note="Times for a day; taken slots stay visible">
          <W.SlotPicker {...D.slots} />
        </Case>

        <Case no="25" name="Onboarding stepper" note="Where someone is in a sequence">
          <W.OnboardingStepper steps={D.steps} />
        </Case>

        <Case no="26" name="Plan card" note="One service level, the same card the site uses" center>
          <W.PlanCard {...D.planCard} />
        </Case>

        <Case no="27" name="Toggle settings" note="Preferences as labelled switches">
          <W.ToggleSettings items={D.toggles} />
        </Case>

        <Case no="28" name="Activity feed" note="What happened, by whom, how long ago">
          <W.ActivityFeed items={D.feed} />
        </Case>

        <Case no="29" name="Rating summary" note="An average, its stars and the spread" wide>
          <W.RatingSummary {...D.rating} />
        </Case>

        <Case no="30" name="Assistant message" note="Types for a beat, then answers" wide>
          <W.AssistantMessage {...D.assistant} />
        </Case>

        <Case no="31" name="Check-in" note="A row of faces as a radio group" wide center>
          <W.CheckIn {...D.checkIn} />
        </Case>
      </div>

      <div className="lm-strip" style={{ marginTop: 'var(--s6)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <p>
          <b>Every figure above is invented.</b> The widgets are shown with sample
          practice-operations data — bookings, reviews, a pipeline, a quarter against the one
          before it. None of it is a Prospa Financial result, a client outcome or a performance
          claim, and none of it may be reused as one. The published rate card is the only source
          for a real fee, and the claims register in <code>lm-prospa</code> governs what this brand
          may state.
        </p>
      </div>
    </section>
  )
}
