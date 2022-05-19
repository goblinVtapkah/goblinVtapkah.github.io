function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}

$(document).ready(function(){

	$('.preloader').remove();

	$(document).ready(function() {
 		$('.image-link').magnificPopup({type:'image'});
	});

	let options = {threshold: [1]};
	let observer = new IntersectionObserver(onEntry, options);
	let elements = $('.statistics');
	elements.each((i, el) => {
		observer.observe(el);
	});

	let options_case = {threshold: [0.7]};
	let observer_case = new IntersectionObserver(onEntry_case, options_case);
	let elements_case = $('.cases_title img');
	elements_case.each((i, el) => {
		observer_case.observe(el);
	});

	let options_reviews = {attributes: true, attributeFilter: ['class'], attributeOldValue: false};
	let observer_reviews = new MutationObserver(callBackClCh_reviews);
	let elements_reviews = $('.reviews_main .carousel-item');
	elements_reviews.each((i, el) => {
		observer_reviews.observe(el, options_reviews);
	});



	$(window).scroll(() => {
		let depth = $(window).scrollTop();
		depth += $(window).height() * 0.25;

		$(".section").each((i, el) => {

			if ($(el).offset().top - $("nav").outerHeight() <= depth){
				$("nav a").each((i, el) => {
					if ($(el).hasClass("active_a")){
						$(el).removeClass("active_a");
					}
				});

				$('nav li:eq('+ (i - 1) +')').find('a').addClass("active_a");
			}
		});

	});

});


var statisticsVal = [0, 0, 0, 0];
var statisticsValOrigin = [0, 0, 0, 0];
var statisticsValChanges = [0, 0, 0, 0];


$('.statistics .statistics_title .container .row:eq(1) h3').each(i => {
	statisticsValOrigin[i] = parseInt($('.statistics h3:eq('+ (i) +')').html(), 10);
})

for(let i = 0; i <= 3; i++){
	statisticsValChanges[i] = statisticsValOrigin[i] / 100;
}

$('.statistics .statistics_title .container .row:eq(1) h3').each((i, el) => {
	$(el).text(statisticsVal[i]);
});
$('.statistics .statistics_title .container .row-animation h3').each((i, el) => {
	$(el).text(statisticsVal[i]);
});




function onEntry(entry){
	entry.forEach(change => {
		if(change.isIntersecting){

			let timerId = setInterval(() => {
				
				for(let i = 0; i <= 3; i++){
					statisticsVal[i] += statisticsValChanges[i];
				}

				$('.statistics .statistics_title .container .row:eq(1) h3').each((i, el) => {
					$(el).text(parseInt(statisticsVal[i]));
				});
				$('.statistics .statistics_title .container .row-animation h3').each((i, el) => {
					$(el).text(parseInt(statisticsVal[i]));
				});

				if(statisticsValOrigin[0] - statisticsVal[0] < statisticsValChanges[0]){
					$('.statistics .statistics_title .container .row:eq(1) h3').each((i, el) => {
						$(el).text(parseInt(statisticsValOrigin[i]));
					});
					$('.statistics .statistics_title .container .row-animation h3').each((i, el) => {
						$(el).text(parseInt(statisticsValOrigin[i]));
					});
					clearInterval(timerId);
				}


			}, 12);
			

		}

	});
}


function onEntry_case(entry){
	entry.forEach(change => {
		if(change.isIntersecting){

			change.target.src = change.target.dataset.src;
		}

	});
}

function callBackClCh_reviews(mutation){
	let classReview = $('.reviews_main .carousel-item');
	$('.reviews_main .circles div').each((i, el) => {
				if($(el).hasClass('orange')){
					$(el).removeClass('orange');
				}
			});
	classReview.each((i, el) => {
		if($(el).hasClass('active')){
			
			$('.reviews_main .circles div:eq('+ i +')').addClass('orange');

		}
	});
}




$('a[href^="#"]').click(function(){
	let valHref = $(this).attr("href");
	$('html, body').animate({scrollTop: $(valHref).offset().top - 60 + "px"});
});



let calcVal = [0, 0, 0];
let valMultipliers = [	
						[3, 1, 2, 3],
						[3, 1, 2],
						[1, 3, 2]
]; 
let valMultipliersTime = [	
						[2.2, 1, 1.5, 2.2],
						[2.2, 1, 1.5],
						[1, 2.2, 1.5]
]; 

let selectVal = 0;
let answerCost = 0;
let answerTime = 0;
let Default = 2000;
let defaultTime = 3;
let stockTime = 3;


$('.cost_calculation select:eq(0)').change(function(){
	selectVal = $(this).val();
	if(selectVal == 'Выберите пункт...'){
		selectVal = 0;
	}
	calcVal[0] = selectVal;
});

$('.cost_calculation select:eq(1)').change(function(){
	selectVal = $(this).val();
	if(selectVal == 'Выберите пункт...'){
		selectVal = 0;
	}
	calcVal[1] = selectVal;
});

$('.cost_calculation select:eq(2)').change(function(){
	selectVal = $(this).val();
	if(selectVal == 'Выберите пункт...'){
		selectVal = 0;
	}
	calcVal[2] = selectVal;
});

$('.cost_calculation select').change(function(){
 	if(contains(calcVal, 0)){
 		answerCost = 0;
 		answerTime = 0;}
 	else{
 		answerCost = Default * valMultipliers[0][calcVal[0]] * valMultipliers[1][calcVal[1]] * valMultipliers[2][calcVal[2]];
 		answerTime = stockTime + defaultTime * valMultipliersTime[0][calcVal[0]] * valMultipliersTime[1][calcVal[1]] * valMultipliersTime[2][calcVal[2]];
 	}
	if(answerCost != 0){
		$('.cost_calculation tr:eq(0) td:eq(1)').text(parseInt(answerTime) + ' Дней');
		$('.cost_calculation tr:eq(1) td:eq(1)').text(parseInt(answerCost) + 'р.');
	}
});


