-- ================================================
-- PORTFOLIO ADMIN DASHBOARD - DATABASE SCHEMA
-- ================================================
-- Jalankan SQL ini di Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste & Run

-- ================================================
-- 1. PROJECTS TABLE
-- ================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  banner_image VARCHAR(500),
  aspect VARCHAR(20) DEFAULT 'landscape', -- landscape, portrait
  tech_stack TEXT[], -- Array: ['Next.js', 'Tailwind CSS']
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  category VARCHAR(50) DEFAULT 'website', -- website, mobile, desktop
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- 2. SKILLS TABLE
-- ================================================
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL, -- frontend, backend, languages, tools
  icon_slug VARCHAR(100), -- simple-icons slug, e.g. 'react', 'python'
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- 3. QUALIFICATIONS TABLE
-- ================================================
CREATE TABLE qualifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL, -- education, experience
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  start_date DATE,
  end_date DATE, -- NULL = Present
  description TEXT,
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ================================================

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualifications ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ (semua orang bisa lihat data di portfolio)
CREATE POLICY "Public can read projects" 
  ON projects FOR SELECT 
  USING (is_visible = true);

CREATE POLICY "Public can read skills" 
  ON skills FOR SELECT 
  USING (is_visible = true);

CREATE POLICY "Public can read qualifications" 
  ON qualifications FOR SELECT 
  USING (is_visible = true);

-- AUTHENTICATED FULL ACCESS (admin bisa CRUD semua)
CREATE POLICY "Admin can do everything on projects" 
  ON projects FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can do everything on skills" 
  ON skills FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can do everything on qualifications" 
  ON qualifications FOR ALL 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ================================================
-- 4B. CONTACT MESSAGES TABLE
-- ================================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- PUBLIC INSERT (visitor bisa kirim pesan)
CREATE POLICY "Anyone can insert contact messages" 
  ON contact_messages FOR INSERT 
  WITH CHECK (true);

-- AUTHENTICATED READ/DELETE (admin bisa lihat dan hapus)
CREATE POLICY "Admin can read contact messages" 
  ON contact_messages FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete contact messages" 
  ON contact_messages FOR DELETE 
  USING (auth.role() = 'authenticated');

-- ================================================
-- 5. SEED DATA (Optional - dari data yang sudah ada)
-- ================================================

-- Projects dari showcase.json
INSERT INTO projects (title, description, banner_image, aspect, tech_stack, github_url, category, display_order) VALUES
('Aether Maritime', 'Aether Maritime is a professional company profile website designed for a global shipping and logistics firm. It showcases the company''s fleet, maritime services, and operational excellence through a clean, corporate design that establishes trust and reliability.', '/bannerImage/bannerAethermaritime.webp', 'landscape', ARRAY['Next.js', 'Tailwind CSS'], 'https://github.com/Fachriazka07/Aether-Maritime', 'website', 1),
('LuxCamp', 'LuxCamp is a modern glamping booking website that brings the comfort of hotels into the beauty of nature. Users can easily explore cabins, check details, and book their perfect getaway.', '/bannerImage/Luxcamp.webp', 'landscape', ARRAY['Next.js', 'Supabase', 'Tailwind CSS'], 'https://github.com/Fachriazka07/LuxCamp', 'website', 2),
('ZenDo', 'ZenDo is a minimalist productivity app that blends the Pomodoro technique with calming Lo-Fi aesthetics. Designed to help users enter a state of deep focus.', '/bannerImage/bannerZendo.webp', 'portrait', ARRAY['Flutter', 'Dart'], 'https://github.com/Fachriazka07/ZenDo', 'mobile', 3),
('Iphonify', 'Iphonify is an e-commerce platform focused on selling Apple products with a clean and premium user interface.', '/bannerImage/bannerIphonify.webp', 'portrait', ARRAY['HTML', 'CSS', 'PHP', 'MySQL', 'Midtrans'], 'https://github.com/Fachriazka07/Iphonify', 'website', 4),
('DIMSum', 'DIMSum (Data Indikator Makro Sumedang) is a digital pocketbook app designed to help BPS staff and officials access statistical indicators instantly.', '/bannerImage/bannerDimsum.webp', 'portrait', ARRAY['HTML', 'CSS', 'JavaScript', 'Capacitor'], 'https://github.com/Fachriazka07/BPS-DIMSum', 'mobile', 5);

-- Skills
INSERT INTO skills (name, category, icon_slug, display_order) VALUES
-- Frontend
('React.js', 'frontend', 'react', 1),
('Next.js', 'frontend', 'nextdotjs', 2),
('Tailwind CSS', 'frontend', 'tailwindcss', 3),
('HTML5', 'frontend', 'html5', 4),
('CSS3', 'frontend', 'css3', 5),
-- Languages
('TypeScript', 'languages', 'typescript', 1),
('JavaScript', 'languages', 'javascript', 2),
('PHP', 'languages', 'php', 3),
('C#', 'languages', 'csharp', 4),
-- Backend
('Node.js', 'backend', 'nodedotjs', 1),
('Laravel', 'backend', 'laravel', 2),
('MySQL', 'backend', 'mysql', 3),
('SQL Server', 'backend', 'microsoftsqlserver', 4),
-- Tools
('Git', 'tools', 'git', 1),
('VS Code', 'tools', 'visualstudiocode', 2),
('Stripe', 'tools', 'stripe', 3);

-- Qualifications
INSERT INTO qualifications (type, title, subtitle, start_date, end_date, display_order) VALUES
-- Experience
('experience', 'PKL BPS Sumedang', 'Industrial Placement', '2025-07-01', '2025-10-01', 1),
-- Education
('education', 'SMKN 1 Sumedang', 'Software Engineering', '2023-07-01', '2026-06-01', 1),
('education', 'SMPN 2 Sumedang', 'Middle School', '2020-07-01', '2023-06-01', 2),
('education', 'SDN Sindangraja', 'Elementary School', '2014-07-01', '2020-06-01', 3);


-- ================================================
-- 6. ANALYTICS TABLES
-- ================================================

-- 6A. VISITORS
CREATE TABLE analytics_visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL, -- Rotated per session
  ip_hash VARCHAR(64) NOT NULL, -- Anonymized IP
  user_agent TEXT,
  device_type VARCHAR(20), -- mobile, tablet, desktop
  os VARCHAR(50),
  browser VARCHAR(50),
  country VARCHAR(50),      -- Optional: from GeoIP
  referrer TEXT,            -- Source (LinkedIn, etc)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6B. PAGE VIEWS
CREATE TABLE analytics_page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES analytics_visitors(id) ON DELETE CASCADE,
  path VARCHAR(255) NOT NULL, -- /, /projects, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6C. EVENTS
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id UUID REFERENCES analytics_visitors(id) ON DELETE CASCADE,
  event_category VARCHAR(50) NOT NULL, -- engagement, project, social
  event_action VARCHAR(50) NOT NULL,   -- download_cv, view_project
  event_label TEXT,                    -- Project Name, URL
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- 7. ANALYTICS RLS
-- ================================================

-- Enable RLS
ALTER TABLE analytics_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- PUBLIC INSERT (Allow anyone to track stats)
CREATE POLICY "Public can insert visitors" 
  ON analytics_visitors FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can insert page_views" 
  ON analytics_page_views FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Public can insert events" 
  ON analytics_events FOR INSERT 
  WITH CHECK (true);

-- ADMIN SELECT (Only admin can view stats)
CREATE POLICY "Admin can view visitors" 
  ON analytics_visitors FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can view page_views" 
  ON analytics_page_views FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can view events" 
  ON analytics_events FOR SELECT 
  USING (auth.role() = 'authenticated');

-- ================================================
-- DONE! Sekarang buat admin user di Authentication
-- ================================================
