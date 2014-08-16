var h1 = document.getElementsByTagName('h1');

if (h1.length) {
	var title = h1[0].innerHTML.split('Episode');
	if (title.length > 1) {
		title;
	} else {
		null;
	}
}