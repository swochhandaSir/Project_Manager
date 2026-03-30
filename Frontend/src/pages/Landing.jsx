import React from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowRight, FolderKanban, Users, Zap, CheckCircle, Calendar, TrendingUp } from "lucide-react";
function Landing() {
  const features = [
    {
      title: "Kanban Boards",
      description: "Organize projects and tasks with intuitive drag-and-drop sticky notes",
      icon: FolderKanban,
      color: "#FEFF9C",
      rotation: -2
    },
    {
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members",
      icon: Users,
      color: "#FF7EB9",
      rotation: 3
    },
    {
      title: "Lightning Fast",
      description: "Quick and responsive interface for maximum productivity",
      icon: Zap,
      color: "#7AFCFF",
      rotation: -3
    },
    {
      title: "Track Progress",
      description: "Monitor task completion and project milestones",
      icon: CheckCircle,
      color: "#A0FF7A",
      rotation: 2
    },
    {
      title: "Due Dates",
      description: "Never miss a deadline with built-in date tracking",
      icon: Calendar,
      color: "#FFB366",
      rotation: -1
    },
    {
      title: "Analytics",
      description: "Get insights into team performance and productivity",
      icon: TrendingUp,
      color: "#FEFF9C",
      rotation: 3
    }
  ];
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "min-h-screen",
      style: {
        background: "linear-gradient(135deg, #E8F4F8 0%, #D4E7ED 100%)"
      }
    },
    /* @__PURE__ */ React.createElement("nav", { className: "px-6 py-4 border-b-4 border-black/80 bg-white/30 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-blue-500 p-2 rounded-lg shadow-md transform rotate-3" }, /* @__PURE__ */ React.createElement(FolderKanban, { className: "w-6 h-6 text-white" })), /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "text-3xl font-bold",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#333"
        }
      },
      "ProjectHub"
    )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement(Link, { to: "/login" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "ghost",
        className: "text-lg",
        style: { fontFamily: "Indie Flower, cursive" }
      },
      "Login"
    )), /* @__PURE__ */ React.createElement(Link, { to: "/register" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        className: "gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-lg text-lg",
        style: { fontFamily: "Indie Flower, cursive" }
      },
      "Get Started",
      /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
    ))))),
    /* @__PURE__ */ React.createElement("section", { className: "px-6 py-20 max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ React.createElement(
      "h1",
      {
        className: "text-7xl font-bold mb-6",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#333",
          lineHeight: "1.2"
        }
      },
      "Project Management",
      /* @__PURE__ */ React.createElement("br", null),
      "Made Simple"
    ), /* @__PURE__ */ React.createElement(
      "p",
      {
        className: "text-2xl mb-8 max-w-2xl mx-auto",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#666"
        }
      },
      "Organize your projects with virtual sticky notes on a digital whiteboard. Simple, visual, and fun!"
    ), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-4" }, /* @__PURE__ */ React.createElement(Link, { to: "/register" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "lg",
        className: "gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-xl text-xl px-8 py-6",
        style: { fontFamily: "Indie Flower, cursive" }
      },
      "Start Free",
      /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-5 h-5" })
    )), /* @__PURE__ */ React.createElement(Link, { to: "/login" }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "lg",
        variant: "outline",
        className: "text-xl px-8 py-6 border-2 border-black/20",
        style: { fontFamily: "Indie Flower, cursive" }
      },
      "Try Demo"
    )))), /* @__PURE__ */ React.createElement("div", { className: "relative mb-20 h-96" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute top-0 left-1/4 p-6 rounded-sm shadow-xl",
        style: {
          backgroundColor: "#FEFF9C",
          transform: "rotate(-8deg)",
          width: "200px",
          boxShadow: `
                0 2px 4px rgba(0,0,0,0.12),
                0 6px 12px rgba(0,0,0,0.15),
                0 12px 24px rgba(0,0,0,0.1)
              `
        }
      },
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-xl font-bold",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "\u2713 Easy to use"
      ),
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-lg mt-2",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "No learning curve!"
      )
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute top-20 right-1/4 p-6 rounded-sm shadow-xl",
        style: {
          backgroundColor: "#FF7EB9",
          transform: "rotate(5deg)",
          width: "200px",
          boxShadow: `
                0 2px 4px rgba(0,0,0,0.12),
                0 6px 12px rgba(0,0,0,0.15),
                0 12px 24px rgba(0,0,0,0.1)
              `
        }
      },
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-xl font-bold",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "\u2713 Drag & Drop"
      ),
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-lg mt-2",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "Move tasks easily"
      )
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute bottom-0 left-1/3 p-6 rounded-sm shadow-xl",
        style: {
          backgroundColor: "#7AFCFF",
          transform: "rotate(3deg)",
          width: "200px",
          boxShadow: `
                0 2px 4px rgba(0,0,0,0.12),
                0 6px 12px rgba(0,0,0,0.15),
                0 12px 24px rgba(0,0,0,0.1)
              `
        }
      },
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-xl font-bold",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "\u2713 Team Ready"
      ),
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-lg mt-2",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "Collaborate now"
      )
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute bottom-10 right-1/3 p-6 rounded-sm shadow-xl",
        style: {
          backgroundColor: "#A0FF7A",
          transform: "rotate(-5deg)",
          width: "200px",
          boxShadow: `
                0 2px 4px rgba(0,0,0,0.12),
                0 6px 12px rgba(0,0,0,0.15),
                0 12px 24px rgba(0,0,0,0.1)
              `
        }
      },
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-xl font-bold",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "\u2713 Free Forever"
      ),
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-lg mt-2",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "Start today!"
      )
    ))),
    /* @__PURE__ */ React.createElement("section", { className: "px-6 py-20 bg-white/30 backdrop-blur-sm border-y-4 border-black/80" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ React.createElement(
      "h2",
      {
        className: "text-5xl font-bold text-center mb-4",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#333"
        }
      },
      "Everything You Need"
    ), /* @__PURE__ */ React.createElement(
      "p",
      {
        className: "text-xl text-center mb-12",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#666"
        }
      },
      "Powerful features in a simple package"
    ), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, features.map((feature) => {
      const Icon = feature.icon;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          key: feature.title,
          className: "p-6 rounded-sm min-h-[180px] hover:scale-105 transition-transform cursor-pointer",
          style: {
            backgroundColor: feature.color,
            transform: `rotate(${feature.rotation}deg)`,
            boxShadow: `
                      0 2px 4px rgba(0,0,0,0.12),
                      0 6px 12px rgba(0,0,0,0.15),
                      0 12px 24px rgba(0,0,0,0.1)
                    `
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white/50 p-2 rounded-lg" }, /* @__PURE__ */ React.createElement(Icon, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement(
          "h3",
          {
            className: "text-2xl font-bold",
            style: { fontFamily: "Indie Flower, cursive" }
          },
          feature.title
        )),
        /* @__PURE__ */ React.createElement(
          "p",
          {
            className: "text-lg",
            style: { fontFamily: "Indie Flower, cursive" }
          },
          feature.description
        )
      );
    })))),
    /* @__PURE__ */ React.createElement("section", { className: "px-6 py-20 max-w-4xl mx-auto text-center" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "p-12 rounded-sm",
        style: {
          backgroundColor: "#FEFF9C",
          transform: "rotate(-1deg)",
          boxShadow: `
              0 4px 8px rgba(0,0,0,0.12),
              0 12px 24px rgba(0,0,0,0.15),
              0 24px 48px rgba(0,0,0,0.1)
            `
        }
      },
      /* @__PURE__ */ React.createElement(
        "h2",
        {
          className: "text-5xl font-bold mb-6",
          style: {
            fontFamily: "Indie Flower, cursive",
            color: "#333"
          }
        },
        "Ready to Get Started?"
      ),
      /* @__PURE__ */ React.createElement(
        "p",
        {
          className: "text-2xl mb-8",
          style: {
            fontFamily: "Indie Flower, cursive",
            color: "#666"
          }
        },
        "Join thousands of teams using ProjectHub to stay organized"
      ),
      /* @__PURE__ */ React.createElement(Link, { to: "/register" }, /* @__PURE__ */ React.createElement(
        Button,
        {
          size: "lg",
          className: "gap-2 bg-blue-500 hover:bg-blue-600 text-white shadow-xl text-2xl px-12 py-8",
          style: { fontFamily: "Indie Flower, cursive" }
        },
        "Start Free Now",
        /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-6 h-6" })
      ))
    )),
    /* @__PURE__ */ React.createElement("footer", { className: "px-6 py-8 border-t-4 border-black/80 bg-white/30 backdrop-blur-sm" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto text-center" }, /* @__PURE__ */ React.createElement(
      "p",
      {
        className: "text-lg",
        style: {
          fontFamily: "Indie Flower, cursive",
          color: "#666"
        }
      },
      "\xA9 2026 ProjectHub. Made with \u2764\uFE0F for better project management."
    )))
  );
}
export {
  Landing
};
