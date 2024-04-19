#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// initilize user balance and pin code

let myBalance = 25000;
let myPin = 6666;

// print WELCOME message

console.log( chalk.blue("\n \tWelcome to Orhaan ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message:chalk.yellowBright  ("Enter your pin number:"),
  }
])
if (pinAnswer.pin === myPin) {
  console.log(chalk.green("\n your pin code is correct\n"));

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Select an operation",
      choices: ["Withdraw Amount", "Check Balance"],
    }
  ]) 
  if(operationAns.operation === "Withdraw Amount"){
     let WithdrawAns = await inquirer.prompt([
     {
      name: "withdrawOption",
      type: "list",
      message:chalk.green( "Select withdraw option"),
      choices: ["Fast Cash", "Enter Amount"]
     }
   ])
     if (WithdrawAns.withdrawOption === "Fast Cash") {
    let fastCashAns = await inquirer.prompt([
      {
        name: "fastCash",
        type: "list",
        message:  chalk.bgBlueBright( "Select Amount"),
        choices: [1000, 2000, 3000, 5000, 10000, 30000],
      }
    ])
    if (fastCashAns.fastCash > myBalance) {
      console.log("Insufficient Balance");
    } 
     else {
      myBalance -= fastCashAns.fastCash;
      console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
      console.log(`your Remaining Balance is:${myBalance}`);
     }
  }
  else if(WithdrawAns.withdrawOption === "Enter Amount"){

    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        type: "number",
        message:chalk.bgGreen("Enter the amount to withdraw:")
      }
    ])
    if(amountAns.amount > myBalance ){
      console.log("Insuficient Balance")
    }
    else{
      myBalance -= amountAns.amount;
      console.log(`${amountAns.amount} Withdraw Successfully`);
      console.log(`your Remaining Balance is:${myBalance}`);
    }
  }

     }
      else if (operationAns.operation === "Check Balance") {
      console.log(`Your Account Balance is :${myBalance}`);
     }
} 
 else {
    console.log(chalk.bgRed("\n \tPin is incorrect ,Please Try Again\n"));
 }
