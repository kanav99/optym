
<h1 align="center">Optym: Optimization market contests on Blockchain</h1>
<p align="center">
<img align="center" src="https://user-images.githubusercontent.com/33966400/121770921-da65e100-cb89-11eb-9244-140512b8650a.png" width=300/>
</p>

<p align="center">
Website: <a href="https://optym.tech">https://optym.tech</a>
</p>


<p align="center">
Reach Backend: <a href="https://github.com/optymtech/optym-cli/blob/master/index.rsh">index.rsh</a>
</p>

## Problem Statement

Suppose a funder F wants to optimize a function's return value. Let's say the function `f` takes as input an unsigned integer and outputs an unsigned integer. They want to find an `x` such that `f(x)` is maximized. This can be an NP-Hard problem, so solving this can make them brute force the entire domain to find a solution, which might not be feasible. So to distribute this problem, the Funder can host this function as a bounty and can announce that the person to maximize this function gets a certain prize. As the funder can chicken out after getting the best values, the application needs to be deployed using smart-contracts, which prevents the funder from cheating.

Optym makes the complete process of hosting smooth and easy.

## Deployment Pipeline

![pipeline](https://user-images.githubusercontent.com/33966400/121770831-57448b00-cb89-11eb-952b-3c6a42a68c00.png)

## Repositories

* [optymtech/optym](https://github.com/optymtech/optym) - This is the react application which gets deployed for each contest at `https://<subdomain>.optym.tech` on a successful creation of contest on the landing page. The application interacts with [optymtech/reachci](https://github.com/optymtech/reachci) to fetch it's reach backend according to it's subdomain. It needs a `src/config.js` file which needs to be edited for each contest. More details about this config in coming sections.
* [optymtech/optym-website](https://github.com/optymtech/optym-website) - This is the netlify source code for the landing page at https://optym.tech. On successful submission of a form at `/new`, the bounty code is pushed to [optymtech/reachci](https://github.com/optymtech/reachci) for compilation and optym `config.js` is generated and pushed to [optymtech/registry](https://github.com/optymtech/registry) for static website deployment.
* [optymtech/reachci](https://github.com/optymtech/reachci) - This is the repository where bounty function is stored along with our backend code. On each push, the code is compiled on GitHub actions and compiled backend is hosted on the `gh-pages` for the static webpage to get.
* [optymtech/optym-cli](https://github.com/optymtech/optym-cli) - Test program containing a CLI frontend which simulates a contest on the Devnet. 
* [optymtech/registry](https://github.com/optymtech/registry) - After the reach code is compiled for a subdomain, the configuration for a website is generated and pushed to this repository. On push, we use GitHub Actions to build React page and deploy it using Netlify on the subdomain.
