## DigiPassport

- The traditional passport and visa process is a challenging and tedious task, people with a long travel history have the burden of maintaining multiple passports for the rest of their lives and if they lose even the passport then it's a hassle to get a duplicate copy of it, they need to go through a long government process and if you lose your passport in a foreign country, then it's even a bigger problem, you're locked in that country.

- We decided to digitalise this process and make it less hassle-free by creating a digital passport and attaching a travel history to it, this digital passport can then be submitted to Embassies or Consulates that can then grant an e-visa to the person based on their travel history.

- The user needs to sign in using Google or another social login, then fill in some basic details, which will then be verified by the government and then a digital passport is generated

- This digital passport can be verified on the website, travel history associated with the passport can also be verified and then lastly user can send this passport with their visa application,

- The embassy can verify all the details and instead of a traditional sticker visa, an E-Visa will be added to the travel history of the passport holder, this E-Visa entry can be verified by authorities upon arrival in destination country.

- We originally planned to store details on Blockchain, which would everything even more transparent and accessible but due to time constraints we could not integrate blockchain and stored everything on a Database.

### Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/7i2sgcDyE9s?si=Q67NG1LY31efCPqc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Links

- The project has been deployed on Vercel - [digiPassport](https://decentralised-passport.vercel.app/)
- The project has been submitted on [Devfolio](https://devfolio.co/projects/digipassport-1c11) for the Hackout 2023 Hackathon

### Tech Stack

The project has been developed using the **T3 Stack**, which includes 

- Next.js
- tRPC
- TypeScript
- Clerk
- Prisma
- TailwindCSS

Other tools and technologies

- PlanetScale for MySQL database
- Vercel for deployment
- Radix UI and shadcn components for the UI

### Note

This project was originally meant to use Blockchain, thus the repo name "decentralised-passport" but due to time constraints we were not able to integrate the Polygon blockchain, and renamed the app as "digiPassport"