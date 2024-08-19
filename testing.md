# Testing

| #  | Name                                           | Tested     | Success |
|----|------------------------------------------------|------------|---------|
| 0  | Battery status                                 | 19.08.2024 | true    |
| 1  | Navigation to "New Plan Component"             | 19.08.2024 | true    |
| 2  | Navigation to "Overview Component"             | 19.08.2024 | true    |
| 3  | Machine list                                   | 19.08.2024 | true    |
| 4  | Continue button in "New Plan Component"        | 19.08.2024 | true    |
| 5  | Load configurations in "New Plan Component"    | 19.08.2024 | true    |
| 6  | Create a new plan                              | 19.08.2024 | true    |
| 7  | Recent trainings list                          | 19.08.2024 | true    |
| 8  | Recent trainings list without recent trainings | 19.08.2024 | true    |
| 9  | Start training using recent trainings list     | 19.08.2024 | true    |
| 10 | Start training using "Overview Component"      | 19.08.2024 | true    |
| 11 | Search for plans in "Overview Component"       | 19.08.2024 | true    |
| 12 | Search for machines in "New Plan Component"    | 19.08.2024 | true    |
| 13 | Delete a plan                                  | 19.08.2024 | true    |

## Tests

### Battery status

> The theme color should change according to the battery status

**Expected result**

| Battery status    | Theme color |
|-------------------|-------------|
| level <= 25%      | red         |
| 25% > level < 75% | orange      |
| level >= 75%      | green       |
| charging          | blue        |

**Actual result**

| Battery status    | Theme color |
|-------------------|-------------|
| level <= 25%      | red         |
| 25% > level < 75% | orange      |
| level >= 75%      | green       |
| charging          | blue        |

### Navigation to "New Plan Component"

> It should navigate to "New Plan Component" if clicked on "Erstellen"

**Result**  
App navigates to "New Plan Component".

### Navigation to "Overview Component"

> It should navigate to "Overview Component" if clicked on "Trainingspläne"

**Result**  
App navigates to "Overview Component".

### Machine list

> It should display all available machines in "New Plan Component"

**Result**  
An array of machines is displayed using their names in alphabetical order.

### Continue button in "New Plan Component"

> It should hide continue button until a name was entered and at least one machine has been selected.

**Result**  
Button is hidden and is display after user enters a name and selects at least one machine.

### Load configurations in "New Plan Component"

> It should display every possible configuration for each machine when creating a new plan

**Result**  
When continuing after selecting a few machines in "New Plan Component" every possible configuration for each machine is
displayed and editable.

### Create a new plan

> It should create a new plan with all the configurations specified in "New Plan Component"

**Result**  
A plan is created and is display in "Overview Component" where it can be started and all the configurations can be
displayed.

### Recent trainings list

> It should show a plan in "Home Component" after starting it.

**Result**  
The last 5 plans are displayed in "Home Component".

### Recent trainings list without recent trainings

> It should display a message if user has no recent trainings

**Result**  
The message "*Du hast noch keine Trainings abgeschlossen.*" is displayed.

### Start training using recent trainings list

> It should start a new training when clicking on it in "Home Component"

**Result**  
A training can be started using the quick access link in "Home Component"

### Start training using "Overview Component"

> It should start a new training when clicking on it in "New Plan Component"

**Result**  
A training can be started using "Overview Component"

### Search for plans in "Overview Component"

> It should display a search input in order to search for plans in "Overview Component"

**Result**  
The user can search for plans using the input on top of the list.

### Search for machines in "New Plan Component"

> It should display a search input in order to search for machines in "New Plan Component"

**Result**  
The user can search for machines using the input on top of the list.

### Delete a plan

> It should delete a plan if pressing on it for 3 seconds in "Overview Component"

**Result**
Plans can be deleted by pressing on them for 3 seconds.
