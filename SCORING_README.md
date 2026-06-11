# DailyCook Scoring Notes

DailyCook is a front-end cooking planner prototype designed to run from `index.html` without sign-in or live grocery APIs.

## What To Evaluate

- The app starts with a one-question-at-a-time onboarding flow.
- The questionnaire includes ZIP code, household size, meal count, meal types, budget, dietary needs, avoided foods, time limit, cooking skill, calorie limit, and recommendation focus.
- Calorie choices are `Under 500`, `Under 650`, `Under 800`, `Under 1000`, `Under 1500`, and `Unlimited`.
- The meal gallery contains 100+ meal options.
- The gallery uses local food images from `assets/meals`, so image rendering does not depend on external image hosts.
- Selected meals generate a grocery list with sample pricing across Instacart, Walmart, Kroger, Safeway, Costco, and Target.
- Checkout actions are simulated in-app to avoid external browser navigation during scoring.

## Preflight

Run:

```bash
npm run preflight
```

The preflight script checks meal count, local image count, calorie labels, cache busting, and external-link safety.
