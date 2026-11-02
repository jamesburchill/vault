---
title: "Send Your AI Assistant to My MCP Service"
date: 2026-11-02
slug: send-your-ai-assistant-to-my-mcp-service
summary: "A working example of asking an AI assistant to use my public MCP service, with plain-language prompts and the curl command behind tool discovery."
topics:
  - ai
  - business
  - mcp
status: published
original_url: ""
featured_image: "/assets/2026/11/send-your-ai-assistant-to-my-mcp-service.png"
canonical_url: ""
---

# Send Your AI Assistant to My MCP Service

![An AI conversation on a laptop connects through an open doorway to a library of published writing.](/assets/2026/11/send-your-ai-assistant-to-my-mcp-service.png)

In [Your Next Customer Might Send an AI Agent](https://vault.jamesburchill.com/content/2026/11/your-next-customer-might-send-an-ai-agent/), I explored a practical idea: customers may increasingly ask AI assistants to get information from your business on their behalf.

This article builds on that with a working example.

My public MCP service is available at **`mcp.jamesburchill.com`**. It gives compatible AI assistants access to my published writing, article topics, public professional profile, and featured books and resources.

You can ask your assistant to use it to answer a question. The assistant contacts the service, discovers the available tools, and uses them to retrieve the information it needs.

I tested exactly that in Codex.

First, I asked:

> Connect to mcp.jamesburchill.com and list capabilities.

The assistant connected and returned five tools:

| Tool | What it provides |
|---|---|
| `search_writing` | Search across my published writing. |
| `list_topics` | Browse topics and article counts. |
| `get_article` | Retrieve an article’s text. |
| `get_public_profile` | Read my public professional profile and contact information. |
| `list_books_and_resources` | Find my featured book and public resource links. |

These are read-only capabilities. The service provides public information. It cannot speak for me or make commitments on my behalf.

For readers who want to see the mechanics, this is the command the assistant used to request the tool list:

```bash
curl -sS https://mcp.jamesburchill.com/ \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'
```

`curl` is a command-line tool for making web requests. Here, it sends an MCP request called `tools/list`, which asks the service what tools it offers.

The response describes each tool, the inputs it accepts, and its purpose. The assistant had already sent MCP’s initialization handshake before making this request; the command above shows the capability query itself.

You don’t need to type that command to try the interaction.

My next instruction was:

> Use mcp.jamesburchill.com to find my articles about AI and summarize the main themes, linking to the originals.

The assistant queried the service, found 28 articles tagged “AI,” reviewed their summaries, and retrieved selected articles. It then described recurring themes in my writing and linked to the original sources.

I supplied the address and the task. I didn’t need to tell it the tool names or explain how to search the library.

Here are two more requests you could try:

> Use the MCP service at mcp.jamesburchill.com to find what James has written about AI agents and human oversight. Summarize his position and link to the articles you used.

> Connect to mcp.jamesburchill.com and find James’s featured book and public resources. Tell me what’s available and include the original links.

The service supplies information; your assistant uses that information to answer your request. You can then ask follow-up questions, compare ideas, or open the originals.

There is one practical qualification: your assistant needs a way to connect.

In this test, Codex used its terminal access to make direct MCP requests. Other AI applications may require you to add the service as a connector first. Some may not support this interaction. A URL in a prompt alone does not give every assistant the ability to connect.

That’s why a business should publish connection instructions alongside its service address. You can find mine in the [connection guide](https://jamesburchill.com/mcp/).

It’s also why I advocate the naming convention described in [Give Your MCP Service a Predictable Address](https://vault.jamesburchill.com/content/2026/11/give-your-mcp-service-a-predictable-address/):

**`mcp.yourdomain.tld`**

It gives people an address that is easy to recognize, remember, and pass to their assistant. It is a convention I’d like more businesses to adopt, rather than a requirement of the protocol or a promise of automatic discovery.

My example is a public writing library. Another business might provide product information, stock availability, or order status, with appropriate access controls.

The customer’s request could be just as straightforward:

> Use the MCP service at mcp.example.com to find out whether they carry the part I need.

That’s the idea from the earlier article, made concrete: give customers a useful way to send their AI assistant to your business.

If your assistant supports it, try mine:

> **Use mcp.jamesburchill.com to find something James has written about a topic that interests me. Show me the sources.**
