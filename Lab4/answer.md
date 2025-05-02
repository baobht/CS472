1.

```
Code 1: undefined88910undefined
```

```
Code 2: 8125
```

```
Code 3: 10
```

2.  Code 1:

```
1. Global EC creation:
Outer: null, LE: [{ a: undefined, b: undefined, c: undefined }], TDZ{x}
2. Global EC execution:
Outer: null, LE: [{ a: 5, b: 10, c: fn, x: undefined }], TDZ{}
3. c EC creation:
Outer: global, LE: [{ f: undefined, x: undefined, arguments: obj, a:8, b: 9, c: 10 }], TDZ{}
4. c EC execution:
Outer: global, LE: [{ f: fn, x: 10, arguments: obj, a:8, b: 9, c: 10 }], TDZ{}
5. f EC creation:
Outer: c, LE: [{ arguments: obj, a: 8, b: 9, c: 10, x: undefined }]
6. f EC execution:
Outer: c, LE: [{ arguments: obj, a: 8, b: 10, c: 10, x: 10 }]
```

Code 2:

```
1. Global EC creation:
Outer: null, LE: [{ x: undefined }], TDZ{}
2. Global EC execution:
Outer: null, LE: [{ x: 5 }], TDZ{}
3. myFunction EC creation:
Outer: global , LE: [{ arguments: obj }], TDZ{}
4. myFunction EC execution:
Outer: global , LE: [{ arguments: obj }], TDZ{}
5. myFunction EC creation:
Outer: global , LE: [{ arguments: obj }], TDZ{}
6. myFunction EC execution:
Outer: global , LE: [{ arguments: obj }], TDZ{}
```

Code 3:

```
1. Global EC creation:
Outer: null, LE: [{ foo: undefined }], TDZ{}
2.Global EC execution:
Outer: null, LE: [{ foo: 1 }], TDZ{}
3.bar EC creation:
Outer: global, LE: [{ foo: undefined }], TDZ{}
4.bar EC execution:
Outer: global, LE: [{ foo: 10 }], TDZ{}
```
