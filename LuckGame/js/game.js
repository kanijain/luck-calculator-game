const rand = document.getElementById('rand');
const turns = document.getElementById('turns');
const num_correct = document.getElementById('correct');
const num_wrong = document.getElementById('wrong');
const next = document.getElementById('next');

function init_rand() {
	var arr = [];
	var cnt = 0;
	while(arr.length < 3){
	    var r = Math.floor(Math.random() * 100) + 1;
	    if(arr.indexOf(r) === -1) {
	    	arr.push(r);
	    	cnt += 1;
	    	rand_button = document.getElementById('rand'+cnt);
	    	rand_button.value = r;
	    	rand_button.onclick = function(){ check(this) };
	    	rand_button.innerHTML = 'Option '+cnt;
	    	rand_button.style.color = 'black';
	    	rand_button.disabled = false;
	    }
	}

	var rand_num = arr[Math.floor(Math.random() * 3)];
	rand.innerHTML = rand_num;
}

function super_init() {
	window.location.reload();
}

function check(opt) {
	turns.innerHTML = parseInt(turns.innerHTML)-1;
	user = document.getElementById(opt.id);
	if( parseInt(user.value) == parseInt(rand.innerHTML) ){
		num_correct.innerHTML = parseInt(num_correct.innerHTML)+1;
		user.style.color = 'green';
	}
	else{
		num_wrong.innerHTML = parseInt(num_wrong.innerHTML)+1;
		user.style.color = 'red';
	}

	for(var i=1;i<=3;i++){
		rand_button = document.getElementById('rand'+i);
		rand_button.innerHTML = rand_button.value;
		rand_button.disabled = true;
	}

	if(turns.innerHTML == 0){
		next.innerHTML = 'Check Result';
		next.onclick = function(){ display_result(num_correct.innerHTML) };
	}
}

function display_result(num_correct) {
	document.getElementById('game-block').style.display = 'none';
	document.getElementById('result-block').style.display = 'block';

	output = document.getElementById('correct_output');
	output.innerHTML = 'You guessed '+num_correct+'/10 correctly';

	perf = document.getElementById('performance');
	if(num_correct<=3) perf.innerHTML = 'This is a sign of Bad Luck';
	else if(num_correct <=6) perf.innerHTML = 'This is a sign of Good Luck';
	else perf.innerHTML = 'Woah!, you are extremely lucky today';

	document.getElementById('play-again').onclick = function(){ super_init() };
}

init_rand();
next.onclick = function(){ init_rand() };