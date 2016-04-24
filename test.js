import test from 'ava';
import execa from 'execa';

test(async t => {
	t.regex((await execa('./cli.js', ['categories', '--json'], {cwd: __dirname})).stdout, /"total_count":/);
});
