---
title: "QR Codes: A Practical Threat Model Without the Scaremongering"
date: 2025-01-31
slug: the-truth-about-qr-codes-and-scaremongering-what-you-need-to-know
summary: "QR codes are data carriers, but their destinations and device actions can still expose people to phishing, fraudulent payments, malware, and vulnerable software."
topics:
  - general
  - tech-with-a-twist
  - security
status: published
original_url: "https://vault.jamesburchill.com/general/the-truth-about-qr-codes-and-scaremongering-what-you-need-to-know/"
wordpress_id: 304
featured_image: "/assets/2025/01/the-truth-about-qr-codes-and-scaremongering-what-you-need-to-know-qr-code-truth.webp"
---

# QR Codes: A Practical Threat Model Without the Scaremongering

![A practical view of QR code security](/assets/2025/01/the-truth-about-qr-codes-and-scaremongering-what-you-need-to-know-qr-code-truth.webp)

> **Corrected July 15, 2026:** The original version used absolutes about what scanning a QR code can or cannot do. The safer distinction is between the code, the action a device takes after decoding it, and any vulnerabilities in the software handling that action.

A QR code is a compact way to encode data. It can contain a web address, payment destination, contact record, application link, Wi-Fi configuration, or plain text. That makes the code itself neither safe nor malicious.

The risk comes from what the data asks a device or person to do next.

## The common attack: hide the destination

Most QR-code attacks are phishing or payment-redirection attacks:

- a fraudulent sticker covers the real code on a parking meter;
- an unexpected package or message asks you to scan for more information;
- a spoofed login page captures a password;
- a payment code sends money to the attacker's account; or
- a link encourages installation of an untrusted application or configuration.

These attacks often need another action from the user, but that does not make them harmless. Mobile interfaces can hide full URLs, urgency reduces scrutiny, and deep links can hand an action directly to another application.

## Could scanning alone cause harm?

On a current, properly patched device, decoding a normal QR code usually displays information or asks before taking a consequential action. It should not be treated as a guarantee. Camera applications, QR parsers, browsers, operating systems, and deep-link handlers are software; software can contain vulnerabilities.

The practical rule is: **do not panic about the square pattern, but do not trust an encoded destination merely because it arrived as a square pattern.**

## Safer habits

1. Preview the destination and inspect the full domain before opening it.
2. For unexpected messages, navigate through the organization's known website or application instead of the supplied code.
3. Check public codes for an overlaid sticker or tampering.
4. Do not enter credentials or payment information unless the destination and request make sense.
5. Install applications only through trusted platform stores and verify the publisher.
6. Keep the phone, browser, and applications updated.
7. Protect important accounts with unique passwords and multifactor authentication.

QR codes are useful because they reduce friction. Attackers value them for exactly the same reason. Good security comes from understanding the transition from **code → destination → action**, not from declaring QR codes either harmless or terrifying.

Source: [U.S. Federal Trade Commission guidance on harmful QR codes](https://consumer.ftc.gov/consumer-alerts/2023/12/scammers-hide-harmful-links-qr-codes-steal-your-information).
