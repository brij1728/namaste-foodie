import {sum} from '../sum';
test("Sum function should calculate the sum of two numbers", () => {
	const result = sum(3,7);
	
	//Asserting that the result of sum(3,7) is 10
	expect(result).toBe(10);
	
})