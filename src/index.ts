import { Blockchain } from './blockchain';
import { Block, Data, Transaction } from './block';
import { createHash } from 'crypto';

const dummyUserId1 = "544CAF37AA1EC85404A781A3F8A78DC7EC59BDBE17389DD0955FF6FAEDEC31D9AD20D8AA16C2F0A26AD1ED9F676D8785434AC18C6ADF25C97F59EF43AAF82B9E";
const dummyUserId2 = "0A0588B113AD13211FCDB874331061031921810C873AFB5749EADB00E8486A6BA36E558AE8E6B8245641FB3259C91EDE25D7EA2D7CC65C2A0A67C27ECB391183";


const firstTransaction = new Transaction(dummyUserId1, getRandomHash(), 20);
const secondTransaction = new Transaction(dummyUserId2, getRandomHash(), 40);

const firstData = new Data(firstTransaction);
firstData.addTransaction(secondTransaction);

const beforeExecution = Date.now();

const firstBlock = new Block(null, firstData);

const elapsedTime = Date.now() - beforeExecution;

console.log('mining took ' + elapsedTime / 1000 + ' seconds (' + (elapsedTime / 1000 / 60).toFixed(2) + ' minutes)');

const blockchain = new Blockchain(firstBlock);

console.log("ready");

function getRandomHash(): string {
    const currentDate = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    return createHash('sha512').update(currentDate + random).digest('hex');
}