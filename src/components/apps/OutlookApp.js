import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Mail, Send, Inbox, CheckCircle2, CornerDownLeft } from "lucide-react";
import { sounds } from "../../utils/audio";
const INITIAL_EMAILS = [
  {
    id: "m1",
    from: "engineering@giritronics.com",
    subject: "Backend Services & REST APIs Release Update \u2014 Production Verified",
    date: "Sep 03, 2026, 11:20 AM",
    read: true,
    tag: "Work",
    body: `Hi Nallukumar,

Your Java Full Stack backend services and secure REST APIs for the new client web platform have been verified and deployed to staging.

The database indexing optimizations and CI/CD release triage met all enterprise compliance benchmarks. 

Thanks for your dedication to clean, high-performance architecture!

Best regards,
Software Engineering Team
Giritronics, Chennai`
  },
  {
    id: "m2",
    from: "amex-cloud-infra@americanexpress.com",
    subject: "Cloud & Infrastructure Traineeship Completion & Microservices Recognition",
    date: "Aug 28, 2026, 04:15 PM",
    read: true,
    tag: "Work",
    body: `Hi Nallukumar,

Thank you for your valuable contributions to the Cloud & Infrastructure team at American Express. 

Your work on optimizing high-throughput Java microservices, triaging enterprise releases with 0 critical vulnerabilities, and maintaining robust CI/CD deployment pipelines has been outstanding.

We wish you continued success in your engineering endeavors!

Warm regards,
Cloud Engineering Leadership Team
American Express`
  },
  {
    id: "m3",
    from: "contests@leetcode.com",
    subject: "Weekly Contest Performance: Top 5% Global Ranking Achievement",
    date: "Aug 25, 2026, 08:30 PM",
    read: true,
    tag: "Algorithms",
    body: `Congratulations Nallukumar!

You successfully solved all 4 algorithm challenges in the latest Weekly Contest:
1. Array Transformation (O(N) time, O(1) space)
2. Dynamic Programming Matrix Path (O(N*M))
3. Graph Connected Components BFS
4. Monotonic Queue & Segment Tree Optimization

Your continuous dedication to solving algorithmic problems on LeetCode and CodeChef is truly commendable!`
  },
  {
    id: "m4",
    from: "collaborations@nallukumar.dev",
    subject: "Generative AI Tutor & Full Stack Engineering Inquiry",
    date: "Aug 20, 2026, 02:40 PM",
    read: true,
    tag: "Inquiry",
    body: `Hello Nallukumar,

I reviewed your Generative AI Tutor (RAG pipeline with ChromaDB) and Mind Buddy applications. The architectural discipline and zero-hallucination guardrails are very impressive!

We would love to connect directly via LinkedIn (https://www.linkedin.com/in/nallukumar-ravichandran663/?skipRedirect=true) or discuss opportunities at kumar10naidu@gmail.com / +91 6369614270.

Kind regards,
Senior Technical Talent Partner`
  }
];
const OutlookApp = () => {
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [selectedEmailId, setSelectedEmailId] = useState("m1");
  const [isComposing, setIsComposing] = useState(false);
  const [composeName, setComposeName] = useState("");
  const [composeEmail, setComposeEmail] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeMessage, setComposeMessage] = useState("");
  const [sentNotice, setSentNotice] = useState(false);
  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0];
  const handleSelect = (id) => {
    sounds.playClick();
    setSelectedEmailId(id);
    setEmails((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };
  const handleSend = (e) => {
    e.preventDefault();
    if (!composeEmail || !composeMessage) {
      sounds.playError();
      return;
    }
    sounds.playExclamation();
    const mailtoUrl = `mailto:kumar10naidu@gmail.com?subject=${encodeURIComponent(
      composeSubject || "Connecting with Nallukumar R"
    )}&body=${encodeURIComponent(
      `Name: ${composeName}
Email: ${composeEmail}

Message:
${composeMessage}`
    )}`;
    window.open(mailtoUrl, "_blank");
    const newEntry = {
      id: Date.now().toString(),
      from: composeEmail,
      subject: composeSubject || "Direct Message to Nallukumar",
      date: "Just now",
      read: true,
      tag: "Sent",
      body: composeMessage
    };
    setEmails([newEntry, ...emails]);
    setSelectedEmailId(newEntry.id);
    setSentNotice(true);
    setTimeout(() => {
      setSentNotice(false);
      setIsComposing(false);
      setComposeName("");
      setComposeEmail("");
      setComposeSubject("");
      setComposeMessage("");
    }, 1500);
  };
  const applyTemplate = (template) => {
    sounds.playClick();
    if (template === "hire") {
      setComposeSubject("Opportunity Discussion - Software Engineering");
      setComposeMessage("Hi Nallukumar,\n\nI was impressed by your Java Full Stack experience at American Express and your active problem-solving skills. We would like to invite you for an interview regarding a Software Engineer role.\n\nLooking forward to speaking with you!");
    } else if (template === "collab") {
      setComposeSubject("Project Collaboration Proposal");
      setComposeMessage("Hi Nallukumar,\n\nI saw your work on Mind Buddy and Hash-Forge. I have an interesting full-stack project idea and would love to collaborate.\n\nLet me know your availability for a quick chat!");
    } else {
      setComposeSubject("Just saying hi from your XP Portfolio!");
      setComposeMessage("Hello Nallu,\n\nYour Windows XP portfolio is brilliant! The attention to detail, sounds, and working applications are super cool. Keep building great things!");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-h-0 bg-[#f0f0e8] text-xs font-sans select-none", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-[#eaeae2] border-b border-zinc-300 p-1.5 flex-wrap", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            setIsComposing(true);
          },
          className: "flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-zinc-100 border border-zinc-400 rounded font-bold text-blue-900 shadow-xs cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5 text-blue-600" }),
            /* @__PURE__ */ jsx("span", { children: "Create Mail" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "h-4 border-r border-zinc-400" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            sounds.playClick();
            setIsComposing(false);
          },
          className: `flex items-center gap-1.5 px-2 py-1 rounded border cursor-pointer ${!isComposing ? "bg-white border-zinc-400 font-bold text-blue-900" : "border-transparent hover:bg-zinc-200"}`,
          children: [
            /* @__PURE__ */ jsx(Inbox, { className: "w-3.5 h-3.5 text-emerald-600" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Inbox (",
              emails.length,
              ")"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "mailto:kumar10naidu@gmail.com",
          className: "flex items-center gap-1.5 px-2 py-1 hover:bg-zinc-200 rounded border border-transparent text-blue-800 font-semibold",
          children: /* @__PURE__ */ jsx("span", { children: "Direct: kumar10naidu@gmail.com" })
        }
      )
    ] }),
    isComposing ? (
      /* Compose Form */
      /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white p-4 flex flex-col min-h-0 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b pb-2 mb-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-blue-900 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 text-blue-600" }),
            "New Message to Nallukumar R"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsComposing(false),
              className: "text-zinc-500 hover:text-zinc-800 font-bold",
              children: "Cancel"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex gap-1.5 flex-wrap items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-zinc-500", children: "Quick Templates:" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => applyTemplate("hire"),
              className: "px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded border border-blue-200 text-[10px] font-semibold",
              children: "\u{1F4BC} Hire Nallukumar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => applyTemplate("collab"),
              className: "px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded border border-emerald-200 text-[10px] font-semibold",
              children: "\u{1F91D} Project Collab"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => applyTemplate("hello"),
              className: "px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded border border-amber-200 text-[10px] font-semibold",
              children: "\u{1F44B} Say Hello"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSend, className: "space-y-2 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b py-1", children: [
            /* @__PURE__ */ jsx("span", { className: "w-16 font-bold text-zinc-600", children: "To:" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-zinc-800 font-bold", children: "kumar10naidu@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b py-1", children: [
            /* @__PURE__ */ jsx("label", { className: "w-16 font-bold text-zinc-600", children: "Your Name:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: composeName,
                onChange: (e) => setComposeName(e.target.value),
                placeholder: "e.g. John Doe / Hiring Manager",
                className: "flex-1 px-2 py-1 outline-hidden border border-zinc-200 rounded"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b py-1", children: [
            /* @__PURE__ */ jsx("label", { className: "w-16 font-bold text-zinc-600", children: "Your Email:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                required: true,
                value: composeEmail,
                onChange: (e) => setComposeEmail(e.target.value),
                placeholder: "e.g. recruiter@company.com",
                className: "flex-1 px-2 py-1 outline-hidden border border-zinc-200 rounded"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b py-1", children: [
            /* @__PURE__ */ jsx("label", { className: "w-16 font-bold text-zinc-600", children: "Subject:" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                required: true,
                value: composeSubject,
                onChange: (e) => setComposeSubject(e.target.value),
                placeholder: "Subject of your message...",
                className: "flex-1 px-2 py-1 outline-hidden border border-zinc-200 rounded"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col pt-2 min-h-[120px]", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              required: true,
              value: composeMessage,
              onChange: (e) => setComposeMessage(e.target.value),
              placeholder: "Write your message here...",
              className: "flex-1 p-2 border border-zinc-300 rounded font-sans resize-none outline-hidden focus:border-blue-500"
            }
          ) }),
          sentNotice && /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 border border-emerald-300 p-2 rounded flex items-center gap-2 text-emerald-800 font-bold", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600" }),
            /* @__PURE__ */ jsx("span", { children: "Message dispatched! Opening your default mail client as fallback..." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end gap-2 pt-2 border-t", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded flex items-center gap-1.5 shadow",
              children: [
                /* @__PURE__ */ jsx(Send, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Send Message" })
              ]
            }
          ) })
        ] })
      ] })
    ) : (
      /* 2-Pane Inbox View */
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex min-h-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-1/2 md:w-2/5 border-r border-zinc-300 bg-white overflow-y-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#f0f0e8] px-2 py-1 font-bold text-[10px] text-zinc-500 uppercase tracking-wider border-b", children: [
            "Messages (",
            emails.length,
            ")"
          ] }),
          emails.map((m) => {
            const isPicked = m.id === selectedEmailId;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => handleSelect(m.id),
                className: `p-2.5 border-b cursor-pointer transition select-none ${isPicked ? "bg-[#0a246a] text-white" : "hover:bg-zinc-100 text-zinc-800"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-1", children: [
                    /* @__PURE__ */ jsx("span", { className: `truncate text-xs ${isPicked ? "text-white" : "font-bold text-blue-900"}`, children: m.from.split("@")[0] }),
                    /* @__PURE__ */ jsx("span", { className: `text-[10px] ${isPicked ? "text-blue-200" : "text-zinc-400"}`, children: m.date.split(",")[0] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: `truncate font-semibold ${isPicked ? "text-blue-100" : "text-zinc-800"}`, children: m.subject }),
                  m.tag && /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: `inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded font-bold ${isPicked ? "bg-blue-500 text-white" : "bg-zinc-100 text-zinc-600 border border-zinc-300"}`,
                      children: m.tag
                    }
                  )
                ]
              },
              m.id
            );
          })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 bg-white p-4 flex flex-col min-h-0 overflow-y-auto select-text", children: selectedEmail ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "border-b pb-3 mb-3", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-zinc-900 mb-1.5", children: selectedEmail.subject }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-zinc-600 space-y-0.5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-zinc-700", children: "From:" }),
                " ",
                selectedEmail.from
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-zinc-700", children: "To:" }),
                " Nallukumar R <kumar10naidu@gmail.com>"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { className: "text-zinc-700", children: "Date:" }),
                " ",
                selectedEmail.date
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 whitespace-pre-wrap font-sans leading-relaxed text-zinc-800 text-xs md:text-sm", children: selectedEmail.body }),
          /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t mt-4 flex gap-2 select-none", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  sounds.playClick();
                  setIsComposing(true);
                  setComposeSubject(`Re: ${selectedEmail.subject}`);
                },
                className: "px-3 py-1.5 bg-[#eaeae2] hover:bg-zinc-200 border border-zinc-400 rounded font-bold text-zinc-800 flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(CornerDownLeft, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "Reply" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:kumar10naidu@gmail.com",
                className: "px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "Open in Email App" })
                ]
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center text-zinc-400 italic", children: "No message selected" }) })
      ] })
    )
  ] });
};
export {
  OutlookApp
};
