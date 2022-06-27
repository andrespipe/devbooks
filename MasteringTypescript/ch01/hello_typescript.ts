import * as inquirer from "inquirer";

const esc = "2016";

const getFibos: (n: number) => number[] = (n: number): number[] => {
  const fibos = [0, 1];

  if (n < fibos.length) {
    return fibos.slice(0, n);
  }

  for (let i = fibos.length; i < n; i++) {
    const nextFibo = fibos[i - 2] + fibos[i - 1];
    fibos.push(nextFibo);
  }

  return fibos;
};

const fibo = 10;
console.log(
  `Hi ESC ${esc}, here you got my ${fibo} fibos: ${getFibos(fibo)?.join(", ")}`
);

inquirer
  .prompt([
    {
      name: "first_name",
      message: "What is your name?",
    },
  ])
  .then((answers) => {
    console.log(`you answred : ${answers.first_name}`);
  });

// Duck
var item1 = { id: 5, name: "rudolf" };
// item1 = { id: 4 }; // Wont work, missing name prop
