## 2. Gamification System

### 2.1 System Objectives

The gamification system has the following objectives:

- Incentivize good development practices
- Provide positive feedback to the user
- Increase adoption and continuous use of the tool
- Make the quality verification process more entertaining

### 2.2 Achievements System

The achievements system is designed to recognize and reward good development practices, encourage consistent use of the tool, and make the quality verification process more engaging. Each achievement provides positive feedback and motivation to continue using SafeTrunk.

#### Progression Achievements

These achievements have multiple levels that users can reach as they progress in their usage of SafeTrunk.

1. **Code Guardian**: Rewards consistent successful pushes to the repository.

   - **Level I**: Complete your first successful push
   - **Level II**: Complete 5 successful pushes
   - **Level III**: Complete 25 successful pushes
   - **Level IV**: Complete 50 successful pushes
   - **Level V**: Complete 100 successful pushes

1. **Safe Keeper**: Recognizes when users resolve errors detected during pre-push verification.

   - **Level I**: Resolve 1 error detected in pre-push verification
   - **Level II**: Resolve 10 errors detected in pre-push verifications
   - **Level III**: Resolve 25 errors detected in pre-push verifications

1. **Weekly Warrior**: Encourages regular usage of SafeTrunk throughout the work week.

   - **Level I**: Use SafeTrunk at least 3 days in a week
   - **Level II**: Use SafeTrunk at least 3 days per week for 2 consecutive weeks
   - **Level III**: Use SafeTrunk at least 3 days per week for 4 consecutive weeks
   - **Level IV**: Use SafeTrunk at least 3 days per week for 8 consecutive weeks

1. **Clean Streak**: Rewards maintaining code quality through successful linting.

   - **Level I**: Complete 3 consecutive verifications without linting warnings
   - **Level II**: Complete 7 consecutive verifications without linting warnings
   - **Level III**: Complete 15 consecutive verifications without linting warnings
   - **Level IV**: Complete 30 consecutive verifications without linting warnings

1. **Quick Fix**: Recognizes efficient problem-solving after detecting issues.

   - **Level I**: Complete an error-solution-successful push cycle in less than 10 minutes
   - **Level II**: Complete 5 error-solution-successful push cycles in less than 10 minutes each
   - **Level III**: Complete 15 error-solution-successful push cycles in less than 10 minutes each

1. **Incremental Developer**: Encourages small, manageable code changes.

   - **Level I**: Keep changes small (<200 lines) in 5 consecutive pushes
   - **Level II**: Keep changes small (<200 lines) in 15 consecutive pushes
   - **Level III**: Keep changes small (<200 lines) in 30 consecutive pushes

#### Surprise Achievements

These achievements can be earned multiple times and add an element of fun and surprise to the development process.

1. **Night Owl**: Earned by completing a successful push after 11:00 PM.
1. **Early Bird**: Earned by completing a successful push before 7:00 AM.
1. **Weekend Warrior**: Earned by completing successful verifications during a weekend.
1. **Double Time**: Earned by completing two successful pushes with less than 30 minutes between them.
1. **Monday Motivator**: Earned by completing the first push of the week before 10:00 AM on Monday.

#### Special Achievements

These achievements recognize exceptional development patterns and can be earned multiple times.

1. **Phoenix**: Earned by recovering after 3 consecutive verification failures.
1. **Perfectionist**: Earned by completing 20 consecutive verifications without a single warning.
1. **Marathon Session**: Earned by completing 5 or more successful pushes in a single day.

#### Technical Implementation

Each achievement is implemented using the following interface:

```typescript
export interface Achievement {
  id: string; // Unique identifier
  name: string; // Display name
  description: string; // Description of how to earn the achievement
  icon: string; // Visual representation
  unlockedAt?: Date; // When the achievement was earned (if unlocked)
  progress?: {
    current: number; // Current progress
    total: number; // Total needed to complete
  };
  level?: number; // Current level for multi-level achievements
  maxLevel?: number; // Maximum possible level
  repeatable: boolean; // Whether it can be earned multiple times
  lastEarned?: Date; // For repeatable achievements
  timesEarned?: number; // For repeatable achievements
}
```

#### Achievement Detection

The system tracks various events and metrics to detect when achievements are earned:

1. **Push events**: Timestamps, success/failure status
1. **Verification results**: Warning counts, error types
1. **Code metrics**: Lines changed, files modified
1. **Temporal patterns**: Time of day, day of week
1. **Progress metrics**: Consecutive successes/failures

#### User Feedback

When an achievement is earned, the system provides immediate visual feedback:

1. A notification appears with the achievement name and description
1. The achievement is added to the user's profile
1. For progression achievements, the level increase is highlighted
1. For repeatable achievements, the number of times earned is updated

### 2.3 Level System

The level system provides a sense of progression and rewards consistent usage of SafeTrunk. Each level represents increasing expertise in maintaining code quality through trunk-based development practices.

#### Point Acquisition

Users can earn points through:

1. **Daily Activities**:

   - **Successful push**: 20 points
   - **Error correction** (successful push after a failed verification): 10 points.
     - This rewards fixing issues while still encouraging getting it right the first time

1. **Achievement Rewards**:

   - **Progression Achievement levels**:
     - Level I: 50 points
     - Level II: 75 points
     - Level III: 100 points
     - Level IV: 150 points
     - Level V: 200 points
   - **Surprise Achievements**: 30 points each time
   - **Special Achievements**: 50 points each time

1. **Point Multipliers**

   - **Weekly streak** (3+ days/week): x1.2 to all points
   - **Daily streak** (3+ consecutive days): x1.5 to all points

#### Level Structure

The system features 10 progressive levels that reflect growing expertise in code quality and trunk-based development:

| Level | Title              | Points Required |
| ----- | ------------------ | --------------- |
| 1     | Code Rookie        | 0-75            |
| 2     | Code Explorer      | 76-200          |
| 3     | Quality Apprentice | 201-400         |
| 4     | Trunk Defender     | 401-750         |
| 5     | Quality Guardian   | 751-1200        |
| 6     | Safe Architect     | 1201-2000       |
| 7     | Code Master        | 2001-3000       |
| 8     | Quality Champion   | 3001-4500       |
| 9     | Trunk Virtuoso     | 4501-6500       |
| 10    | SafeTrunk Legend   | 6501+           |

#### Technical Implementation

The level system is implemented using the following interface:

```typescript
export interface UserLevel {
  level: number; // Current level (1-10)
  title: string; // Level title
  points: number; // Current points
  nextLevelPoints: number; // Points required for next level
  progress: number; // Percentage progress to next level (0-100)
}
```

#### Level Calculation

The system automatically:

1. Tracks points earned through various activities
1. Applies appropriate multipliers
1. Updates the user's level when thresholds are crossed
1. Calculates progress percentage to the next level

#### User Feedback

When a user advances to a new level:

1. A prominent notification appears congratulating them
1. Their new title is displayed in their SafeTrunk profile
1. A visual indication of progress to the next level is shown

#### 2.4 Privacy Considerations

- All data is stored locally on the user's system
- Option to completely disable gamification
- No data is sent to external services
- Command to delete all stored data

```bash
   __________
  /          \
 /   NOVICE   \
 \            /
  \          /
   \   /\   /
    \______/

    ==========
  //          \\
 //   NOVICE   \\
 \\            //
  \\   //\\   //
   \\   /\   //
    \\______//

   __________
  /          \
 /   NOVICE   \
 \     /\     /
  \    /\    /
   \   /\   /
    \______/

   __________
  /          \
 /   NOVICE   \
 \     /\     /
  \    /\    /
   \   /\   /
    \______/

   /\__/\__/\
  /          \
 /   NOVICE   \
 \     /\     /
  \    /\    /
   \   /\   /
    \__  __/
       \/


   #########
 ##         ##
##  NOVICE   ##
 ##         ##
  ##       ##
   ##     ##
    #######


               ##  ##   ####   ##  ##  ######   ####   ######
               ### ##  ##  ##  ##  ##    ##    ##  ##  ##
               ## ###  ##  ##  ##  ##    ##    ##      ####
               ##  ##  ##  ##   ####     ##    ##  ##  ##
               ##  ##   ####     ##    ######   ####   ######

                       ##############################
                      ################################
                     #####                        #####
                    #####                          #####
                   #####                            #####
                  #####                              #####
                 #####                                #####
                #####                                  #####
               #####                                    #####
              #####                                      #####
             #####      ###                      ###      #####
            ######     #######                #######     ######
             ######      #######            #######      ######
              #######       #######      #######       #######
                #######       #######  #######       #######
                  ########       ##########       ########
                     ########       ####       ########
                       ########              ########
                          ########        ########
                            ########    ########
                               ##############
                                  ########
                                    ####




 ####   #####   #####   #####   ######  ##  ##  ######  ######   ####   ######
##  ##  ##  ##  ##  ##  ##  ##  ##      ### ##    ##      ##    ##  ##  ##
######  #####   #####   #####   ####    ## ###    ##      ##    ##      ####
##  ##  ##      ##      ##  ##  ##      ##  ##    ##      ##    ##  ##  ##
##  ##  ##      ##      ##  ##  ######  ##  ##    ##    ######   ####   ######

                        ##############################
                       ################################
                      #####                        #####
                     #####                          #####
                    #####                            #####
                   #####                              #####
                  #####     ##                  ##     #####
                 #####     ####                ####     #####
                #####      #######          #######      #####
               #####         #######      #######         #####
              #####      ###    ##############    ###      #####
             ######     #######   ##########   #######     ######
              ######      #######    ####    #######      ######
               #######       #######      #######       #######
                 #######       #######  #######       #######
                   ########       ##########       ########
                      ########       ####       ########
                        ########              ########
                           ########        ########
                             ########    ########
                                ##############
                                  ########
                                     ####


 ######   ####   ##  ##  #####   ##  ##  ######  ##  ##  ##   ##   ####   ##  ##
     ##  ##  ##  ##  ##  ##  ##  ### ##  ##       ####   ### ###  ##  ##  ### ##
     ##  ##  ##  ##  ##  #####   ## ###  ####      ##    ## # ##  ######  ## ###
 ##  ##  ##  ##  ##  ##  ##  ##  ##  ##  ##        ##    ##   ##  ##  ##  ##  ##
  ####    ####    ####   ##  ##  ##  ##  ######    ##    ##   ##  ##  ##  ##  ##

                         ##############################
                        ################################
                       #####                        #####
                      #####    ##################    #####
                     #####    ####################    #####
                    #####      ##################      #####
                   #####    ##    ############    ##    #####
                  #####    #####    ########    #####    #####
                 #####     ########    ##    ########     #####
                #####         ########    ########         #####
               #####      ###    ##############    ###      #####
              ######     #######   ##########   #######     ######
               ######      #######    ####    #######      ######
                #######       #######      #######       #######
                  #######       #######  #######       #######
                    ########       ##########       ########
                       ########       ####       ########
                         ########              ########
                            ########        ########
                              ########    ########
                                 ##############
                                    ########
                                      ####


                         ##############################
                        ################################
                       #####                        #####
                      #####            ##            #####
                     #####         ##########         #####
                    #####           ########           #####
                   #####     ##    ##########     ##    #####
                  #####     ####       ##        ####    #####
                 #####      ########         ########     #####
                #####         ########    ########         #####
               #####      ###    ##############    ###      #####
              ######     #######   ##########   #######     ######
               ######      #######    ####    #######      ######
                #######       #######      #######       #######
                  #######       #######  #######       #######
                    ########       ##########       ########
                       ########       ####       ########
                         ########              ########
                            ########        ########
                              ########    ########
                                 ##############
                                    ########
                                      ####


 ####################    ##############################    ####################
  ##################    ################################    ##################
     ##############    #####                        #####    ##############
         #########    #####            ##            #####    #########
                     #####            ####            #####
################    #####         ############         #####    ################
 ##############    #####           ##########           #####    ##############
    ##########    #####            ##########            #####    ##########
        #####    #####            ############            #####    #####
                #####                 ####                 #####
               #####      ###          ##          ###      #####
     #####    ######     #######                #######     ######    #####
      #####    ######      #######            #######      ######    #####
       #####    #######       #######      #######       #######    #####
      ########    #######       #######  #######       #######    ########
    ############    ########       ##########       ########    ############
      #############    ########       ####       ########    #############
         ############    ########              ########    ############
            ############    ########        ########    ############
                ##########    ########    ########    ##########
                    #########    ##############    #########
                        ########    ########    ########
                            ######    ####    ######
                                #####      #####
                                    ########
                                       ##
```
