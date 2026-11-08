# Smart Tourism Website — 2-Hour Academic MVP Plan

**Project type:** Practical group assignment  
**Working title:** Smart Tourism Sri Lanka — Multilingual Travel Discovery  
**Deployment:** Vercel  
**Recommended stack:** Next.js (App Router) + TypeScript + Tailwind CSS  
**Tracking:** Google Tag Manager (GTM) + Google Analytics 4 (GA4) + Meta Pixel  
**Languages:** English, Tamil, Sinhala, Chinese (Simplified), Japanese  
**Currencies:** LKR, USD, GBP, JPY (extendable)

> **Time constraint:** This plan is designed for a two-hour build sprint. Aim for a working, demonstrable MVP—not a production booking platform. Real visitor insights require visitors and processing time. During the assignment demonstration, distinguish live test data from illustrative/sample analysis.

---

## 1. Project idea and objective

Build a tourism discovery website for Sri Lanka that presents destinations and tour experiences to international visitors. Visitors can change the website language and display currency, explore destination pages, and submit a tour enquiry.

The website will be instrumented with GTM, GA4 and Meta Pixel. The collected events will help the group understand which destinations attract attention, where visitors come from, which language/currency options they use, and whether visitors click the enquiry call-to-action.

### Assignment workflow

```text
Tourism Website
      ↓
GTM tags, triggers and variables
      ↓
GA4 + Meta Pixel
      ↓
Visitor and event data
      ↓
Behaviour analysis and insights
      ↓
Targeted tourism marketing campaign
```

### Main academic objectives

1. Develop a responsive tourism website.
2. Support five languages: English, Tamil, Sinhala, Simplified Chinese and Japanese.
3. Display prices in LKR, USD, GBP and JPY.
4. Implement measurable user interactions using GTM.
5. Collect and inspect visitor behaviour using GA4.
6. Configure Meta Pixel for campaign audience measurement.
7. Interpret the available data and propose a measurable campaign.

---

## 2. Two-hour delivery scope

### Must-have features

- Responsive home page with a clear tourism brand.
- Destination cards for Sigiriya, Ella, Galle Fort and Mirissa.
- Destination detail section/page with descriptions and indicative prices.
- Language selector: `en`, `ta`, `si`, `zh`, `ja`.
- Currency selector: `LKR`, `USD`, `GBP`, `JPY`.
- Currency conversion with a visible rate date/source and a safe fallback.
- “Explore destination” and “Enquire now” calls to action.
- Enquiry form with basic client-side validation.
- Cookie/analytics consent notice; do not fire advertising/analytics tags before the applicable consent.
- GTM container installed.
- GA4 events sent through the data layer and configured in GTM.
- Meta Pixel installed through GTM or the approved integration, subject to consent.
- Vercel deployment and a short test.

### Keep out of the two-hour MVP

Do not attempt user accounts, payment processing, a full booking engine, admin CMS, database-backed reservations, live chat, complex dashboards, or automatic campaign publishing. These are future enhancements.

---

## 3. Recommended technology

| Area | Technology | Purpose |
|---|---|---|
| Front end | Next.js + TypeScript | Website and routing |
| Styling | Tailwind CSS | Responsive UI |
| Icons | Lucide React | Interface icons |
| Translation | Small JSON/dictionary files | Five-language UI |
| Currency | Frankfurter API or another verified FX provider | Indicative currency conversion |
| Tracking manager | Google Tag Manager | Tags, triggers and variables |
| Analytics | Google Analytics 4 | Traffic and event analysis |
| Advertising measurement | Meta Pixel | Meta audience and conversion measurement |
| Hosting | Vercel | Public deployment |
| Source control | GitHub | Version history and deployment connection |

**Why this stack:** Next.js is supported directly by Vercel. Keep the MVP mostly static so it builds and deploys quickly. Use Vercel environment variables for public measurement IDs and keep private keys server-side only.

---

## 4. Website structure

### Pages / sections

1. **Home** — hero image, headline, destination highlights and “Plan your trip” CTA.
2. **Destinations** — destination cards and category filters (optional if time permits).
3. **Destination details** — short description, location, highlights and indicative starting price.
4. **About Sri Lanka** — short tourism introduction.
5. **Enquiry** — name, email, destination of interest and message.
6. **Footer** — contact details, social links, language/currency controls and privacy notice.

### Suggested home page layout

```text
┌──────────────────────────────────────────────────────────┐
│ LOGO   Home  Destinations  About  Contact  EN  LKR       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│       DISCOVER THE BEAUTY OF SRI LANKA                   │
│       Explore beaches, culture and nature                │
│       [Explore Destinations] [Enquire Now]               │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ POPULAR DESTINATIONS                                     │
│ [Sigiriya]       [Ella]       [Galle]       [Mirissa]     │
├──────────────────────────────────────────────────────────┤
│ WHY VISIT SRI LANKA?                                     │
│ Culture | Nature | Beaches | Adventure                   │
├──────────────────────────────────────────────────────────┤
│ PLAN YOUR TRIP / ENQUIRY                                 │
├──────────────────────────────────────────────────────────┤
│ Footer: Contact | Privacy | Social links                 │
└──────────────────────────────────────────────────────────┘
```

### Suggested tourism content

Use original short descriptions and appropriately licensed images. Show prices as **indicative examples**, not guaranteed live tour quotations.

| Destination | Tourism category | Example starting price |
|---|---|---:|
| Sigiriya | Heritage and culture | LKR 12,000 |
| Ella | Nature and adventure | LKR 8,000 |
| Galle Fort | History and coastal culture | LKR 10,000 |
| Mirissa | Beach and marine experiences | LKR 15,000 |

---

## 5. Multilingual implementation

Use language codes and a central translation dictionary. Avoid duplicating the whole website for each language.

| Language | Code | Selector label |
|---|---|---|
| English | `en` | English |
| Tamil | `ta` | தமிழ் |
| Sinhala | `si` | සිංහල |
| Chinese (Simplified) | `zh` | 简体中文 |
| Japanese | `ja` | 日本語 |

### Translation approach

- Store navigation, buttons, headings, form labels and key UI messages in dictionaries such as `messages/en.json`, `messages/ta.json`, `messages/si.json`, `messages/zh.json` and `messages/ja.json`.
- Keep destination content translated too, at least for the home page and four featured destinations.
- Save the selected language in local storage or a cookie.
- Set the page `lang` attribute to the active language.
- Use a font stack that supports Sinhala, Tamil, Chinese and Japanese glyphs.
- Check line wrapping and button widths in every language.
- For a fast MVP, translate essential content accurately and label any untranslated long-form text as a future improvement. Do not claim complete translation if only navigation is translated.

### Analytics for language preference

Send a custom event when the visitor changes language:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "language_change",
  language: "ta"
});
```

Use the actual selected language code instead of the example value.

---

## 6. Currency conversion

### Supported display currencies

- LKR — Sri Lankan Rupee (default)
- USD — US Dollar
- GBP — British Pound
- JPY — Japanese Yen

### Conversion logic

1. Store each destination's base price in LKR as a number.
2. Fetch the latest available rates from a currency API.
3. Convert from LKR to the selected currency.
4. Format using `Intl.NumberFormat` with the selected currency code.
5. Display the rate date and a note such as “Indicative conversion; final charges may differ.”
6. Cache rates for a reasonable period and provide a fallback if the API is unavailable.

Example formatting:

```js
const formatted = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: selectedCurrency
}).format(convertedAmount);
```

A possible provider is Frankfurter (`https://frankfurter.dev/`), which documents support for many currencies and daily-updated reference rates. Before the demo, verify that LKR, USD, GBP and JPY are present in its current supported-currency list and test the exact API request. If LKR is unavailable or the API fails, use clearly labelled demonstration rates stored in a configuration file. Never present fixed demo rates as live exchange rates.

**Academic note:** Exchange-rate conversions are indicative only. A tourism website should not imply that displayed prices are bank, card-network or final payment rates.

### Analytics for currency preference

```js
window.dataLayer.push({
  event: "currency_change",
  currency: "USD"
});
```

---

## 7. Tracking architecture: GTM + GA4 + Meta Pixel

### Data flow

```text
Next.js website
   │
   ├── dataLayer events
   │       │
   │       └── Google Tag Manager
   │              ├── Google tag / GA4 configuration
   │              ├── GA4 event tags
   │              └── Meta Pixel tags
   │
   └── Consent controls
           └── Tags fire only according to consent settings
```

### GTM setup checklist

1. Create a GTM account and Web container.
2. Add the GTM installation snippets to the Next.js root layout using the official recommended method.
3. Create a Google tag using the GA4 Measurement ID.
4. Create GA4 Event tags for the custom events listed below.
5. Create Custom Event triggers that match the `event` values pushed to `dataLayer`.
6. Create Data Layer Variables for parameters such as `destination_name`, `language`, `currency` and `form_type`.
7. Configure Meta Pixel using the official Pixel ID and consent-aware firing.
8. Preview/debug in GTM before publishing the container.

### Suggested events

| Event name | Trigger | Useful parameters |
|---|---|---|
| `page_view` | Page view | `page_location`, `page_title`, `language` |
| `view_destination` | Destination detail viewed | `destination_name`, `destination_category` |
| `select_destination` | Destination card clicked | `destination_name` |
| `language_change` | Language selector changed | `language` |
| `currency_change` | Currency selector changed | `currency` |
| `click_enquiry` | Enquiry CTA clicked | `destination_name`, `button_location` |
| `generate_lead` | Valid enquiry submitted | `destination_name`, `form_type` |

Example event:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "view_destination",
  destination_name: "Sigiriya",
  destination_category: "heritage"
});
```

### GA4 reports to inspect

- **Realtime:** confirm test visits and events are arriving.
- **Traffic acquisition:** identify source/medium, such as direct, organic search or social.
- **Pages and screens:** identify popular pages.
- **Events:** compare destination views, language changes, currency changes and enquiries.
- **Demographics / technology:** inspect available audience and device information, subject to consent, privacy settings and reporting thresholds.
- **Engagement:** inspect engaged sessions, engagement rate and average engagement time.

### Meta Pixel events

For the MVP, configure the standard events that match actual user actions:

- `PageView` — page loaded.
- `ViewContent` — a destination detail page viewed.
- `Lead` — a valid enquiry successfully submitted.

Do not send personal form data, email addresses, names or message contents to analytics or advertising platforms. Test in Meta Events Manager. Avoid firing duplicate Pixel events from both hard-coded code and GTM.

### Privacy and consent

- Add a clear cookie/analytics consent banner.
- Explain the purpose of analytics and advertising cookies.
- Respect the user's choice and configure consent mode/tag firing appropriately for the jurisdictions relevant to the website.
- Do not treat a banner display as consent.
- Do not collect unnecessary personal information.
- Link a simple privacy notice.
- For an academic demonstration, use test data and avoid real customer personal details.

---

## 8. Data analysis and interpretation

### Questions the group should answer

1. Which traffic source brings the most visitors?
2. Which destination receives the most views?
3. Which destination attracts the most enquiry clicks?
4. Which language is selected most often?
5. Which currency is selected most often?
6. Which device category is most common?
7. At what stage do visitors leave without enquiring?
8. Which marketing channel appears to generate the most engaged visits or leads?

### Suggested analysis table

| Metric | GA4 source | What it tells us |
|---|---|---|
| Users / sessions | Reports | Overall traffic |
| Source / medium | Traffic acquisition | Where visitors came from |
| Views by destination | Custom event | Destination popularity |
| `click_enquiry` count | Custom event | Enquiry intent |
| `generate_lead` count | Custom event | Completed enquiries |
| Language selection | Custom event | Preferred language |
| Currency selection | Custom event | Preferred display currency |
| Device category | Tech reports | Mobile / desktop behaviour |
| Engagement rate | Engagement report | Visit quality |

### Insight writing template

Use this structure after collecting actual data:

> **Observation:** [State the measured result and date range.]  
> **Interpretation:** [Explain what the result may mean.]  
> **Marketing action:** [State what the tourism business should do.]  
> **KPI:** [Explain how success will be measured.]

Example only — **not real findings**:

> If GA4 shows that Ella receives the highest destination views but has a low enquiry rate, the business could test clearer tour details, stronger enquiry buttons and a short Ella-focused campaign. Measure the enquiry conversion rate before and after the change.

### Important data limitation

A brand-new website will not immediately have enough data for reliable demographic or behavioural conclusions. In the two-hour presentation:

- Show live Realtime events generated by your group.
- Use GTM Preview and GA4 DebugView to prove implementation.
- If you include a sample analysis chart, mark it **“Illustrative sample data — not actual visitor results.”**
- State the date range and sample size for any real result.
- Do not claim that a few group test visits represent the wider tourism market.

---

## 9. Data-driven tourism marketing campaign

### Example campaign: “Discover Sri Lanka — Your Next Journey”

**Campaign objective:** Generate qualified tourism enquiries for selected Sri Lankan destinations.

**Primary audience:** International travellers researching Sri Lankan culture, nature and beach experiences. Refine the audience using actual analytics and market evidence rather than assuming all visitors share the same preferences.

**Platforms:**
- Meta Ads (Facebook and Instagram) for destination discovery and retargeting, where consent and platform policies permit.
- Google Search Ads for people actively searching for Sri Lanka tours.
- Organic social content to support the campaign.

### Targeting strategy

1. Use destination interest and travel-intent themes relevant to the selected market.
2. Create separate creative variations for heritage, nature and beach experiences.
3. Use the language preference observed in website events to guide translated creative.
4. Use currency preference as a supporting signal, not proof of nationality or location.
5. Retarget eligible visitors who viewed a destination but did not submit an enquiry, subject to consent, platform rules and sufficient audience size.
6. Exclude people who already submitted an enquiry from lead-acquisition ads where appropriate.

### Example two-week academic test budget

| Channel | Example budget | Purpose |
|---|---:|---|
| Meta Ads | LKR 15,000 | Destination awareness and enquiry testing |
| Google Search Ads | LKR 10,000 | Capture active travel searches |
| Creative production | LKR 5,000 | Images and short-form content |
| **Total** | **LKR 30,000** | **Illustrative planning budget** |

This is a proposed classroom budget, not a recommendation based on measured media costs. Adjust it to the group's actual resources and campaign market.

### Campaign KPIs

| KPI | Calculation / meaning |
|---|---|
| Impressions | Number of ad displays |
| Reach | Number of people reached |
| CTR | Clicks ÷ impressions × 100 |
| CPC | Advertising spend ÷ clicks |
| Landing page views | Visits to the campaign landing page |
| Enquiry conversion rate | Valid enquiries ÷ relevant sessions × 100 |
| Cost per lead | Advertising spend ÷ valid leads |
| Engagement rate | Use the platform's stated calculation |

Set numerical targets only after establishing a baseline or clearly label them as proposed targets.

---

## 10. Suggested project folder structure

```text
smart-tourism/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── destinations/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── api/
│       └── exchange-rates/
│           └── route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── DestinationCard.tsx
│   ├── LanguageSelector.tsx
│   ├── CurrencySelector.tsx
│   ├── EnquiryForm.tsx
│   └── ConsentBanner.tsx
├── messages/
│   ├── en.json
│   ├── ta.json
│   ├── si.json
│   ├── zh.json
│   └── ja.json
├── lib/
│   ├── analytics.ts
│   ├── currency.ts
│   └── destinations.ts
├── public/
│   └── images/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

This is a suggested structure; simplify it if the team is short on time.

### Environment variables

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=YOUR_PIXEL_ID
```

Use actual IDs created by your group. These are examples, not working credentials. Never commit private API keys or secrets. Public measurement IDs are identifiers, not passwords; configure them in Vercel and in local `.env.local` as needed.

---

## 11. Exact 120-minute execution schedule

| Time | Work | Deliverable |
|---|---|---|
| 00–10 min | Confirm tourism brand, destinations, roles and scope | Agreed concept |
| 10–30 min | Create Next.js app, layout, navbar, hero and destination cards | Website skeleton |
| 30–45 min | Add language dictionaries and language selector | Five-language UI |
| 45–55 min | Add currency selector, conversion and fallback | Four-currency display |
| 55–70 min | Add destination details, enquiry form and consent banner | Main user journey |
| 70–85 min | Create GTM container, add GTM code and configure GA4 | Base tracking |
| 85–100 min | Add custom data-layer events and Meta Pixel | Interaction tracking |
| 100–110 min | Deploy to Vercel and configure environment variables | Public deployment |
| 110–117 min | Test mobile, language, currency, GTM Preview and GA4 Realtime | Evidence of functionality |
| 117–120 min | Capture screenshots and prepare findings/campaign summary | Presentation evidence |

**Critical time rule:** If deployment is not complete by minute 100, pause optional design improvements and deploy the working version. If analytics account setup takes longer, document the configuration and show the data-layer events and GTM Preview as implementation evidence; do not claim GA4 data has arrived if it has not.

---

## 12. Group member responsibilities

For a group of four:

| Member | Responsibility | Evidence |
|---|---|---|
| Member 1 | Next.js setup, layout and responsive design | Home page and deployed URL |
| Member 2 | Translations, currency conversion and destination content | Language/currency screenshots |
| Member 3 | GTM, GA4, Meta Pixel and event testing | GTM Preview, GA4 Realtime, Pixel test |
| Member 4 | Data analysis, insights and campaign proposal | Analysis table and campaign slides |

For a smaller group, combine roles. One person should own deployment and verify that the final production URL works.

---

## 13. Final testing checklist

### Website

- [ ] Website opens using the Vercel production URL.
- [ ] Layout works on desktop and mobile.
- [ ] All five language options work for the essential UI.
- [ ] Currency selector changes displayed prices.
- [ ] Conversion rate date/source or demo-rate warning is visible.
- [ ] Destination cards and detail pages work.
- [ ] Enquiry form validates required fields.
- [ ] Consent choice is respected.
- [ ] Images have appropriate alt text.

### Tracking

- [ ] GTM container loads on the deployed site.
- [ ] GA4 Google tag is configured in GTM.
- [ ] Page views are visible in GA4 Realtime or DebugView.
- [ ] Destination-view event fires.
- [ ] Language-change event fires.
- [ ] Currency-change event fires.
- [ ] Enquiry click and successful lead events are distinguishable.
- [ ] Meta Pixel test events are received.
- [ ] No duplicate tags or duplicate conversion events.
- [ ] No personal form data is sent to analytics or advertising tools.

### Academic evidence

- [ ] Screenshot of the home page.
- [ ] Screenshots showing all language options.
- [ ] Screenshot showing currency conversion.
- [ ] GTM container/tag/trigger screenshots.
- [ ] GA4 Realtime or DebugView screenshot.
- [ ] Meta Events Manager test screenshot, if configured.
- [ ] Analysis with date range and sample size.
- [ ] Clearly labelled sample data, if used.
- [ ] Campaign audience, objective, platform, budget and KPIs.
- [ ] Final Vercel URL.

---

## 14. Deployment steps

1. Create the project locally using the Next.js starter.
2. Run the development server and test the core pages.
3. Push the project to a GitHub repository.
4. Sign in to Vercel and import the repository.
5. Select the Next.js framework preset.
6. Add the GTM, GA4 and Meta Pixel IDs in Project Settings → Environment Variables.
7. Deploy and open the production URL.
8. Test the production URL—not only localhost—because tracking and consent behaviour must be checked on the deployed site.
9. If an environment variable changes, trigger a new deployment so the updated build receives it.

---

## 15. Future improvements (after the assignment)

- Database-backed enquiry management.
- Proper multilingual SEO and translated metadata.
- More currencies and a scheduled exchange-rate cache.
- Booking availability and secure payment integration.
- Server-side conversion tracking where appropriate.
- Consent management platform and privacy review for target markets.
- Looker Studio dashboard connected to GA4.
- A/B testing of destination pages and enquiry CTAs.
- Real campaign experiments with statistically meaningful sample sizes.

---

## 16. Official setup references

- [Google Tag Manager — Set up Google Analytics](https://support.google.com/tagmanager/answer/9442095)
- [Google Analytics — Set up the Google tag in GTM](https://support.google.com/analytics/answer/15756616)
- [Google Tag Manager — Set up GA4 events](https://support.google.com/tagmanager/answer/13034206)
- [Vercel — Next.js deployment](https://nextjs.org/learn/pages-router/deploying-nextjs-app-platform-details)
- [Vercel — Environment variables](https://vercel.com/docs/environment-variables)
- [Frankfurter — Exchange-rate API](https://frankfurter.dev/)

---

## 17. Definition of done

The MVP is ready to present when:

1. The tourism website is publicly accessible on Vercel.
2. A visitor can browse the featured destinations.
3. The essential interface supports English, Tamil, Sinhala, Chinese and Japanese.
4. Prices can be displayed in LKR, USD, GBP and JPY, with live-rate status or a clearly labelled fallback.
5. GTM receives the implemented interaction events.
6. GA4 receives test page views and events, or the team clearly documents any account/configuration blocker.
7. Meta Pixel test events are demonstrated if the Pixel is configured.
8. The group presents measured observations separately from assumptions and sample data.
9. The campaign proposal connects an identified insight to an audience, platform, budget and KPI.

**Final presentation statement:**  
“We developed a multilingual tourism website, implemented visitor tracking through Google Tag Manager, GA4 and Meta Pixel, examined visitor interactions, and used the available findings to propose a targeted tourism marketing campaign.”
