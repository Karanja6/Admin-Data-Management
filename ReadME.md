# HEVA CreativeHub – Analytical Application

Empowering Creative Entrepreneurs across East Africa through a full-stack analytical web platform.

## Project Overview

HEVA CreativeHub is a data-driven, cloud-integrated platform designed to streamline funding application,
improve monitoring and evaluation (M&E), track loan repayments, and generate insightful reports for
decision-makers and funders.

## Key Features

### Admin Dashboard

- Application Filtering by Country, Loan Type, Value Chain
- Analytics Dashboard with Charts, KPIs
- Repayment Tracker - 48-month plans depending on the loan type
- Monitoring & Evaluation (M&E) Module
- Consent Logs & GDPR Compliance
- Partner Management System
- User Management System
- Integrated map with geo-coordinates
- Blacklist System for Loan Defaulters
- Notifications & Status Alerts
- Role-Based Admin Management

### Entrepreneur Dashboard

- OTP/Email Login
- Loan Application Flow (Bio, Business, Proposal, Budget)
- Loan Tracking (submitted --> reviewed --> approved --> disbursed)
- Document Upload (Google Drive / OneDrive)
- Location Pinning via Google Maps Picker
- Application Status Timeline
- M&E and quarterly reports uploads
- Privacy/Consent Controls
- Notifications + Reminders for loan status, reports, repayments
- Financial Literacy Tools & FAQs

## Tech Stack

### Frontend

- Framework: React.js
- Styling: Tailwind CSS
- Routing: React Router
- Charts: Recharts / Chart.js
- Forms: React Hook Form + Yup
- Cloud Upload: Google Drive / OneDrive
- Maps: Google Maps API

### Backend

- Environment: Node.js + Express
- Database: PostgreSQL / MySQL
- Auth: JWT-based Role-Based Access
- Notifications: Email & In-App Alerts
- Export Tools: CSV, PDF Generator
- Audit Logs: Upload & Edit Tracking
- Machine Learning (Planned): Loan Risk Scores, Recommendations

## Core Analytical Features

### Admin

- Dashboards with Pie, Bar, and Line Charts
- KPI Metrics (Applications by Country, Sector, Loan Type)
- M&E Tracking: Revenue, Employment, Growth
- Consent Audit Logs (GDPR-aligned)
- Repayment Tracker: Timeline, Receipts, Blacklist
- Smart Filters & Full-text Search
- Dynamic CSV + PDF Reports
- Map Visualizations (Heatmap by Region)

### Entrepreneur

- Loan Status & Document Tracking
- Reminders (due dates, missing files)
- Upload Receipts, Progress Reports
- Real-time Application Updates

## Geo Mapping & Location Capture

- Google Maps API: Interactive Pin Drop for Business/Residence
- Stores Latitude, Longitude, Address, Region
- Admin View: Clusters + Filters by Geo

## Partner Management System

- Add/Edit Partners (FSPs, Aggregators)
- Filter by Sector, Region, Loan Types
- Assign Entrepreneurs per Partner
- Track Partner Impact Stats (future module)

## Authentication & Roles

### Admin Roles

- Super Admin– Full access
- Reviewer – Application review rights
- Analyst – Read-only + export

### Entrepreneur Roles

- OTP/Email Registration
- View-only dashboards
- Application submission & upload tools

## Data Intelligence

- Geo-coordinates via Google Maps (lat/lng captures)
- Value chain segmentation
- Country/region-level filtering
- Blacklist & repayment defaulter flags
- GDPR & Kenya Data Law compliance

## ## UI/UX Mockups – Built in Figma

- Admin Dashboard: [https://rhyme-crow-88911875.figma.site](https://rhyme-crow-88911875.figma.site)
- Entrepreneur Dashboard: [https://size-liver-77683721.figma.site](https://size-liver-77683721.figma.site)
- Pitch Deck: [View Pitch Deck on Canva](https://www.canva.com/design/DAGusOZfSjM/QrX_EXZIK5MW_jki2kqgBA/edit?utm_content=DAGusOZfSjM&utm_campaign=designshare&utm_medium=link2&utm_sources=sharebutton)

## Development Roadmap

| Quarter | Milestone |
|--------|-----------|
| Q3 2025 | Admin Dashboard MVP |
| Q4 2025 | Entrepreneur Portal + Maps |
| Q1 2026 | ML-Based Loan Prediction |
| Q2 2026 | Full Partner Integration + Reporting |

## Designers

 Built with love by:

Kerry Koech - UI/UX Designer
Mary Cathline - Frontend Developer
Miriam Wamboi - Backend Developer

## Contact

For project queries, collaborations, or technical issues, please reach out:

- Kerry Koech - UI/UX Designer
Email: [keryyk80@gmail.com](mailto:keryyk80@gmail.com)
- Mary Cathline - Frontend Dev
Email:[marycathln@gmail.com](mailto:marycathln@gmail.com)
- Miriam Wamboi - Backend Dev
Email:[wambomiriam6@gmail.com](mailto:wambomiriam6@gmail.com)

## license

[MIT License](LICENSE)
