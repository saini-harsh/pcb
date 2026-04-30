const pcbStackup = require('pcb-stackup');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function test() {
    const zipPath = 'C:\\Users\\Admin\\Downloads\\harsh\\pcb\\public\\media\\LCSampleGerber-2.zip';
    const buffer = fs.readFileSync(zipPath);
    const zip = await JSZip.loadAsync(buffer);
    const layers = [];

    const whatsThatGerber = require('whats-that-gerber');
    const rawLayers = [];

    for (const [filename, file] of Object.entries(zip.files)) {
        if (file.dir || filename.startsWith('__MACOSX')) continue;
        const baseFilename = filename.split('/').pop() || filename;
        const content = await file.async('string');
        const id = whatsThatGerber(baseFilename);
        
        let type = id.type;
        let side = id.side;
        
        if (!type || type === 'unknown') {
          const ext = baseFilename.split('.').pop()?.toLowerCase();
          if (ext === 'gtl' || ext === 'top') { type = 'copper'; side = 'top'; }
          else if (ext === 'gbl' || ext === 'bot') { type = 'copper'; side = 'bottom'; }
          else if (ext === 'gts' || ext === 'smt') { type = 'solderMask'; side = 'top'; }
          else if (ext === 'gbs' || ext === 'smb') { type = 'solderMask'; side = 'bottom'; }
          else if (ext === 'gto' || ext === 'slk') { type = 'silkscreen'; side = 'top'; }
          else if (ext === 'gbo' || ext === 'bsk') { type = 'silkscreen'; side = 'bottom'; }
          else if (ext === 'gko' || ext === 'gml') { type = 'outline'; side = 'all'; }
          else if (ext === 'drl' || ext === 'xln' || ext === 'txt') { type = 'drill'; side = 'all'; }
        }

        rawLayers.push({
          filename: baseFilename,
          gerber: content,
          type: type || 'unknown',
          side: side || 'all'
        });
    }

    const fixSvg = (svg) => {
        if (!svg) return '';
        let processed = svg;
        if (!processed.includes('viewBox')) {
          const wMatch = processed.match(/width="([\d.]+)"/);
          const hMatch = processed.match(/height="([\d.]+)"/);
          if (wMatch && hMatch) {
            processed = processed.replace('<svg', `<svg viewBox="0 0 ${wMatch[1]} ${hMatch[1]}"`);
          }
        }
        return processed
          .replace(/width="[\d.]+\w*"/g, 'width="100%"')
          .replace(/height="[\d.]+\w*"/g, 'height="100%"')
          .replace(/<svg/, '<svg preserveAspectRatio="xMidYMid meet" shape-rendering="geometricPrecision"');
    };

    pcbStackup(rawLayers, {
      color: {
        fr4: '#1a2a1a', 
        cu: '#e2b13c',  
        mask: '#1e3a1e',
        silk: '#ffffff'
      },
      attributes: {
        width: '100%',
        height: '100%'
      }
    }, (err, stackup) => {
        if (err) {
            console.error('Error:', err);
            return;
        }
        const top = fixSvg(stackup.top.svg);
        const bot = fixSvg(stackup.bottom.svg);
        console.log('Top SVG length:', top.length);
        console.log('Bottom SVG length:', bot.length);
        console.log('Sample top SVG start:', top.substring(0, 100));
    });
}

test();
