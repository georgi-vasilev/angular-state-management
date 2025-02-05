### Тhe Evolution of Angular State Management - From BehaviorSubjects to NgRx

## 1. Behavior subject + service
The first demo demonstrates the classic approach to managing state in an small scale Angular app

## 2. Component store
Light-weight alternative to NgRx store 
A domain specific state management provided from the NgRx team. Perfect for small to medium applications and feature specific. 
Cannot be used for global state management as it is possible to encounter state fragmentation.
With the latest Angular updates it is adviced to use Signal store

## 3. Signal store
Leverages the power of signals. Best for small to medium applications and feature specific state.
Again cannot be used for global state management.

> "Signal Store demonstrates the power of Angular Signals, but like any reactive system, it requires understanding how dependencies are tracked and updated."
> — Minko Gechev, Angular Team Member, Google




## 4. NgRx Store
Perfect for large scale applications with global state. Steep learning curve, some boilerplate overhead.
Predictable state management, time travel debugging, separation of concers, powerful tooling
