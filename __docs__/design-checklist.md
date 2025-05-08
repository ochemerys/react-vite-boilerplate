# Design Checklist

## Is State Candidate

* It is NOT passed in by the parent via a prop
* It changes over time
* It can NOT be computed

## Module Exports

### Named Exports

``` javascript
export const ComponentA = () => { /* ... */ };
```
``` javascript
import { ComponentA } from './components';
```

### Default Exports

``` javascript
const ComponentA = () => { /* ... */ };
export default ComponentA;
```
``` javascript
import ComponentA from './ComponentA'
```

### Conclusion for Vite + React + Typescript

It is a good practice to favour named exports for clarity, refactorability, and tooling benifits

