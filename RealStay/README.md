# RealStay

RealStay is a modern hotel booking platform focused on trust and transparency. It features only verified reviews from real guests, instant booking, and a curated selection of quality hotels.

## Project Overview

RealStay helps travelers make confident booking decisions by ensuring all hotel reviews are authentic and submitted by guests who have actually stayed at the property. The platform offers:

- **Verified Reviews:** Only guests with completed bookings can leave reviews.
- **Quality Assurance:** Handpicked hotels with genuine ratings.
- **Instant Booking:** Fast and secure reservation process.
- **Modern UI:** Built with React, shadcn-ui, and Tailwind CSS for a seamless user experience.
- **Crypto & UPI Payments:** Simulated MetaMask and UPI payment flows.
- **Profile Management:** Users can manage their profiles and bookings.
- **Admin Features:** (If enabled) Add and manage hotels and rooms.

## Main Features

- Browse and search hotels by city or name.
- View detailed hotel information, rooms, and verified guest reviews.
- Book rooms with instant confirmation.
- Leave reviews only after a completed stay.
- Manage your bookings and profile.
- Contact support via the contact page.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** shadcn-ui, Tailwind CSS
- **Backend:** Supabase (Postgres, Auth, Storage)
- **State/Data:** React Query
- **Other:** MetaMask integration (simulated), UPI (simulated)

## Getting Started

Clone the repository and install dependencies:

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

## Deployment

You can deploy using [Lovable](https://lovable.dev/projects/24e753c1-4653-4351-8ad6-b051aaa80b23) or your preferred platform. For custom domains, see Project > Settings > Domains in Lovable.

## Customization

- Update hotel data and policies in the Supabase dashboard.
- Modify UI components in `src/components/ui/`.
- Adjust styles in `src/index.css`.

## License

This project is for demonstration and educational purposes.

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/24e753c1-4653-4351-8ad6-b051aaa80b23

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/24e753c1-4653-4351-8ad6-b051aaa80b23) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/24e753c1-4653-4351-8ad6-b051aaa80b23) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
