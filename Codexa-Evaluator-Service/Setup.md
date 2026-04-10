## How to setup a new TypeScript Express Project

1.
```
npm init -y
```

2.
```
npm install -D typescript
npm install concurrently
```

3.
```
tsc --init
```
Inside tsconfig.json we will do some few steps 
Like OutDir ko uncomment kro 
phir tsc type kro terminal me


4.
```
Add the following scripts in package.json

{
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently \"npm run watch\" \"npm start\"",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

Note: Make relevant config changes in tsconfig.json

5.
```
npm run dev
```

