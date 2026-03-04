# How to Handle Payments (and Taxes)

This is the single most confusing decision for new solo founders. Not because payments are hard, but because **taxes** are hard and nobody explains them clearly.

## The One Thing You Need to Understand

There are two types of payment services:

1. **Payment Processor** (Stripe): Processes payments. You are the seller. You handle tax compliance.
2. **Merchant of Record** (Lemon Squeezy, Paddle): They are legally the seller. They handle all tax compliance for you.

The fee difference: ~2.9% (Stripe) vs ~5% (MoR). The question is whether that 2% premium is worth not thinking about taxes.

## The Decision

```
Are you selling to customers outside your country?
|
+-- NO --> Use Stripe. Tax compliance in one country is manageable.
|
+-- YES --> Do you want to handle international VAT/sales tax yourself?
    |
    +-- YES (you have a tax advisor or enjoy pain) --> Use Stripe + Stripe Tax (+0.5%)
    |
    +-- NO --> Are you making more than $50K MRR?
        |
        +-- NO --> Use Lemon Squeezy (5% + $0.50/tx)
        |
        +-- YES --> Use Stripe + Stripe Tax (2.9% + $0.30 + 0.5%)
                    The 2% savings over MoR pays for tax automation and then some.
```

## What It Actually Costs

| Monthly Revenue | Stripe (2.9% + $0.30) | Lemon Squeezy (5% + $0.50) | Difference |
|---|---|---|---|
| $1,000 | ~$35 | ~$55 | $20/mo |
| $5,000 | ~$165 | ~$275 | $110/mo |
| $10,000 | ~$320 | ~$550 | $230/mo |
| $50,000 | ~$1,480 | ~$2,750 | $1,270/mo |

At $1K MRR, you're paying $20/mo extra for Lemon Squeezy to handle all your taxes. That's a bargain.

At $50K MRR, you're paying $1,270/mo extra. At that point, Stripe + Stripe Tax (0.5% = ~$250/mo) saves you $1,000/mo.

## The Tax Problem, Explained Simply

If you sell a digital product to someone in the EU, you owe VAT in their country. Not your country. Theirs. There are 27 EU member states with different VAT rates. Plus the UK. Plus Canada (GST/HST). Plus various US states with digital sales tax.

A Merchant of Record (Lemon Squeezy, Paddle) handles all of this. They are legally the seller. They collect tax, file returns, and deal with compliance. You get paid your share minus their fee.

Stripe does not handle this by default. You're the seller. You owe the taxes. Stripe Tax (add-on, +0.5%) automates the calculation and collection, but you still need to register and file in each jurisdiction.

If you're pre-revenue and selling globally, the 5% MoR fee is an insurance policy against accidentally owing taxes in 30 countries.

## The Lemon Squeezy Situation

Stripe acquired Lemon Squeezy in July 2024. Since then:
- Quality issues have been reported (bugs, slower support)
- Long-term roadmap is uncertain
- Stripe is rumored to be building its own MoR solution (expected ~3.5% additional fee)

Lemon Squeezy still works and is still the easiest MoR for indie hackers. But keep an eye on Paddle as an alternative if quality continues to decline.

## Our Recommendation

**Starting out, selling globally?** Use Lemon Squeezy. The 5% fee is worth the peace of mind.

**Domestic only?** Use Stripe. One jurisdiction is manageable.

**Past $50K MRR?** Switch to Stripe + Stripe Tax. The math tips in your favor.

**Worried about Lemon Squeezy's future?** Paddle is the alternative MoR. Same fee structure (5% + $0.50), more enterprise-oriented, broader global coverage.

---

*Pricing verified March 2026. [Report outdated info.](../../issues)*
