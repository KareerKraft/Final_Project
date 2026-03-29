export const placementGuideItems = [
  { title: "Appear Mock", slug: "appear-mock", theme: "violet" },
  { title: "SQL Guide", slug: "sql-guide", theme: "orange" },
  { title: "OS Guide", slug: "os-guide", theme: "red" },
  { title: "DBMS Guide", slug: "dbms-guide", theme: "blue" },
  { title: "OOPS Guide", slug: "oops-guide", theme: "green" },
  { title: "CN Guide", slug: "cn-guide", theme: "violet" },
  { title: "Machine Learning", slug: "machine-learning", theme: "orange" },
  { title: "Frontend Development", slug: "frontend-development", theme: "red" },
  { title: "Backend Development", slug: "backend-development", theme: "blue" },
  { title: "Practice DSA", slug: "practice-dsa", theme: "green" },
  { title: "Exclusive College Courses Offered", slug: "exclusive-college-courses-offered", theme: "violet" },
  { title: "Frequently Asked Interview Questions", slug: "frequently-asked-interview-questions", theme: "orange" },
];

export const placementGuideMap = placementGuideItems.reduce((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});
