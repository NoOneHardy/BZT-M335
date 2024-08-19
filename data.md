# Data structure

## Interfaces

### Muscle Group

```typescript
export enum MuscleGroup {
    CHEST = 'Brust',
    BICEPS = 'Bizeps',
    TRICEPS = 'Trizeps',
    CALVES = 'Waden',
    THIGH = 'Oberschenkel',
    BACK = 'Rücken',
    SHOULDERS = 'Schultern',
    ABDOMEN = 'Bauch'
}
```

### Configuration Template

```typescript
export interface ConfigurationTemplate {
    name: string,
    type: 'text' | 'number',
    suffix: string
}
```

### Machine

```typescript
export interface Machine {
    id: string | null,
    name: string,
    muscleGroup: MuscleGroup,
    configurations: ConfigurationTemplate[]
}
```

### Configuration

```typescript
export interface Configuration {
    name: string
    value: number | string | null
}
```

### Set Template

```typescript
export interface SetTemplate {
    configurations: Configuration[]
}
```

### Exercise Template

```typescript
export interface ExerciseTemplate {
    machine: Machine
    sets: SetTemplate[]
}
```

### Plan

```typescript
export interface Plan {
    id: string
    name: string
    exercises: ExerciseTemplate[]
    lastTraining: number | null
}
```

### Set

```typescript
export interface Set {
    configurations: Configuration[]
}
```

### Exercise

```typescript
export interface Exercise {
    template: ExerciseTemplate
    sets: Set[]
}
```

### Training

```typescript
export interface Training {
    id: string | null
    plan: Plan
    exercises: Exercise[]
}
```

