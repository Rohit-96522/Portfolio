-- 1. Create the projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  grid_size smallint NOT NULL,
  pixels jsonb NOT NULL,
  description text NOT NULL,
  link text NOT NULL,
  likes integer DEFAULT 0 NOT NULL
);

-- 2. Create the comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  text text NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Projects (Open to anonymous visitors)
CREATE POLICY "Allow public read access to projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to projects" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to projects (for likes)" ON projects
  FOR UPDATE USING (true) WITH CHECK (true);

-- 5. Create Policies for Comments (Open to anonymous visitors)
CREATE POLICY "Allow public read access to comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to comments" ON comments
  FOR INSERT WITH CHECK (true);
