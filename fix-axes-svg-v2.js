const fs = require('fs');
const filePath = 'c:/Users/Administrator/Desktop/websites/New folder/gpad-tester-main/gpad-tester-main/nextjs-version/src/components/AxesSVG/AxesSVG.jsx';
const content = fs.readFileSync(filePath, 'utf8');

const targetSection = `<ControlsRow>
        <Btn onClick={clearPaths}>🗑️ Clear Paths (P)</Btn>
        <Btn $active={showPerfectCircle} onClick={() => setShowPerfectCircle(!showPerfectCircle)}>
          {showPerfectCircle ? '✓' : '⭕'} Perfect Circle
        </Btn>
        <Btn $active={showDeadzone} onClick={() => setShowDeadzone(!showDeadzone)}>
          {showDeadzone ? '✓' : '⭕'} Deadzone
        </Btn>
      </ControlsRow>`;

// Using a regex to find the section between <ControlsRow> and </ControlsRow> near the end of the file
const newContent = content.replace(/<ControlsRow>[\s\S]*?<Btn onClick=\{clearPaths\}>[\s\S]*?<\/ControlsRow>/, targetSection);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('AxesSVG.jsx section replaced successfully.');
