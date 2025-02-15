# My Life Capsule - Partner Portal

### About ###
* Ionic 6
* Angular 14 Typescript
* ngneat/elf - Data Store

### Dev Tools ###
* prettier
* tslint
* Unit testing - Jasmine



### Install dependencies

```
npm install -g @ionic/cli
npm install
```

### 1. Setup husky hooks

```
npm run prepare
```

Sourcetree: You may need something like the below
```
echo 'export PATH="/opt/homebrew/bin/:$PATH"' >> ~/.huskyrc
```

### 2. Check lint errors and warning

```
npm run lint
```

### 3. Check format every files(Prettier formatter)

```
npm run prettier-format
```

### Build

```
// Development build
ionic build

// Production build
ionic build --prod

```


##  Notes
### Create new store use below command (and follow instruction in terminal shown after command run)
```
npx @ngneat/elf-cli repo

* Important: When ask for select location select <project>/src/app/
```

