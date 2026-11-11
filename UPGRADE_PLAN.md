# CareerCompass AI 2.0 — Upgrade Plan

This upgrade is developed on `feature/careercompass-ai-2.0`. The original `main` branch is intentionally preserved.

## Existing application (baseline)
- Flask application with a form-based career prediction flow.
- Random Forest model and label encoders stored as pickle files.
- CSV career dataset.
- Two server-rendered HTML templates.

## Upgrade principles
1. Keep the existing application runnable while new modules are added.
2. Do not claim model accuracy, AI capabilities, or live job data until measured and implemented.
3. Validate the dataset, feature order, category encoding, and model artifacts before relying on predictions.
4. Keep career recommendations advisory; do not present a prediction as a definitive assessment.
5. Make each phase independently reviewable and testable.

## Phases
- [x] Create an isolated feature branch from main.
- [x] Add a frontend workspace scaffold and this implementation plan.
- [ ] Implement and test a modern React dashboard.
- [ ] Add a versioned JSON API while retaining the legacy Flask routes.
- [ ] Audit and repair model training, artifact paths, feature encoding, and evaluation.
- [ ] Add career profiles, skill-gap guidance, and learning roadmaps backed by curated data.
- [ ] Persist optional user profiles and recommendation history.
- [ ] Add automated tests, setup instructions, and deployment configuration.

## Current status
Phase 1 creates an additive frontend workspace. The original Flask app, templates, dataset, and model files are not modified by this phase.
