# SfincoAssist — Senior Accessibility & Low-Friction Design Guidelines

Reference doc for implementation. Sourced from WCAG 2.2, Nielsen Norman Group's senior-user research, and Apple/Google platform HIGs. Structured as concrete, checkable criteria rather than general advice, so each item can be implemented and verified directly.

## 1. Visual legibility

- Body text minimum 16px equivalent (1rem), scalable up to 200% via OS/browser zoom without breaking layout or clipping content (WCAG 1.4.4).
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text (18px+/bold 14px+) and UI components/icons (WCAG 1.4.3, 1.4.11).
- Never rely on color alone to convey state (errors, success, required fields) — pair with icon, text label, or pattern (WCAG 1.4.1).
- Support system-level dark mode and font-size preferences rather than overriding them.
- Avoid low-contrast "modern minimalist" patterns (light gray text on white, thin fonts) — these test poorly with older users even when WCAG-compliant on paper.

## 2. Touch targets & input

- Minimum touch target size 44x44px (iOS HIG) / 48x48dp (Material) with adequate spacing to prevent mis-taps (WCAG 2.5.8).
- Avoid gestures requiring precision or multi-touch (pinch, swipe-to-delete, long-press) as the *only* way to trigger an action — always provide a visible button alternative (WCAG 2.5.1).
- Increase default spacing between interactive elements in lists/forms beyond typical mobile density.
- Support external keyboard and switch-control navigation where the platform allows it.

## 3. Navigation & structure

- Keep primary navigation shallow — 2–3 taps max to reach any core function.
- Use persistent, consistent navigation (fixed tab bar / menu) rather than gesture-based or hidden navigation (hamburger-only menus test poorly with this group).
- Avoid modal stacking — no more than one modal/dialog layer at a time.
- Every screen needs a clear, visible way back (explicit back button, not reliance on system gesture).
- Use plain-language labels over icon-only navigation; if icon-only, pair with text labels (NN/g finding: icon meaning is not assumed to be universally understood).

## 4. Language & content

- Avoid jargon, tech idioms, and abbreviations without expansion (NN/g: "define techy words" — terms like "sync," "cache," "swipe left" should not be assumed understood).
- Write instructions and errors in plain, direct language — state what happened and what to do next, not just an error code.
- Keep sentences and steps short; avoid dense paragraphs in-flow (break into short chunks with headers).

## 5. Error handling & forgiveness

- No destructive action without a confirmation step, and confirmations should be undoable where possible rather than just "Are you sure?" (prefer undo-after over confirm-before when feasible) (WCAG 3.3.4).
- Inline validation with specific, actionable error text next to the field that caused it — not just a summary banner.
- Avoid session timeouts that lose in-progress input; if timeouts are required, warn before expiry and offer extension (WCAG 2.2.1).
- Autosave/preserve form state on navigation away and back.

## 6. Reducing friction

- Minimize required steps to complete core tasks — audit every flow for steps that can be removed, defaulted, or deferred (progressive disclosure over upfront complexity).
- Pre-fill and remember information across sessions where safe to do so (avoid re-entry of the same data).
- Support autofill/password managers rather than blocking them.
- Avoid unnecessary account creation gates before demonstrating value.
- Provide a single obvious primary action per screen — avoid competing CTAs.
- Avoid time-based interactions (auto-advancing carousels, disappearing toasts with critical info) — let the user control pacing (WCAG 2.2.2).

## 7. Assistive tech compatibility

- All interactive elements must have accessible names/labels for screen readers (WCAG 4.1.2).
- Logical, linear focus order matching visual layout (WCAG 2.4.3).
- Visible focus indicators on all interactive elements, not suppressed via CSS (WCAG 2.4.7).
- Support text-to-speech and, where relevant to the app's context, larger tap-to-read affordances.

## 8. Testing & validation

- Test with actual users 65+ where possible — NN/g's research consistently finds automated WCAG compliance does not guarantee usability for this group.
- Run automated accessibility checks (axe, Lighthouse) as a floor, not a ceiling.
- Include a "can a first-time older user complete this flow unassisted" review as part of QA for any new feature.

---

*Sources: WCAG 2.2 (W3C), NN/g "UX Design for Seniors" research (nngroup.com), Apple Human Interface Guidelines, Google Material Design accessibility guidance, arXiv:2504.12690 (Accessibility Recommendations for Mobile UI for Seniors).*
