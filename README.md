# Optym: Optimization market contests on Blockchain

## Repositories

* [optymtech/optym](https://github.com/optymtech/optym) - This is the react application which gets deployed for each contest at `https://<subdomain>.optym.tech` on a successful creation of contest on the landing page. The application interacts with [optymtech/reachci](https://github.com/optymtech/reachci) to fetch it's reach backend according to it's subdomain. It needs a `src/config.js` file which needs to be edited for each contest. More details about this config in coming sections.
* [optymtech/optym-website](https://github.com/optymtech/optym-website) - This is the netlify source code for the landing page at https://optym.tech. On successful submission of a form at `/new`, the bounty code is pushed to [optymtech/reachci](https://github.com/optymtech/reachci) for compilation and optym `config.js` is generated and pushed to [optymtech/registry](https://github.com/optymtech/registry) for static website deployment.
* [optymtech/reachci](https://github.com/optymtech/reachci) - This is the repository where bounty function is stored along with our backend code. On each push, the code is compiled on GitHub actions and compiled backend is hosted on the `gh-pages` for the static webpage to get.
* [optymtech/optym-cli](https://github.com/optymtech/optym-cli) - Test program containing a CLI frontend which simulates a contest on the Devnet. 
* [optymtech/registry](https://github.com/optymtech/registry) - After the reach code is compiled for a subdomain, the configuration for a website is generated and pushed to this repository. On push, we use GitHub Actions to build React page and deploy it using Netlify on the subdomain.
