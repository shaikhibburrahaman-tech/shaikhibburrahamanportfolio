# Shaik Hibbur Rahaman: Full-Stack Portfolio

React (Vite) frontend + Django REST Framework backend + MySQL.

```
portfolio/
├── backend/    Django, DRF, MySQL (API under /api/, admin under /admin/)
└── frontend/   React, Vite, React Router, Framer Motion, Lucide
```

Pages: `/`, `/about`, `/projects`, `/education`, `/career`, `/contact`.

> **Status:** the code was written without network access, so `npm install`, `makemigrations`
> and the test suite have **not been run yet**. Follow the steps below and fix anything that
> shows up on your machine. Steps 3 and 6 are where I would look first.

## 1. Prerequisites
Python 3.11+, Node 18+, MySQL 8 (or MariaDB 10.5+). On Linux `mysqlclient` also needs
`libmysqlclient-dev` and `pkg-config`; on Windows use the prebuilt wheel or switch to `PyMySQL`.

## 2. Database
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'choose-a-strong-password';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
```

## 3. Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                   # then edit the values
python manage.py makemigrations portfolio              # creates portfolio/migrations/0001_initial.py
python manage.py migrate
python manage.py seed_portfolio                        # starter content (safe to re-run)
python manage.py createsuperuser
python manage.py runserver                             # http://127.0.0.1:8000
```
Admin: http://127.0.0.1:8000/admin/. Commit the generated migration file.

API: `GET /api/profile/ · /api/projects/ (?category=, ?search=) · /api/projects/<slug>/ · /api/education/ · /api/skills/ · /api/career/` and `POST /api/contact/`.

## 4. Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173 (Vite proxies /api to Django)
```
Put your resume at `frontend/public/resume.pdf`. Add a real photo by replacing the avatar
block in `src/pages/Home.jsx`. If Django is not running, the site shows bundled sample content
with a notice, but the contact form needs the API.

## 5. Replace the placeholders
Everything below is editable in **Django admin** (no code changes):

| What | Where |
|---|---|
| Email, GitHub, LinkedIn, resume path, location | Site profile |
| GitHub / live demo URLs, screenshots | Projects (`image_url`) |
| College name, graduation year | Education |
| Courses, certifications, achievements | Entries (sections "Education: ...") |
| Skill levels | Skills |

Links containing `your-username`, `example.com` or `your.email` are shown as disabled
"placeholder" chips instead of broken links.

**Skill levels:** only Python, SQL/MySQL and JavaScript are set to *Intermediate* (as you stated).
The other skills start at *Beginner* as a guess. Adjust them in admin so they reflect reality.

## 6. Tests
```bash
cd backend && python manage.py test
```
Tests use in-memory SQLite by default; set `TEST_WITH_MYSQL=1` to use MySQL.
They cover project/education/skills/career endpoints, contact validation, HTML stripping,
header-injection rejection, the honeypot and the rate limit.

## 7. Security notes
- Secrets only in `backend/.env` (git-ignored); the frontend never receives keys.
- Contact endpoint: server-side validation, HTML stripped, newline/header-injection blocked, max 2 links, honeypot field, per-IP rate limit (`CONTACT_THROTTLE_RATE`), small body limit.
- With `DJANGO_DEBUG=False`: HTTPS redirect, HSTS, secure cookies. Set `NUM_PROXIES` to the number of proxies in front of Django so the rate limit sees real client IPs.

## 8. Deploying to a custom domain (e.g. shaikhibburrahaman.com)
Check availability and buy the domain from any registrar first.

**Frontend** (`npm run build` → `frontend/dist`): host on Netlify, Vercel, Cloudflare Pages or Nginx.
- Netlify uses `public/_redirects`, Vercel uses `vercel.json`: both already make refreshes on `/about` etc. work.
- Nginx: 
  ```nginx
  server {
    server_name shaikhibburrahaman.com www.shaikhibburrahaman.com;
    root /var/www/portfolio/dist;
    location / { try_files $uri /index.html; }
    location /api/   { proxy_pass http://127.0.0.1:8000; proxy_set_header Host $host; proxy_set_header X-Forwarded-Proto $scheme; proxy_set_header X-Forwarded-For $remote_addr; }
    location /admin/ { proxy_pass http://127.0.0.1:8000; proxy_set_header Host $host; proxy_set_header X-Forwarded-Proto $scheme; }
    location /static/ { proxy_pass http://127.0.0.1:8000; }
  }
  ```
  Serving the API from the same domain means no `VITE_API_BASE_URL` is needed.

**Backend** (VPS, Render, Railway, etc.):
```bash
pip install -r requirements.txt
python manage.py migrate && python manage.py collectstatic --noinput
gunicorn config.wsgi:application --bind 127.0.0.1:8000
```
Production `.env`: `DJANGO_DEBUG=False`, a long random `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`,
`CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` using your `https://` domain.

**DNS & HTTPS:** point `A` records for `@` and `www` to your server (or the CNAMEs your static host gives you), then enable HTTPS (Let's Encrypt/Certbot, or your host's automatic certificates).
