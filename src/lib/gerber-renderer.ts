import JSZip from 'jszip';
import whatsThatGerber from 'whats-that-gerber';
const pcbStackup = require('pcb-stackup');

export interface GerberLayer {
  id: string;
  filename: string;
  type: string;
  side: string;
  svg: string;
}

export interface GerberPreview {
  top: string;
  bottom: string;
  topCopper: string;
  bottomCopper: string;
  layers: GerberLayer[];
}

export async function renderGerberPreview(zipFile: File, maskColor: string = 'green'): Promise<GerberPreview> {
  const zip = await JSZip.loadAsync(zipFile);
  const layers: any[] = [];

  for (const [filename, file] of Object.entries(zip.files)) {
    if (file.dir || filename.startsWith('__MACOSX')) continue;
    const baseFilename = filename.split('/').pop() || filename;
    const content = await file.async('string');
    
    // Identification is crucial for stackup to know what is what
    const id = whatsThatGerber(baseFilename);

    layers.push({
      filename: baseFilename,
      gerber: content,
      type: id.type,
      side: id.side
    });
  }

  if (layers.length === 0) {
    throw new Error('No valid Gerber files found.');
  }

  return new Promise((resolve, reject) => {
    pcbStackup(layers, {
      color: {
        fr4: '#0f1a0f', // Dark core
        cu: '#c5a059',  // Gold traces
        mask: maskColor === 'green' ? '#1a361e' : 
              maskColor === 'blue' ? '#1a2a3a' : 
              maskColor === 'red' ? '#3a1a1a' : '#1a1a1a',
        silk: '#ffffff'
      },
      attributes: {
        width: '100%',
        height: '100%'
      }
    }, (err, stackup) => {
      if (err) return reject(err);

      const fixSvg = (svg: any) => {
        if (!svg) return '';
        const str = typeof svg === 'string' ? svg : (svg.toString?.() || '');
        
        // Ensure viewBox
        let processed = str;
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
          .replace(/<svg/, '<svg preserveAspectRatio="xMidYMid meet"');
      };

      const resultLayers: GerberLayer[] = stackup.layers.map((l: any, index: number) => ({
        id: `${l.type}-${l.side || 'all'}-${index}`,
        filename: l.filename || `layer-${index}`,
        type: l.type || 'unknown',
        side: l.side || 'all',
        svg: fixSvg(l.svg)
      }));

      resolve({
        top: fixSvg(stackup.top.svg),
        bottom: fixSvg(stackup.bottom.svg),
        topCopper: resultLayers.find(l => l.type === 'copper' && l.side === 'top')?.svg || '',
        bottomCopper: resultLayers.find(l => l.type === 'copper' && l.side === 'bottom')?.svg || '',
        layers: resultLayers
      });
    });
  });
}
