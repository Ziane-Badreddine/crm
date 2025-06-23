# Mini CRM – Client Management App

A simple, clean, and responsive **CRM** interface built with **Next.js 15 App Router**, **TypeScript**, **TailwindCSS**, and **ShadCN UI**. The app provides full CRUD functionality for managing clients, along with analytics and mock activity logs.

## Features

* **Client List** – Sortable, filterable with search input, and with action menus
* **Client Detail Page** – Activity history, tags, personal info
* **Add / Edit Client** – Controlled form with validation
* **Delete with Confirmation** – Safe client removal
* **Dashboard Analytics** – Summary cards + charts
* **Responsive Design** – Works well on all screen sizes
* **Context API** – Handles state for clients and tags

## Project Structure

```
app/
│
├── dashboard/
│   ├── _components/          # Dashboard cards, charts & table
│   └── clients/
│       ├── _components/      # Table, card, nav, form
│       ├── [id]/            # View single client
│       ├── add/             # Add client form
│       └── edit/[id]/       # Edit client form
│
├── login/                   # Login page
├── sign-up/                 # Signup page
│
components/                  # Reusable UI components
context/                     # Client context (global state)
lib/                        # Utility functions
types/                      # TypeScript types
public/                     # Static assets
```

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/mini-crm.git

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

## Dashboard Preview

You get quick insights into:

* Total clients
* New clients this month
* VIP clients
* Activities logged
* Clients per tag (Bar chart)
* **Client table** with recent activity overview

## Tech Stack

* **Next.js 15 (App Router)**
* **TypeScript**
* **TailwindCSS**
* **ShadCN/UI**
* **Recharts**
* **Lucide Icons**
* **Faker.js** (mock data)

## License

MIT – Free to use and modify.