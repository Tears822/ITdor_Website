window.ITDOR_BLOG = [
  {
    slug: "why-application-support-matters-after-launch",
    title: "Why Application Support Matters After Launch",
    excerpt:
      "Software doesn't stop at deployment. Learn how dedicated application support keeps your product running smoothly and your users happy.",
    date: "2026-02-15",
    author: "ITDorservices",
    image: "image/blog/blog-grid-1.jpg",
    listImage: "image/blog/tf-post-big-1.jpg",
    tags: ["Application Support", "Software"],
    body: "Application support is often an afterthought until something breaks. At IT Dor Services, we treat support as part of the product: when we build your application, we stay with you after launch.\n\n**What application support covers**\n\n- **Troubleshooting** – Diagnosing and resolving issues quickly so your team and users aren't blocked.\n- **User training** – Helping your staff and customers get the most out of the software.\n- **Documentation** – Keeping runbooks and guides up to date so knowledge isn't lost.\n- **Bridge to development** – Clear communication between you and the dev team so fixes and improvements are prioritized correctly.\n\n**Why one team for build and support**\n\nWhen the same team that built the app also supports it, there's no handoff friction. We know the architecture, the decisions, and the trade offs. That means faster resolution and fewer misunderstandings.\n\nWe offer 1 month of free application support after every launch, with ongoing support available. If you're planning a new build or struggling with support for an existing app, get in touch."
  },
  {
    slug: "modern-stacks-for-reliable-software",
    title: "Modern Stacks for Reliable Software",
    excerpt:
      "How we choose technologies that scale, stay maintainable, and keep your project on track for the long term.",
    date: "2026-02-10",
    author: "ITDorservices",
    image: "image/blog/blog-grid-2.jpg",
    listImage: "image/blog/tf-post-big-2.jpg",
    tags: ["Software Development", "Tech Stack"],
    body: "Choosing the right tech stack isn't just about what's popular—it's about what fits your product, your team, and your timeline.\n\n**What we consider**\n\n- **Product type** – Web, mobile, API, or data pipeline each have different sweet spots.\n- **Team and hiring** – We prefer stacks with strong communities and hiring pools so you can grow.\n- **Maintainability** – Clear patterns, good tooling, and upgrade paths so the app doesn't become legacy in two years.\n- **Integration** – How well the stack plays with your existing systems (auth, payments, CRM, etc.).\n\n**Stacks we use**\n\nWe work with React, Next.js, TypeScript, Node.js, Python, and cloud platforms like AWS and Vercel. For mobile, we use React Native or Flutter when it's the right fit. Every project gets a documented stack and handoff so your next developer or our support team can work on it without guesswork.\n\nIf you're starting a new project or refactoring an old one, we can help you choose and then build on a stack that will last."
  },
  {
    slug: "one-team-development-and-support",
    title: "One Team: Development and Support Together",
    excerpt:
      "Why combining software development with application support in a single team leads to better outcomes and fewer headaches.",
    date: "2026-02-05",
    author: "ITDorservices",
    image: "image/blog/blog-grid-3.jpg",
    listImage: "image/blog/tf-post-big-3.jpg",
    tags: ["Application Support", "Development"],
    body: "Many companies split \"build\" and \"support\" between different teams or vendors. That can work, but it often creates gaps: support doesn't know why something was built that way, and development doesn't hear enough from real users.\n\n**The integrated approach**\n\nAt IT Dor Services, one team handles both:\n\n1. **Build** – We design and develop your application with modern stacks and clear architecture.\n2. **Launch** – We deploy and include 1 month of free application support.\n3. **Support** – Our Application Support Specialist becomes your single point of contact for training, bugs, and feature questions.\n\n**Benefits**\n\n- **Faster fixes** – The people who built it can fix it without digging through someone else's code.\n- **Better communication** – We translate between you and the technical details so nothing gets lost.\n- **Continuity** – No \"that was the other team\" when something goes wrong.\n\nWhether you're planning a new build or need ongoing support for an existing application, we can help. Get in touch for a free consultation."
  },
  {
    slug: "when-to-choose-custom-software",
    title: "When to Choose Custom Software Over Off the Shelf",
    excerpt:
      "Off-the-shelf tools are great—until they're not. Here's when it makes sense to invest in custom development.",
    date: "2026-01-28",
    author: "ITDorservices",
    image: "image/blog/blog-grid-4.jpg",
    listImage: "image/blog/tf-post-big-1.jpg",
    tags: ["Custom Software", "Development"],
    body: "Not every business need requires custom software. But when processes are unique, workflows are complex, or off the shelf tools keep hitting limits, custom development can be the right move.\n\n**Signs custom might be right**\n\n- You're stitching together several tools with spreadsheets and manual steps.\n- Your industry or workflow has specific rules that generic software doesn't handle well.\n- You need integrations (payments, CRM, inventory) that your current tools don't support cleanly.\n- You've outgrown templates and need something that scales with your operations.\n\n**What we deliver**\n\nWe build custom web, mobile, and cloud solutions with modern stacks. You get a product tailored to your process, plus 1 month of free application support after launch. If you're not sure whether to build or buy, we're happy to discuss your situation in a free consultation."
  },
  {
    slug: "remote-delivery-without-the-headaches",
    title: "Remote Delivery Without the Headaches",
    excerpt:
      "How we deliver software and support remotely while keeping communication clear and projects on track.",
    date: "2026-01-20",
    author: "ITDorservices",
    image: "image/services/remote_delivery.jpg",
    listImage: "image/services/remote_delivery.jpg",
    tags: ["Remote Work", "IT Services"],
    body: "We work remotely with clients worldwide. That doesn't mean you get less visibility or slower communication we structure projects so you always know where things stand.\n\n**How we keep it smooth**\n\n- **Regular updates** – Status and demos on a schedule that works for you.\n- **Single point of contact** – No chasing multiple people; one team, one conversation.\n- **Application support included** – After launch, the same team that built the app is there for training, bugs, and questions.\n- **Clear documentation** – So your team (and ours) can work from the same playbook.\n\nIf you're considering a remote development and support partner, we'd be glad to talk. Same day response on consultations get in touch to get started."
  }
];

window.ITDOR_BLOG_BY_SLUG = window.ITDOR_BLOG.reduce(function (acc, post) {
  acc[post.slug] = post;
  return acc;
}, {});
