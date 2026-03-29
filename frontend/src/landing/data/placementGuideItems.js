export const placementGuideItems = [
  { title: "Appear Mock", slug: "appear-mock" },
  { title: "SQL Guide", slug: "sql-guide" },
  { title: "OS Guide", slug: "os-guide" },
  { title: "DBMS Guide", slug: "dbms-guide" },
  { title: "OOPS Guide", slug: "oops-guide" },
  { title: "CN Guide", slug: "cn-guide" },
  { title: "Machine Learning", slug: "machine-learning" },
  { title: "Frontend Development", slug: "frontend-development" },
  { title: "Backend Development", slug: "backend-development" },
  { title: "Practice DSA", slug: "practice-dsa" },
  { title: "Exclusive College Courses Offered", slug: "exclusive-college-courses-offered" },
  { title: "Frequently Asked Interview Questions", slug: "frequently-asked-interview-questions" },
];

export const placementGuideMap = placementGuideItems.reduce((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});
