/* ============================================================
   BLOCKS — the component families a page gets assembled from.
   Ported from the Health OS design system onto this one.
   ============================================================ */
import SectionHead from '../components/SectionHead.jsx'
import { FeatureCards, FeatureGrid, FeatureSteps, FeatureTabs } from '../components/features/Features.jsx'
import { FeatureBento, GalleryBento, ProductBento } from '../components/bento/Bento.jsx'
import PricingTable from '../components/blocks/PricingTable.jsx'
import Faq from '../components/blocks/Faq.jsx'
import { TestimonialColumns, TestimonialWall } from '../components/testimonials/Testimonials.jsx'
import CaseStudy from '../components/CaseStudy.jsx'
import * as B from '../data/blocks.js'

/* A labelled specimen: what the block is and when to reach for it. */
function Block({ name, note, children }) {
  return (
    <div className="bspec">
      <div className="bspec-head">
        <b>{name}</b>
        <span>{note}</span>
      </div>
      {children}
    </div>
  )
}

export default function BlocksSection() {
  return (
    <section id="blocks">
      <SectionHead eyebrow="Applied" title="Blocks">
        The families a page is assembled from, brought across from the Health OS design system and
        rebuilt on this one. Four ways to lay out a set of features, three bentos, the pricing
        table, the FAQ, two testimonial arrangements and a case study — all on this system's
        tokens, with no Tailwind and no animation library behind them.
      </SectionHead>

      {/* ---- Features ---- */}
      <div className="sub-h">Features · four layouts, one item shape</div>

      <Block name="FeatureGrid" note="Many small features at a glance, separated by hairlines rather than cards">
        <FeatureGrid items={B.featureItems} columns={3} headingLevel="h3" />
      </Block>

      <Block name="FeatureCards" note="Two to four, each centred on a dot grid that fades out">
        <FeatureCards items={B.featureCardItems} columns={3} headingLevel="h3" />
      </Block>

      <Block name="FeatureSteps" note="A sequence that advances on its own; pauses on hover, on focus and off-screen">
        <FeatureSteps items={B.featureSteps} headingLevel="h3" />
      </Block>

      <Block name="FeatureTabs" note="One at a time, with real tab roles and arrow-key navigation">
        <FeatureTabs items={B.featureTabs} headingLevel="h3" />
      </Block>

      {/* ---- Bentos ---- */}
      <div className="sub-h">Bentos · three grids</div>

      <Block name="FeatureBento · photo" note="Six cells: a hero, a figure, a feature, an action and two facts">
        <FeatureBento variant="photo" {...B.featureBento} />
      </Block>

      <Block name="FeatureBento · tint" note="The same six cells, framed photo on a soft wash">
        <FeatureBento variant="tint" {...B.featureBento} />
      </Block>

      <Block name="ProductBento" note="What the product does, each job drawn with tokens rather than screenshotted">
        <ProductBento {...B.productBento} />
      </Block>

      <Block name="GalleryBento" note="An image-led mosaic; photos and words interlock">
        <GalleryBento {...B.galleryBento} />
      </Block>

      {/* ---- Pricing ---- */}
      <div className="sub-h">Pricing · one table, everywhere pricing appears</div>

      <Block name="PricingTable" note="Cards rise as it enters, and replay on the way back; the switch appears only when every plan has an annual price">
        <PricingTable plans={B.plans} note={B.pricingNote} annualNote="Two months free" />
      </Block>

      {/* ---- FAQ ---- */}
      <div className="sub-h">FAQ</div>

      <Block name="Faq" note="Questions as quiet rows; the panel opens on grid rows, so a long answer is never clipped">
        <Faq items={B.faqItems} headingLevel="h4" />
      </Block>

      {/* ---- Testimonials ---- */}
      <div className="sub-h">Testimonials · both arrangements carry the Sample mark</div>

      <Block name="TestimonialColumns" note="A few taller cards side by side">
        <TestimonialColumns items={B.testimonials.slice(0, 3)} columns={3} />
      </Block>

      <Block name="TestimonialWall" note="Rows that drift, pausing on hover and on keyboard focus">
        <TestimonialWall items={B.testimonials} rows={2} />
      </Block>

      {/* ---- Case study ---- */}
      <div className="sub-h">Case study</div>

      <Block name="CaseStudy" note="One engagement: the situation, what was done, where it landed">
        <CaseStudy study={B.caseStudy} />
      </Block>

      <div className="lm-strip" style={{ marginTop: 'var(--s6)' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <p>
          <b>Sample copy throughout, and the quotes are not real.</b> Prospa's claims register
          currently clears no testimonial, award or outcome claim, so every quote and the case
          study carry the Sample mark by default — turning it off is a compliance decision, not a
          design one, and needs a measured result and the person's written permission on file. The
          prices shown are illustrative; the published rate card is the only source for a real fee.
        </p>
      </div>
    </section>
  )
}
