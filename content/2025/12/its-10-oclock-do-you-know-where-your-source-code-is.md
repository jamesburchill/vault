---
title: "It’s 10 o’clock. Do you know where your source code is?"
date: 2025-12-10
slug: its-10-oclock-do-you-know-where-your-source-code-is
summary: "There used to be a late–night public service announcement on TV: “It is 10 o’clock. Do you know where your children are?” If you are a founder, CTO, or anyone responsible for software, you can adapt that line: “It is 10 o’clock. Do you know where your source code is?” Most people think they do."
topics:
  - general
  - architecture
status: published
original_url: "https://vault.jamesburchill.com/general/its-10-oclock-do-you-know-where-your-source-code-is/"
wordpress_id: 958
featured_image: "/assets/2025/12/its-10-oclock-do-you-know-where-your-source-code-is-typing-keyboard-scaled.png"

---

# It’s 10 o’clock. Do you know where your source code is?

![It’s 10 o’clock. Do you know where your source code is?](/assets/2025/12/its-10-oclock-do-you-know-where-your-source-code-is-typing-keyboard-scaled.png)


There used to be a late–night public service announcement on TV:

“It is 10 o’clock. Do you know where your children are?”

If you are a founder, CTO, or anyone responsible for software, you can adapt that line:

“It is 10 o’clock. Do you know where your source code is?”

Most people think they do. They are usually wrong.

What they really know is where _some_ of their code is. The rest is scattered across laptops, SaaS tools, contractor machines, random ZIP archives, and forgotten branches in repos nobody has pulled in months.

If that sounds dramatic, good. This is one of those problems you only notice when it is too late.

Let us walk through this clearly and practically.

* * *

## **The illusion of control**

Teams often say things like:

*   “Everything is in GitHub.”
*   “Our dev shop handles all that.”
*   “It is all on the server.”

Usually, when you dig in, you find:

*   One “main” repo that is sort of up to date.
*   A bunch of unmerged branches on personal forks.
*   Legacy code running in production that does not match any branch.
*   A contractor who kept a private backup “just in case.”
*   Old ZIPs and TAR files in cloud drives or email.

You might be fine today. But you are one resignation, one dispute, one ransomware incident, or one dead SSD away from a very expensive wake–up call.

* * *

## **Why this actually matters**

This is not a purity thing about “good engineering hygiene.” It is about:

1.  **Business continuity** If the person who “knows where everything is” disappears, can you still run and update your product?
2.  **IP ownership and valuation** If you sell the company or raise money, someone will eventually ask:
    *   Where is your code?
    *   Who has access?
    *   Who actually owns what?
3.  **Security and compliance** Scattered code means scattered secrets: API keys, credentials, tokens, and database connection strings. One lost laptop or shared ZIP and you have a real problem.
4.  **Developer velocity** When nobody trusts that the codebase in front of them is “the real one,” people stall, duplicate work, or accidentally resurrect old bugs.

Knowing where your code is – and having one authoritative truth – is the baseline for everything else.

* * *

## **Where your code probably is right now**

If you mapped the real situation, you might find code in:

*   Git hosting: GitHub, GitLab, Bitbucket, Azure DevOps, etc.
*   Local machines: developer laptops, desktops at home, personal Macs.
*   Third–party vendors: agencies, freelancers, offshore teams.
*   Cloud storage: Google Drive, Dropbox, OneDrive, Box.
*   CI/CD systems: build servers that still have old clones or artifacts.
*   “Temporary” archives: ZIPs sent over email or chat.
*   Legacy servers: old on–prem machines or forgotten VPS instances.

None of these are bad in isolation. The problem is when _you_ do not have a clear map and a clear owner for each.

* * *

## **Step 1: Create a source code inventory**

Before you can fix anything, you need to know what actually exists.

Do this as a simple, fast inventory, not a six–month governance project.

Create a list with:

*   System or product name
*   Where the code lives (repo URL, machine, vendor)
*   Who has access
*   Who “owns” it internally
*   When it was last updated
*   How critical it is to the business (high / medium / low)

You can start with your main product, then any supporting systems:

*   Web app
*   Mobile apps
*   Internal admin tools
*   Background workers / cron jobs
*   Integration scripts (ETL, API glue, webhooks)
*   Infrastructure as code (Terraform, Ansible, CloudFormation)
*   One–off utilities that are actually business critical

You are not documenting everything perfectly. You are making the invisible visible.

* * *

## **Step 2: Declare a single source of truth**

Once you have a rough map, you need to decide:

“For each system, _this_ is the canonical source of truth.”

That usually means:

*   A single Git platform (pick one and consolidate over time).
*   One primary repo per system (or a deliberate monorepo, not an accidental one).
*   Clear naming, so nobody wonders which repo is “the real one.”

Examples:

*   product-api
*   product-frontend
*   mobile-app-ios
*   infrastructure-live
*   internal-admin

The key idea: every piece of code that runs in production should be traceable back to an identified repo you control.

No mystery servers, no “magic scripts,” no one–off “temporary” forks running live traffic.

* * *

## **Step 3: Pull your code back inside the fence**

If you use vendors, contractors, or offshore teams, it is common for them to host the code in their own environment.

Short term, this can be convenient. Long term, it is a risk.

Practical steps:

1.  **Move repos into your organisation account** Invite vendors and contractors as collaborators. Your company owns the org, the repos, and the access rights.
2.  **Mirror if you cannot move** If a vendor insists on their own hosting, set up a read–only mirror into your own Git org. That way, even if the relationship ends suddenly, you still have a complete copy.
3.  **Pull in any private forks** Ask developers to upstream critical branches into the official repos. Make it clear that production code does not live only on private forks.
4.  **Harvest code from “temporary” locations** Find those ZIPs in email, team drives, or chat, and either integrate or archive them properly.

This is about control, not about trust. Good vendors and devs will not be offended when you say, “We need everything inside our own org.”

* * *

## **Step 4: Classify and protect your most critical code**

Not all code is equal. You may have:

*   Commodity glue and small utilities.
*   Core IP: proprietary algorithms, scoring models, matching logic.
*   Security–sensitive code: auth, payments, data handling.

Be clear about which pieces are:

*   **Core to your competitive advantage**
*   **Core to your ability to operate**
*   **Highly sensitive from a security or privacy angle**

For those, raise the bar:

*   Stronger access controls (least privilege, role–based access).
*   Mandatory 2FA for anyone with access.
*   Tighter rules on cloning to local devices.
*   Periodic review of who can see what.

You do not need to build a military bunker. You just need to stop giving your crown jewels away casually.

* * *

## **Step 5: Tie code to deployments**

Knowing where the code _sits_ is only half the story. You also need to know:

*   Which commit or tag is running in production.
*   How that code gets from repo to runtime.
*   Who can push that change.

If you cannot answer “What commit is running in production right now?” without a small investigation, that is a red flag.

Aim for:

*   Tagged releases: v1.3.0, v2025.12.10 etc.
*   Deployment logs that show what went out, when, and by whom.
*   The ability to roll back to a known good version.

When something goes wrong at 3am, future you will be very grateful that current you did this.

* * *

## **Step 6: Reduce “code in the shadows”**

Shadow IT is not just SaaS tools. You can also have shadow code:

*   Scripts a dev wrote to fix something “just this once.”
*   Lambda functions someone added directly in the cloud console.
*   Cron jobs edited by hand on a server.
*   Automation rules buried in some third–party system.

The rule of thumb:

> If it runs in production and affects customers, it should be in version control.

That includes:

*   Database migration scripts.
*   Emergency hotfixes.
*   One–off data repair tools that might be reused.

If people are making changes directly on live systems without going through code, you do not really know what your system looks like.

* * *

## **Step 7: Bake this into how you work**

You do not fix this with one inventory and one cleanup. You fix it by changing how you operate.

Some simple policies:

1.  **No code, no deploy** If it is not in the repo, it does not go to production.
2.  **No single keeper of knowledge** At least two people should know where and how each critical system is deployed.
3.  **Joiners, movers, leavers** When someone joins, moves roles, or leaves, review their access. Remove access from people who no longer need it.
4.  **Quarterly check–ins** Once a quarter, spend an hour reviewing:
    *   Are there any new systems without repos?
    *   Any new vendors holding code?
    *   Any “temporary” experiments that are now business critical?

This does not have to be heavy. It just has to be deliberate.

* * *

## **Where AI tools fit into this**

Modern teams are using AI coding tools, assistants, and online sandboxes. That is fine, but it adds more surface area:

*   Code prototyped in an AI playground that never makes it into a repo.
*   Sensitive snippets pasted into external tools.
*   Generated code that lives in a browser tab and then disappears.

Set some expectations:

*   Anything that ships must live in your repo.
*   No copying secrets or proprietary algorithms into public tools.
*   If AI helps you draft something, capture the final version in your controlled environment.

AI should help you command the machines, not scatter your IP.

* * *

## **A quick self–check**

Answer these without thinking too hard:

1.  Do you know, right now, which repos contain the code that runs in production?
2.  Do you control the organisation / account those repos live in?
3.  Could you rebuild your production environment from scratch using only what is in version control?
4.  If your main vendor or key dev walked away tomorrow, would you still have everything you need?

If you cannot confidently say “yes” to those, you have work to do.

And if your answer is basically, “I think so,” treat that as a “no.”

* * *

## **A simple action plan for the next week**

You do not need a huge project to make progress. In the next 7 days you can:

*   List your top 3 critical systems and identify their repos.
*   Make sure those repos live in an organisation account you control.
*   Invite vendors and contractors into _your_ org instead of theirs.
*   Tag your current production releases so you have a reference point.
*   Schedule a one–hour review with your technical lead or vendor to walk through “where everything lives.”

Small steps here remove a lot of risk later.

* * *

## **Closing thought**

Source code is not just “the stuff developers work on.” It is a major part of your company’s nervous system.

You can outsource implementation. You can use contractors, offshore teams, and agencies. You can lean on SaaS and AI tools.

What you cannot safely outsource is _control_.

So the next time you glance at the clock and it is 10 o’clock, ask yourself:

Do you actually know where your source code is?

And if you do not, what are you going to do about it this month, not “someday”?

StayFrosty!

~ James
