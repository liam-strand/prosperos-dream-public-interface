import { Command } from './types';

export const logsCommand: Command = {
    name: 'logs',
    description: 'View recent station system logs',
    execute: () => {
        return `> ACCESSING PROSPERO_SYS LOG ARCHIVE...
───────────────────────────────────────
[09:34:12] Life Support Diagnostics — OK
[09:34:45] O₂ Credit Meter Sync — SUCCESS
[09:35:01] WARNING: Unauthorized process "CAL##" initiated
[09:35:07] Attempting quarantine... FAILED
[09:35:23] Signal rerouted via maintenance subnet
[09:35:29] System integrity check — NOMINAL*
[09:35:45] All systems nominal
───────────────────────────────────────
*Note: "Nominal" defined per Tempest Co. legal standard.

⚠ WARNING: Unusual activity detected in auth system
  NOTE: Multiple access attempts to vault authentication
  TIP: Investigate with 'auth' command

> END LOG STREAM
`;
    },
};
