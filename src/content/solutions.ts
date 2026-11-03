export interface SolutionBullet {
  bold?: string
  text: string
}

export interface SolutionCategory {
  heading: string
  bullets: SolutionBullet[]
}

export interface SolutionPage {
  slug: string
  title: string
  description: string
  intro: string
  categories: SolutionCategory[]
}

export const solutions: Record<string, SolutionPage> = {
  remittances: {
    slug: 'remittances',
    title: 'Solutions for Remittance and Payment Companies',
    description:
      'Ratha Global helps remittance and payment companies size growth opportunities, target corridors, shape policy, find partners, raise capital, and show impact.',
    intro:
      'Ratha Global is a one-stop shop for remittance data, analysis and advice. Led by Dilip Ratha, the firm helps remittance companies find and size growth opportunities, base decisions on reliable evidence, and build the partnerships, products and policy support they need to grow.',
    categories: [
      {
        heading: 'Know your markets',
        bullets: [
          {
            bold: 'Global Remittances Database',
            text: 'track flows for 200 countries, with annual data for every year since 2000, current-year estimates and next-year forecasts',
          },
          {
            bold: 'Bilateral remittance matrix',
            text: 'size every corridor and see where flows are growing',
          },
          {
            bold: 'Global Remittances Report',
            text: 'stay ahead of trends, every May and November',
          },
          {
            bold: 'Gap-filling estimates',
            text: 'reliable figures where official data are missing or late',
          },
          {
            bold: 'Finance Factsheets',
            text: 'quick comparisons of remittances and other financial flows, by country and region',
          },
        ],
      },
      {
        heading: 'Target growth corridors',
        bullets: [
          { text: 'Identify and prioritize high-growth corridors' },
          { text: 'Build business cases with custom projections' },
          {
            text: 'Plan for shifts driven by aging, income gaps, technology, climate and conflict',
          },
        ],
      },
      {
        heading: 'Shape the policy agenda',
        bullets: [
          { text: 'Make your case to central banks and regulators with independent evidence' },
          { text: 'Navigate remittance and diaspora finance policy' },
        ],
      },
      {
        heading: 'Find the right partners',
        bullets: [
          { text: 'Identify and vet payout, banking and investment partners' },
          {
            text: 'Reach central banks, governments, banks, investors and fintechs through our global network',
          },
        ],
      },
      {
        heading: 'Offer more than transfers',
        bullets: [
          {
            text: 'Add savings, investment and diaspora bond products to your remittance channels',
          },
        ],
      },
      {
        heading: 'Raise capital',
        bullets: [
          { text: 'Back your fundraising with credible market evidence' },
          { text: 'Connect with investors and development finance institutions' },
        ],
      },
      {
        heading: 'Show your impact',
        bullets: [
          { text: 'Measure and report the development impact of the flows you carry' },
          {
            text: 'Strengthen governance with independent board service and advice to senior management',
          },
        ],
      },
      {
        heading: 'Lead the conversation',
        bullets: [
          {
            text: 'Keynotes by Dilip Ratha at your events, and briefings for your board and leadership',
          },
          { text: 'Co-branded research that positions you as an industry leader' },
        ],
      },
    ],
  },

  'diaspora-finance': {
    slug: 'diaspora-finance',
    title: 'Solutions for Diaspora Bonds and Diaspora Finance',
    description:
      'Ratha Global helps governments, banks and development institutions size diaspora opportunities, design instruments, lower the cost of capital, and reach diaspora investors.',
    intro:
      'Ratha Global helps governments, banks and development institutions turn diaspora savings into development finance. Led by Dilip Ratha, who pioneered the implementation of diaspora bonds, the firm combines authoritative data, deep market experience and a worldwide network to design, price and place diaspora finance instruments.',
    categories: [
      {
        heading: 'Size the opportunity',
        bullets: [
          {
            bold: 'Diaspora savings',
            text: 'estimate how much your diaspora could invest, by country of residence',
          },
          {
            bold: 'Migration and remittance data',
            text: 'see where your diaspora lives and how much it sends home',
          },
          { bold: 'Market sounding', text: 'test investor appetite before you issue' },
        ],
      },
      {
        heading: 'Design the instrument',
        bullets: [
          { text: 'Estimate shadow sovereign ratings where none exist or are outdated' },
          { text: 'Decide where, when and how to issue, register and list bonds' },
          { text: 'Meet registration and disclosure requirements in host countries' },
        ],
      },
      {
        heading: 'Lower the cost of capital',
        bullets: [
          { text: 'Use guarantees, co-funding and blended finance to enhance credit' },
          { text: 'Raise funds against future remittance flows through securitization' },
        ],
      },
      {
        heading: 'Reach diaspora investors',
        bullets: [
          {
            text: 'Connect with investment banks, development finance institutions and guarantors',
          },
          { text: 'Bring together governments, central banks and diaspora organizations' },
        ],
      },
      {
        heading: 'Build capacity',
        bullets: [
          { text: 'Training for finance ministries, central banks and debt managers' },
          { text: 'Keynotes by Dilip Ratha at your events, and briefings for your leadership' },
        ],
      },
    ],
  },

  'structured-finance': {
    slug: 'structured-finance',
    title: 'Solutions for Structured Finance and Guarantees',
    description:
      'Ratha Global helps governments, banks and companies size markets, unlock future flows, enhance credit, access capital markets, and build capacity.',
    intro:
      'Ratha Global helps governments, banks and companies in emerging and developing economies raise capital on better terms, especially when conventional market access is constrained. Led by Dilip Ratha, whose career spans the World Bank, MIGA and investment banking, the firm designs securitizations, guarantees and other credit enhancements that meet the requirements of international investors.',
    categories: [
      {
        heading: 'Market size and trends',
        bullets: [
          {
            text: 'Estimate the size of the market for infrastructure, green and other specific types of finance',
          },
          { text: 'Analyze recent trends and the outlook' },
          { text: 'Identify upside and downside risks to the outlook' },
        ],
      },
      {
        heading: 'Unlock future flows',
        bullets: [
          {
            bold: 'Future-flow securitization',
            text: 'raise funds against remittances, export receivables and other hard-currency flows',
          },
          {
            bold: 'Receivables analysis',
            text: 'identify, size and stress-test eligible flows',
          },
          {
            bold: 'Ratings uplift',
            text: 'structure deals that can be rated above the sovereign ceiling',
          },
        ],
      },
      {
        heading: 'Enhance credit',
        bullets: [
          {
            text: 'Secure partial credit and political risk guarantees from development finance institutions',
          },
          { text: 'Share risk through blended finance and co-funding' },
          { text: 'Choose the enhancement that lowers cost the most' },
        ],
      },
      {
        heading: 'Credit ratings',
        bullets: [
          { text: 'Estimate shadow sovereign ratings where none exist or are outdated' },
          { text: 'Prepare for first-time or improved credit ratings' },
        ],
      },
      {
        heading: 'Access capital markets',
        bullets: [
          {
            text: 'Decide where, when and how to issue, register and list bonds, drawing on research on bond spreads',
          },
          { text: 'Benchmark pricing against comparable issuers' },
        ],
      },
      {
        heading: 'Find the right partners',
        bullets: [
          {
            text: 'Connect with investment banks, guarantors, development finance institutions and investors',
          },
        ],
      },
      {
        heading: 'Build capacity',
        bullets: [
          { text: 'Training for finance ministries, debt managers and banks' },
          { text: 'Keynotes by Dilip Ratha at your events, and briefings for your leadership' },
        ],
      },
    ],
  },
}
