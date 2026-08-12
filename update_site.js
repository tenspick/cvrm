const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();

// Complete High-Priority VKota SEO Keywords
const vkotaKeywords = [
  "best degree college in VKota",
  "best degree college in V Kota",
  "best degree college in V.Kota",
  "best degree college in Venkatagirikota",
  "top degree college in VKota",
  "top degree college in V Kota",
  "top college in VKota",
  "best college in VKota",
  "best college in V Kota",
  "degree college in VKota",
  "degree college in V Kota",
  "degree colleges in VKota",
  "degree colleges in V Kota",
  "colleges in VKota",
  "colleges in V Kota",
  "degree college Venkatagirikota",
  "degree colleges Venkatagirikota",
  "best college in Venkatagirikota",
  "top college in Venkatagirikota",
  "best degree college Venkatagirikota",
  "best degree college near VKota",
  "degree college near VKota",
  "college near VKota",
  "degree college in VKota Chittoor",
  "best college in VKota Chittoor",
  "best degree college in VKota Chittoor",
  "degree college in V Kota Chittoor",
  "colleges in VKota Chittoor",
  "degree courses in VKota",
  "degree courses in V Kota",
  "best degree courses in VKota",
  "UG courses in VKota",
  "undergraduate courses in VKota",
  "undergraduate college in VKota",
  "UG college in VKota",
  "degree admission in VKota",
  "degree college admission in VKota",
  "degree admission 2026 VKota",
  "degree college admission 2026 VKota",
  "degree admissions in V Kota",
  "college admission in VKota",
  "college admissions in VKota",
  "best degree college for students in VKota",
  "best undergraduate college in VKota",
  "leading degree college in VKota",
  "reputed degree college in VKota",
  "private degree college in VKota",
  "degree college near Venkatagirikota",
  "best college near Venkatagirikota",
  "best degree college near Venkatagirikota",
  "college near Venkatagirikota",
  "degree college in Venkatagirikota",
  "degree colleges in Venkatagirikota",
  "degree courses in Venkatagirikota",
  "degree admission in Venkatagirikota",
  "college admission in Venkatagirikota",
  "CVRM Degree College VKota",
  "CVRM Degree College V Kota",
  "CVRM Degree College V.Kota",
  "CVRM Degree College Venkatagirikota",
  "CVRM College VKota",
  "CVRM College V Kota",
  "CVRM Degree College admission VKota",
  "CVRM Degree College courses VKota",
  "CVRM Degree College admissions VKota",
  "CVRM Degree College contact VKota",
  "CVRM Degree College location VKota",
  "CVRM college admission 2026 VKota",
  "CVRM degree courses VKota",
  "BCA college in VKota",
  "best BCA college in VKota",
  "BCA degree college VKota",
  "BCA admission VKota",
  "BCA course in VKota",
  "B.Com college in VKota",
  "best B.Com college in VKota",
  "B.Com degree college VKota",
  "B.Com admission VKota",
  "B.Com course in VKota",
  "B.Sc college in VKota",
  "best B.Sc college in VKota",
  "B.Sc degree college VKota",
  "B.Sc admission VKota",
  "B.Sc course in VKota",
  "BBA college in VKota",
  "best BBA college in VKota",
  "BBA degree college VKota",
  "BBA admission VKota",
  "BBA course in VKota",
  "BA college in VKota",
  "best BA college in VKota",
  "BA degree college VKota",
  "BA admission VKota",
  "degree college courses VKota",
  "best degree college near me VKota",
  "degree college near me VKota",
  "best college near me VKota",
  "degree college around VKota",
  "degree colleges near VKota",
  "best colleges near VKota",
  "degree college nearby VKota",
  "college nearby VKota",
  "best college for degree in VKota",
  "best college for UG in VKota",
  "best college after intermediate in VKota",
  "best college after 12th in VKota",
  "degree college for intermediate students VKota",
  "higher education college VKota",
  "higher education in VKota",
  "undergraduate education VKota",
  "degree education VKota",
  "college education VKota"
].join(", ");

// Keyword Rich Footer Bottom HTML
const newFooterBottom = `
  <div class="footer-bottom-seo" style="border-top: 1px solid var(--color-glass-border); padding-top: 2rem; margin-top: 2rem; width: 100%;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; width: 100%; text-align: center;">
      <p style="color: var(--color-gray-dark); font-size: 0.85rem; max-width: 1000px; line-height: 1.6;">
        <strong>CVRM Degree College VKota</strong> — The Premier &amp; Best Degree College in VKota, V Kota, V.Kota &amp; Venkatagirikota, Chittoor District. 
        Offering top undergraduate degree courses (BCA, B.Com, BBA, B.Sc, BA) with 100% placement training and degree college admissions 2026.
      </p>
      <p style="color: var(--color-gray); font-size: 0.85rem;">© 2026 CVRM Degree College. All rights reserved. | Bazaar Street, Venkatagirikota, Andhra Pradesh 517424</p>
    </div>
  </div>`;

function updateHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'css' && file !== 'js' && file !== 'images' && file !== 'event images' && file !== 'leadership images' && file !== '.git') {
        updateHtmlFiles(fullPath);
      }
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Inject or replace meta keywords
      if (content.includes('<meta name="keywords"')) {
        content = content.replace(/<meta name="keywords"[^>]*>/g, `<meta name="keywords" content="${vkotaKeywords}">`);
      } else if (content.includes('</head>')) {
        content = content.replace('</head>', `  <meta name="keywords" content="${vkotaKeywords}">\n</head>`);
      }

      // 2. Inject or update author & publisher
      if (!content.includes('<meta name="author"')) {
        content = content.replace('</head>', `  <meta name="author" content="CVRM Degree College VKota">\n  <meta name="publisher" content="CVRM Degree College Venkatagirikota">\n</head>`);
      }

      // 3. Footer update
      if (content.includes('<div class="footer-bottom">')) {
        content = content.replace(/<div class="footer-bottom">[\s\S]*?<\/footer>/g, newFooterBottom + '\n  </footer>');
      }

      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Successfully updated SEO keywords & structure for ' + path.relative(baseDir, fullPath));
    }
  }
}

updateHtmlFiles(baseDir);
console.log('All HTML files updated with high-end VKota SEO keywords!');
