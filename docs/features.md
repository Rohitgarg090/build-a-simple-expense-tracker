## Core Features

### Authentication
- Email/password sign-up and login via Supabase Auth
- Protected routes — unauthenticated users redirected to `/login`
- Session persistence using Supabase JWT tokens

### Expense Management
- **Create** an expense with: amount, category, date, title, and optional notes
- **Read** a paginated, searchable list of all personal expenses
- **Update** any existing expense inline on the detail page
- **Delete** an expense with a confirmation prompt

### Categories
- Default categories provided on sign-up (Food, Transport, Housing, Entertainment, Health, Other)
- Create custom categories with a name and color tag
- Rename or delete existing categories
- Expenses retain category label even if category is later deleted

### Dashboard & Summaries
- Total spending for current month vs previous month
- Spending breakdown by category (donut/pie chart)
- Daily spending trend for the last 30 days (line chart)
- Top 5 most recent expenses widget

### Filtering & Search
- Filter expenses by category, date range, and minimum/maximum amount
- Full-text search on expense title and notes
- Sort by date (newest/oldest) or amount (high/low)

### Settings
- Update display name and email
- Select preferred currency (USD, EUR, GBP, etc.) — affects display formatting only
- Delete account with all associated data

## Non-Functional Requirements
- All data is scoped per authenticated user (Row-Level Security in Supabase)
- Responsive design — fully usable on mobile and desktop
- Form validation with user-friendly error messages
- Loading skeletons for async data fetches