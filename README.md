# nextjs-auth-bootstrap
A Bootstrap for a Next.js app with auth and UI:
- Auth: Firebase (Google Provider Sign-In)
- UI: Chakra UI

# Prerequisites
Assumes that you have:
1. Node.js 12.22.0 or later installed
2. A Firebase project with authentication added and Google-provider sign-in enabled (according to https://firebase.google.com/docs/auth/web/google-signin)

# How to use
1. Clone this repository
2. Open terminal, navigate to the root of the nextjs-auth-bootstrap folder
3. Create a .env.local file in the root directory (you can rename env.example to .env.local if that's easier). Each "<>" should be directly replaced with values from your Firebase project (no quotes)
4. Run `yarn install`
5. Run `yarn dev`

That's it! You should see an instance of your next.js app up on http://localhost:3000/
