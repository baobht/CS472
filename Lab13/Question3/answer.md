| Method                 | Blocking | Callback / Promise | Use Case                 |
| ---------------------- | -------- | ------------------ | ------------------------ |
| `readFileSync`         | Yes      | None               | Small configs, startup   |
| `readFile`             | No       | Callback           | General async read       |
| `fs.promises.readFile` | No       | Promise            | Clean `async/await` code |
| `createReadStream`     | No       | Event-based        | Large files, streaming   |
