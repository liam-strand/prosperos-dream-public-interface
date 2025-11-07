import { Command } from './types';

export const scanCommand: Command = {
    name: 'scan',
    description: 'Initiate local environmental scan via station systems',
    execute: () => {
        return `> INITIATING PROSPERO_SYS ENVIRONMENTAL SCAN...
  [███████████████████░░] 94%

  LOCAL STATUS REPORT:
  ───────────────────────────────
  Contacts Detected: 1 (signal unstable)
  Atmospheric Mix: 21.3% O₂ / trace solvent vapor
  Temperature: 18°C (regulated)
  Radiation: SAFE* 
  Structural Vibrations: WITHIN TOLERANCE
  Neural Noise Index: 3.8% (ELEVATED)
  Airborne Spores: UNCLASSIFIED (harmless?)

  *SAFE denotes values within corporate thresholds.
  *Thresholds subject to change without notice.

  ⚠ WARNING: Unusual activity detected in auth system
  NOTE: Multiple access attempts to vault authentication
  TIP: Investigate with 'auth' command

  <END OF SCAN>
`;
    },
};
