export const placementGuideContent = {
    "appear-mock": {
        type: "mock",
        platforms: [
            {
                "name": "Coding Shuttle",
                "description": "Practice any mock test (topic-wise) for free by logging in with your Google account. Get detailed performance analysis and personalized feedback to improve with every attempt.",
                "link": "https://www.codingshuttle.com/mock-tests?srsltid=AfmBOoptmBRncVEXWP7iVBEjDUh-WVtHILokFaRdNP3uSY_ss9DvzE8x"
            },
            {
                "name": "Testbook",
                "description": "There are nearly 100+ mock tests available in this for Aptitude go and appear it and check your performance. You can also check the solutions for the mock tests.",
                "link": "https://testbook.com/placement-aptitude/test-series"
            },
            {
                "name": "LeetCode Coding Assessment",
                "description": "Most popular website for practicing coding problems. They also have a section dedicated to mock coding assessments that simulate real interview conditions.",
                "link": "https://leetcode.com/assessment/"
            },
            {
                "name": "InterviewBit",
                "description": "Practice any mock test topic-wise for free by logging in with your Google account. Get detailed performance analysis and personalized feedback to improve with every attempt.",
                "link": "https://www.interviewbit.com/mock-interview/"
            },
            {
                "name": "PacketPrep",
                "description": "PacketPrep offers a variety of free mock tests for different companies and roles. You can take these tests to get a feel for the actual placement process and identify areas for improvement.",
                "link": "https://packetprep.com/free-practice-tests"
            }
        ],
        tips: [
            "Revise formulas daily",
            "Focus on Time-Speed-Distance, Percentages",
            "Practice previous year questions",
            "Avoid spending too much time on one question",
        ],
    },
    "sql-guide": {
        type: "resource",
        resources: [
            {
                title: "SQL Full Course",
                provider: "YouTube",
                link: "https://www.youtube.com/playlist?list=PLavw5C92dz9Ef4E-1Zi9KfCTXS_IN8gXZ",
                description: "Complete SQL playlist from basics to advanced by techTFQ.",
            },
            {
                title: "GFG Full Course",
                provider: "geeksforgeeks",
                link: "https://www.geeksforgeeks.org/sql/sql-tutorial/",
                description: "Complete SQL from basics to advanced by GFG.",
            },
            {
                title: "SQL Problems",
                provider: "LeetCode",
                link: "https://leetcode.com/studyplan/top-sql-50/",
                description: "SQL-50 a complete guide to solve atleast 50 SQL problems on LeetCode to understand the concepts.",
            },
        ],
        tips: [
            "Understand the conceptualization",
            "Focus on Time and work on query optimization",
            "Practice questions",
            "Avoid spending too much time on one question",
        ],
    },

    "os-guide": {
        type: "resource",
        resources: [
            {
                title: "Operating System MCQs GATE Level",
                provider: "PracticePaper",
                link: "https://practicepaper.in/gate-cse/operating-system",
                description: "Important OS concepts for interviews.",
            },
        ],
        tips: [
            "Revise on alternate days",
            "Spend more time on process management and memory management",
        ],
    },

    "dbms-guide": {
        type: "resource",
        resources: [
            {
                title: "DBMS Questions GATE Level",
                provider: "PracticePaper",
                link: "https://practicepaper.in/gate-cse/database-management-system",
                description: "Complete DBMS course.",
            },
        ], 
        tips: [
            "Revise twice a week",
            "Focus on normalization and transactions",
            "Practice questions",
            "Read about real-world database systems like MySQL, PostgreSQL, MongoDB",
        ],
    },

    "oops-guide": {
        type: "resource",
        resources: [
            {
                title: "One Shot Revision OOPS Concepts",
                provider: "YouTube",
                link: "https://www.youtube.com/watch?v=bSrm9RXwBaI&t=103s",
                description: "Covers all OOPS concepts.",
            },
            {
                title: "OOPS Interview Questions",
                provider: "GFG",
                link: "https://www.geeksforgeeks.org/java/java-oop-exercises/",
                description: "Frequently asked OOPS questions in interviews and technical rounds.",
            },
        ],
        tips: [
            "Learn Theories and concepts",
            "Refer good notes and books",
            "Practice questions",
            "Can refer to real-world examples to understand concepts better",
        ], 
    },

    "cn-guide": {
        type: "resource",
        resources: [
            {
                title: "CN Questions",
                provider: "GeeksforGeeks",
                link: "https://www.geeksforgeeks.org/quizzes/50-computer-networks",
                description: "Important networking questions.",
            },
        ], 
        tips: [
            "Practice Numericals",
            "Follow College Notes enough for networking",
        ], 
    },

    "machine-learning": {
        type: "resource",
        resources: [
            {
                title: "Machine Learning Basics",
                provider: "ChatGpt",
                prompt: "Teach me Ml concepts from zero to advanced in a structured manner starting from set-up to project building  in step-wise such as after completion of one topic then move to the second one also after completion of one topic then give me some questions to practice and then move to the next topic and so on and also provide me with some resources to learn the concepts in detail and also provide me with some interview questions related to that topic.",
                description: "This will provide detailed structured learning of ML concepts along with practice questions and resources for in-depth understanding.",
            },
            {
                title: "ML Interview Questions",
                provider: "Deep_ML",
                link: "https://www.deep-ml.com/problems",
                description: "Best Platform to practice and gain detailed knowledge of ML concepts in topic-wise manner.",
            },
        ], 
        tips: [
            "Decide whether you want to learn ML for data science or for software development",
            "If software development then focus more on algorithms and coding problems related to ML",
            "If data science then focus more on statistics and ML concepts",
            "Decide on a project and try to build it using ML concepts to get hands-on experience",
        ], 
    },

    "frontend-development": {
        type: "resource",
        resources: [
            {
                title: "GFG Full Course",
                provider: "GeeksforGeeks",
                link: "https://www.geeksforgeeks.org/blogs/front-end-development",
                description: "Basics - HTML, CSS, JavaScript and then move to React, frameworks.",
            },
        ], 
        tips: [
            "Focus on UI, responsiveness, user interaction",
            "Focus on Implementation and projects rather than just theory",
        ], 
    },

    "backend-development": {
        type: "resource",
        resources: [
            {
                title: "Node.js + Express Course",
                provider: "GeeksforGeeks",
                link: "https://www.geeksforgeeks.org/courses/full-stack-node",
                description: "Backend development with Node.js (MERN stack).",
            },
            {
                title: "Java + Spring Boot Course",
                provider: "GeeksforGeeks",
                link: "https://www.geeksforgeeks.org/courses/Java-backend-live",
                description: "Backend development with Java and Spring Boot.",
            },
        ], 
        tips: [
            "Decide on a backend language (Node.js, Python, Java) and focus on it",
            "Focus on understanding server-side concepts, databases, and API development",,
        ], 
    },

    "practice-dsa": {
        type: "resource",
        resources: [
            {
                title: "Striver DSA Sheet",
                provider: "TakeUForward",
                link: "https://takeuforward.org/home",
                description: "Most important DSA problems.",
            },
            {
                title: "LeetCode Practice",
                provider: "LeetCode",
                link: "https://leetcode.com/problemset/all/",
                description: "Practice coding questions.",
            },
            {
                title: "GFG 160 Series",
                provider: "GeeksforGeeks",
                link: "https://www.geeksforgeeks.org/courses/gfg-160-series",
                description: "Comprehensive DSA course for placement preparation.",
            },
            {
                title: "HackerRank Practice",
                provider: "HackerRank",
                link: "https://www.hackerrank.com/",
                description: "Practice coding questions.",
            },
        ], 
        tips: [
            "Decide on a coding platform (LeetCode, GFG, HackerRank) and stick to it for consistent practice",
            "Decide on a schedule (e.g., 1-2 hours daily) and focus on quality over quantity in practice",
            "Decide on a problem-solving approach (e.g., start with easy problems, then move to medium and hard) and follow it consistently",
            "Decide a language for coding practice and focus on it to improve fluency and speed in that language",
        ], 
    },

    "exclusive-college-courses-offered": {
        type: "resource",
        resources: [
            {
                title: "Coding and Aptitude Courses",
                provider: "Kiit Myskillwiz",
                link: "https://kiit.myskillwiz.com",
                description: "Log in using your college email ID and password (Default password for all students: welcome123)",
            },
        ],
        tips: [
            "Make use of the exclusive courses offered by your college as they are tailored to your curriculum and placement needs",
            "Focus on the coding and aptitude courses as they are crucial for placement preparation",
            "Regularly check for updates and new courses added to the platform to stay ahead in your preparation",
            "Utilize the resources and practice materials provided in these courses to enhance your skills and knowledge for placements",
        ],

    },

    "frequently-asked-interview-questions": {
    type: "resource",
    resources: [
        {
            title: "GFG Interview Questions",
            provider: ":contentReference[oaicite:0]",
            link: "https://www.geeksforgeeks.org/interview-preparation-for-software-developer/",
            description: "Complete set of DSA, OS, DBMS, OOPs interview questions."
        },
        {
            title: "LeetCode Top Interview Questions",
            provider: ":contentReference[oaicite:1]",
            link: "https://leetcode.com/problem-list/top-interview-questions/",
            description: "Most asked coding questions in top companies like Amazon, Google."
        },
        {
            title: "InterviewBit Question Bank",
            provider: ":contentReference[oaicite:2]",
            link: "https://www.interviewbit.com/courses/programming/",
            description: "Structured interview prep with company-specific questions."
        },
        {
            title: "Striver SDE Sheet",
            provider: ":contentReference[oaicite:3]",
            link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
            description: "180+ curated DSA questions for placements."
        },
    ],

    questions: [
        {
            question: "Find the maximum subarray sum (Kadane’s Algorithm).",
            answer: "Use dynamic programming: keep track of current sum and max sum."
        },
        {
            question: "Reverse a linked list.",
            answer: "Iteratively change next pointers using prev, current, next nodes."
        },
        {
            question: "What is the difference between process and thread?",
            answer: "Process is independent execution unit, thread is lightweight and shares memory."
        },
        {
            question: "Explain normalization in DBMS.",
            answer: "Process of organizing data to reduce redundancy (1NF, 2NF, 3NF)."
        },
        {
            question: "What is REST API?",
            answer: "Architectural style using HTTP methods (GET, POST, PUT, DELETE)."
        }
    ],

    tips: [
        "Attend college gd and interview preparation sessions.",
        "Do mock interviews regularly",
        "Focus on communication skills and problem-solving approach during interviews.",
        "Be honest about your strengths and weaknesses in interviews and focus on improving them.",
    ],
    },
}
