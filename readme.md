# 🐙 Decorators

<p align="left">
    <img src="./docs/assets/funcopus.png" alt="Decorators Logo" width="120" style="float:left; margin-right: 24px;">
</p>


**Decorators** is a TypeScript library that provides a collection of reusable and powerful functional decorators to enhance your applications with minimal boilerplate.  

It focuses on **observability, reliability, and developer productivity**, offering decorators for telemetry, caching, feature flags, workers, and more.  

## ✨ Features

- 📊 **Telemetry & Monitoring** – Collect runtime metrics and performance data  
- 🧠 **Memoization / Cache** – Optimize expensive computations  
- 🪝 **Dependency Injection** – Manage modular and testable code  
- 🎚️ **Feature Flags** – Toggle features dynamically at runtime  
- 🛠️ **Workers** – Run background tasks easily  
- 🔐 **License Check** – Protect software with DRM-style validation  
- ⚡ **Retry / Circuit Breaker** – Improve resilience against failures  
- 🚦 **Rate Limiting / Throttling** – Control function execution frequency  


## 🚀 Installation

```bash
npm install @jose.donas/decorators
# or
yarn add @jose.donas/decorators
```

## 🖥️ Usage Example

```typescript
import { memoize } from "@jose.donas/decorators";


const heavyComputation = memoize((num: number): number => {
    console.log("Computing...");
    return num * num;
});


console.log(heavyComputation(5)); // "Computing..." → 25
console.log(heavyComputation(5)); // cached → 25
```

## 🗺️ Roadmap

The full roadmap is available in our [roadmap](./docs/roadmap.md).

- 📊 Phase 1: Observability & Telemetry (in progress)

- 🔧 Phase 2: Core Decorators (utilities)

- ⚙️ Phase 3: Application-Oriented Decorators

- 🔐 Phase 4: Reliability & Protection

- 🌍 Phase 5: Cross-Platform Support

## 🤝 Contributing

Contributions are welcome! 🎉

Check out [CONTRIBUTING.md](./docs/contributing.md) for more info! 💪

## 📜 License

This project is licensed under ISC.
