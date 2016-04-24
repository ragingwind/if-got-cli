import test from 'ava';
import execa from 'execa';

test(async t => {
	const testcli = async (args, r) => {
		t.regex((await execa('./cli.js', args.split(' '), {cwd: __dirname})).stdout, r);
	};

	testcli('categories', /Abstract/);
	testcli('categories --json', /"total_count":/);
	testcli('icons search --query=app', /https:\/\/cdn0.iconfinder.com\/data\/icons/);
	testcli('icons 495310', /https:\/\/cdn2.iconfinder.com\/data\/icons\/romance\/89\/02-512.png/);
	testcli('iconsets romance', /Romance(12440) by Jisun Park/);
	testcli('iconsets romance/icons', /https:\/\/cdn2.iconfinder.com\/data\/icons\/romance\/89\/02-512.png/);
	testcli('styles cartoon/iconsets', /Rabbits playing with toys(24064) by Anna Steblianko/);
	testcli('iconsets 28238', /Animals and Birds 2(28238) by Creative Stall/);
	testcli('styles --count=5', /3D/);
	testcli('styles 3d', /3D/);
	testcli('users/creativestall', /Creative Stall/);
});
