
// document.getElementById('bt1').addEventListener('click',function(e){
//     swap('one','two');
// });
// document.getElementById('bt2').addEventListener('click',function(e){
//     swap('two','one');
// });


function removeClass(obj, cls) {
	var classes = obj.className.split(' ');

	for (i = 0; i < classes.length; i++) {
		if (classes[i] == cls) {
		  classes.splice(i, 1); // remove class
		  i--; // (*)
		}
	}
	obj.className = classes.join(' ');
}


function replaceContentInContainer(matchClass, content) {
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1) {
            elems[i].innerHTML = content;
        }
    }
}

// var menu_elements = document.querySelectorAll('.menu>li'),
//     menu_length = menu_elements.length;
// for (var i = 0; i < menu_length; i++) {
//     menu_elements[i].addEventListener('click', function (e) {
//         var target = document.querySelector('.container>.' + e.target.classList[0]); // clicked element
//         Array.prototype.filter.call(target.parentNode.children, function (siblings) {
//             siblings.style.display = 'none'; // hide sibling elements
//         });
//         target.style.display = 'block'; // Show clicked element
//     });
// }


window.onload = function () {
    console.log('works!');

    var elements = document.querySelectorAll('.contact-center__block-header');
    // console.log(elements);

    for( var i = 0; i < elements.length || 0; i++) {
    	console.log(elements[i]);
    	elements[i].addEventListener('click', function(e) {
    		// e.target = clicked element
    		console.log(this.parentNode);
    		this.parentNode.dataset.state = !this.parentNode.dataset.state ? 'collapse' : '';
    		console.log('clicked = ' + this.parentNode.dataset.state);
    	});
    }

	// for (var i = 0; i < menu_length; i++) {
	//     menu_elements[i].addEventListener('click', function (e) {
	//         var target = document.querySelector('.container>.' + e.target.classList[0]); // clicked element
	//         Array.prototype.filter.call(target.parentNode.children, function (siblings) {
	//             siblings.style.display = 'none'; // hide sibling elements
	//         });
	//         target.style.display = 'block'; // Show clicked element
	//     });
	// }

}