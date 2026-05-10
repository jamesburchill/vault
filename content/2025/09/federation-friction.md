---
title: "Federation Friction"
date: 2025-09-15
slug: federation-friction
summary: "Why Open Protocols Struggle in a World Obsessed with Control Email is the messy miracle of the Internet. Anyone can run a server, everyone can connect, and no single company owns the system. It’s the most successful example of a federated protocol—open, interoperable, and universal. Yet it’s also a daily reminder of why federation is"
topics:
  - strategy
status: published
original_url: "https://vault.jamesburchill.com/strategy/federation-friction/"
wordpress_id: 741
featured_image: "/assets/2025/09/federation-friction-federated-friction.png"

---

# Federation Friction

![Federation Friction](/assets/2025/09/federation-friction-federated-friction.png)


## **Why Open Protocols Struggle in a World Obsessed with Control**

Email is the messy miracle of the Internet. Anyone can run a server, everyone can connect, and no single company owns the system. It’s the most successful example of a federated protocol—open, interoperable, and universal. Yet it’s also a daily reminder of why federation is hard. Spam filters, authentication schemes, phishing attacks, and blacklists are all the scar tissue from decades of trying to keep an open system usable.

Now imagine pitching email in 2025: _a global system where anyone can set up a server and send messages directly into your inbox, no central gatekeeper required._ It would be dead on arrival. Security experts would laugh, regulators would panic, and users would say it sounds like a scammer’s paradise. And yet email survived because it was first. It became too big to kill.

This paradox—federation as both a strength and a liability—is what I call **Federation Friction.**

## **The Dream of Federation**

Federation is the idea that different systems should talk to each other seamlessly. Think of it like the telephone network: you don’t need to be on the same carrier to place a call. Federation lets you choose your provider without losing access to the broader network.

The Internet was built on this idea. Email, DNS, and even the web itself are federated at their core. Anyone can register a domain, run a mail server, or host a website. The protocols are open, the rules are shared, and the barriers are mostly social or financial rather than technical.

Today, several projects are trying to drag this old spirit back into the modern era of social networking and messaging:

• **Bluesky & AT Protocol**: A federated social graph where you can run your own server (_personal data server_), host your identity, and still plug into the wider conversation.

• **Matrix & Synapse**: A federated messaging fabric where you can host your own homeserver and join rooms across the network, extending into voice, video, and even IoT.

• **Mastodon & ActivityPub**: A federated publishing layer, decentralizing Twitter-style feeds and connecting them across platforms.

On paper, this looks like the future: portable identities, no lock-in, no single point of control. But then comes the friction.

## **Federation’s Repeat Headaches**

The same three issues show up every time someone tries to federate:

**1\. Moderation**

Who decides what counts as spam, abuse, or harassment? On a centralized platform, moderation is an executive decision. In federation, one server’s problem is another server’s freedom.

The only real tools are blocklists and defederation—cutting ties with “bad neighbours.” Mastodon has lived this in real time, with some servers blocking entire swaths of the network. It works, but it creates fragmentation. The network slowly splinters into clusters of “acceptable” communities.

**2\. Performance & Scaling**

Federation isn’t free. Each server has to replicate state, sync updates, and handle cross-network requests. Matrix in particular has wrestled with this problem—Synapse servers can become resource hogs at scale.

Bluesky is betting on a lighter, more decentralized data model that separates the “what” (the social graph) from the “where” (the hosting). It might help, but the trade-off is complexity: more moving parts, more room for things to break.

**3\. User Experience**

Federation is harder to explain. Do you want your account on bluesky.social or on your own PDS? Which Matrix homeserver should you join? Why can’t you just log in and be done with it?

Centralized apps win because they hide all that complexity. People choose convenience even if it means being trapped inside someone else’s garden.

This is the heart of **Federation Friction**: openness creates power, but power comes with sharp edges.

## **Lessons from Email**

Email shows both the promise and the curse of federation. It scaled to billions of users and became indispensable. But it’s also riddled with constant low-level pain: junk mail, endless authentication schemes, and silo creep (Google and Microsoft increasingly act like quasi-central authorities).

The story of email is really the story of survival. It was early enough to establish dominance before corporations learned how to build walled gardens. By the time centralized competitors like AOL tried to replace it with closed messaging systems, email had already become too deeply embedded in personal and business life.

The takeaway is sobering: **if email were invented today, it would never pass product review.**

The world has become less patient with friction. Smooth UX and central control dominate. We tolerate lock-in because it feels easier, safer, and faster—even as it erodes our digital sovereignty.

## **Other Ghosts of Federation Past**

Email isn’t the only example. The Internet has seen several waves of federation:

• **Usenet**: A decentralized system of discussion boards, massively popular in the 80s and 90s. It eventually collapsed under spam, poor moderation, and the rise of easier-to-use centralized forums.

• **XMPP (Jabber)**: A federated chat protocol adopted by Google Talk, Facebook Chat, and many others—until those giants abandoned federation to keep users locked in.

• **RSS**: A federated way of syndicating content across the web. It was simple, powerful, and user-controlled… until platforms like Facebook and Twitter deliberately killed it off by absorbing content into their own walled feeds.

Each of these protocols offered openness and user freedom. Each fell victim to the same forces: scale, spam, and centralized convenience.

## **Federation Today: Three Fronts**

Despite the failures, federation isn’t dead. In fact, it’s having a resurgence, just in new forms:

• **Matrix** is pushing hard to be the universal fabric for secure, decentralized communication. Governments, the EU, and even the German military are experimenting with it. The bridges to Slack, WhatsApp, and Discord make it more glue than competitor.

• **Bluesky’s AT Protocol** is chasing the dream of a federated social graph. Right now, it’s mostly centralized (Bluesky hosts nearly all accounts), but the architecture points toward user-portable identity.

• **Mastodon & ActivityPub** represent the publishing wing. Mastodon itself is niche, but the protocol has suddenly gained mainstream legitimacy thanks to Meta’s Threads quietly federating with the Fediverse.

These three fronts—messaging, social, and publishing—mirror the big silos we all live in today: WhatsApp, X (Twitter), Facebook/Instagram. Federation’s goal is to prise open those walls.

## **The Path Ahead**

The future could break in a few directions:

1\. **Fragmentation Wins**

Federation thrives in small clusters but never achieves mainstream adoption. Think of ham radio or IRC—useful, even vibrant, but sidelined from the mainstream.

2\. **Corporate Co-option**

Big players adopt open protocols but twist them into centralised experiences. Meta is already doing this with ActivityPub: federated at the edges, but with Meta still in control of the middle.

3\. **Convergence**

The holy grail: Matrix for messaging, AT for identity and social graphs, ActivityPub for publishing—stitched together so your one identity flows across all three. Post, chat, call, publish, all without a corporate gatekeeper. This is technically possible, but politically fraught.

4\. **Suppression**

Governments or corporations clamp down on federation in the name of “security.” Mandatory identity verification, state-approved servers, and restricted federation could neuter the very idea of open protocols.

Which outcome we get depends less on technology and more on politics, culture, and user willpower.

## **Why Federation Still Matters**

Even if federation never becomes as smooth as WhatsApp or Instagram, it represents something worth fighting for: **digital sovereignty.** The ability to own your identity, move between providers, and resist lock-in is the difference between being a citizen of the Internet and being a tenant on someone else’s platform.

Federation also builds resilience. Centralized systems are brittle—if one company pulls the plug, an entire network dies. Federated systems are harder to kill. That’s why governments, activists, and technologists keep returning to them.

The stakes aren’t just technical. They’re philosophical. Do we want the Internet to look like email—open, federated, chaotic—or like WhatsApp—smooth, controlled, locked down?

## **Closing Thought**

Federation is the Internet at its most idealistic: chaotic, open, resistant to capture. Centralization is the Internet at its most practical: clean, efficient, controlled. Email proves that federation can win—but only if it arrives early enough, grows fast enough, and survives the chaos long enough to become too essential to kill.

The future of Bluesky, Matrix, and the rest will hinge on whether they can cross that threshold—or whether Federation Friction grinds them down before they get there.

#StayFrosty!
