flowchart TD
A[Start] --> B[Load Configuration File]
B --> C{Config Exists?}
C -->|No| D[Initialize Configuration]
C -->|Yes| E[Git Repository Analysis]
D --> E
E --> F{Remote Changes?}
F -->|Yes & pullBeforeChecks=true| G[Pull Remote Changes]
F -->|No or Disabled| H[Pre-Push Checks]
G --> I{Merge Conflicts?}
I -->|Yes| J[Abort and Report Conflicts]
I -->|No| H
H --> K[Execute Pre-Push Steps]
K --> L{All Checks Passed?}
L -->|Yes| M[Git Push Execution]
L -->|No| N[Abort Push & Show Failures]
N --> O[Generate Suggestions]
M --> P[Post-Push Actions]
P --> Q[Execute Post-Push Steps]
Q --> R[Analysis of Changes]
R --> S[Provide Feedback & Metrics]
S --> T{Gamification Enabled?}
T -->|Yes| U[Update Achievement Stats]
T -->|No| V[Display Summary]
U --> V
O --> V
V --> W[End]

    style A fill:#5E81AC,stroke:#333,stroke-width:2px,color:#fff
    style M fill:#A3BE8C,stroke:#333,stroke-width:2px,color:#fff
    style N fill:#BF616A,stroke:#333,stroke-width:2px,color:#fff
    style J fill:#BF616A,stroke:#333,stroke-width:2px,color:#fff
    style V fill:#5E81AC,stroke:#333,stroke-width:2px,color:#fff
    style W fill:#5E81AC,stroke:#333,stroke-width:2px,color:#fff
