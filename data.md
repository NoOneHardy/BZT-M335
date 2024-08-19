# Data structure

## Interfaces

### Muscle

```typescript
export enum Muscle {
    CHEST = 'Brust',
    BIZEPS = 'Bizeps',
    TRIZEPS = 'Trizeps',
    CALVES = 'Waden',
    THIGH = 'Oberschenkel',
    BACK = 'Rücken'
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
    muscle: Muscle,
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

### Exercise Template

```typescript
export interface ExerciseTemplate {
    machine: Machine
    sets: Configuration[]
}
```

### Plan

```typescript
export interface Plan {
    id: string
    name: string
    exercises: ExerciseTemplate[]
    last_training: number
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
    id: string
    plan: Plan
    exercises: Exercise[]
}
```

