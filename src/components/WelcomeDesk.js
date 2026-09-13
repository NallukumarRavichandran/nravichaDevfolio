import { jsxs, jsx } from "react/jsx-runtime";
import { ArrowUpRight, FolderOpen, LockKeyhole, Monitor, UserRound } from "lucide-react";

const LoginScreen = ({ onLogin }) => jsx("section", {
  className: "fixed inset-0 z-[8000] flex flex-col justify-center bg-[#5a7edc] font-sans text-white",
  children: jsx("div", {
    className: "w-full border-y-2 border-[#3153a5] bg-[#3265c5] py-10 shadow-[0_2px_8px_rgba(0,0,0,.45)]",
    children: [
      jsxs("div", { className: "mx-auto flex w-full max-w-2xl items-center gap-8 px-6", children: [
        jsxs("div", { className: "hidden flex-1 text-right sm:block", children: [
          jsx("div", { className: "text-2xl font-light", children: "Welcome" }),
          jsx("div", { className: "mt-2 text-sm text-blue-100", children: "To begin, click your user name" })
        ] }),
        jsxs("button", { onClick: onLogin, className: "group flex w-64 items-center gap-3 border-0 bg-transparent text-left text-white", children: [
          jsx("div", { className: "flex h-20 w-20 items-center justify-center border-2 border-white bg-[#dbe8f7] text-[#245edb] shadow-[inset_1px_1px_#fff,inset_-1px_-1px_#7890ad]", children: jsx(UserRound, { className: "h-11 w-11" }) }),
          jsxs("span", { children: [
            jsx("strong", { className: "block text-base", children: "Nallukumar R" }),
            jsx("span", { className: "mt-1 block text-xs text-blue-100", children: "Java Full Stack Developer" }),
            jsxs("span", { className: "mt-3 flex items-center gap-1 text-xs font-bold text-white group-hover:underline", children: [jsx(LockKeyhole, { className: "h-3 w-3" }), "Log on"] })
          ] })
        ] }),
        jsx("div", { className: "hidden flex-1 sm:block", children: jsx("div", { className: "h-px bg-blue-300/50" }) })
      ] })
    ]
  })
});

export const WelcomeDesk = ({ onOpenApp, loggedIn, onLogin }) => {
  if (!loggedIn) return jsx(LoginScreen, { onLogin });
  return null;
};
