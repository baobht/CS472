1.

```
a.
   Greetings, John
   hi undefined
   hello Smith
```

```

b.
   1. Global EC creation:
   outer: null, this: window, LE:[{ show: undefined }], TDZ{ str, user }
   2.Global EC execution:
   outer: null, this: window, LE:[{ show: fn str: "Greetings, ", user: obj }], TDZ{}

   3.display FEC creation:
   outer: global, this: user, LE:[{ arguments: obj }], TDZ{}
   4.display FEC execution:
   outer: global, this: user, LE:[{ arguments: obj }], TDZ{}

   5.show FEC creation:
   outer: global, this: window, LE:[{ arguments: obj, msg: "hi" }], TDZ{}
   6.show FEC execution:
   outer: global, this: window, LE:[{ arguments: obj, msg: "hi" }], TDZ{}

   7.show FEC creation:
   outer: global, this: user, LE:[{ arguments: obj, msg: "hello" }], TDZ{}
   8.show FEC execution:
   outer: global, this: user, LE:[{ arguments: obj, msg: "hello" }], TDZ{}

```
