import 'babel-polyfill';
import { getWords, getWords2, wordsCount } from "./string";


for(let some of getWords2('   Привет я буду   писать js код   сегодня))')){
	console.log(some);
}

for(let some of getWords('   Привет я буду   писать js код   сегодня))')){
	console.log(some);
}
