import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const pathsToRemove = [
  'app/dashboard/articles',
  'app/actions/article.ts',
  'components/columns/article.tsx',
  'tests/articles.test.ts',
];

function log(message) {
  console.log(`[CLEANUP] ${message}`);
}

async function run() {
  log('Starting article setup removal...');

  // 1. Remove Files and Directories
  pathsToRemove.forEach(p => {
    const fullPath = path.join(process.cwd(), p);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      log(`Removed: ${p}`);
    }
  });

  // 2. Update Prisma Schema
  const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
  if (fs.existsSync(schemaPath)) {
    let schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Remove Article model
    schema = schema.replace(/model Article \{[\s\S]*?\n\}/g, '');
    
    // Remove articles relation from User model
    schema = schema.replace(/\n\s*articles\s*Article\[\]/g, '');
    
    fs.writeFileSync(schemaPath, schema);
    log('Updated prisma/schema.prisma');
  }

  // 3. Update Sidebar Navigation
  const sidebarPath = path.join(process.cwd(), 'components/app-sidebar.tsx');
  if (fs.existsSync(sidebarPath)) {
    let sidebar = fs.readFileSync(sidebarPath, 'utf8');
    
    // Remove the Article item from the data object
    sidebar = sidebar.replace(/\{\s*title:\s*"Article",[\s\S]*?\},/g, '');
    
    fs.writeFileSync(sidebarPath, sidebar);
    log('Updated components/app-sidebar.tsx');
  }

  // 4. Update README
  const readmePath = path.join(process.cwd(), 'README.md');
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf8');
    
    // Remove Article section from features
    readme = readme.replace(/### 📝 Content Management \(Article CRUD\)[\s\S]*?\n\n/g, '');
    
    fs.writeFileSync(readmePath, readme);
    log('Updated README.md');
  }

  log('Cleanup complete!');
  log('Running Prisma generate to sync client...');
  
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    log('Prisma client updated successfully.');
  } catch (e) {
    console.error(e);
    log('Failed to run prisma generate. Please run it manually.');
  }

  console.log('\n✨ Article setup has been completely removed.');
  console.log('💡 Note: You may want to run "npx prisma migrate dev" to update your database schema.');
}

run().catch(err => {
  console.error('Cleanup failed:', err);
});
