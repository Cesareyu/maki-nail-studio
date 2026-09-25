# Maki Nail Studio — Booking Platform

Website, appointment booking system, and client CRM for an independent nail studio. Built with Next.js + TypeScript.

## What it does

- **Multi-guest booking flow** — customers can book for 1–3 guests, each with their own services and add-ons (French, cat-eye, custom designs)
- **Constraint-based scheduling engine** — available time slots are computed from real business rules: opening hours, 15-minute slot intervals, minimum lead time, maximum advance booking window, existing bookings, service/add-on durations, and buffer times
- **Bundle pricing** — automatic detection of service bundles with savings calculation

## Tech

- Next.js 16 / React 19 / TypeScript, Tailwind CSS
- Vitest — 5 automated test suites covering the scheduling engine, pricing, and date logic

## Project structure

- `app/` — pages (home, services, gallery, booking)
- `components/booking/` — multi-step booking flow UI
- `lib/` — scheduling engine (`availability.ts`, `booking-dates.ts`, `booking-details.ts`, `booking-summary.ts`, `pricing.ts`)
- `data/` — service catalogue, booking rules, gallery content

## Run it

npm install
npm run dev

## Test it

npm test
