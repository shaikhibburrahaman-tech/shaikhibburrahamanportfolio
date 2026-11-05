// Shown only if the API is unreachable, so the site never looks empty.
// Mirrors the Django seed data. Links marked as placeholders are NOT real.
export const fallbackProfile = {
  full_name: 'Shaik Hibbur Rahaman',
  headline: 'Python Full-Stack Developer',
  intro:
    "I'm an Electronics and Communication Engineering graduate who moved into software development. I build database-backed Python applications and I'm growing into a Python full-stack developer.",
  career_objective:
    'To begin my career as a software developer, apply my Python full-stack development skills to real-world projects, and continuously grow as an engineer.',
  email: 'shaikhibburrahaman@gmail.com',
  github_url: 'https://github.com/shaikhibburrahaman-tech',
  linkedin_url: 'https://www.linkedin.com/in/shaik-hibbur-rahaman-151baa369/',
  resume_url: '/resume.pdf',
  location: 'Hyderabad',
}

export const fallbackProjects = [
  {
    id: 1, slug: 'supermarket-billing-system', title: 'Supermarket Billing System', category: 'database',
    short_description: 'Python and MySQL billing application with inventory and transaction handling.',
    description: 'A billing application for a supermarket, built with Python and a SQL/MySQL database. It manages the product inventory, processes customer transactions and handles billing operations, with the data stored in the database.',
    features: ['Product inventory management', 'Customer transaction processing', 'Billing operations', 'Database integration with SQL/MySQL'],
    technologies: ['Python', 'SQL', 'MySQL'], image_url: '', github_url: 'https://github.com/your-username/supermarket-billing-system', live_url: '', is_featured: true,
  },
  {
    id: 2, slug: 'vegetable-billing-system', title: 'Vegetable Billing System', category: 'database',
    short_description: 'Python and MySQL app for vegetable pricing, stock and billing records.',
    description: 'A billing application for a vegetable shop, built with Python and MySQL. It handles product pricing and stock management, and keeps billing and transaction records.',
    features: ['Product pricing and stock management', 'Billing and transaction records'],
    technologies: ['Python', 'MySQL'], image_url: '', github_url: 'https://github.com/your-username/vegetable-billing-system', live_url: '', is_featured: true,
  },
  {
    id: 3, slug: 'calculator-application', title: 'Calculator Application', category: 'web',
    short_description: 'Responsive calculator built with HTML, CSS and JavaScript.',
    description: 'A calculator web application with a responsive interface and interactive calculations, built with HTML, CSS and JavaScript.',
    features: ['Responsive calculator interface', 'Interactive calculations'],
    technologies: ['HTML', 'CSS', 'JavaScript'], image_url: '', github_url: 'https://github.com/your-username/calculator-application', live_url: 'https://your-username.github.io/calculator-application', is_featured: false,
  },
]

export const fallbackSkills = [
  { id: 1, name: 'Python', category: 'language', level: 'intermediate', level_label: 'Intermediate' },
  { id: 2, name: 'SQL and MySQL', category: 'backend', level: 'intermediate', level_label: 'Intermediate' },
  { id: 3, name: 'JavaScript', category: 'language', level: 'intermediate', level_label: 'Intermediate' },
  { id: 4, name: 'HTML and CSS', category: 'frontend', level: 'beginner', level_label: 'Beginner' },
  { id: 5, name: 'Bootstrap', category: 'frontend', level: 'beginner', level_label: 'Beginner' },
  { id: 6, name: 'Django', category: 'backend', level: 'beginner', level_label: 'Beginner' },
  { id: 7, name: 'React.js', category: 'frontend', level: 'beginner', level_label: 'Beginner' },
  { id: 8, name: 'REST APIs', category: 'backend', level: 'beginner', level_label: 'Beginner' },
  { id: 9, name: 'Git and GitHub', category: 'tools', level: 'beginner', level_label: 'Beginner' },
]

export const fallbackEducation = {
  education: [{
    id: 1, degree: 'Bachelor of Technology (B.Tech)', branch: 'Electronics and Communication Engineering (ECE)',
    university: 'JNTU-GV, Vizianagaram', college_name: 'JNTU-GV', graduation_year: '2026', percentage: '65%',
    description: 'Completed engineering in ECE before moving into software development.',
  }],
  technical_learning: [
    { id: 1, title: 'Python programming', description: 'Core language used in the billing system projects.' },
    { id: 2, title: 'SQL and MySQL', description: 'Database design and queries for inventory and billing data.' },
    { id: 3, title: 'Web fundamentals', description: 'HTML, CSS and JavaScript, applied in the calculator project.' },
    { id: 4, title: 'Full-stack frameworks', description: 'Django, Django REST Framework and React.js.' },
  ],
  courses: [], certifications: [], achievements: [],
}

export const fallbackCareer = {
  interests: [
    { id: 1, title: 'Python full-stack development', description: 'Building complete applications from database to user interface.' },
    { id: 2, title: 'Backend and API development', description: 'Designing clean REST APIs with Django.' },
    { id: 3, title: 'Database-driven applications', description: 'Practical systems such as billing and inventory.' },
  ],
  roadmap: [
    { id: 1, title: 'Strengthen Django and REST APIs', description: 'Build more projects with authentication and deployment.' },
    { id: 2, title: 'Grow React.js skills', description: 'Component design, state management and API integration.' },
    { id: 3, title: 'Practise data structures and algorithms', description: 'Regular problem solving in Python.' },
    { id: 4, title: 'Use Git and GitHub daily', description: 'Version control and open collaboration habits.' },
  ],
  preparation: [
    { id: 1, title: 'Revise Python and SQL fundamentals', description: '' },
    { id: 2, title: 'Practise coding problems', description: '' },
    { id: 3, title: 'Prepare to explain each project', description: 'Design choices, database schema and challenges.' },
    { id: 4, title: 'Continuous learning', description: 'Keep building and reading to improve steadily.' },
  ],
}
