import {
  catchError,
  concatMap,
  delay,
  forkJoin,
  from,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  take,
} from "rxjs";

console.log("/////////////////////////////");
console.log("// Obsevables //");
console.log("/////////////////////////////");

const emitter: Observable<number> = of(1, 2, 3, 4, 5);

emitter.subscribe((value: number) => {
  console.log(`Value: ${value}`);
});

emitter.pipe(map((value: number) => value / 2)).subscribe((value: number) => {
  console.log(`Value/2 ${value}`);
});

console.log("/////////////////////////////");
console.log("// Combining operators //");
console.log("/////////////////////////////");

const stringValues = emitter.pipe(
  map((value) => {
    const _value = value / 2;
    console.log(`Mapping to /2: ${value}`);
    return _value;
  }),
  map((value) => {
    const _value = `str_${value}`;
    console.log(`Mapping to str: ${value}`);
    return _value;
  })
);

stringValues.subscribe((value) => console.log(`str_value ${value}`));

console.log("/////////////////////////////");
console.log("// Time based observables //");
console.log("/////////////////////////////");

const sourceInterval = interval(1000);

const fiveNumbers = sourceInterval.pipe(
  take(5),
  map((value) => {
    console.log(`map received: ${value}`);
    return `str_${value}`;
  })
);

// fiveNumbers.subscribe((value) => {
//   const dateString = new Date().toLocaleTimeString();
//   console.log(`${dateString}: ${value}`);
// });

console.log("/////////////////////////////");
console.log("// Observable errors //");
console.log("/////////////////////////////");

interface IValue {
  value: number;
}

interface INestedObj {
  id?: IValue;
}

const errorEmitter: Observable<INestedObj> = of(
  { id: { value: 2 } },
  {},
  { id: { value: 3 } }
);

const returnIdValue = errorEmitter.pipe(map((value) => value.id!.value));

returnIdValue.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (error) => console.log(`Error: ${error}`),
  complete: () => console.log(`Complete`),
});

console.log("/////////////////////////////");
console.log("// Observable error catch //");
console.log("/////////////////////////////");

const catchingErrors = returnIdValue.pipe(
  catchError((error) => {
    console.log(`Error: ${error}`);
    return of(":C");
  })
);

catchingErrors.subscribe((value) => console.log(`Value: ${value}`));

console.log("/////////////////////////////");
console.log("// Observable returning observables //");
console.log("/////////////////////////////");

interface IProductId {
  id: number;
}

interface IProductDescription {
  name: string;
  description: string;
}

const productList = <Observable<IProductId>>(
  from([{ id: 1 }, { id: 2 }, { id: 3 }])
);

function getProductName(id: number): Observable<IProductDescription> {
  return of({
    id: id,
    name: `Product ${id}`,
    description: `Description ${id}`,
  });
}

productList
  .pipe(
    map((value) => {
      console.log(`Prod ${value.id}`);
      return getProductName(value.id);
    })
  )
  .subscribe((value) => value.subscribe((product) => console.log({ product })));

console.log("/////////////////////////////");
console.log("// mergeMap //");
console.log("/////////////////////////////");

productList
  .pipe(
    mergeMap((value) => {
      console.log(`Prod ${value}`);
      return getProductName(value.id);
    })
  )
  .subscribe((value) => console.log(`MergedMap:`, value));

console.log("/////////////////////////////");
console.log("// concatMap //");
console.log("/////////////////////////////");

const delayedEmit = of(3, 2, 1, 0.8).pipe(
  mergeMap((value) => {
    const date = new Date().toLocaleTimeString();
    const _delay = value * 1000;
    console.log(`>> emit >> ${date} value: ${value} dalya: ${_delay} ms`);
    return of(value).pipe(delay(_delay));
  })
);

// delayedEmit.subscribe((value) => {
//   const date = new Date().toLocaleTimeString();
//   console.log(`<< receive << ${date} value: ${value}`);
// });

console.log("concatenating");

const concatenated = of(3, 2, 1).pipe(
  concatMap((value) => {
    const date = new Date().toLocaleTimeString();
    const _delay = value * 1000;
    console.log(`>> emit >> ${date} value: ${value} dalya: ${_delay} ms`);
    return of(value).pipe(delay(_delay));
  })
);

// concatenated.subscribe((value) => {
//   const date = new Date().toLocaleTimeString();
//   console.log(`<< receive << ${date} value: ${value}`);
// });

console.log("/////////////////////////////");
console.log("// forkJoin //");
console.log("/////////////////////////////");

const onePersecond = interval(1000);

const threeNumbers = onePersecond.pipe(
  take(3),
  map((value) => value)
);
const twoNumbers = onePersecond.pipe(
  take(2),
  map((value) => `_${value}`)
);
const oneNumbers = onePersecond.pipe(
  take(1),
  map((value) => `:${value}`)
);

forkJoin([threeNumbers, twoNumbers, oneNumbers]).subscribe((values) =>
  console.log("forkValues: ", values)
);

console.log("/////////////////////////////");
console.log("// observableSubject //");
console.log("/////////////////////////////");
