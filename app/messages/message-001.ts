import { Message } from './types';

export const message001: Message = {
    id: 1,
    from: 'STATION FINANCE DEPT',
    subject: 'Notice of Debt',
    preview: 'Your account is overdue. Immediate action required.',
    content: `═══════════════════════════════════
        W E L C O M E   T O   T H E   D R E A M
═══════════════════════════════════

TO:      CREW MEMBER [UNREGISTERED]  
FROM:    STATION FINANCE DEPT  
SUBJECT: NOTICE OF DEBT — IMMEDIATE ACTION REQUIRED  

───────────────────────────────────
Welcome to Prospero’s Dream. Our records indicate that your  
account is **overdue**. Docking with the station constitutes  
**automatic acceptance of all financial and regulatory terms.**  

Immediate payment is required to remain in good standing.  
Please report to the nearest **Clean Room** upon disembarking.  
───────────────────────────────────

F E E S   A N D   C H A R G E S
-----------------------------------
• Docking Fees ............ 1kcr + 10kcr per week  
• O₂ Tax .................. 10cr per day  

TOTAL OUTSTANDING BALANCE
-----------------------------------
• 1,010cr (as of current docking cycle)  

───────────────────────────────────
FAILURE TO SETTLE YOUR ACCOUNT MAY RESULT IN:
• Denial of docking privileges  
• Accrual of additional late fees  
• Notification to your employer  
• Temporary suspension of oxygen access  

Please address this matter promptly  
to avoid further administrative complications.  

───────────────────────────────────
STATION FINANCE DEPT  
PROSPERO’S DREAM  
“Loyalty Is Oxygen.”  
< END TRANSMISSION >`,
    read: false,
    priority: 'high',
};
