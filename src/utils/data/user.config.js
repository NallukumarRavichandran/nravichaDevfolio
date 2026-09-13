import ResumePDF from "./Nallukumar_Ravichandran_Resume.pdf";
import default_avatar from "../../assets/images/baseImages/default_avatar.svg";
import Giritronics from ".././../assets/images/data/Giritronics.jpg";
import AmericanExpress from ".././../assets/images/data/AmericanExpress.jpg";

const user = {
	firstName: "Nallukumar",
	lastName: "Ravichandran",
	userImage: default_avatar,
	resume: ResumePDF,
	email: "kumar10naidu@gmail.com",
	linkedIn: "in/nallukumar",
	gitHub: "NallukumarRavichandran",
	twitter: "kumar10naidu",
	aboutMe: {
		intro: "Java Full Stack Developer and Software Engineer.",
		description:
			"Java Full Stack Developer and Software Engineer currently contributing to Cloud & Infrastructure at American Express. Building and maintaining scalable enterprise services and collaborating with DevOps teams for CI/CD pipelines and production release management. Strong problem solver who actively participates in weekly LeetCode coding contests and consistently solves algorithmic challenges on LeetCode and CodeChef.",
		outro: "Passionate about continuous learning, clean and secure code practices, and delivering efficient, enterprise grade applications.",
	},
	experiences: [
		{
			organization: "Giritronics, Chennai",
			organizationPicture: Giritronics,
			isCurrent: true,
			startDate: "Sept 2026",
			endDate: null,
			positions: [
				{
					positionName: "Software Developer Engineer",
					startDate: "Sept 2026",
					endDate: " Present",
					isPresent: true,
					description:
						"- Developed and maintained scalable backend services using Java Full Stack for web applications.\n- Built and supported REST APIs and backend logic for internal and client-facing applications.\n- Designed and developed full-stack websites using Java and integrated Windows/Android software solutions.\n- Detected, triaged, and fixed security vulnerabilities in production codebases to ensure application integrity.\n- Managed databases and handled complex data processing and integrity tasks.\n- Collaborated with DevOps teams to streamline CI/CD pipelines and manage cloud release deployments.\n- Wrote secure, production-ready code adhering to enterprise compliance standards.",
				},
			],
		},
		{
			organization: "American Express",
			organizationPicture: AmericanExpress,
			isCurrent: false,
			startDate: "Jan 2026",
			endDate: "Aug 2026",
			positions: [
				{
					positionName: "Development Trainee - Cloud & Infrastructure",
					startDate: "Jan 2026",
					endDate: "Aug 2026",
					isPresent: false,
					description:
						"- Developing and maintaining scalable backend services using Java Full Stack.\n- Building and supporting REST APIs and backend logic for internal applications.\n- Detecting, triaging, and fixing security vulnerabilities in production codebases.\n- Working with databases and handling data processing and integrity tasks.\n- Collaborating with DevOps teams for CI/CD pipelines and cloud release deployments.\n- Writing secure, production-ready code adhering to enterprise compliance standards.",
				},
			],
		}
	],
	education: [
		{
			instituteName: "University", // the user didn't specify education, leaving a blank one
			degree: "Computer Science",
			year: "2025",
			id: 1,
		}
	],
	projects: [
		{
			projectName: "Mind Buddy - CBT Tracker",
			description:
				"A responsive mental health tracking web app using Cognitive Behavioural Therapy (CBT) principles with modular React components.",
			madeWith: ["React", "JavaScript", "HTML", "CSS"],
			link: "https://github.com/NallukumarRavichandran/Mental-Health-CBT-web",
		},
		{
			projectName: "nravichaDevfolio",
			description:
				"Windows 10 themed portfolio website built with React, featuring draggable windows, a taskbar, start menu, and interactive desktop apps.",
			madeWith: ["React", "Redux", "SCSS", "JavaScript"],
			link: "https://github.com/NallukumarRavichandran/nravichaDevfolio",
		},
		{
			projectName: "HashForge Password Generator",
			description:
				"A secure password generator tool that creates strong, customizable passwords with hashing capabilities.",
			madeWith: ["JavaScript", "HTML", "CSS"],
			link: "https://github.com/NallukumarRavichandran/HashForge-PasswordGen",
		},
		{
			projectName: "MakeYouDev.Tube",
			description:
				"A developer-focused video platform clone for learning and sharing coding tutorials and tech content.",
			madeWith: ["React", "Node.js", "JavaScript"],
			link: "https://github.com/NallukumarRavichandran/MakeYouDev.Tube",
		},
		{
			projectName: "YouTube Clone",
			description:
				"A full-featured YouTube clone replicating core video streaming UI and functionality.",
			madeWith: ["React", "JavaScript", "CSS"],
			link: "https://github.com/NallukumarRavichandran/You-Clone",
		},
		{
			projectName: "Money Manager",
			description:
				"A full-stack personal finance tracker with separate frontend and backend for managing income, expenses, and budgets.",
			madeWith: ["React", "Node.js", "JavaScript"],
			link: "https://github.com/NallukumarRavichandran/money-manager-frontend",
		},
		{
			projectName: "AuraMax Landing Page",
			description:
				"A modern, responsive landing page for AuraMax with sleek UI design and smooth animations.",
			madeWith: ["HTML", "CSS", "JavaScript"],
			link: "https://github.com/NallukumarRavichandran/auramax-landing-page",
		},
		{
			projectName: "ResumeFlowMark 2.0",
			description:
				"An automated resume builder and formatter that generates polished, professional resumes from structured data.",
			madeWith: ["JavaScript", "HTML", "CSS"],
			link: "https://github.com/NallukumarRavichandran/resumeFlowMark2.RFM2",
		},
		{
			projectName: "Student Management System",
			description:
				"A CRUD-based student management system for managing student records, grades, and enrollment data.",
			madeWith: ["Java", "MySQL", "HTML", "CSS"],
			link: "https://github.com/NallukumarRavichandran/Student-Management-System-CRUD",
		},
		{
			projectName: "Weighbridge V2.0",
			description:
				"A digital weighbridge management system for industrial weight tracking and reporting.",
			madeWith: ["Java", "MySQL", "JavaScript"],
			link: "https://github.com/NallukumarRavichandran/Weighbridge-V2.0",
		},
		{
			projectName: "Code Hawkins",
			description:
				"A developer productivity tool and code exploration platform for collaborative coding workflows.",
			madeWith: ["JavaScript", "HTML", "CSS"],
			link: "https://github.com/NallukumarRavichandran/Code-Hawkins",
		},
	],
	skills: [
		{
			name: "Programming Languages",
			values: [
				"Java",
				"SQL",
				"C#"
			],
		},
		{
			name: "Tech Stacks",
			values: ["HTML", "Bootstrap", "Hibernate", "React", "Node.js"],
		},
		{
			name: "Database",
			values: ["MySQL", "PostgreSQL"],
		},
        {
			name: "Tools",
			values: ["GIT", "IntelliJ", "Firebase", "Visual Studio", "Hugging Face", "Ollama", "Postman", "JMeter", "Antigravity"],
		},
        {
			name: "Coursework",
			values: ["OOPS", "ASP .NET"],
		}
	],
};

export default user;
