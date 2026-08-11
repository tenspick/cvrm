const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

// --- 1. Generate Program Pages ---
const programsDir = path.join(baseDir, 'programs');
const programsHtmlPath = path.join(programsDir, 'programs.html');
const programsTemplate = fs.readFileSync(programsHtmlPath, 'utf8');

const programs = [
  { id: 'bcom', name: 'B.Com', title: 'Bachelor of Commerce', detail: 'The Bachelor of Commerce is a premium undergraduate program designed to build strong financial, accounting, taxation, and auditing competencies, ensuring students are ready for the global corporate landscape.' },
  { id: 'bba', name: 'BBA', title: 'Bachelor of Business Administration', detail: 'The Bachelor of Business Administration equips aspiring managers and entrepreneurs with conceptual skills in strategy, operations, human resource management, and corporate marketing.' },
  { id: 'ba', name: 'B.A', title: 'Bachelor of Arts', detail: 'Our Bachelor of Arts program cultivates advanced writing, social analysis, critical thinking, historical perspectives, and political literacy.' },
  { id: 'bsc-mpc', name: 'B.Sc (MPC)', title: 'Mathematics, Physics, Chemistry', detail: 'The B.Sc in Mathematics, Physics, and Chemistry offers deep foundations in hard sciences, preparing students for technical research, analytical jobs, and post-graduate engineering degrees.' },
  { id: 'bsc-bzc', name: 'B.Sc (BZC)', title: 'Botany, Zoology, Chemistry', detail: 'The B.Sc in Botany, Zoology, and Chemistry provides detailed pathways into cel
        '</div>' +
        '<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%; text-align: center;">' +
          '<p style="color: var(--color-gray);">© 2025 CVRM Degree College. All rights reserved. | Bazaar Street, Venkatagirikota, Andhra Pradesh 517424</p>' +
          '<p style="color: var(--color-gray); font-style: italic;">Crafted with excellence</p>' +
        '</div>' +
      '</div>';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'css' && file !== 'js' && file !== 'images') {
        processDir(fullPath);
      }
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/<div class="footer-bottom">[\s\S]*?<\/div>\s*<\/div>\s*<\/footer>/g, newFooterBottom + '\n    </div>\n  </footer>');
      content = content.replace(/<div class="footer-bottom">[\s\S]*?<\/footer>/g, newFooterBottom + '\n    </div>\n  </footer>');
      
      // Replace social links
      content = content.replace(/<div class="footer-social"[^>]*>[\s\S]*?<\/div>/g, newFooterSocial);

      // Now ensure buttons point to new pages
      // For index.html
      content = content.replace(/href="programs\/programs\.html"/g, 'href="programs/programs.html"'); // Base link

      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Updated footer for ' + fullPath);
    }
  }
}

processDir(baseDir);
console.log('Done.');
